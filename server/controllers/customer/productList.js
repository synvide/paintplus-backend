/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ProductModel, AddressModel } from '../../models';

const ProductList = ({
    id,
    text,
    limit = 10,
    page = 1,
    minimumPrice,
    maximumPrice,
    brands,
    discount,
    applicationType,
    finishType,
    paintType,
    highToLowPriceSort,
    lowToHighPriceSort,
    newestArrivalsSort,
}) => new Promise(async (resolve, reject) => {
    try {
        const searchQuery = [];
        if (text) {
            searchQuery.push({
                $match: {
                    $or: [
                        { name: { $regex: new RegExp(text, 'i') } },
                        { shortDescription: { $regex: new RegExp(text, 'i') } },
                        { longDescription: { $regex: new RegExp(text, 'i') } },
                        { group: { $regex: new RegExp(text, 'i') } },
                        { subGroup: { $regex: new RegExp(text, 'i') } },
                        { brand: { $regex: new RegExp(text, 'i') } },
                        { specialFeature: { $regex: new RegExp(text, 'i') } },
                    ],
                },
            });
        }

        const priceFilter = [];
        if (minimumPrice && maximumPrice) {
            priceFilter.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $gte: ['$sellingPrice', minimumPrice],
                            },
                            {
                                $lte: ['$sellingPrice', maximumPrice],
                            },
                        ],
                    },
                },
            });
        }

        const brandFilter = [];
        if (brands) {
            brandFilter.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $in: ['$brand', brands],
                            },
                        ],
                    },
                },
            });
        }

        const discountFilter = [];
        if (discount) {
            discountFilter.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $gte: ['$discountPercentage', discount],
                            },
                        ],
                    },
                },
            });
        }

        const applicationTypeFilter = [];
        if (applicationType) {
            applicationTypeFilter.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $in: ['$group', applicationType],
                            },
                        ],
                    },
                },
            });
        }

        const finishTypeFilter = [];
        if (finishType) {
            finishTypeFilter.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $in: ['$finishType', finishType],
                            },
                        ],
                    },
                },
            });
        }

        const paintTypeFilter = [];
        if (paintType) {
            paintTypeFilter.push({
                $match: {
                    $expr: {
                        $and: [
                            {
                                $in: ['$type', paintType],
                            },
                        ],
                    },
                },
            });
        }

        const sortFilter = {};
        if (highToLowPriceSort) {
            sortFilter.$sort = {
                sellingPrice: -1,
            };
        } else if (lowToHighPriceSort) {
            sortFilter.$sort = {
                sellingPrice: 1,
            };
        } else if (newestArrivalsSort) {
            sortFilter.$sort = {
                createdAt: -1,
            };
        } else {
            sortFilter.$sort = {
                createdAt: -1,
            };
        }

        const customerAddress = await AddressModel.findOne({
            customerRef: id,
            isDefault: true,
        });

        const [data] = await ProductModel.aggregate([
            {
                $match: {
                    deleted: false,
                    status: 'A',
                },
            },
            ...searchQuery,
            ...priceFilter,
            ...brandFilter,
            ...applicationTypeFilter,
            ...finishTypeFilter,
            ...paintTypeFilter,
            {
                $lookup: {
                    from: 'productdealers',
                    let: { productId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ['$productRef', '$$productId'],
                                        },
                                        {
                                            $gt: ['$units', 0],
                                        },
                                        {
                                            $eq: ['$availability', 'Y'],
                                        },
                                        {
                                            $eq: ['$status', 'A'],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'servicelocations',
                                let: { dealerId: '$dealerRef' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: ['$deleted', false],
                                                    },
                                                    {
                                                        $eq: ['$pincode', customerAddress ? customerAddress.pincode : ''],
                                                    },
                                                    {
                                                        $eq: ['$dealerRef', '$$dealerId'],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: 'dealerServiceLocations',
                            },
                        },
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $gt: [
                                                {
                                                    $size: '$dealerServiceLocations',
                                                },
                                                0,
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'dealers',
                                let: { dealerId: '$dealerRef' },
                                pipeline: [
                                    // {
                                    //     $geoNear: {
                                    //         near: { type: 'Point', coordinates: [customerAddress.location.coordinates[0], customerAddress.location.coordinates[1]] },
                                    //         distanceField: 'distance',
                                    //         key: 'location',
                                    //         maxDistance: 10000,
                                    //         spherical: true,
                                    //     },
                                    // },
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: ['$_id', '$$dealerId'],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: 'dealer',
                            },
                        },
                        // {
                        //     $match: {
                        //         $expr: {
                        //             $and: [
                        //                 {
                        //                     $gt: [
                        //                         {
                        //                             $size: '$dealer.distance',
                        //                         },
                        //                         0,
                        //                     ],
                        //                 },
                        //             ],
                        //         },
                        //     },
                        // },
                        {
                            $project: {
                                _id: {
                                    $first: '$dealer._id',
                                },
                                firstName: {
                                    $first: '$dealer.firstName',
                                },
                                lastName: {
                                    $first: '$dealer.lastName',
                                },
                                phoneNumber: {
                                    $first: '$dealer.phoneNumber',
                                },
                                city: {
                                    $first: '$dealer.city',
                                },
                                state: {
                                    $first: '$dealer.state',
                                },
                                country: {
                                    $first: '$dealer.country',
                                },
                                pinCode: {
                                    $first: '$dealer.pinCode',
                                },
                                addressLine1: {
                                    $first: '$dealer.addressLine1',
                                },
                                dealerServiceLocations: '$dealerServiceLocations',
                            },
                        },
                    ],
                    as: 'productDealer',
                },
            },
            {
                $project: {
                    _id: '$_id',
                    productId: {
                        $ifNull: ['$id', ''],
                    },
                    name: '$name',
                    type: '$type',
                    shortDescription: '$shortDescription',
                    longDescription: '$longDescription',
                    quantity: '$quantity',
                    category: '$category',
                    subCategory: '$subCategory',
                    brand: '$brand',
                    weight: '$weight',
                    length: '$length',
                    width: '$width',
                    height: '$height',
                    manufacturingDate: '$manufacturingDate',
                    expiryDate: '$expiryDate',
                    specialFeature: '$specialFeature',
                    mrp: '$mrp',
                    sellingPrice: '$sellingPrice',
                    discountPercentage: {
                        $round: [
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ['$mrp', '$sellingPrice'] },
                                            '$mrp',
                                        ],
                                    },
                                    100,
                                ],
                            },
                            2,
                        ],
                    },
                    tax: '$tax',
                    images: {
                        $filter: {
                            input: ['$image1', '$image2', '$image3', '$image4', '$image5'],
                            as: 'image',
                            cond: { $ne: ['$$image', null] },
                        },
                    },
                    warranty: '$warranty',
                    colour: '$colour',
                    finishType: '$finishType',
                    about: '$about',
                    isExpress: '$isExpress',
                    isTopDeal: '$isTopDeal',
                    dealer: '$productDealer',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt',
                },
            },
            ...discountFilter,
            sortFilter,
            {
                $facet: {
                    list: [
                        {
                            $skip: (page - 1) * limit,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                    total: [
                        {
                            $count: 'count',
                        },
                    ],
                },
            },
            {
                $unwind: '$total',
            }]);

        resolve(new ApiResponseUtility({
            message: 'Product list fetched successfully.',
            data: {
                products: ((data || {}).list || []),
                page,
                limit,
                total: (((data || {}).total || {}).count || 0),
                size: ((data || {}).list || []).length,
                hasMore: (page * limit) < (((data || {}).total || {}).count || 0),
            },
        }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while fetching products', error }));
    }
});

export default ProductList;

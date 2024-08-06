/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { Types } from 'mongoose';
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ProductModel } from '../../models';

const ProductList = ({
    id,
    text,
    limit = 10,
    page = 1,
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

        const [data] = await ProductModel.aggregate([
            {
                $match: {
                    adminRef: new Types.ObjectId(id),
                },
            },
            ...searchQuery,
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
                                            $eq: ['$status', 'Y'],
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
                        {
                            $unwind: {
                                path: '$dealer',
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        {
                            $project: {
                                _id: '$dealer._id',
                                firstName: '$dealer.firstName',
                                lastName: '$dealer.lastName',
                                phoneNumber: '$dealer.phoneNumber',
                                city: '$dealer.city',
                                state: '$dealer.state',
                                country: '$dealer.country',
                                pinCode: '$dealer.pincode',
                                addressLine1: '$dealer.addressLine1',
                            },
                        },
                    ],
                    as: 'productDealer',
                },
            },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    type: '$type',
                    shortDescription: '$shortDescription',
                    longDescription: '$longDescription',
                    quantity: '$quantity',
                    group: '$group',
                    subGroup: '$subGroup',
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
                    dealer: {
                        $ifNull: ['$productDealer', {}],
                    },
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt',
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
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
            },
        ]);

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

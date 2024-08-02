/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { Types } from 'mongoose';
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ProductModel } from '../../models';

const ProductDetail = ({
    productId,
}) => new Promise(async (resolve, reject) => {
    try {
        const [data] = await ProductModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(productId),
                },
            },
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
                $unwind: {
                    path: '$productDealer',
                    preserveNullAndEmptyArrays: true,
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
                    dealer: {
                        $ifNull: ['$productDealer', {}],
                    },
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt',
                },
            },
        ]);

        if (!data) {
            reject(new ApiErrorUtility({ message: 'No product found' }));
        }

        resolve(new ApiResponseUtility({
            message: 'Product details fetched successfully.',
            data,
        }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while fetching product details.', error }));
    }
});

export default ProductDetail;

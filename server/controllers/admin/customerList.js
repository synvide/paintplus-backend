/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { CustomerModel } from '../../models';

export default ({
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
                        { firstName: { $regex: new RegExp(text, 'i') } },
                        { lastName: { $regex: new RegExp(text, 'i') } },
                        { email: { $regex: new RegExp(text, 'i') } },
                    ],
                },
            });
        }

        const [data] = await CustomerModel.aggregate([
            {
                $match: {
                    deleted: false,
                },
            },
            ...searchQuery,
            {
                $project: {
                    _id: '$_id',
                    firstName: {
                        $ifNull: ['$firstName', ''],
                    },
                    lastName: {
                        $ifNull: ['$lastName', ''],
                    },
                    profilePicture: {
                        $ifNull: ['$profilePicture', ''],
                    },
                    email: {
                        $ifNull: ['$email', ''],
                    },
                    status: {
                        $ifNull: ['$status', ''],
                    },
                    dob: {
                        $ifNull: ['$dob', ''],
                    },
                    occupation: {
                        $ifNull: ['$occupation', ''],
                    },
                    lastLoginTime: {
                        $ifNull: ['$lastLoginTime', ''],
                    },
                    countryCode: {
                        $ifNull: ['$countryCode', ''],
                    },
                    phoneNumber: {
                        $ifNull: ['$phoneNumber', ''],
                    },
                    alternatePhoneNumber: {
                        $ifNull: ['$alternatePhoneNumber', ''],
                    },
                    createdAt: {
                        $ifNull: ['$createdAt', ''],
                    },
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
            message: 'Customers list fetched successfully.',
            data: {
                customers: ((data || {}).list || []),
                page,
                limit,
                total: (((data || {}).total || {}).count || 0),
                size: ((data || {}).list || []).length,
                hasMore: (page * limit) < (((data || {}).total || {}).count || 0),
            },
        }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while fetching listing of customers.', error }));
    }
});

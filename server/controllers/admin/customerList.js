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
                    firstName: '$firstName',
                    lastName: '$lastName',
                    email: '$email',
                    profilePicture: '$profilePicture',
                    status: '$status',
                    lastLoginTime: '$lastLoginTime',
                    phoneNumber: '$phoneNumber',
                    createdAt: '$createdAt',
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
                dealers: ((data || {}).list || []),
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

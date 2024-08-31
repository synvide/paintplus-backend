/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { Types } from 'mongoose';
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { DealerModel } from '../../models';

const DealerList = ({
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
                        { firstName: { $regex: new RegExp(text, 'i') } },
                        { lastName: { $regex: new RegExp(text, 'i') } },
                    ],
                },
            });
        }

        const [data] = await DealerModel.aggregate([
            {
                $match: {
                    deleted: false,
                },
            },
            ...searchQuery,
            {
                $lookup: {
                    from: 'servicelocations',
                    let: { dealerId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ['$dealerRef', '$$dealerId'],
                                        },
                                        {
                                            $eq: ['$deleted', false],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: 'serviceLocation',
                },
            },
            {
                $project: {
                    _id: '$_id',
                    dealerId: {
                        $ifNull: ['$id', ''],
                    },
                    email: '$email',
                    firstName: '$firstName',
                    lastName: '$lastName',
                    phoneNumber: '$phoneNumber',
                    shopImage: '$shopImage',
                    occupation: '$occupation',
                    gender: '$gender',
                    dob: '$dob',
                    countryCode: '$countryCode',
                    alternatePhoneNumber: '$alternatePhoneNumber',
                    addressLine2: '$addressLine2',
                    landmark: '$landmark',
                    city: '$city',
                    state: '$state',
                    country: '$country',
                    pincode: '$pincode',
                    geoLocationCode: '$geoLocationCode',
                    createdAt: '$createdAt',
                    serviceLocations: '$serviceLocation',
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
            message: 'Dealer list fetched successfully.',
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
        reject(new ApiErrorUtility({ message: 'Error while fetching listing of dealers.', error }));
    }
});

export default DealerList;

/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { ApiErrorUtility } from '../utility';
import { AdminModel } from '../models';
import { ACCESS_TOKEN_SECRET } from '../constants';

const prepareDecodedData = ({ authorization, type }) => new Promise(async (resolve, reject) => {
    const decodedData = jwt.verify(authorization, ACCESS_TOKEN_SECRET);
    let userData;
    if (decodedData) {
        const { data: { email, id, role } } = decodedData;
        if (role === type) {
            if (role === 'user') {
                userData = await AdminModel.findOne({ _id: id });
            } else {
                userData = await AdminModel.findOne({ _id: id });
            }
            if (!userData) {
                reject();
            }

            resolve({
                id, email, type,
            });
        }
    }
    reject();
});
const commonDecodingHandler = ({
    req,
    res,
    next,
    type,
}) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.replace('Bearer ', '');
    if (token) {
        prepareDecodedData({ token, type, res })
            .then((payload) => {
                if (payload) {
                    const body = { ...req.body, ...payload };
                    req.body = body;
                    return next();
                }
            })
            .catch(() => res.status(401).json(new ApiErrorUtility({ code: 401, message: 'Token might be invalid or has been expired', error: 'Token Invalid.' })));
    } else {
        res.status(400).json(new ApiErrorUtility({ code: 400, message: 'Malformed Request', error: 'Missing Headers' }));
    }
};

export default {
    authenticateUser: (req, res, next) => commonDecodingHandler({
        req, res, next, type: 'user',
    }),
    authenticateAdmin: (req, res, next) => commonDecodingHandler({
        req, res, next, type: 'admin',
    }),
};

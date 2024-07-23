/* eslint-disable import/named */
import { ValidatorUtility, ApiErrorUtility } from '../utility';
import { CustomerJoiSchema } from '../joiSchema';

const customerValidationHandler = ({
    req,
    res,
    next,
    schema,
}) => {
    ValidatorUtility(req.body, schema).then(() => {
        next();
    }).catch((err) => {
        res.status(400).json(new ApiErrorUtility({ code: 400, message: err.message }));
    });
};

export default {
    signup: (req, res, next) => customerValidationHandler({
        req, res, next, schema: CustomerJoiSchema.signup,
    }),
    login: (req, res, next) => customerValidationHandler({
        req, res, next, schema: CustomerJoiSchema.login,
    }),
    productList: (req, res, next) => customerValidationHandler({
        req, res, next, schema: CustomerJoiSchema.productList,
    }),
    productDetail: (req, res, next) => customerValidationHandler({
        req, res, next, schema: CustomerJoiSchema.productDetail,
    }),
    adAddress: (req, res, next) => customerValidationHandler({
        req, res, next, schema: CustomerJoiSchema.adAddress,
    }),
};

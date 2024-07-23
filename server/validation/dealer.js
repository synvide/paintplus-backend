/* eslint-disable import/named */
import { ValidatorUtility, ApiErrorUtility } from '../utility';
import { DealerJoiSchema } from '../joiSchema';

const dealerValidationHandler = ({
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
    dealerAdd: (req, res, next) => dealerValidationHandler({
        req, res, next, schema: DealerJoiSchema.add,
    }),
    dealerLogin: (req, res, next) => dealerValidationHandler({
        req, res, next, schema: DealerJoiSchema.login,
    }),
};
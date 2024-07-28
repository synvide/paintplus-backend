/* eslint-disable import/named */
import { ValidatorUtility, ApiErrorUtility } from '../utility';
import { AddressJoiSchema } from '../joiSchema';

const addressValidationHandler = ({
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
    add: (req, res, next) => addressValidationHandler({
        req, res, next, schema: AddressJoiSchema.add,
    }),
};

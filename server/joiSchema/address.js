/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const add = Joi.object().keys({
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    landmark: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pincode: Joi.number().required(),
    geoLocationCode: Joi.string().required(),
}).unknown(true);

export default {
    add,
};

/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const addServiceLocation = Joi.object().keys({
    pincode: Joi.number().required(),
}).unknown(true);

const deleteServiceLocation = Joi.object().keys({
    serviceLocationId: Joi.string().required(),
}).unknown(true);

export default {
    addServiceLocation,
    deleteServiceLocation,
};

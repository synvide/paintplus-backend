/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const adminOrderList = Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
}).unknown(true);

const orderDetail = Joi.object().keys({
    subOrderId: Joi.string().required(),
}).unknown(true);

export default {
    adminOrderList,
    orderDetail,
};

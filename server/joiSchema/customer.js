/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const email = Joi.string().email();
const password = Joi.string();
const firstName = Joi.string();
const lastName = Joi.string();
const profilePicture = Joi.object();
const occupation = Joi.string();
const gender = Joi.string();
const dob = Joi.date();
const countryCode = Joi.string();
const phoneNumber = Joi.string();
const alternatePhoneNumber = Joi.string();
const addressLine1 = Joi.string();
const addressLine2 = Joi.string();
const landmark = Joi.string();
const city = Joi.string();
const state = Joi.string();
const country = Joi.string();
const pincode = Joi.number();
const geoLocationCode = Joi.string();
const status = Joi.string().valid('Y', 'N');

const signup = Joi.object().keys({
    email: email.required(),
    password: password.required(),
    firstName: firstName.required(),
    lastName,
    profilePicture,
    occupation,
    gender,
    dob,
    countryCode,
    phoneNumber,
    alternatePhoneNumber,
}).unknown(true);

const login = Joi.object().keys({
    email: email.required(),
    password: password.required(),
}).unknown(true);

const update = Joi.object().keys({
    phoneNumber: Joi.string(),
    password: Joi.string(),
    gender: Joi.string().valid('M', 'F', 'O'),
}).unknown(true);

const productList = Joi.object().keys({
    text: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
    minimumPrice: Joi.number(),
    maximumPrice: Joi.number(),
    brands: Joi.array(),
    discount: Joi.number(),
    applicationType: Joi.array(),
    finishType: Joi.array(),
    paintType: Joi.array(),
    highToLowPriceSort: Joi.number(),
    lowToHighPriceSort: Joi.number(),
    newestArrivalsSort: Joi.number(),
}).unknown(true);

const productDetail = Joi.object().keys({
    productId: Joi.string().required(),
}).unknown(true);

const addAddress = Joi.object().keys({
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    country,
    pincode,
    geoLocationCode,
}).unknown(true);

const customerList = Joi.object().keys({
    text: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
}).unknown(true);

const customerEdit = Joi.object().keys({
    customerId: Joi.string().required(),
    email,
    firstName,
    lastName,
    profilePicture,
    occupation,
    gender,
    dob,
    countryCode,
    phoneNumber,
    alternatePhoneNumber,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    country,
    pincode,
    geoLocationCode,
    status,
}).unknown(true);

const customerDelete = Joi.object().keys({
    customerId: Joi.string().required(),
}).unknown(true);

export default {
    signup,
    login,
    update,
    productList,
    productDetail,
    addAddress,
    customerList,
    customerEdit,
    customerDelete,
};

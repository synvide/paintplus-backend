/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const email = Joi.string().email();
const password = Joi.string().alphanum();
const firstName = Joi.string();
const lastName = Joi.string();
const shopImage = Joi.object();
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
const status = Joi.string();

const add = Joi.object().keys({
    email: email.required(),
    password: password.required(),
    firstName: firstName.required(),
    lastName: lastName.required(),
    shopImage: shopImage.required(),
    occupation: occupation.required(),
    gender: gender.required(),
    dob: dob.required(),
    countryCode: countryCode.required(),
    phoneNumber: phoneNumber.required(),
    alternatePhoneNumber: alternatePhoneNumber.required(),
    addressLine1: addressLine1.required(),
    addressLine2: addressLine2.required(),
    landmark: landmark.required(),
    city: city.required(),
    state: state.required(),
    country: country.required(),
    pincode: pincode.required(),
    geoLocationCode: geoLocationCode.required(),
    status: status.required(),
}).unknown(true);

const login = Joi.object().keys({
    email: email.required(),
    password: password.required(),
}).unknown(true);

const productList = Joi.object().keys({
    text: Joi.string(),
}).unknown(true);

const updateInventory = Joi.object().keys({
    productId: Joi.string().required(),
    units: Joi.number().required(),
    availability: Joi.string().valid('Y', 'N').required(),
    status: Joi.string().valid('Y', 'N').required(),
}).unknown(true);

const dealerList = Joi.object().keys({
    text: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
}).unknown(true);

const dealerEdit = Joi.object().keys({
    dealerId: Joi.string().required(),
    email,
    firstName,
    lastName,
    shopImage,
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

const dealerDelete = Joi.object().keys({
    dealerId: Joi.string().required(),
}).unknown(true);

export default {
    add,
    dealerList,
    dealerEdit,
    dealerDelete,
    login,
    productList,
    updateInventory,
};

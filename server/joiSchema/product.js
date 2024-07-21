/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const productAdd = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    shortDescription: Joi.string(),
    longDescription: Joi.string(),
    quantity: Joi.number().required(),
    group: Joi.string(),
    subGroup: Joi.string(),
    brand: Joi.string().required(),
    weight: Joi.number().required(),
    length: Joi.number().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
    manufacturingDate: Joi.date().required(),
    expiryDate: Joi.date().required(),
    specialFeature: Joi.string(),
    mrp: Joi.number().required(),
    sellingPrice: Joi.number().required(),
    tax: Joi.number().required(),
    image1: Joi.object(),
    image2: Joi.object(),
    image3: Joi.object(),
    image4: Joi.object(),
    image5: Joi.object(),
    warranty: Joi.string(),
    colour: Joi.string(),
    finishType: Joi.string(),
    about: Joi.string(),
}).unknown(true);

export default {
    productAdd,
};

// name
// type
// shortDescription
// longDescription
// quantity
// group
// subGroup
// brand
// weight
// length
// width
// height
// manufacturingDate
// expiryDate
// specialFeature
// mrp
// sellingPrice
// images
// warranty
// colour
// finishType
// about

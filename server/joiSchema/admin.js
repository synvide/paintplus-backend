/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

const email = Joi.string().email();
const password = Joi.string().alphanum();
const secretKey = Joi.string();

const signup = Joi.object().keys({
    email: email.required(),
    password: password.required(),
    secretKey: secretKey.required(),
}).unknown(true);

const login = Joi.object().keys({
    email: email.required(),
    password: password.required(),
}).unknown(true);

export default {
    signup,
    login,
};

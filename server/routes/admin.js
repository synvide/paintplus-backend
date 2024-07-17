/* eslint-disable import/named */
import { AdminSignupController, AdminLoginController } from '../controllers/admin';
import { ResolverUtility } from '../utility';
import { AdminValidator } from '../validation';

const prefix = '/api/admin/';

export default (app) => {
    app.post(`${prefix}signup`, AdminValidator.signup, (req, res) => ResolverUtility(req, res, AdminSignupController));
    app.post(`${prefix}login`, AdminValidator.login, (req, res) => ResolverUtility(req, res, AdminLoginController));
};

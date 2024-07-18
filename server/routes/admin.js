/* eslint-disable import/named */
import { AdminSignupController, AdminLoginController, AdminAddProductController } from '../controllers/admin';
import { ResolverUtility } from '../utility';
import { MultipartService } from '../services';
import { AdminValidator } from '../validation';

const prefix = '/api/admin/';

export default (app) => {
    app.post(`${prefix}signup`, MultipartService, AdminValidator.signup, (req, res) => ResolverUtility(req, res, AdminSignupController));
    app.post(`${prefix}login`, AdminValidator.login, (req, res) => ResolverUtility(req, res, AdminLoginController));
    app.post(`${prefix}product/add`, AdminValidator.login, (req, res) => ResolverUtility(req, res, AdminAddProductController));
    app.post(`${prefix}product/detail`, AdminValidator.login, (req, res) => ResolverUtility(req, res, AdminAddProductController));
    app.post(`${prefix}product/update`, AdminValidator.login, (req, res) => ResolverUtility(req, res, AdminAddProductController));
    app.post(`${prefix}product/add`, AdminValidator.login, (req, res) => ResolverUtility(req, res, AdminAddProductController));
};

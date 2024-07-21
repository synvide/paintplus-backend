/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    CustomerSignupController, CustomerLoginController, CustomerProductListController,
} from '../controllers/customer';
import { ResolverUtility } from '../utility';
import { MultipartMiddleware, AuthenticationMiddleware } from '../middlewares';
import { CustomerValidator } from '../validation';

const prefix = '/api/customer/';

export default (app) => {
    app.post(
        `${prefix}signup`,
        MultipartMiddleware,
        CustomerValidator.signup,
        (req, res) => ResolverUtility(req, res, CustomerSignupController),
    );
    app.post(
        `${prefix}login`,
        CustomerValidator.login,
        (req, res) => ResolverUtility(req, res, CustomerLoginController),
    );
    app.post(
        `${prefix}product/list`,
        AuthenticationMiddleware.authenticateCustomer,
        CustomerValidator.productList,
        (req, res) => ResolverUtility(req, res, CustomerProductListController),
    );
};

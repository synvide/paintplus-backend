/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    CustomerSignupController, CustomerLoginController, CustomerProductListController, CustomerProductDetailController, CustomerUpdateController, CustomerDetailController, CustomerTopDealsController, CustomerGetLocationController,
} from '../controllers/customer';
import {
    OrderCreateController,
} from '../controllers/order';
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
    app.patch(
        `${prefix}update`,
        AuthenticationMiddleware.authenticateCustomer,
        CustomerValidator.update,
        (req, res) => ResolverUtility(req, res, CustomerUpdateController),
    );
    app.get(
        `${prefix}detail`,
        AuthenticationMiddleware.authenticateCustomer,
        (req, res) => ResolverUtility(req, res, CustomerDetailController),
    );
    app.post(
        `${prefix}topDeals`,
        (req, res) => ResolverUtility(req, res, CustomerTopDealsController),
    );
    app.post(
        `${prefix}getLocation`,
        (req, res) => ResolverUtility(req, res, CustomerGetLocationController),
    );
    // Product
    app.post(
        `${prefix}product/list`,
        AuthenticationMiddleware.authenticateCustomer,
        CustomerValidator.productList,
        (req, res) => ResolverUtility(req, res, CustomerProductListController),
    );
    app.post(
        `${prefix}product/detail`,
        AuthenticationMiddleware.authenticateCustomer,
        CustomerValidator.productDetail,
        (req, res) => ResolverUtility(req, res, CustomerProductDetailController),
    );
    // Order
    app.post(
        `${prefix}order/create`,
        AuthenticationMiddleware.authenticateCustomer,
        (req, res) => ResolverUtility(req, res, OrderCreateController),
    );
};

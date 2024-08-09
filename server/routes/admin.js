/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    AdminSignupController, AdminLoginController, AdminProductAddController, AdminProductListController,
    AdminProductDetailController, AdminProductDeleteController, AdminDealerAddController, AdminDealerLinkController,
    AdminColorListController, AdminDealerListController, AdminDealerUnlinkController,
    AdminDealerEditController, AdminDealerDeleteController, AdminCustomerListController,
} from '../controllers/admin';
import { ResolverUtility } from '../utility';
import { MultipartMiddleware, AuthenticationMiddleware } from '../middlewares';
import {
    AdminValidator, ProductValidator, DealerValidator, ProductDealerValidator, CustomerValidator,
} from '../validation';

const prefix = '/api/admin/';

export default (app) => {
    app.post(
        `${prefix}signup`,
        MultipartMiddleware,
        AdminValidator.signup,
        (req, res) => ResolverUtility(req, res, AdminSignupController),
    );
    app.post(
        `${prefix}login`,
        AdminValidator.login,
        (req, res) => ResolverUtility(req, res, AdminLoginController),
    );
    app.post(
        `${prefix}product/add`,
        MultipartMiddleware,
        AuthenticationMiddleware.authenticateAdmin,
        ProductValidator.productAdd,
        (req, res) => ResolverUtility(req, res, AdminProductAddController),
    );
    app.post(
        `${prefix}product/list`,
        MultipartMiddleware,
        AuthenticationMiddleware.authenticateAdmin,
        (req, res) => ResolverUtility(req, res, AdminProductListController),
    );
    app.post(
        `${prefix}product/detail`,
        AuthenticationMiddleware.authenticateAdmin,
        ProductValidator.productDetail,
        (req, res) => ResolverUtility(req, res, AdminProductDetailController),
    );
    app.post(
        `${prefix}product/delete`,
        AuthenticationMiddleware.authenticateAdmin,
        ProductValidator.productDelete,
        (req, res) => ResolverUtility(req, res, AdminProductDeleteController),
    );
    app.post(
        `${prefix}dealer/add`,
        MultipartMiddleware,
        AuthenticationMiddleware.authenticateAdmin,
        DealerValidator.dealerAdd,
        (req, res) => ResolverUtility(req, res, AdminDealerAddController),
    );
    app.post(
        `${prefix}dealer/list`,
        AuthenticationMiddleware.authenticateAdmin,
        DealerValidator.dealerList,
        (req, res) => ResolverUtility(req, res, AdminDealerListController),
    );
    app.patch(
        `${prefix}dealer/edit`,
        MultipartMiddleware,
        AuthenticationMiddleware.authenticateAdmin,
        DealerValidator.dealerEdit,
        (req, res) => ResolverUtility(req, res, AdminDealerEditController),
    );
    app.delete(
        `${prefix}dealer/delete`,
        AuthenticationMiddleware.authenticateAdmin,
        DealerValidator.dealerDelete,
        (req, res) => ResolverUtility(req, res, AdminDealerDeleteController),
    );
    app.post(
        `${prefix}dealer/unlink`,
        AuthenticationMiddleware.authenticateAdmin,
        ProductDealerValidator.unlinkProductWithDealer,
        (req, res) => ResolverUtility(req, res, AdminDealerUnlinkController),
    );
    app.post(
        `${prefix}dealer/link`,
        AuthenticationMiddleware.authenticateAdmin,
        ProductDealerValidator.linkProductWithDealer,
        (req, res) => ResolverUtility(req, res, AdminDealerLinkController),
    );
    app.post(
        `${prefix}colorList`,
        AuthenticationMiddleware.authenticateAdmin,
        (req, res) => ResolverUtility(req, res, AdminColorListController),
    );
    app.post(
        `${prefix}customer/list`,
        AuthenticationMiddleware.authenticateAdmin,
        CustomerValidator.customerList,
        (req, res) => ResolverUtility(req, res, AdminCustomerListController),
    );
};

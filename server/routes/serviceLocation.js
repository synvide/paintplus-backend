/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    ServiceLocationAddController, ServiceLocationListController, ServiceLocationDeleteController,
} from '../controllers/serviceLocation';
import { ResolverUtility } from '../utility';
import { ServiceLocationValidator } from '../validation';
import { AuthenticationMiddleware } from '../middlewares';

const prefix = '/api/serviceLocation/';

export default (app) => {
    app.post(
        `${prefix}add`,
        AuthenticationMiddleware.authenticateDealer,
        ServiceLocationValidator.addServiceLocation,
        (req, res) => ResolverUtility(req, res, ServiceLocationAddController),
    );
    app.post(
        `${prefix}list`,
        AuthenticationMiddleware.authenticateDealer,
        (req, res) => ResolverUtility(req, res, ServiceLocationListController),
    );
    app.post(
        `${prefix}delete`,
        AuthenticationMiddleware.authenticateDealer,
        ServiceLocationValidator.deleteServiceLocation,
        (req, res) => ResolverUtility(req, res, ServiceLocationDeleteController),
    );
};

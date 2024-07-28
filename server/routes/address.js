/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    AddressAddController,
} from '../controllers/address';
import { ResolverUtility } from '../utility';
import { AuthenticationMiddleware } from '../middlewares';
import { AddressValidator } from '../validation';

const prefix = '/api/address/';

export default (app) => {
    app.post(
        `${prefix}add`,
        AuthenticationMiddleware.authenticateCustomer,
        AddressValidator.add,
        (req, res) => ResolverUtility(req, res, AddressAddController),
    );
};

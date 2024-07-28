/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    DealerLoginController, DealerProductListController, DealerUpdateInventoryController,
} from '../controllers/dealer';
import { ResolverUtility } from '../utility';
import { DealerValidator } from '../validation';
import { AuthenticationMiddleware } from '../middlewares';

const prefix = '/api/dealer/';

export default (app) => {
    app.post(
        `${prefix}login`,
        DealerValidator.dealerLogin,
        (req, res) => ResolverUtility(req, res, DealerLoginController),
    );
    app.post(
        `${prefix}product/list`,
        AuthenticationMiddleware.authenticateDealer,
        DealerValidator.productList,
        (req, res) => ResolverUtility(req, res, DealerProductListController),
    );
    app.post(
        `${prefix}product/updateInventory`,
        AuthenticationMiddleware.authenticateDealer,
        DealerValidator.updateInventory,
        (req, res) => ResolverUtility(req, res, DealerUpdateInventoryController),
    );
};

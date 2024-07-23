/* eslint-disable max-len */
/* eslint-disable import/named */
import {
    DealerLoginController,
} from '../controllers/dealer';
import { ResolverUtility } from '../utility';
import { DealerValidator } from '../validation';

const prefix = '/api/dealer/';

export default (app) => {
    app.post(
        `${prefix}login`,
        DealerValidator.dealerLogin,
        (req, res) => ResolverUtility(req, res, DealerLoginController),
    );
};

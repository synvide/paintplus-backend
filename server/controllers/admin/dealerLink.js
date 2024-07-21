/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { DealerModel, ProductModel, ProductDealerModel } from '../../models';

const DealerLinkWithProduct = ({
    dealerId, productId, units, availability, status,
}) => new Promise(async (resolve, reject) => {
    try {
        const dealerExists = await DealerModel.findOne({ _id: dealerId });
        if (!dealerExists) {
            reject(new ApiErrorUtility({ message: 'Dealer not found' }));
        }

        const productExists = await ProductModel.findOne({ _id: productId });
        if (!productExists) {
            reject(new ApiErrorUtility({ message: 'Product not found' }));
        }

        const productDealerExists = await ProductDealerModel.findOne({ productRef: productId, dealerRef: dealerId });
        if (productDealerExists) {
            reject(new ApiErrorUtility({ message: 'Product is already linked with this dealer' }));
        }

        await new ProductDealerModel({
            productRef: productId,
            dealerRef: dealerId,
            units,
            availability,
            status,
        }).save();

        resolve(new ApiResponseUtility({
            message: 'Product linked with dealer successfully',
        }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while linking product with dealer', error }));
    }
});

export default DealerLinkWithProduct;

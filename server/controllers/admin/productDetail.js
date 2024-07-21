/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ProductModel } from '../../models';

const ProductDetail = ({
    productId,
}) => new Promise(async (resolve, reject) => {
    try {
        const product = await ProductModel.findById(productId).select('-__v');

        if (!product) {
            reject(new ApiErrorUtility({ message: 'Product not found' }));
        }

        resolve(new ApiResponseUtility({ message: 'Product details fetched successfully.', data: product }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while fetching product details.', error }));
    }
});

export default ProductDetail;

/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ProductModel } from '../../models';

const AddProduct = ({
    title,
    quantity,
    sellingPrice,
    images = [],
    markPrice,
    offerPercent,
    warranty,
    brand,
    colour,
    finishType,
    size,
    specialFeature,
    about = [],
}) => new Promise(async (resolve, reject) => {
    try {
        const product = await new ProductModel({
            title,
            quantity,
            sellingPrice,
            images,
            markPrice,
            offerPercent,
            warranty,
            brand,
            colour,
            finishType,
            size,
            specialFeature,
            about,
        }).save();

        resolve(new ApiResponseUtility({ message: 'Product added successfully!', data: product }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while adding product', error }));
    }
});

export default AddProduct;

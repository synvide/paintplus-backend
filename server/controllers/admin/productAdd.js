/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { ProductModel } from '../../models';

const ProductAdd = ({
    name,
    productType,
    shortDescription,
    longDescription,
    quantity,
    group,
    subGroup,
    brand,
    weight,
    length,
    width,
    height,
    manufacturingDate,
    expiryDate,
    specialFeature,
    mrp,
    sellingPrice,
    tax,
    image1,
    image2,
    image3,
    image4,
    image5,
    warranty,
    colour,
    finishType,
    about = [],
}) => new Promise(async (resolve, reject) => {
    try {
        let imageUrl1;
        let imageUrl2;
        let imageUrl3;
        let imageUrl4;
        let imageUrl5;
        if (image1) {
            const imageName = `product-image-${Date.now()}`;
            imageUrl1 = await ImageUploadService(imageName, image1);
        }
        if (image2) {
            const imageName = `product-image-${Date.now()}`;
            imageUrl2 = await ImageUploadService(imageName, image2);
        }
        if (image3) {
            const imageName = `product-image-${Date.now()}`;
            imageUrl3 = await ImageUploadService(imageName, image3);
        }
        if (image4) {
            const imageName = `product-image-${Date.now()}`;
            imageUrl4 = await ImageUploadService(imageName, image4);
        }
        if (image5) {
            const imageName = `product-image-${Date.now()}`;
            imageUrl5 = await ImageUploadService(imageName, image5);
        }
        const product = await new ProductModel({
            name,
            productType,
            shortDescription,
            longDescription,
            quantity,
            group,
            subGroup,
            brand,
            weight,
            length,
            width,
            height,
            manufacturingDate,
            expiryDate,
            specialFeature,
            mrp,
            sellingPrice,
            tax,
            image1: imageUrl1,
            image2: imageUrl2,
            image3: imageUrl3,
            image4: imageUrl4,
            image5: imageUrl5,
            warranty,
            colour,
            finishType,
            about: about.length ? JSON.parse(about) : [],
        }).save();

        resolve(new ApiResponseUtility({ message: 'Product added successfully!', data: product }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while adding product', error }));
    }
});

export default ProductAdd;

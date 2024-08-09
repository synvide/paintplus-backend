/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { ProductModel } from '../../models';

const ProductUpdate = ({
    productId,
    name,
    productType,
    shortDescription,
    longDescription,
    quantity,
    group,
    subGroup,
    brand,
    brandImage,
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
    status,
    about = [],
}) => new Promise(async (resolve, reject) => {
    try {
        let imageUrl1; let imageUrl2; let imageUrl3; let imageUrl4; let imageUrl5; let
            brandImageUrl;

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
        if (brandImage) {
            const imageName = `productBrand-image-${Date.now()}`;
            brandImageUrl = await ImageUploadService(imageName, brandImage);
        }

        let updatedProduct;

        if (productId) {
            // Use upsert to update the product or create a new one if it doesn't exist
            updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: productId },
                {
                    $set: {
                        name,
                        productType,
                        shortDescription,
                        longDescription,
                        quantity,
                        group,
                        subGroup,
                        brand,
                        brandImage: brandImageUrl,
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
                        status,
                        about: about.length ? JSON.parse(about) : undefined,
                    },
                },
                { new: true },
            );
        } else {
            // Create a new product if productId is not provided
            updatedProduct = await ProductModel.create({
                name,
                productType,
                shortDescription,
                longDescription,
                quantity,
                group,
                subGroup,
                brand,
                brandImage: brandImageUrl,
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
                status,
                about: about.length ? JSON.parse(about) : undefined,
            });
        }

        resolve(new ApiResponseUtility({
            message: productId ? 'Product updated successfully!' : 'Product created successfully!',
            data: updatedProduct,
        }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while updating or creating product', error }));
    }
});

export default ProductUpdate;

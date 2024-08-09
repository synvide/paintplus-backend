/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { DealerModel } from '../../models';

export default ({
    id,
    dealerId,
    email,
    occupation,
    firstName,
    lastName,
    shopImage,
    gender,
    dob,
    countryCode,
    phoneNumber,
    alternatePhoneNumber,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    country,
    pincode,
    geoLocationCode,
    status,
}) => new Promise(async (resolve, reject) => {
    try {
        const dealerExists = await DealerModel.findOne({ _id: dealerId, adminRef: id });
        if (!dealerExists) {
            reject(new ApiErrorUtility({ message: 'Dealer not found' }));
        }

        let imageUrl;
        if (shopImage) {
            const imageName = `dealer-image-${Date.now()}`;
            imageUrl = await ImageUploadService(imageName, shopImage);
        }

        const updatedDealer = await DealerModel.findOneAndUpdate(
            {
                _id: dealerId,
                adminRef: id,
            },
            {
                email,
                firstName,
                lastName,
                shopImage: imageUrl,
                occupation,
                gender,
                dob,
                countryCode,
                phoneNumber,
                alternatePhoneNumber,
                addressLine1,
                addressLine2,
                landmark,
                city,
                state,
                country,
                pincode,
                geoLocationCode,
                status,
            },
        );

        if (!updatedDealer) {
            return reject(new ApiErrorUtility({ statusCode: 501, message: 'Dealer not found.' }));
        }

        resolve(new ApiResponseUtility({ message: 'Dealer updated successfully!' }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while updating dealer', error }));
    }
});

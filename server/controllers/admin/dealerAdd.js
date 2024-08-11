/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { DealerModel } from '../../models';

export default ({
    id,
    dealerId,
    email,
    password,
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
        let imageUrl;
        if (shopImage) {
            const imageName = `dealer-image-${Date.now()}`;
            imageUrl = await ImageUploadService(imageName, shopImage);
        }

        let updatedDealer;

        if (dealerId) {
            const dealerExists = await DealerModel.findOne({ _id: dealerId });
            if (!dealerExists) {
                reject(new ApiErrorUtility({ message: 'Dealer not found' }));
            }
            updatedDealer = await DealerModel.findOneAndUpdate(
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
        } else {
            const emailExists = await DealerModel.findOne({ email: email.toLowerCase() });
            if (emailExists) {
                reject(new ApiErrorUtility({ message: `Email ${email} is already registered!` }));
            }
            updatedDealer = new DealerModel({
                adminRef: id,
                email,
                password,
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
            });
            await updatedDealer.save();
        }

        resolve(new ApiResponseUtility({
            message: dealerId ? 'Dealer updated successfully!' : 'Dealer created successfully!',
            data: updatedDealer,
        }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while updating or creating dealer', error }));
    }
});

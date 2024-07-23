/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { DealerModel } from '../../models';

const dealerAdd = ({
    id,
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
        const emailExists = await DealerModel.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            reject(new ApiErrorUtility({ message: `Email ${email} is already registered!` }));
        }

        let imageUrl;
        if (shopImage) {
            const imageName = `dealer-image-${Date.now()}`;
            imageUrl = await ImageUploadService(imageName, shopImage);
        }

        const adminObject = new DealerModel({
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
        await adminObject.save();

        const dealer = await DealerModel.findById(adminObject._id).select('-password -__v');
        if (!dealer) {
            reject(new ApiErrorUtility({ statusCode: 501, message: 'Something went wrong while adding dealer' }));
        }

        resolve(new ApiResponseUtility({ message: 'Dealer added successfully!', data: dealer }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Invalid Authorization', error }));
    }
});

export default dealerAdd;

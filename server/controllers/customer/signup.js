/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { CustomerModel } from '../../models';

const CustomerSignup = ({
    email,
    password,
    firstName,
    lastName,
    profilePicture,
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
}) => new Promise(async (resolve, reject) => {
    try {
        const emailExists = await CustomerModel.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            reject(new ApiErrorUtility({ message: `Email ${email} is already registered!` }));
        }

        let profilePictureUrl;
        if (profilePicture) {
            const profilePictureName = `admin-image-${Date.now()}`;
            profilePictureUrl = await ImageUploadService(profilePictureName, profilePicture);
        }

        const customerObject = new CustomerModel({
            email,
            password,
            firstName,
            lastName,
            profilePicture: profilePictureUrl,
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
        await customerObject.save();

        const customer = await CustomerModel.findById(customerObject._id).select('-password -__v');
        if (!customer) {
            reject(new ApiErrorUtility({ statusCode: 501, message: 'Something went wrong while registering customer' }));
        }

        resolve(new ApiResponseUtility({ message: 'Customer has signed up successfully!', data: customer }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while customer signup', error }));
    }
});

export default CustomerSignup;

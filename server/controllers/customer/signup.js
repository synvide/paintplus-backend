/* eslint-disable no-promise-executor-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService, IdGeneratorService } from '../../services';
import AddressController from '../address';
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
        const emailExists = await CustomerModel.findOne({ email: email.toLowerCase(), deleted: false });
        if (emailExists) {
            return reject(new ApiErrorUtility({ message: `Email ${email} is already registered!` }));
        }

        let profilePictureUrl;
        if (profilePicture) {
            const profilePictureName = `admin-image-${Date.now()}`;
            profilePictureUrl = await ImageUploadService(profilePictureName, profilePicture);
        }

        const customerId = await IdGeneratorService({ type: 'C' });

        const customerObject = new CustomerModel({
            id: customerId,
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
            status,
        });
        await customerObject.save();

        await AddressController.AddressAddController({
            id: customerObject._id,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            country,
            pincode,
            geoLocationCode,
        });

        const customer = await CustomerModel.findById(customerObject._id).select('-password -__v');
        if (!customer) {
            reject(new ApiErrorUtility({ statusCode: 501, message: 'Something went wrong while registering customer' }));
        }

        resolve(new ApiResponseUtility({ message: 'Customer has signed up successfully!', data: customer }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while customer signup', error }));
    }
});

export default CustomerSignup;

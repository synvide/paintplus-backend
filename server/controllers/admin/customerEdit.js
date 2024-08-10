/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ImageUploadService } from '../../services';
import { CustomerModel } from '../../models';

export default ({
    customerId,
    email,
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
        const customerExists = await CustomerModel.findOne({ _id: customerId });
        if (!customerExists) {
            reject(new ApiErrorUtility({ message: 'Customer not found' }));
        }

        let imageUrl;
        if (profilePicture) {
            const imageName = `customer-image-${Date.now()}`;
            imageUrl = await ImageUploadService(imageName, profilePicture);
        }

        const updatedCustomer = await CustomerModel.findOneAndUpdate(
            {
                _id: customerId,
            },
            {
                email,
                firstName,
                lastName,
                profilePicture: imageUrl,
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

        if (!updatedCustomer) {
            return reject(new ApiErrorUtility({ statusCode: 501, message: 'Customer not found.' }));
        }

        resolve(new ApiResponseUtility({ message: 'Customer updated successfully!' }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while updating customer', error }));
    }
});

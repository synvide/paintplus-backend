/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { AddressModel } from '../../models';

const AddAdress = ({
    id,
    addressLine1,
    addressLine2 = '',
    landmark,
    city,
    state,
    country,
    pincode,
    geoLocationCode,
}) => new Promise(async (resolve, reject) => {
    try {
        const addressExists = await AddressModel.findOne({
            customerRef: id,
        });

        const address = await new AddressModel({
            customerRef: id,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            country,
            pincode,
            isDefault: !addressExists,
            geoLocationCode,
        }).save();

        if (!address) {
            reject(new ApiErrorUtility({ statusCode: 501, message: 'Something went wrong while adding address' }));
        }

        resolve(new ApiResponseUtility({ message: 'Address added successfully!', data: address }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while adding address', error }));
    }
});

export default AddAdress;

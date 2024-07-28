/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { AddressModel } from '../../models';

const UpdateAddress = ({
    id,
    addressId,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    country,
    pincode,
    geoLocationCode,
    setDefault,
}) => new Promise(async (resolve, reject) => {
    try {
        if (setDefault) {
            await AddressModel.updateMany({
                customerRef: id,
                deleted: false,
            }, {
                $set: {
                    isDefault: false,
                },
            });
        }

        const updatedAddress = await AddressModel.findOneAndUpdate({
            _id: addressId,
            customerRef: id,
            deleted: false,
        }, {
            $set: {
                addressLine1,
                addressLine2,
                landmark,
                city,
                state,
                country,
                pincode,
                geoLocationCode,
                isDefault: setDefault,
            },
        });

        if (!updatedAddress) {
            reject(new ApiErrorUtility({ statusCode: 501, message: 'Address not found.' }));
        }

        resolve(new ApiResponseUtility({ message: 'Address updated successfully.', data: updatedAddress }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while updating address.', error }));
    }
});

export default UpdateAddress;

/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { ServiceLocationModel } from '../../models';

const AddServiceLocation = ({
    id,
    pincode,
}) => new Promise(async (resolve, reject) => {
    try {
        const serviceLocation = await new ServiceLocationModel({
            dealerRef: id,
            pincode,
        }).save();

        resolve(new ApiResponseUtility({ message: 'Service location added successfully.', data: serviceLocation }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while adding service location.', error }));
    }
});

export default AddServiceLocation;

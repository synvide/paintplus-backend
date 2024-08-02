/* eslint-disable no-promise-executor-return */
/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import bcrypt from 'bcrypt';
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { CustomerModel } from '../../models';

const CustomerUpdate = ({
    id, phoneNumber, password, gender,
}) => new Promise(async (resolve, reject) => {
    try {
        const customerExists = await CustomerModel.findOne({ _id: id });
        if (!customerExists) {
            return reject(new ApiErrorUtility({ message: 'Account not found' }));
        }

        const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, {
            phoneNumber,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            gender,
        });

        return resolve(new ApiResponseUtility({
            message: 'Customer profile updated successfully',
            data: updatedCustomer,
        }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while updating customer profile.', error }));
    }
});

export default CustomerUpdate;
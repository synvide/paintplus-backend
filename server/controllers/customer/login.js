/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { CustomerModel } from '../../models';

const CustomerLogin = ({
    email, password,
}) => new Promise(async (resolve, reject) => {
    try {
        const customerExists = await CustomerModel.findOne({ email: email.toLowerCase() });
        if (!customerExists) {
            reject(new ApiErrorUtility({ message: 'Account not found' }));
        }
        const passwordMatch = await customerExists.isPasswordCorrect(password);
        if (!passwordMatch) {
            reject(new ApiErrorUtility({ message: 'Incorrect password' }));
        }

        resolve(new ApiResponseUtility({
            message: 'Customer logged in successfully',
            data: {
                accessToken: await customerExists.generateAccessToken(),
                admin: {
                    email: customerExists.email,
                    createdAt: customerExists.createdAt,
                },
            },
        }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while customer login', error }));
    }
});

export default CustomerLogin;

// /* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { AdminModel } from '../../models';
import { SECRET_STRING } from '../../constants';

const AdminSignup = ({
    email, password, secretKey,
}) => new Promise(async (resolve, reject) => {
    try {
        if (!(email && password && secretKey)) {
            reject(new ApiErrorUtility({ message: 'Missing Property either email or password or secretKey!' }));
        }

        const emailExists = await AdminModel.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            reject(new ApiErrorUtility({ message: `Email ${email} is already registered!` }));
        }

        if (secretKey !== SECRET_STRING) {
            reject(new ApiErrorUtility({ message: 'Invalid Authorization' }));
        }

        const admin = new AdminModel({
            email,
            password,
        });
        await admin.save();

        resolve(new ApiResponseUtility({ message: 'Admin has signed up successfully!' }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Invalid Authorization', error }));
    }
});

export default AdminSignup;

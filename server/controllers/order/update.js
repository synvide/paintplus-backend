/* eslint-disable no-promise-executor-return */
/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import {
    AdminModel, DealerModel, SubOrderModel, OrderActivityModel,
} from '../../models';
import { USER_TYPE } from '../../constants';

export default ({
    id,
    subOrderId,
    dealerRef,
    shippingDate,
    status,
    notes,
}) => new Promise(async (resolve, reject) => {
    try {
        const subOrder = await SubOrderModel.findOne({
            _id: subOrderId,
        });
        if (!subOrder) {
            return reject(new ApiErrorUtility({ message: 'Order not found' }));
        }

        const { email } = await AdminModel.findById(id) || await DealerModel.findById(id);
        const userType = email === 'admin@paintplus.com' ? USER_TYPE.ADMIN : USER_TYPE.DEALER;

        if (dealerRef) {
            const dealer = await DealerModel.findOne({
                _id: dealerRef,
                deleted: false,
            });
            if (!dealer) {
                return reject(new ApiErrorUtility({ message: 'Dealer not found' }));
            }
        }

        const updatedOrder = await SubOrderModel.findByIdAndUpdate(subOrderId, {
            $set: {
                dealerRef,
                shippingDate,
                status,
            },
        });

        if (!updatedOrder) {
            return reject(new ApiErrorUtility({ message: 'Order not updated' }));
        }
        if (status) {
            await OrderActivityModel.create({
                subOrderRef: subOrderId,
                userType,
                status,
                notes,
            });
        }

        resolve(new ApiResponseUtility({
            message: 'Order updated successfully.',
        }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while updating the order.', error }));
    }
});

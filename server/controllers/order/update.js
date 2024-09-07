/* eslint-disable no-promise-executor-return */
/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { SubOrderModel, DealerModel } from '../../models';

export default ({
    subOrderId,
    dealerRef,
    shippingDate,
    status,
}) => new Promise(async (resolve, reject) => {
    try {
        const subOrder = await SubOrderModel.findOne({
            _id: subOrderId,
        });
        if (!subOrder) {
            return reject(new ApiErrorUtility({ message: 'Order not found' }));
        }

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
            reject(new ApiErrorUtility({ message: 'Order not updated' }));
        }

        resolve(new ApiResponseUtility({
            message: 'Order updated successfully.',
        }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while updating the order.', error }));
    }
});

/* eslint-disable consistent-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable import/named */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { SubOrderModel } from '../../models';

export default ({
    subOrderId,
}) => new Promise(async (resolve, reject) => {
    try {
        const subOrder = await SubOrderModel.findOne({
            _id: subOrderId,
        });
        if (!subOrder) {
            reject(new ApiErrorUtility({ message: 'Order not found' }));
        }

        const deletedOrder = await SubOrderModel.findByIdAndUpdate(subOrderId, {
            $set: {
                deleted: true,
            },
        });

        if (!deletedOrder) {
            reject(new ApiErrorUtility({ message: 'Order not deleted' }));
        }

        resolve(new ApiResponseUtility({
            message: 'Order deleted successfully.',
        }));
    } catch (error) {
        reject(new ApiErrorUtility({ message: 'Error while deleting the order.', error }));
    }
});

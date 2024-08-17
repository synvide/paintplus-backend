/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { AddressModel, OrderModel, SubOrderModel } from '../../models';
import { CartDetailController } from '../cart';
import { ORDER_STATUS, ORDER_TYPE } from '../../constants';

export default ({
    id,
}) => new Promise(async (resolve, reject) => {
    try {
        const defaultAddress = await AddressModel.findOne({
            customerRef: id,
            isDefault: true,
        });
        if (!defaultAddress) {
            resolve(new ApiResponseUtility({ message: 'Please select an address.' }));
        }
        const { data: { products } } = await CartDetailController({ id });

        let totalAmount = 0;
        products.forEach((product) => {
            totalAmount += product.sellingPrice * product.quantity;
        });

        const order = await OrderModel.create({
            customerRef: id,
            type: ORDER_TYPE.NORMAL,
            price: totalAmount,
            addressRef: defaultAddress._id,
        });

        products.forEach(async (product) => {
            await SubOrderModel.create({
                orderRef: order._id,
                productRef: product._id,
                dealerRef: product.dealerId,
                quantity: product.quantity,
                price: product.sellingPrice,
                status: ORDER_STATUS.PLACED,
                shippingDate: new Date(),
                tax: 0,
            });
        });

        resolve(new ApiResponseUtility({ message: 'Order placed successfully.', data: order }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while placing order.', error }));
    }
});

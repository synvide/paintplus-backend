/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-async-promise-executor */
import { ApiResponseUtility, ApiErrorUtility } from '../../utility';
import { TransactionModel } from '../../models';
import { TRANSACTION_STATUS } from '../../constants';

export default (body) => new Promise(async (resolve, reject) => {
    try {
        const paymentId = body.payload.payment.entity.id;
        const paymentStatus = body.payload.payment.entity.status;
        const razorpayOrderId = body.payload.payment.entity.order_id;
        const paymentMethod = body.payload.payment.entity.method;
        const { amount } = body.payload.payment.entity;
        const { notes } = body.payload.payment.entity;
        const { fee } = body.payload.payment.entity;
        const { tax } = body.payload.payment.entity;

        const razorpayResponse = {
            paymentId,
            amount,
            paymentMethod,
            paymentStatus,
            razorpayOrderId,
            notes,
            fee,
            tax,
        };

        const transaction = new TransactionModel({
            customerRef: notes.id,
            orderRef: notes.orderId,
            description: body.event === 'payment.captured' ? 'Payment completed' : 'Payment failed',
            amount: Number((amount / 100).toFixed(2)),
            tax: tax ? Number((tax / 100).toFixed(2)) : 0,
            fees: fee ? Number((fee / 100).toFixed(2)) : 0,
            razorpayResponse,
            status: body.event === 'payment.captured' ? TRANSACTION_STATUS.COMPLETED : TRANSACTION_STATUS.FAILED,
        });
        await transaction.save();

        resolve(new ApiResponseUtility({ message: 'Webhook response' }));
    } catch (error) {
        console.log(error);
        reject(new ApiErrorUtility({ message: 'Error while webhook.', error }));
    }
});

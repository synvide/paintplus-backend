import mongoose, { Schema } from 'mongoose';

const subOrderSchema = new Schema(
    {
        orderRef: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        productRef: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        dealerRef: {
            type: Schema.Types.ObjectId,
            ref: 'Dealer',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        },
        shippingDate: {
            type: Date,
            required: true,
        },
        tax: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('SubOrder', subOrderSchema);

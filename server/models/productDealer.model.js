import mongoose, { Schema } from 'mongoose';

const productDealerSchema = new Schema(
    {
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
        units: {
            type: Number,
        },
        availability: {
            type: String,
            enum: ['Y', 'N'],
            default: 'Y',
        },
        status: {
            type: String,
            enum: ['Y', 'N'],
            default: 'Y',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('productDealer', productDealerSchema);

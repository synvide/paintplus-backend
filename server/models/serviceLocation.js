/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';

const serviceLocationSchema = new Schema(
    {
        dealerRef: {
            type: Schema.Types.ObjectId,
            ref: 'Dealer',
        },
        pincode: {
            type: Number,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('serviceLocation', serviceLocationSchema);

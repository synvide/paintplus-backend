/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema(
    {
        customerRef: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },
        addressLine1: {
            type: String,
        },
        addressLine2: {
            type: String,
        },
        landmark: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pincode: {
            type: Number,
        },
        geoLocationCode: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('address', addressSchema);

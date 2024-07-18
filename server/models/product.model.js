import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        sellingPrice: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        markPrice: {
            type: Number,
        },
        offerPercent: {
            type: Number,
        },
        warranty: {
            type: String,
        },
        brand: {
            type: String,
        },
        colour: {
            type: String,
        },
        finishType: {
            type: String,
        },
        size: {
            type: String,
        },
        specialFeature: {
            type: String,
        },
        about: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('product', productSchema);

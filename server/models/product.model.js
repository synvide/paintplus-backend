import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
        },
        shortDescription: {
            type: String,
        },
        longDescription: {
            type: String,
        },
        quantity: {
            type: String,
        },
        group: {
            type: String,
        },
        subGroup: {
            type: String,
        },
        brand: {
            type: String,
        },
        weight: {
            type: Number,
        },
        length: {
            type: Number,
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        manufacturingDate: {
            type: Date,
        },
        expiryDate: {
            type: Date,
        },
        specialFeature: {
            type: String,
        },
        mrp: {
            type: Number,
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
        warranty: {
            type: String,
        },
        colour: {
            type: String,
        },
        finishType: {
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

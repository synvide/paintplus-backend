import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        adminRef: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        productType: {
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
        brandImage: {
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
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        image1: {
            type: String,
        },
        image2: {
            type: String,
        },
        image3: {
            type: String,
        },
        image4: {
            type: String,
        },
        image5: {
            type: String,
        },
        warranty: {
            type: String,
        },
        colour: {
            type: String,
        },
        finishType: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Y', 'N'],
            default: 'Y',
        },
        about: [
            {
                type: String,
            },
        ],
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('product', productSchema);

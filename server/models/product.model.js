import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        adminRef: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
        name: {
            type: String,
            required: true,
            trim: true,
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
        category: {
            type: String,
        },
        subCategory: {
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
        colour: [
            {
                type: String,
            },
        ],
        finishType: {
            type: String,
        },
        status: {
            type: String,
            enum: ['A', 'D'],
            default: 'A',
        },
        about: [
            {
                type: String,
            },
        ],
        isTopDeal: {
            type: Boolean,
            default: false,
        },
        isExpress: {
            type: Boolean,
            default: false,
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

export default mongoose.model('product', productSchema);

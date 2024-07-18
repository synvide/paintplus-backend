import mongoose, { Schema } from 'mongoose';

const productSellerSchema = new Schema(
    {
        productRef: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        sellerRef: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('productSeller', productSellerSchema);

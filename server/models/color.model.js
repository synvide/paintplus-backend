import mongoose, { Schema } from 'mongoose';

const colorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        colorGroupRef: {
            type: Schema.Types.ObjectId,
            ref: 'ColorGroup',
            required: true,
        },
        code: {
            type: Number,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        aed: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('color', colorSchema);

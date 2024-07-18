import mongoose, { Schema } from 'mongoose';

const colorGroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('colorGroup', colorGroupSchema);

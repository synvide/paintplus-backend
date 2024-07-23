/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } from '../constants';

const dealerSchema = new Schema(
    {
        adminRef: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            enum: ['M', 'F', 'O'],
            default: 'M',
        },
        dob: {
            type: Date,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        shopImage: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        alternatePhoneNumber: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        geoLocationCode: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['A', 'D'],
            default: 'A',
        },
        lastLoginTime: {
            type: Date,
            required: true,
            default: new Date(),
        },
    },
    {
        timestamps: true,
    },
);

dealerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

dealerSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

dealerSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: 'dealer',
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        },
    );
};

export default mongoose.model('dealer', dealerSchema);

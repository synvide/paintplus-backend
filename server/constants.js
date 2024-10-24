import { FilterRuleName } from "@aws-sdk/client-s3";

export const {
    NODE_ENV,
    BASE_URL,
    MONGO_CONNECTION_STRING,
    PORT,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY = '40d',
    SECRET_STRING,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
    S3_BUCKET,
    S3_IMAGE_URL,
    RAZORPAY_ID_KEY,
    RAZORPAY_SECRET_KEY,
    GOOGLE_PLACE_API_KEY,
} = process.env;

export const ORDER_STATUS = {
    NEW_ORDER: 1,
    ACCEPTED: 2,
    IN_TRANSIT: 3,
    DELIEVERED: 4,
    CANCELLED: 5,
};

export const ORDER_TYPE = {
    NORMAL: 1,
};

export const USER_TYPE = {
    ADMIN: 1,
    DEALER: 2,
    CUSTOMER: 3,
};

export const TRANSACTION_STATUS = {
    PENDING: 1,
    COMPLETED: 2,
    FAILED: 3,
};

export const ADVISOR_WORK_MODE = {
    PART_TIME: 1,
    FULL_TIME: 2,
};

export const WISHLIST_ACTION = {
    ADD: 1,
    REMOVE: 2,
};

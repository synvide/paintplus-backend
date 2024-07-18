/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const {
    AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET, S3_IMAGE_URL,
} = require('../constants');

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
});

export default async (name, image) => {
    try {
        const buffer = Buffer.from(image.data);

        const uploadParams = {
            Bucket: S3_BUCKET,
            Key: `${name}.jpg`,
            Body: buffer,
            ContentType: 'image/jpg',
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        return `${S3_IMAGE_URL}${name}.jpg`;
    } catch (err) {
        console.log(err);
        return new Error('Error while uploading image');
    }
};

import AWS from 'aws-sdk';
import { dataUrlToBlob } from './dataUrlToBlob';

const s3 = new AWS.S3({
    accessKeyId: process.env.VITE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.VITE_APP_AWS_REGION
});

export async function uploadImageToS3(dataUrl, filename) {
    const blob = dataUrlToBlob(dataUrl);

    const params = {
        Bucket: process.env.VITE_APP_AWS_BUCKET_NAME,
        Key: filename,
        Body: blob,
        ContentType: blob.type,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`Image uploaded successfully at ${data.Location}`);
    } catch (error) {
        console.log(`Failed to upload image to S3: ${error}`);
    }
}
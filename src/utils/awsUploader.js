import AWS from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { dataUrlToBlob } from './dataUrlToBlob';

const s3 = new AWS.S3Client({
    credentials: 
        {
            accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
            region: import.meta.env.VITE_APP_AWS_REGION
        }
});

export async function uploadImageToS3(dataUrl, filename) {
    const blob = dataUrlToBlob(dataUrl);
    const uniqueFilename = `${uuidv4()}-${filename}`;

    const params = {
        Bucket: import.meta.env.VITE_APP_AWS_BUCKET_NAME,
        Key: uniqueFilename,
        Body: blob,
        ContentType: blob.type,
        ACL: 'public-read'
    };

    const command = new AWS.PutObjectCommand(params)

    try {
        const data = await s3.send(command);
        console.log(`Image uploaded successfully at ${data} location - ${data.Location} key - ${data.key}`);
    } catch (error) {
        console.log(`Failed to upload image to S3: ${error}`);
    }
}
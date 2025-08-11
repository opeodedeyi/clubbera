export const getS3ImageUrl = (key: string | undefined): string | undefined => {
    if (!key) return undefined;
    
    const S3_BUCKET_URL = process.env.NEXT_PUBLIC_S3_BUCKET_URL;

    if (key.startsWith('http')) {
        return key;
    }

    return `${S3_BUCKET_URL}/${key}`;
};
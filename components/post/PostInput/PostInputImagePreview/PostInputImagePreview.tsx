import Icon from '@/components/ui/Icon/Icon';
import { UploadedImage } from '@/hooks/usePostInput';
import styles from './PostInputImagePreview.module.css';

interface PostInputImagePreviewProps {
    uploadedImages: UploadedImage[];
    onRemoveImage: (index: number) => void;
}

export default function PostInputImagePreview({
    uploadedImages,
    onRemoveImage
}: PostInputImagePreviewProps) {
    if (uploadedImages.length === 0) return null;

    return (
        <div className={styles.imagePreviewContainer}>
            {uploadedImages.map((image, index) => (
                <div key={index} className={`${styles.imagePreview} ${image.isUploading ? styles.uploading : ''}`}>
                    <img
                        src={image.previewUrl}
                        alt={image.altText}
                        className={styles.previewImage} />
                    {image.isUploading && (
                        <div className={styles.overlay}>
                            <Icon name="loadingEllipsis" color='var(--color-white)' size='md' className={styles.spinner} />
                        </div>
                    )}
                    {!image.isUploading && (
                        <button
                            type="button"
                            className={styles.removeImage}
                            onClick={() => onRemoveImage(index)}>
                            ×
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

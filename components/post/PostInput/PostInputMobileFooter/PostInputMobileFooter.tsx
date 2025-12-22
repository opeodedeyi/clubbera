import Icon from '@/components/ui/Icon/Icon';
import styles from './PostInputMobileFooter.module.css';

interface PostInputMobileFooterProps {
    isPollMode: boolean;
    uploadedImagesCount: number;
    isUploadingImages: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onImageClick: () => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePollMode: () => void;
}

export default function PostInputMobileFooter({
    isPollMode,
    uploadedImagesCount,
    isUploadingImages,
    fileInputRef,
    onImageClick,
    onImageChange,
    onTogglePollMode
}: PostInputMobileFooterProps) {
    return (
        <div className={styles.footer}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={onImageChange} />
            <button
                className={`${styles.formButton} ${uploadedImagesCount > 0 ? styles.imageActive : ''}`}
                onClick={onImageClick}
                disabled={isPollMode || uploadedImagesCount >= 3 || isUploadingImages}>
                <Icon name='image' size='xs' />
                <span>Media</span>
            </button>
            <button
                className={`${styles.formButton} ${isPollMode ? styles.pollActive : ''}`}
                onClick={onTogglePollMode}
                disabled={uploadedImagesCount > 0}>
                <Icon name='poll' size='xs' />
                <span>Poll</span>
            </button>
        </div>
    );
}

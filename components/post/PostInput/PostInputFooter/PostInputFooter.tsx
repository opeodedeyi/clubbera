import Icon from '@/components/ui/Icon/Icon';
import Button from '@/components/ui/Button/Button';
import styles from './PostInputFooter.module.css';

interface PostInputFooterProps {
    isPollMode: boolean;
    uploadedImagesCount: number;
    isUploadingImages: boolean;
    canSubmit: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onImageClick: () => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePollMode: () => void;
    onSubmit: () => void;
}

export default function PostInputFooter({
    isPollMode,
    uploadedImagesCount,
    isUploadingImages,
    canSubmit,
    fileInputRef,
    onImageClick,
    onImageChange,
    onTogglePollMode,
    onSubmit
}: PostInputFooterProps) {
    return (
        <div className={styles.footer}>
            <div className={styles.footerButtons}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={onImageChange} />
                <button
                    className={`${styles.formButtons} ${uploadedImagesCount > 0 ? styles.imageActive : ''}`}
                    onClick={onImageClick}
                    disabled={isPollMode || uploadedImagesCount >= 3 || isUploadingImages}>
                    <Icon name='image' size='xs' />
                    <span>Media</span>
                </button>
                <button
                    className={`${styles.formButtons} ${isPollMode ? styles.pollActive : ''}`}
                    onClick={onTogglePollMode}
                    disabled={uploadedImagesCount > 0}>
                    <Icon name='poll' size='xs' />
                    <span>Poll</span>
                </button>
            </div>

            <Button
                variant='gray'
                size="small"
                onClick={onSubmit}
                disabled={!canSubmit}>
                Post
            </Button>
        </div>
    );
}

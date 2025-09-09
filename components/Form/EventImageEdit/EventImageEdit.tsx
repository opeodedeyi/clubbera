'use client';

import { useRef } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import { IMAGES } from '@/lib/images';
import styles from './EventImageEdit.module.css';

interface EventImageEditProps {
    coverImageValue?: string | null;
    uploadingState: boolean;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const EventImageEdit: React.FC<EventImageEditProps> = ({
    coverImageValue,
    uploadingState,
    onImageChange,
    disabled = false
}) => {
    const coverInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        if (!disabled && !uploadingState) {
            coverInputRef.current?.click();
        }
    };

    const getCoverImageSrc = () => {
        return coverImageValue || IMAGES.pages.communities.cover;
    };

    return (
        <div className={styles.container}>
            <div 
                className={`${styles.coverImageContainer} ${uploadingState ? styles.uploading : ''} ${disabled ? styles.disabled : ''}`}
                onClick={triggerFileInput}>
                <img
                    src={getCoverImageSrc()}
                    alt="Event cover"
                    className={styles.coverImage}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = IMAGES.pages.communities.cover;
                    }} />
                
                {!disabled && (
                    <div className={styles.overlay}>
                        {uploadingState ? (
                            <Icon 
                                name="loadingEllipsis" 
                                color='var(--color-white)' 
                                size='lg' 
                                className={`${styles.spinner} ${styles.coverIcon}`} />
                        ) : (
                            <Icon 
                                name="edit" 
                                color='var(--color-white)' 
                                size='lg' 
                                className={styles.coverIcon} />
                        )}
                    </div>
                )}
            </div>

            <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={onImageChange}
                disabled={disabled}
                style={{ display: 'none' }} />
        </div>
    );
};

export default EventImageEdit;
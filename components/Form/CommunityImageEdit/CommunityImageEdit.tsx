// components/Form/CommunityImageEdit/CommunityImageEdit.tsx
'use client';

import { useRef } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import { IMAGES } from '@/lib/images';
import styles from './CommunityImageEdit.module.css';

interface CommunityImageEditProps {
    profileImageValue?: string | null;
    coverImageValue?: string | null;
    uploadingStates: {
        profile_image: boolean;
        cover_image: boolean;
    };
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>, imageType: 'profile_image' | 'cover_image') => void;
}

const CommunityImageEdit: React.FC<CommunityImageEditProps> = ({
    profileImageValue,
    coverImageValue,
    uploadingStates,
    onImageChange
}) => {
    const coverInputRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
        inputRef.current?.click();
    };

    const getCoverImageSrc = () => {
        return coverImageValue  || IMAGES.pages.communities.cover;
    };

    const getProfileImageSrc = () => {
        return profileImageValue || IMAGES.pages.communities.placeholder;
    };

    return (
        <div className={styles.container}>
            <div 
                className={`${styles.coverImageContainer} ${uploadingStates.cover_image ? styles.uploading : ''}`}
                onClick={() => !uploadingStates.cover_image && triggerFileInput(coverInputRef)} >
                <img 
                    src={getCoverImageSrc()}
                    alt="Community cover"
                    className={styles.coverImage}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = IMAGES.pages.communities.cover;
                    }} />
                
                
                <div className={styles.overlay}>
                    {uploadingStates.cover_image ? (
                        <Icon name="loadingEllipsis" color='var(--color-white)' size='lg' className={`${styles.spinner} ${styles.coverIcon}`} />
                    ): (
                        <Icon name="edit" color='var(--color-white)' size='lg' className={styles.coverIcon} />
                    )}
                </div>
            </div>

            <div 
                className={`${styles.profileImageContainer} ${uploadingStates.profile_image ? styles.uploading : ''}`}
                onClick={() => !uploadingStates.profile_image && triggerFileInput(profileInputRef)}>
                <img 
                    src={getProfileImageSrc()}
                    alt="Community profile"
                    className={styles.profileImage}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = IMAGES.pages.communities.placeholder;
                    }} />
                
                <div className={styles.overlay}>
                    {uploadingStates.profile_image ? (
                        <Icon name="loadingEllipsis" color='var(--color-white)' size='lg' className={styles.spinner} />
                    ) : (
                        <Icon name="edit" color='var(--color-white)' size='lg' />
                    )}
                </div>
            </div>

            <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e, 'cover_image')}
                style={{ display: 'none' }} />
            
            <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e, 'profile_image')}
                style={{ display: 'none' }} />
        </div>
    );
};

export default CommunityImageEdit;
'use client';

import React, { useRef } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import { IMAGES } from '@/lib/images';
import styles from './ProfileImageUpload.module.css';


interface ProfileImageUploadProps {
    currentImage?: string | null;
    onUpload: (file: File) => void;
    disabled?: boolean;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
    currentImage,
    onUpload,
    disabled = false,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    const handleClick = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={styles.profileImageUpload}>
            <div
                className={`${styles.imageContainer} ${disabled ? styles.disabled : ''}`}
                onClick={handleClick} >
                {currentImage ? (
                    <>
                        <img
                            src={currentImage}
                            alt="Profile photo"
                            className={styles.profileImage} />
                        <div className={styles.overlay}>
                            <Icon name="edit" className={styles.uploadIcon} />
                        </div>
                    </>
                ) : (
                    <>
                        <img
                            src={IMAGES.placeholders.avatar}
                            alt="Profile photo placeholder"
                            className={styles.profileImage} />
                        <div className={styles.overlay}>
                            <Icon name="edit" className={styles.uploadIcon} />
                        </div>
                    </>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className={styles.hiddenInput}
                    disabled={disabled} />
            </div>
        </div>
    );
};

export default ProfileImageUpload;
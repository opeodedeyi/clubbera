'use client';

import React, { useRef } from 'react';
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
                            {/* replace with own svg icon */}
                            <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M12 19L8 15H10.5V9H13.5V15H16L12 19Z" />
                            </svg>
                        </div>
                    </>
                ) : (
                    <>
                        <img
                            src={IMAGES.placeholders.avatar}
                            alt="Profile photo placeholder"
                            className={styles.profileImage} />
                        <div className={styles.overlay}>
                            <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M12 19L8 15H10.5V9H13.5V15H16L12 19Z" />
                            </svg>
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
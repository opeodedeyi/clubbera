'use client';

import React, { useRef } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
    label: string;
    description?: string;
    onImageUpload: (file: File) => Promise<boolean>;
    onImageRemove?: () => void;
    currentImage?: string;
    isUploading?: boolean;
    error?: string;
    accept?: string;
    buttonText?: string;
    changeText?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    description,
    onImageUpload,
    onImageRemove,
    currentImage,
    isUploading = false,
    error,
    accept = 'image/*',
    buttonText = 'Select Image',
    changeText = 'Change Image',
    disabled = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await onImageUpload(file);
        }
        // Reset input value so same file can be selected again
        e.target.value = '';
    };

    const openFileDialog = () => {
        if (!disabled && !isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleRemove = () => {
        if (onImageRemove && !disabled && !isUploading) {
            onImageRemove();
        }
    };

    return (
        <div className={styles.container}>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                disabled={disabled} />

            <div className={styles.content}>
                <div className={styles.textContent}>
                    <label>{label}</label>
                    <p className={styles.description}>{description}</p>
                </div>

                {!currentImage ? (
                    <div
                        onClick={openFileDialog}
                        className={styles.selectButton} >
                        {buttonText}
                    </div>
                ) : (
                    <div className={styles.selectedActions}>
                        <button
                            type="button"
                            onClick={openFileDialog}
                            disabled={disabled || isUploading}
                            className={styles.changeButton}>
                            {changeText}
                        </button>
                        
                        {onImageRemove && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={disabled || isUploading}
                                className={styles.deleteButton}
                                aria-label="Remove image">
                                <Icon name="bin" size="sm" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default ImageUpload;
'use client';

import React, { useRef } from 'react';
import Button from '@/components/ui/Button/Button';
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
    maxSize?: number; // in MB
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
    maxSize = 5,
    buttonText = 'Select Image',
    changeText = 'Change Image',
    disabled = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (file: File) => {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`);
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        await onImageUpload(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
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
                disabled={disabled || isUploading} />

            <div className={styles.content}>
                <div className={styles.textContent}>
                    <label>{label}</label>
                    <p className={styles.description}>{description}</p>
                </div>

                {!currentImage ? (
                    <div
                        onClick={openFileDialog}
                        className={styles.selectButton} >
                        {isUploading ? 'Uploading...' : buttonText}
                    </div>
                ) : (
                    // Image selected - show change text and delete icon
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

            {/* Image Preview */}
            {currentImage && (
                <div className={styles.imagePreview}>
                    <img 
                        src={currentImage} 
                        alt="Selected image" 
                        className={styles.previewImage}
                    />
                </div>
            )}

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default ImageUpload;
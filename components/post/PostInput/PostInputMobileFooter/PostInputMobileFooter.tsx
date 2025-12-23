'use client';

import { useEffect, useRef } from 'react';
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
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Enable VirtualKeyboard API for Chromium browsers
        if ('virtualKeyboard' in navigator) {
            const nav = navigator as Navigator & { virtualKeyboard?: { overlaysContent: boolean } };
            if (nav.virtualKeyboard) {
                nav.virtualKeyboard.overlaysContent = true;
            }
        }

        // Visual Viewport API fallback for iOS
        const handleViewportResize = () => {
            if (!footerRef.current) return;

            const visualViewport = window.visualViewport;
            if (visualViewport) {
                const viewportHeight = visualViewport.height;
                const windowHeight = window.innerHeight;
                const keyboardHeight = windowHeight - viewportHeight;

                if (keyboardHeight > 0) {
                    // Keyboard is visible
                    footerRef.current.style.transform = `translateY(-${keyboardHeight}px)`;
                } else {
                    // Keyboard is hidden
                    footerRef.current.style.transform = 'translateY(0)';
                }
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportResize);
            window.visualViewport.addEventListener('scroll', handleViewportResize);
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleViewportResize);
                window.visualViewport.removeEventListener('scroll', handleViewportResize);
            }
        };
    }, []);

    return (
        <div ref={footerRef} className={styles.footer}>
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

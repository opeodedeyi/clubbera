'use client';

import React, { useState } from 'react';
import OverlayPortal from '../OverlayPortal/OverlayPortal';
import CopyInput from '@/components/Form/CopyInput/CopyInput';
import BrandIcon from '../Icon/BrandIcon';
import styles from './ShareModal.module.css';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title?: string;
    type?: string
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title = "Check this out!", type = "link" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const handleShare = (platform: string) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        
        let shareUrl = '';
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
                break;
            case 'x':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'linkedIn':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}`;
                break;
            case 'instagram':
                // Instagram doesn't support URL sharing, so we'll copy to clipboard
                handleCopyLink();
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <OverlayPortal>
            <div className={styles.overlay} onClick={handleOverlayClick}>
                <div className={styles.modal}>

                    <div className={styles.content}>
                        <p className={styles.title}>Share this {type}</p>

                        <CopyInput
                            name="share-link"
                            placeholder="Shareable link"
                            value={url}
                            onChange={() => {}}
                            onClick={handleCopyLink}
                            className={styles.copyInput}
                            isRequired={true}
                            disabled={false}
                            copied={copied}/>
                    </div>

                    <hr className={styles.horizontalLine} />

                    <div className={styles.socialButtons}>
                        <button
                            onClick={() => handleShare('facebook')}
                            className={`${styles.socialButton} ${styles.facebook}`}>
                            <BrandIcon name="facebook" size="lg" color='var(--color-text-light)' />
                            <span>Facebook</span>
                        </button>

                        <button
                            onClick={() => handleShare('x')}
                            className={`${styles.socialButton} ${styles.x}`}>
                            <BrandIcon name="x" size="lg" color='var(--color-text-light)' />
                            <span>X</span>
                        </button>

                        <button
                            onClick={() => handleShare('linkedIn')}
                            className={`${styles.socialButton} ${styles.linkedin}`}>
                            <BrandIcon name="linkedIn" size="lg" color='var(--color-text-light)' />
                            <span>LinkedIn</span>
                        </button>
                    </div>

                </div>
            </div>
        </OverlayPortal>
    );
};

export default ShareModal;
'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon/Icon';
import Button from '@/components/ui/Button/Button';
import OverlayPortal from '@/components/ui/OverlayPortal/OverlayPortal';
import CommunityDropdown from './CommunityDropdown';
import styles from './PostInput.module.css';

interface Community {
    id: string;
    name: string;
}

interface PostInputProps {
    communities: Community[];
    onSubmit: (communityId: string, content: string) => void;
}

export default function PostInput({ communities, onSubmit }: PostInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
        communities[0] || null
    );
    const [content, setContent] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, parseInt(getComputedStyle(textarea).maxHeight));
            textarea.style.height = `${newHeight}px`;
        }
    }, [content]);

    const handleSubmit = () => {
        if (selectedCommunity && content.trim()) {
            onSubmit(selectedCommunity.id, content);
            setContent('');
            setIsOpen(false);
        }
    };

    const handleCancel = () => {
        setContent('');
        setIsOpen(false);
    };

    const handleCommunitySelect = (community: Community) => {
        setSelectedCommunity(community);
        setShowDropdown(false);
    };

    const renderPostForm = (isMobileView: boolean) => (
        <div className={styles.postInputContent}>
            <div className={styles.header}>
                <CommunityDropdown
                    selectedCommunity={selectedCommunity}
                    communities={communities}
                    isOpen={showDropdown}
                    onToggle={() => setShowDropdown(!showDropdown)}
                    onSelect={handleCommunitySelect} />
                {isMobileView && (
                    <button className={styles.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                )}
            </div>

            <textarea
                ref={textareaRef}
                className={styles.textarea}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)} />

            <div className={styles.footer}>
                <Button
                    onClick={handleSubmit}
                    disabled={!content.trim() || !selectedCommunity}>
                    Post
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <button
                className={styles.floatingButton}
                onClick={() => setIsOpen(true)}
                aria-label="Create post">
                <Icon name="tickStylish" size='lg' />
            </button>

            {isOpen ? (
                <OverlayPortal>
                    <div className={styles.overlay} onClick={handleCancel} />
                    <div className={`${styles.postInputContainer} ${styles.open}`}>
                        {renderPostForm(true)}
                    </div>
                </OverlayPortal>
            ) : (
                <div className={styles.postInputContainer}>
                    {renderPostForm(false)}
                </div>
            )}
        </>
    );
}

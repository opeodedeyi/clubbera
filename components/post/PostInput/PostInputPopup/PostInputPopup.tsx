'use client';

import OverlayPortal from '@/components/ui/OverlayPortal/OverlayPortal';
import CommunityDropdown from '../CommunityDropdown/CommunityDropdown';
import PostInputImagePreview from '../PostInputImagePreview/PostInputImagePreview';
import PostInputPollFields from '../PostInputPollFields/PostInputPollFields';
import PostInputFooter from '../PostInputFooter/PostInputFooter';
import { usePostInput, Community, PollData, UploadedImage } from '@/hooks/usePostInput';
import styles from './PostInputPopup.module.css';

interface PostInputPopupProps {
    communities: Community[];
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (communityId: string, content: string, pollData?: PollData, uploadedImages?: UploadedImage[]) => void;
    initialCommunityId?: string;
}

export default function PostInputPopup({ communities, isOpen, onClose, onSubmit, initialCommunityId }: PostInputPopupProps) {
    const {
        selectedCommunity,
        content,
        setContent,
        showDropdown,
        setShowDropdown,
        isPollMode,
        pollQuestion,
        setPollQuestion,
        pollOptions,
        pollDuration,
        setPollDuration,
        uploadedImages,
        isUploadingImages,
        textareaRef,
        fileInputRef,
        handleSubmit: hookHandleSubmit,
        handleCommunitySelect,
        handleAddPollOption,
        handleRemovePollOption,
        handlePollOptionChange,
        togglePollMode,
        handleImageClick,
        handleImageChange,
        handleRemoveImage,
        durationOptions,
        resetForm,
        canSubmit
    } = usePostInput({ communities, onSubmit, initialCommunityId });

    const handleSubmit = () => {
        hookHandleSubmit();
        onClose();
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <OverlayPortal>
            <div className={styles.overlay} onClick={handleCancel} />
            <div className={`${styles.postInputContainer} ${isOpen ? styles.open : ''}`}>
                {/* Mobile header */}
                <div className={styles.mobileHeader}>
                    <button className={styles.mobileCloseButton} onClick={handleCancel}>
                        Cancel
                    </button>
                    <div className={styles.mobilePlaceholder}></div>
                </div>

                <div className={styles.postInputContent}>
                    <div className={styles.header}>
                        <CommunityDropdown
                            selectedCommunity={selectedCommunity}
                            communities={communities}
                            isOpen={showDropdown}
                            onToggle={() => setShowDropdown(!showDropdown)}
                            onSelect={handleCommunitySelect} />
                        <button className={styles.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>

                    <textarea
                        ref={textareaRef}
                        className={styles.textarea}
                        placeholder={isPollMode ? "Add a description for your poll" : "What's on your mind?"}
                        value={content}
                        onChange={(e) => setContent(e.target.value)} />

                    <PostInputImagePreview
                        uploadedImages={uploadedImages}
                        onRemoveImage={handleRemoveImage} />

                    {isPollMode && (
                        <PostInputPollFields
                            pollQuestion={pollQuestion}
                            pollOptions={pollOptions}
                            pollDuration={pollDuration}
                            durationOptions={durationOptions}
                            onQuestionChange={setPollQuestion}
                            onOptionChange={handlePollOptionChange}
                            onAddOption={handleAddPollOption}
                            onRemoveOption={handleRemovePollOption}
                            onDurationChange={setPollDuration} />
                    )}

                    <PostInputFooter
                        isPollMode={isPollMode}
                        uploadedImagesCount={uploadedImages.length}
                        isUploadingImages={isUploadingImages}
                        canSubmit={canSubmit}
                        fileInputRef={fileInputRef}
                        onImageClick={handleImageClick}
                        onImageChange={handleImageChange}
                        onTogglePollMode={togglePollMode}
                        onSubmit={handleSubmit} />
                </div>
            </div>
        </OverlayPortal>
    );
}

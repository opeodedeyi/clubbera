'use client';

import CommunityDropdown from '../CommunityDropdown/CommunityDropdown';
import PostInputImagePreview from '../PostInputImagePreview/PostInputImagePreview';
import PostInputPollFields from '../PostInputPollFields/PostInputPollFields';
import PostInputFooter from '../PostInputFooter/PostInputFooter';
import { usePostInput, Community, PollData, UploadedImage } from '@/hooks/usePostInput';
import styles from './PostInput.module.css';

interface PostInputProps {
    communities: Community[];
    onSubmit: (communityId: string, content: string, pollData?: PollData, uploadedImages?: UploadedImage[]) => void;
    className?: string;
}

export default function PostInput({ communities, onSubmit, className }: PostInputProps) {
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
        handleSubmit,
        handleCommunitySelect,
        handleAddPollOption,
        handleRemovePollOption,
        handlePollOptionChange,
        togglePollMode,
        handleImageClick,
        handleImageChange,
        handleRemoveImage,
        durationOptions,
        canSubmit
    } = usePostInput({ communities, onSubmit });

    return (
        <div className={`${styles.postInputContainer} ${className || ''}`}>
            <div className={styles.postInputContent}>
                <div className={styles.header}>
                    <CommunityDropdown
                        selectedCommunity={selectedCommunity}
                        communities={communities}
                        isOpen={showDropdown}
                        onToggle={() => setShowDropdown(!showDropdown)}
                        onSelect={handleCommunitySelect} />
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
    );
}

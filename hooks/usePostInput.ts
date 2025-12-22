import { useState, useRef, useEffect, useCallback } from 'react';
import { postsApi } from '@/lib/api/posts';

export interface Community {
    id: string;
    name: string;
}

export interface PollOption {
    text: string;
}

export interface PollData {
    question: string;
    options: PollOption[];
    duration: number | null; // in hours
}

export interface UploadedImage {
    provider: string;
    key: string;
    altText: string;
    file: File;
    previewUrl: string;
    isUploading?: boolean;
}

interface UsePostInputProps {
    communities: Community[];
    onSubmit: (communityId: string, content: string, pollData?: PollData, uploadedImages?: UploadedImage[]) => void;
    initialCommunityId?: string;
}

export const usePostInput = ({ communities, onSubmit, initialCommunityId }: UsePostInputProps) => {
    // State
    const initialCommunity = initialCommunityId
        ? communities.find(c => c.id === initialCommunityId) || communities[0]
        : communities[0];

    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
        initialCommunity || null
    );
    const [content, setContent] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPollMode, setIsPollMode] = useState(false);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
    const [pollDuration, setPollDuration] = useState<number | null>(24);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [isUploadingImages, setIsUploadingImages] = useState(false);

    // Refs
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, parseInt(getComputedStyle(textarea).maxHeight));
            textarea.style.height = `${newHeight}px`;
        }
    }, [content]);

    // Reset form
    const resetForm = useCallback(() => {
        setContent('');
        setPollQuestion('');
        setPollOptions(['', '']);
        setPollDuration(24);
        setIsPollMode(false);
        setUploadedImages([]);
        setIsUploadingImages(false);
    }, []);

    // Handle submit
    const handleSubmit = useCallback(() => {
        if (!selectedCommunity) return;

        if (isPollMode) {
            // Validate poll data
            if (!pollQuestion.trim()) return;
            const validOptions = pollOptions.filter(opt => opt.trim());
            if (validOptions.length < 2) return;

            const pollData: PollData = {
                question: pollQuestion,
                options: validOptions.map(text => ({ text })),
                duration: pollDuration
            };

            onSubmit(selectedCommunity.id, content, pollData);
            resetForm();
        } else if (uploadedImages.length > 0) {
            // Submit with uploaded images
            onSubmit(selectedCommunity.id, content, undefined, uploadedImages);
            setContent('');
            setUploadedImages([]);
        } else {
            if (!content.trim()) return;
            onSubmit(selectedCommunity.id, content);
            setContent('');
        }
    }, [selectedCommunity, isPollMode, pollQuestion, pollOptions, pollDuration, content, uploadedImages, onSubmit, resetForm]);

    // Community handlers
    const handleCommunitySelect = useCallback((community: Community) => {
        setSelectedCommunity(community);
        setShowDropdown(false);
    }, []);

    // Poll handlers
    const handleAddPollOption = useCallback(() => {
        setPollOptions([...pollOptions, '']);
    }, [pollOptions]);

    const handleRemovePollOption = useCallback((index: number) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    }, [pollOptions]);

    const handlePollOptionChange = useCallback((index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    }, [pollOptions]);

    const togglePollMode = useCallback(() => {
        setIsPollMode(!isPollMode);
        if (!isPollMode) {
            // Reset poll fields when entering poll mode
            setPollQuestion('');
            setPollOptions(['', '']);
            setPollDuration(24);
            // Clear images when entering poll mode
            setUploadedImages([]);
        }
    }, [isPollMode]);

    // Image handlers
    const handleImageClick = useCallback(() => {
        if (uploadedImages.length < 3 && !isUploadingImages) {
            fileInputRef.current?.click();
        }
    }, [uploadedImages.length, isUploadingImages]);

    const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Clear poll when images are selected
        if (isPollMode) {
            setIsPollMode(false);
            setPollQuestion('');
            setPollOptions(['', '']);
            setPollDuration(24);
        }

        setIsUploadingImages(true);

        const filesToUpload = Array.from(files).slice(0, 3 - uploadedImages.length);

        // Create placeholder images with uploading state
        const placeholderImages: UploadedImage[] = filesToUpload.map(file => ({
            provider: '',
            key: '',
            altText: 'Post image',
            file: file,
            previewUrl: URL.createObjectURL(file),
            isUploading: true
        }));

        // Add placeholders immediately
        setUploadedImages([...uploadedImages, ...placeholderImages]);

        try {
            // Upload each image and update its state
            for (let i = 0; i < filesToUpload.length; i++) {
                const file = filesToUpload[i];
                const placeholderIndex = uploadedImages.length + i;

                try {
                    // Get temp upload URL
                    const uploadUrlResponse = await postsApi.getTempUploadUrl({
                        fileType: file.type,
                        entityType: 'post',
                        imageType: 'content'
                    });

                    // Upload file to the URL
                    await postsApi.uploadFile(uploadUrlResponse.data.uploadUrl, file);

                    // Update the placeholder with actual data
                    setUploadedImages(prev => {
                        const updated = [...prev];
                        updated[placeholderIndex] = {
                            provider: uploadUrlResponse.data.provider || 'aws-s3',
                            key: uploadUrlResponse.data.key,
                            altText: 'Post image',
                            file: file,
                            previewUrl: URL.createObjectURL(file),
                            isUploading: false
                        };
                        return updated;
                    });
                } catch (error) {
                    console.error('Failed to upload image:', error);
                    // Remove the failed placeholder
                    setUploadedImages(prev => prev.filter((_, idx) => idx !== placeholderIndex));
                }
            }
        } finally {
            setIsUploadingImages(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [uploadedImages, isPollMode]);

    const handleRemoveImage = useCallback((index: number) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    }, [uploadedImages]);

    // Poll duration options
    const durationOptions = [
        { label: '24 hours', value: '24' },
        { label: '48 hours', value: '48' },
        { label: '72 hours', value: '72' },
        { label: '1 week', value: '168' }
    ];

    // Validation
    const canSubmit = Boolean(
        !isUploadingImages && selectedCommunity && (
            isPollMode
                ? pollQuestion.trim() && pollOptions.filter(opt => opt.trim()).length >= 2
                : uploadedImages.length > 0 || content.trim()
        )
    );

    return {
        // State
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

        // Refs
        textareaRef,
        fileInputRef,

        // Handlers
        handleSubmit,
        handleCommunitySelect,
        handleAddPollOption,
        handleRemovePollOption,
        handlePollOptionChange,
        togglePollMode,
        handleImageClick,
        handleImageChange,
        handleRemoveImage,
        resetForm,

        // Utils
        durationOptions,
        canSubmit
    };
};

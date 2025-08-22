// hooks/useEditCommunityActions.ts
import { useState, useCallback, useEffect } from 'react';
import { CommunityData, communityApi } from '@/lib/api/communities';
import { processImage, validateImageFile } from '@/lib/imageProcessing';

interface EditCommunityFormData {
    name: string;
    tagline: string;
    description: string;
    guidelines: string;
    is_private: boolean;
    location: {
        name?: string;
        city: string;
        lat: number;
        lng: number;
    };
    tags: string[];
}

export function useEditCommunityActions(initialCommunity: CommunityData) {
    // Defensive initialization with fallbacks
    const initializeFormData = useCallback((community: CommunityData): EditCommunityFormData => {
        return {
            name: community.name || '',
            tagline: community.tagline || '',
            description: community.description || '',
            guidelines: community.guidelines || '',
            is_private: community.isPrivate ?? true,
            location: {
                city: community.location?.name || '',
                lat: community.location?.lat || 0,
                lng: community.location?.lng || 0
            },
            tags: community.tags || []
        };
    }, []);

    // State management
    const [community, setCommunity] = useState(initialCommunity);
    const [formData, setFormData] = useState<EditCommunityFormData>(() => 
        initializeFormData(initialCommunity)
    );
    const [originalFormData, setOriginalFormData] = useState<EditCommunityFormData>(() => 
        initializeFormData(initialCommunity)
    );

    // Loading and error states
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingStates, setUploadingStates] = useState({
        profile_image: false,
        cover_image: false
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isUpdatingTags, setIsUpdatingTags] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Debug log to see the community structure
    useEffect(() => {
        console.log('Community data structure:', {
            name: initialCommunity.name,
            location: initialCommunity.location,
            hasLocation: !!initialCommunity.location,
            locationCity: initialCommunity.location?.name,
            formDataLocation: formData.location
        });
    }, [initialCommunity, formData.location]);

    // Check if form has unsaved changes
    const hasUnsavedChanges = useCallback(() => {
        return JSON.stringify(formData) !== JSON.stringify(originalFormData);
    }, [formData, originalFormData]);

    // Update form data with defensive checks
    const updateFormData = useCallback((data: Partial<EditCommunityFormData>) => {
        setFormData(prev => {
            const updated = { ...prev, ...data };
            
            // Ensure location object is always valid
            if (data.location) {
                updated.location = {
                    city: data.location.city ?? prev.location.city ?? '',
                    lat: data.location.lat ?? prev.location.lat ?? 0,
                    lng: data.location.lng ?? prev.location.lng ?? 0
                };
            }
            
            return updated;
        });
        
        // Clear errors for updated fields
        const updatedFields = Object.keys(data);
        setErrors(prev => {
            const newErrors = { ...prev };
            updatedFields.forEach(field => {
                const nestedFieldPattern = new RegExp(`^${field}\\.|^${field}$`);
                Object.keys(newErrors).forEach(errorKey => {
                    if (nestedFieldPattern.test(errorKey)) {
                        delete newErrors[errorKey];
                    }
                });
            });
            return newErrors;
        });
    }, []);

    // Handle image upload (immediate save)
    const handleImageUpload = async (
        file: File, 
        imageType: 'profile_image' | 'cover_image'
    ): Promise<boolean> => {
        console.log(`🔄 Starting ${imageType} upload for file:`, {
            name: file.name,
            size: file.size,
            type: file.type
        });

        setUploadingStates(prev => ({ ...prev, [imageType]: true }));
        setIsUploading(true);
        
        try {
            // Validate file
            const validationError = validateImageFile(file, imageType === 'profile_image' ? 5 : 10);
            if (validationError) {
                setErrors(prev => ({ ...prev, [imageType]: validationError }));
                return false;
            }

            // Process image
            const processedFile = await processImage(
                file, 
                imageType === 'profile_image' ? 'profile' : 'cover'
            );

            // Get upload URL
            const uploadRequest = {
                fileType: processedFile.type,
                entityType: 'community' as const,
                imageType: imageType === 'profile_image' ? 'profile' as const : 'banner' as const
            };
            
            const response = await communityApi.getTempUploadUrl(uploadRequest);

            // Upload to cloud storage
            await communityApi.uploadFile(response.data.uploadUrl, processedFile);

            // Prepare image data
            const imageData = {
                provider: response.data.provider || 'aws-s3',
                key: response.data.key,
                alt_text: `${community.name} ${imageType === 'profile_image' ? 'profile' : 'cover'} image`
            };
            
            // Save image immediately to backend
            if (imageType === 'profile_image') {
                await communityApi.updateProfileImage(community.id, imageData);
            } else {
                await communityApi.updateCoverImage(community.id, imageData);
            }

            // Update local community state
            setCommunity(prev => ({
                ...prev,
                [imageType === 'profile_image' ? 'profileImage' : 'coverImage']: {
                    id: prev[imageType === 'profile_image' ? 'profileImage' : 'coverImage']?.id || 0,
                    imageType: imageType === 'profile_image' ? 'profile' : 'cover',
                    provider: imageData.provider,
                    key: imageData.key,
                    altText: imageData.alt_text,
                    position: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }));

            // Clear any previous errors
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[imageType];
                return newErrors;
            });

            console.log(`✅ ${imageType} upload successful`);
            return true;

        } catch (error) {
            console.error(`❌ ${imageType} upload failed:`, error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
            setErrors(prev => ({ ...prev, [imageType]: errorMessage }));
            return false;
        } finally {
            setUploadingStates(prev => ({ ...prev, [imageType]: false }));
            setIsUploading(false);
        }
    };

    // Handle tags update (immediate save)
    const handleTagsUpdate = async (newTags: string[]): Promise<boolean> => {
        try {
            setIsUpdatingTags(true);
            
            await communityApi.updateTags(community.id, { tags: newTags });
            
            // Update form data
            setFormData(prev => ({ ...prev, tags: newTags }));
            
            // Update original form data to reflect the saved state
            setOriginalFormData(prev => ({ ...prev, tags: newTags }));
            
            // Update community data
            setCommunity(prev => ({ ...prev, tags: newTags }));
            
            // Clear any previous errors
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.tags;
                return newErrors;
            });
            
            console.log('✅ Tags updated successfully');
            return true;
        } catch (error) {
            console.error('❌ Error updating tags:', error);
            setErrors(prev => ({ 
                ...prev, 
                tags: error instanceof Error ? error.message : 'Failed to update tags' 
            }));
            return false;
        } finally {
            setIsUpdatingTags(false);
        }
    };

    // Validation function with defensive checks
    const validateForm = useCallback((): boolean => {
        const newErrors: Record<string, string> = {};

        // Name validation
        const name = formData.name?.trim() || '';
        if (!name) {
            newErrors.name = 'Community name is required';
        } else if (name.length < 3) {
            newErrors.name = 'Community name must be at least 3 characters';
        } else if (name.length > 50) {
            newErrors.name = 'Community name must be less than 50 characters';
        }
        
        // Tagline validation
        const tagline = formData.tagline?.trim() || '';
        if (!tagline) {
            newErrors.tagline = 'Tagline is required';
        } else if (tagline.length > 150) {
            newErrors.tagline = 'Tagline must be less than 150 characters';
        }
        
        // Description validation
        const description = formData.description?.trim() || '';
        if (!description) {
            newErrors.description = 'Description is required';
        } else if (description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        } else if (description.length > 2000) {
            newErrors.description = 'Description must be less than 2000 characters';
        }

        // Guidelines validation (optional but if provided, should meet requirements)
        const guidelines = formData.guidelines?.trim() || '';
        if (guidelines && guidelines.length > 5000) {
            newErrors.guidelines = 'Guidelines must be less than 5000 characters';
        }

        // Location validation with defensive checks
        const city = formData.location?.city?.trim() || '';
        if (!city) {
            newErrors['location.city'] = 'City is required';
        }

        const lat = formData.location?.lat;
        const lng = formData.location?.lng;
        if (!lat || !lng || lat === 0 || lng === 0) {
            newErrors['location.coordinates'] = 'Valid location coordinates are required';
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Save form changes (batched save for other fields)
    const saveChanges = async (): Promise<boolean> => {
        if (!hasUnsavedChanges()) {
            console.log('No changes to save');
            return true;
        }

        if (!validateForm()) {
            console.log('Form validation failed');
            return false;
        }

        try {
            setIsSaving(true);
            
            // Clear any previous submit errors
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.submit;
                return newErrors;
            });

            const updateData = {
                name: (formData.name || '').trim(),
                tagline: (formData.tagline || '').trim(),
                description: (formData.description || '').trim(),
                guidelines: (formData.guidelines || '').trim(),
                is_private: formData.is_private ?? true,
                location: {
                    city: (formData.location?.city || '').trim(),
                    lat: formData.location?.lat || 0,
                    lng: formData.location?.lng || 0,
                    address: (formData.location?.city || '').trim()
                }
            };

            const response = await communityApi.updateCommunity(community.id, updateData);
            
            // Update states with saved data
            setCommunity(response.data);
            setOriginalFormData({ ...formData });
            return true;

        } catch (error) {
            console.error('❌ Error saving changes:', error);
            setErrors(prev => ({ 
                ...prev,
                submit: error instanceof Error ? error.message : 'Failed to save changes. Please try again.'
            }));
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    // Reset form to original state
    const resetForm = useCallback(() => {
        setFormData({ ...originalFormData });
        setErrors({});
    }, [originalFormData]);

    // Get validation status with defensive checks
    const isFormValid = useCallback(() => {
        const name = formData.name?.trim() || '';
        const tagline = formData.tagline?.trim() || '';
        const description = formData.description?.trim() || '';
        const guidelines = formData.guidelines?.trim() || '';
        
        if (!name || name.length < 3 || name.length > 50) {
            return false;
        }
        if (!tagline || tagline.length > 150) {
            return false;
        }
        if (!description || description.length < 10 || description.length > 2000) {
            return false;
        }
        if (guidelines.length > 5000) {
            return false;
        }
        if (originalFormData.location.city || originalFormData.location.lat || originalFormData.location.lng) {
            const city = formData.location?.city?.trim() || '';
            const lat = formData.location?.lat || 0;
            const lng = formData.location?.lng || 0;
            
            if (!city || !lat || !lng) {
                return false;
            }
        }
        
        return true;
    }, [formData, originalFormData]);

    // Effect to handle browser beforeunload warning
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    return {
        // Data
        community,
        formData,
        originalFormData,
        
        // States
        isUploading,
        uploadingStates,
        isSaving,
        isUpdatingTags,
        errors,
        
        // Computed properties
        hasUnsavedChanges: hasUnsavedChanges(),
        isFormValid: isFormValid(),
        
        // Actions
        updateFormData,
        handleImageUpload,
        handleTagsUpdate,
        saveChanges,
        resetForm,
        validateForm,
        
        // Utilities
        clearError: (field: string) => {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        },
        clearAllErrors: () => setErrors({})
    };
}
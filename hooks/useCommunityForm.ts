'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommunityFormData, UploadUrlResponse } from '@/types/community';
import { communityApi, CreateCommunityRequest } from '@/lib/api/communities';
import { processImage, validateImageFile } from '@/lib/imageProcessing';


const initialFormData: CommunityFormData = {
    name: '',
    description: '',
    tagline: '',
    is_private: true,
    location: {
        city: '',
        lat: null,
        lng: null,
    },
    tags: [],
    profile_image: {
        provider: null,
        key: null,
        alt_text: null
    },
    cover_image: {
        provider: null,
        key: null,
        alt_text: null
    }
}

export function useCommunityForm() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<CommunityFormData>(initialFormData)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isUploading, setIsUploading] = useState(false)
    const [uploadingStates, setUploadingStates] = useState({
        profile_image: false,
        cover_image: false
    })

    const updateFormData = (data: Partial<CommunityFormData>) => {
        setFormData(prev => ({ ...prev, ...data }))
        const updatedFields = Object.keys(data)
        setErrors(prev => {
            const newErrors = { ...prev }
            updatedFields.forEach(field => delete newErrors[field])
            return newErrors
        })
    }

    // Handle image upload (profile or banner)
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
            const validationError = validateImageFile(file, imageType === 'profile_image' ? 5 : 10);
            if (validationError) {
                setErrors(prev => ({ ...prev, [imageType]: validationError }));
                setIsUploading(false);
                return false;
            }

            const processedFile = await processImage(
                file, 
                imageType === 'profile_image' ? 'profile' : 'cover'
            );

            const uploadRequest = {
                fileType: processedFile.type,
                entityType: 'community' as const,
                imageType: imageType === 'profile_image' ? 'profile' as const : 'banner' as const
            };
            
            const response = await communityApi.getTempUploadUrl(uploadRequest);

            await communityApi.uploadFile(response.data.uploadUrl, processedFile);

            const imageData = {
                provider: response.data.provider || 'aws-s3',
                key: response.data.key,
                alt_text: `${formData.name || 'Community'} ${imageType === 'profile_image' ? 'profile' : 'cover'} image`
            };
            
            updateFormData({
                [imageType]: imageData
            });

            setUploadingStates(prev => ({ ...prev, [imageType]: false }));
            setIsUploading(false);
            return true;
        } catch (error) {
            console.error(`❌ ${imageType} upload failed:`, error);

            setUploadingStates(prev => ({ ...prev, [imageType]: false }));
            setIsUploading(false);

            const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
            setErrors(prev => ({
                ...prev, 
                [imageType]: errorMessage
            }));
            return false;
        }
    }

    const nextStep = () => {
        if (validateCurrentStep()) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const previousStep = () => {
        if (currentStep > 0 && currentStep < 5) {
            setCurrentStep(prev => Math.max(0, prev - 1))
        } else {
            if (window.history.length > 1) {
                router.back()
            } else {
                router.push('/')
            }
        }
    }

    const goToStep = (step: number) => {
        setCurrentStep(step)
    }

    const validateCurrentStep = (): boolean => {
        const newErrors: Record<string, string> = {}

        switch (currentStep) {
        case 0:
            break
        
        case 1:
            if (!formData.location.city.trim()) {
                newErrors['location.city'] = 'City is required'
            }
            if (formData.location.lat === undefined || formData.location.lng === undefined) {
                newErrors['location.coordinates'] = 'Please select a valid city from the suggestions'
            }
            break
        
        case 2:
            if (!formData.name.trim()) {
                newErrors.name = 'Community name is required'
            } else if (formData.name.trim().length < 3) {
                newErrors.name = 'Community name must be at least 3 characters'
            } else if (formData.name.trim().length > 50) {
                newErrors.name = 'Community name must be less than 50 characters'
            }
            
            if (!formData.tagline.trim()) {
                newErrors.tagline = 'Tagline is required'
            } else if (formData.tagline.trim().length > 150) {
                newErrors.tagline = 'Tagline must be less than 150 characters'
            }
            
            if (!formData.description.trim()) {
                newErrors.description = 'Description is required'
            } else if (formData.description.trim().length < 10) {
                newErrors.description = 'Description must be at least 10 characters'
            }
            break
        
        case 3:
            break
        
        case 4:
            break
            
        case 5:
            break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const submitForm = async (): Promise<boolean> => {
        try {
            // Validate required location data
            if (!formData.location.lat || !formData.location.lng) {
                setErrors({ location: 'Valid location coordinates are required' });
                return false;
            }

            // Prepare final data for submission
            const submitData: CreateCommunityRequest = {
                name: formData.name.trim(),
                tagline: formData.tagline.trim(),
                description: formData.description.trim(),
                is_private: formData.is_private,
                location: {
                    city: formData.location.city.trim(),
                    lat: formData.location.lat,
                    lng: formData.location.lng
                },
                tags: formData.tags,
                ...(formData.profile_image?.key && {
                    profile_image: {
                        provider: formData.profile_image.provider || 'aws-s3',
                        key: formData.profile_image.key,
                        alt_text: formData.profile_image.alt_text || `${formData.name} profile image`
                    }
                }),
                ...(formData.cover_image?.key && {
                    cover_image: {
                        provider: formData.cover_image.provider || 'aws-s3',
                        key: formData.cover_image.key,
                        alt_text: formData.cover_image.alt_text || `${formData.name} cover image`
                    }
                })
            };

            const response = await communityApi.createCommunity(submitData);
            router.push(`/community/${response.data.unique_url}`);
            return true;
        } catch (error) {
            console.error('Error creating community:', error);
            setErrors({ 
                submit: error instanceof Error ? error.message : 'Failed to create community. Please try again.'
            });
            return false;
        }
    }

    return {
        currentStep,
        formData,
        errors,
        isUploading,
        updateFormData,
        handleImageUpload,
        nextStep,
        previousStep,
        goToStep,
        validateCurrentStep,
        submitForm,
        isValid: Object.keys(errors).length === 0
    }
}

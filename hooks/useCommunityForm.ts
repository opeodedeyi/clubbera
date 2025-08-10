'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommunityFormData, UploadUrlResponse } from '@/types/community';


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

    const updateFormData = (data: Partial<CommunityFormData>) => {
        setFormData(prev => ({ ...prev, ...data }))
        // Clear errors for updated fields
        const updatedFields = Object.keys(data)
        setErrors(prev => {
            const newErrors = { ...prev }
            updatedFields.forEach(field => delete newErrors[field])
            return newErrors
        })
    }

    const getUploadUrl = async (fileName: string, fileType: string): Promise<UploadUrlResponse> => {
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/upload/get-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, fileType })
          })
          
          if (!response.ok) throw new Error('Failed to get upload URL')
          
          return await response.json()
        } catch (error) {
          console.error('Error getting upload URL:', error)
          throw error
        }
    }

    // Upload file to the provided URL
    const uploadFileToUrl = async (file: File, uploadUrl: string): Promise<void> => {
        try {
            const response = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            })
            
            if (!response.ok) throw new Error('Failed to upload file')
        } catch (error) {
            console.error('Error uploading file:', error)
            throw error
        }
    }

    // Handle image upload (profile or banner)
    const handleImageUpload = async (
        file: File, 
        imageType: 'profile_image' | 'cover_image'
    ): Promise<boolean> => {
        setIsUploading(true)
        
        try {
            // Get upload URL
            const { uploadUrl, fileUrl } = await getUploadUrl(file.name, file.type)
            
            // Upload file
            await uploadFileToUrl(file, uploadUrl)
            
            // Update form data
            updateFormData({
                [imageType]: fileUrl,
            })
            
            setIsUploading(false)
            return true
        } catch (error) {
            setIsUploading(false)
            setErrors(prev => ({ ...prev, [imageType]: 'Failed to upload image' }))
            return false
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
        case 0: // Introduction - no validation needed
            break
        
        case 1: // Location
            if (!formData.location.city.trim()) {
                newErrors['location.city'] = 'City is required'
            }
            break
        
        case 2: // Name & Description
            if (!formData.name.trim()) {
                newErrors.name = 'Community name is required'
            }
            if (!formData.tagline.trim()) {
                newErrors.tagline = 'Tagline is required'
            }
            if (!formData.description.trim()) {
                newErrors.description = 'Description is required'
            }
            break
        
        case 3: // Images & Tags - optional, so always valid
            break
        
        case 4: // Privacy - always valid (has default)
            break
            
        case 5: // Preview - always valid
            break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const submitForm = async (): Promise<boolean> => {
        try {
            // Prepare final data for submission
            const submitData = {
                name: formData.name,
                description: formData.description,
                location: formData.location,
                profile_image: formData.profile_image,
                cover_image: formData.cover_image,
                tags: formData.tags,
                is_private: formData.is_private
            }
    
            // TODO: Replace with actual API call
            console.log('Submitting community:', submitData)
            
            return true
        } catch (error) {
            console.error('Error creating community:', error)
            return false
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

import { useAuth } from '@/hooks/useAuth';
import { useState, useCallback, useMemo } from 'react';
import { usersApi, type UpdateProfileRequest } from '@/lib/api/users';

interface AccountFormData {
    fullName: string
    email: string
    bio: string
    gender: 'male' | 'female' | 'other'
    birthday: string
    city: string
    lat: number
    lng: number
    interests: string[]
}

interface UseAccountManagerReturn {
    formData: AccountFormData
    isLoading: boolean
    error: string | null
    success: boolean
    profileImage: string | null
    bannerImage: string | null
    hasPersonalDetailsChanged: boolean
    handleInputChange: (name: keyof AccountFormData, value: string | string[]) => void
    handleSubmit: () => Promise<void>
    handleInterestsUpdate: (interests: string[]) => Promise<void>
    handleImageUpload: (file: File, imageType: 'profile' | 'banner') => Promise<void>
    handleDeactivateAccount: () => Promise<void>
    clearMessages: () => void
}

interface InitialUserData {
    fullName?: string
    email?: string
    bio?: string
    gender?: 'male' | 'female' | 'other'
    birthday?: string
    location?: {
        city?: string
        lat?: number
        lng?: number
    }
    interests?: string[]
    profileImage?: {
        url: string
    }
    bannerImage?: {
        url: string
    }
}

export const useAccountManager = (initialData: InitialUserData): UseAccountManagerReturn => {
    const { updateUser } = useAuth()
    
    const [formData, setFormData] = useState<AccountFormData>({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        bio: initialData.bio || '',
        gender: initialData.gender || 'other',
        birthday: initialData.birthday || '',
        city: initialData.location?.city || '',
        lat: initialData.location?.lat || 0,
        lng: initialData.location?.lng || 0,
        interests: initialData.interests || []
    })

    // Store initial data for comparison
    const [initialFormData, setInitialFormData] = useState<AccountFormData>({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        bio: initialData.bio || '',
        gender: initialData.gender || 'other',
        birthday: initialData.birthday || '',
        city: initialData.location?.city || '',
        lat: initialData.location?.lat || 0,
        lng: initialData.location?.lng || 0,
        interests: initialData.interests || []
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [profileImage, setProfileImage] = useState<string | null>(
        initialData.profileImage?.url || null
    )
    const [bannerImage, setBannerImage] = useState<string | null>(
        initialData.bannerImage?.url || null
    )

    const hasPersonalDetailsChanged = useMemo(() => {
        return (
            formData.fullName !== initialFormData.fullName ||
            formData.gender !== initialFormData.gender ||
            formData.bio !== initialFormData.bio ||
            formData.city !== initialFormData.city ||
            formData.birthday !== initialFormData.birthday
        )
    }, [formData, initialFormData])

    const handleInputChange = useCallback((name: keyof AccountFormData, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        clearMessages()
    }, [])

    const clearMessages = useCallback(() => {
        setError(null)
        setSuccess(false)
    }, [])

    const handleSubmit = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const updateData: UpdateProfileRequest = {
                fullName: formData.fullName,
                bio: formData.bio,
                gender: formData.gender,
                location: formData.city ? {
                    city: formData.city,
                    lat: formData.lat,
                    lng: formData.lng
                } : null
            }

            if (formData.birthday && formData.birthday.trim() !== '') {
                updateData.birthday = formData.birthday
            }

            const response = await usersApi.updateProfile(updateData)
            
            if (response.status === 'success') {
                setSuccess(true)

                setInitialFormData(prev => ({
                    ...prev,
                    fullName: formData.fullName,
                    bio: formData.bio,
                    gender: formData.gender,
                    city: formData.city,
                    birthday: formData.birthday // Update this too
                }))

                updateUser(response.data)
            } else {
                setError('Failed to update profile')
            }
        } catch (err: unknown) {
            console.error('Profile update error:', err)
            
            const errorMessage = err instanceof Error ? err.message : 'Failed to update profile'
            
            if (errorMessage.includes('API Error: 400')) {
                setError('Invalid information provided. Please check your details.')
            } else if (errorMessage.includes('API Error: 422')) {
                setError('Email already exists or invalid data format.')
            } else if (errorMessage.includes('Failed to fetch')) {
                setError('Network error. Please check your connection.')
            } else {
                setError(errorMessage)
            }
        } finally {
            setIsLoading(false)
        }
    }, [formData, updateUser])

    const handleInterestsUpdate = useCallback(async (interests: string[]) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await usersApi.updateInterests({ interests })
            
            if (response.status === 'success') {
                setFormData(prev => ({ ...prev, interests }))
                setSuccess(true)
                updateUser(response.data)
            } else {
                setError('Failed to update interests')
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update interests'
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }, [updateUser])

    const handleImageUpload = useCallback(async (file: File, imageType: 'profile' | 'banner') => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError(`File type ${file.type} not supported. Please use JPEG, PNG, or WebP.`);
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setError('File too large. Please choose a file smaller than 5MB.');
            return;
        }
        
        setIsLoading(true)
        setError(null)

        try {
            const requestData = {
                fileType: file.type as any,
                imageType
            };
            const uploadResponse = await usersApi.getUploadUrl(requestData)
            const { uploadUrl, key } = uploadResponse.data

            console.log('Uploading to S3 with PUT...');

            // Upload to S3
            const uploadResult = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                }
            })

            console.log('S3 upload result:', uploadResult.status);

            if (!uploadResult.ok) {
                console.error('S3 upload failed:', await uploadResult.text());
                throw new Error('Failed to upload image')
            }

            console.log('Saving image metadata...');

            // Save image metadata
            const saveResponse = await usersApi.saveImage({
                key,
                imageType,
                altText: `${imageType} picture`
            })

            console.log('Save image response:', saveResponse);

            if (saveResponse.status === 'success') {
                const imageUrl = saveResponse.data.image.url

                console.log('Image uploaded successfully:', imageUrl);
                
                if (imageType === 'profile') {
                    setProfileImage(imageUrl)
                } else {
                    setBannerImage(imageUrl)
                }
                
                setSuccess(true)
                updateUser(saveResponse.data.profile)
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload image'
            setError(errorMessage)

            if (errorMessage.includes('API Error: 500')) {
                console.error('Server error - check your API logs');
                setError('Server error occurred. Please try again later.');
            } else {
                setError(errorMessage)
            }
        } finally {
            setIsLoading(false)
        }
    }, [updateUser])

    const handleDeactivateAccount = useCallback(async () => {
        if (!confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await usersApi.deactivateAccount()
            
            if (response.status === 'success') {
                // Logout user and redirect
                window.location.href = '/login?message=Account deactivated successfully'
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate account'
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        formData,
        isLoading,
        error,
        success,
        profileImage,
        bannerImage,
        hasPersonalDetailsChanged,
        handleInputChange,
        handleSubmit,
        handleInterestsUpdate,
        handleImageUpload,
        handleDeactivateAccount,
        clearMessages
    }
}
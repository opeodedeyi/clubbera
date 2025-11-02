export interface CommunityFormData {
    name: string
    description: string
    tagline: string
    is_private: boolean
    location: {
        city: string
        lng: number | undefined
        lat: number | undefined
    }
    tags: string[]
    profile_image?: {
        provider: string | undefined,
        key: string | undefined,
        alt_text: string | undefined
    }
    cover_image?: {
        provider: string | undefined,
        key: string | undefined,
        alt_text: string | undefined
    }
}

export interface FormStep {
    id: number
    navigation: string | undefined
    component: React.ComponentType<StepProps>
}

export interface StepProps {
    navigation: string | undefined
    currentStep: number
    formData: CommunityFormData
    errors: Record<string, string>
    isUploading: boolean
    isSubmitting?: boolean
    updateFormData: (data: Partial<CommunityFormData>) => void
    handleImageUpload: (file: File, imageType: 'profile_image' | 'cover_image') => Promise<boolean>
    nextStep: () => void
    previousStep: () => void
    goToStep: (step: number) => void
    submitForm?: () => Promise<boolean> // For the final step
    isValid: boolean
}

export interface UploadUrlResponse {
    uploadUrl: string
    fileUrl: string
}
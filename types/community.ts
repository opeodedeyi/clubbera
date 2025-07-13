export interface CommunityFormData {
    name: string
    description: string
    is_private: boolean
    location: {
        city: string
        lng: number | null
        lat: number | null
    }
    tags: string[]
    profile_image: string | null
    cover_image: string | null
}

export interface FormStep {
    id: number
    navigation: string | null
    component: React.ComponentType<StepProps>
}

export interface StepProps {
    navigation: string | null
    currentStep: number
    formData: CommunityFormData
    errors: Record<string, string>
    isUploading: boolean
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
import { useState } from 'react';
import { authApi, type SignupRequest } from '@/lib/api/auth';
import { useAuth } from '@/hooks/useAuth';
import { validateDisplayName } from '@/lib/utils/nameValidation';

export interface SignupFormData {
    name: string
    email: string
    password: string
}

export interface UseSignupFormReturn {
    formData: SignupFormData
    isLoading: boolean
    error: string | null
    errors: Record<string, string>
    handleInputChange: (name: keyof SignupFormData, value: string) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
    clearError: () => void
    getFieldError: (field: keyof SignupFormData) => string | undefined
}

export const useSignupForm = (): UseSignupFormReturn => {
    const { login } = useAuth()
    const [formData, setFormData] = useState<SignupFormData>({
        name: '',
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (name: keyof SignupFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError(null)
        // Clear field-specific error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const clearError = () => setError(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Clear previous errors
            setErrors({})
            const validationErrors: Record<string, string> = {}
            
            // Validate the display name
            const nameValidation = validateDisplayName(formData.name)
            if (!nameValidation.isValid) {
                validationErrors.name = nameValidation.error || 'Invalid name'
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!formData.email.trim()) {
                validationErrors.email = 'Email is required'
            } else if (!emailRegex.test(formData.email.trim())) {
                validationErrors.email = 'Please enter a valid email address'
            }

            // Validate password
            if (!formData.password.trim()) {
                validationErrors.password = 'Password is required'
            } else if (formData.password.length < 6) {
                validationErrors.password = 'Password must be at least 6 characters long'
            }

            // If there are validation errors, show them and stop
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors)
                setIsLoading(false)
                return
            }

            // Prepare the request data according to your API structure
            const requestData: SignupRequest = {
                email: formData.email,
                password: formData.password,
                fullName: formData.name,
            }

            const response = await authApi.signup(requestData)

            if (response.status === 'success' && response.data.token) {
                login(response.data.token, response.data.user)
            } else {
                setError('Registration failed. Please try again.')
            }
        } catch (err: unknown) {
            console.error('Signup error:', err)
            
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
            
            if (errorMessage.includes('API Error: 400')) {
                setError('Invalid information provided. Please check your details.')
            } else if (errorMessage.includes('API Error: 409')) {
                setError('An account with this email already exists.')
            } else if (errorMessage.includes('Failed to fetch')) {
                setError('Network error. Please check your connection and try again.')
            } else {
                setError(errorMessage)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getFieldError = (field: keyof SignupFormData) => {
        return errors[field]
    }

    return {
        formData,
        isLoading,
        error,
        errors,
        handleInputChange,
        handleSubmit,
        clearError,
        getFieldError
    }
}
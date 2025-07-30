import { useState } from 'react';
import { authApi, type SignupRequest } from '@/lib/api/auth';
import { useAuth } from '@/hooks/useAuth';

export interface SignupFormData {
    name: string
    email: string
    password: string
}

export interface UseSignupFormReturn {
    formData: SignupFormData
    isLoading: boolean
    error: string | null
    handleInputChange: (name: keyof SignupFormData, value: string) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
    clearError: () => void
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

    const handleInputChange = (name: keyof SignupFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError(null)
    }

    const clearError = () => setError(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
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
        } catch (err: any) {
            console.error('Signup error:', err)
            
            // Handle different types of errors
            if (err.message.includes('API Error: 400')) {
                setError('Invalid information provided. Please check your details.')
            } else if (err.message.includes('API Error: 409')) {
                setError('An account with this email already exists.')
            } else if (err.message.includes('Failed to fetch')) {
                setError('Network error. Please check your connection and try again.')
            } else {
                setError(err.message || 'An unexpected error occurred. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        formData,
        isLoading,
        error,
        handleInputChange,
        handleSubmit,
        clearError
    }
}
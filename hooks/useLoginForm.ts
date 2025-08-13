// hooks/useLoginForm.ts
import { useState } from 'react';
import { authApi, type LoginRequest } from '@/lib/api/auth';
import { useAuth } from '@/hooks/useAuth';

export interface LoginFormData {
    email: string
    password: string
}

export interface UseLoginFormReturn {
    formData: LoginFormData
    isLoading: boolean
    error: string | null
    handleInputChange: (name: keyof LoginFormData, value: string) => void
    handleSubmit: (e: React.FormEvent) => Promise<void>
    clearError: () => void
}

export const useLoginForm = (): UseLoginFormReturn => {
    const { login } = useAuth()
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (name: keyof LoginFormData, value: string) => {
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
            const requestData: LoginRequest = {
                email: formData.email,
                password: formData.password
            }

            const response = await authApi.login(requestData)

            if (response.status === 'success' && response.data.token) {
                login(response.data.token, response.data.user)
            } else {
                setError('Login failed. Please try again.')
            }
        } catch (err: unknown) {
            console.error('Login error:', err)

            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'

            if (errorMessage.includes('API Error: 401')) {
                setError('Invalid email or password.')
            } else if (errorMessage.includes('API Error: 403')) {
                setError('Account not verified. Please check your email.')
            } else if (errorMessage.includes('Failed to fetch')) {
                setError('Network error. Please check your connection and try again.')
            } else {
                setError(errorMessage)
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
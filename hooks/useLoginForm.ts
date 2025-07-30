// hooks/useLoginForm.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    const router = useRouter()
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
        console.log('handleSubmit called', e.type)
        e.preventDefault()
        console.log('preventDefault called')

        setIsLoading(true)
        setError(null)

        try {
            console.log('Making API call...')
            const requestData: LoginRequest = {
                email: formData.email,
                password: formData.password
            }

            const response = await authApi.login(requestData)
            console.log('API response:', response) // Debug log

            if (response.status === 'success' && response.data.token) {
                console.log('Login successful, calling auth context login')
                login(response.data.token, response.data.user)
            } else {
                setError('Login failed. Please try again.')
            }
        } catch (err: any) {
            console.error('Login error:', err)

            if (err.message.includes('API Error: 401')) {
                setError('Invalid email or password.')
            } else if (err.message.includes('API Error: 403')) {
                setError('Account not verified. Please check your email.')
            } else if (err.message.includes('Failed to fetch')) {
                setError('Network error. Please check your connection and try again.')
            } else {
                setError(err.message || 'An unexpected error occurred. Please try again.')
            }
        } finally {
            setIsLoading(false)
            console.log('handleSubmit finished')
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
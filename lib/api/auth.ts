import { api } from '../api';

export interface SignupRequest {
    email: string
    password: string
    fullName: string
    bio?: string
    gender?: 'male' | 'female' | 'other'
    birthday?: string | null
    preferences?: Record<string, unknown>
    location?: {
        city: string
        lat: number | string
        lng: number | string
    } | null
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    status: string
    message: string
    data: {
        user: {
            id: number
            email: string
            fullName: string
            uniqueUrl: string
            isEmailConfirmed: boolean
            role: string
            isActive: boolean
            createdAt: string
            updatedAt: string
            location: any
            profileImage: string | null
            bannerImage: string | null
            interests: any[]
            skills: any[]
        }
        token: string
    }
}

export interface UserProfileResponse {
    status: string
    data: {
        id: number
        fullName: string
        email: string
        bio: string
        gender: string
        birthday: string | null
        preferences: Record<string, any>
        isEmailConfirmed: boolean
        isActive: boolean
        role: string
        images: Array<{
            imageType: string
            provider: string
            key: string
            position: number
        }>
        interests: Array<{
            id: number
            name: string
        }>
        location: {
            lat: number
            lng: number
            address: string
        } | null
    }
}

export interface ApiError {
    status: string
    message: string
}

export const authApi = {
    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/users/create-user', data)
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/users/login', data)
    },

    getUserProfile: async (): Promise<UserProfileResponse> => {
        return api.get<UserProfileResponse>('/users/profile')
    },

    forgotPassword: async (email: string): Promise<{ status: string; message: string }> => {
        return api.post('/users/forgot-password', { email })
    },

    resetPassword: async (token: string, newPassword: string): Promise<{ status: string; message: string }> => {
        return api.post('/users/reset-password', { token, newPassword })
    },

    verifyEmail: async (token: string): Promise<{ status: string; message: string }> => {
        return api.post('/users/verify-email', { token })
    },

    refreshToken: async (): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/refresh-token')
    }
}
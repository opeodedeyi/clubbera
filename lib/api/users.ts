import { api } from '../api';

export interface UserProfileByUrlResponse {
    status: string
    data: {
        id: number
        fullName: string
        uniqueUrl: string
        email?: string
        isEmailConfirmed?: boolean
        birthday?: string
        preferences?: Record<string, unknown>
        role?: string
        isActive?: boolean
        bio: string
        gender: string
        profileImage?: {
            id: number
            key: string
            altText: string
            provider: string
            url: string
        } | null
        bannerImage: {
            id: number
            key: string
            altText: string
            provider: string
            url: string
        } | null
        location?: {
            city?: string
            lat?: number
            lng?: number
            address?: string | null
        } | null
        interests: string[]
        skills: string[]
        dateJoined: string
        isOwner: boolean
        isLoggedIn: boolean
        ownsCommunity: boolean
    }
}

export interface UpdateProfileRequest {
    fullName?: string
    bio?: string
    gender?: 'male' | 'female' | 'other' | 'prefer not to say'
    birthday?: string
    location?: {
        city: string
        lat: number
        lng: number
    } | null
    preferences?: {
        theme?: string
        notifications?: boolean
        [key: string]: unknown
    }
}

export interface UpdateInterestsRequest {
    interests: string[]
}

export interface UploadUrlResponse {
    status: string
    data: {
        uploadUrl: string
        key: string
    }
}

export interface UploadUrlRequest {
    fileType: 'image/jpeg' | 'image/png' | 'image/webp'
    imageType: 'profile' | 'banner'
}

export interface SaveImageRequest {
    key: string
    imageType?: 'profile' | 'banner'
    altText?: string
}

export interface SaveImageResponse {
    status: string
    message: string
    data: {
        image: {
            id: number
            key: string
            url: string
            altText: string
            provider: string
        }
        profile: {
            id: number
            fullName: string
            email: string
            // ... other profile fields you need
        }
    }
}

export interface ApiResponse<T = unknown> {
    status: string
    message: string
    data: T
}

export interface VerifyEmailCodeRequestRequest {
    email: string
}

export interface VerifyEmailCodeRequest {
    email: string
    verificationCode: string
}

export const usersApi = {
    getProfileByUrl: async (uniqueUrl: string): Promise<UserProfileByUrlResponse> => {
        return api.get<UserProfileByUrlResponse>(`/users/profile/${uniqueUrl}`)
    },

    updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse> => {
        return api.put<ApiResponse>('/users/profile', data)
    },

    updateInterests: async (data: UpdateInterestsRequest): Promise<ApiResponse> => {
        return api.put<ApiResponse>('/users/interests', data)
    },

    getUploadUrl: async (data: UploadUrlRequest): Promise<UploadUrlResponse> => {
        return api.post<UploadUrlResponse>('/users/images/upload-url', data)
    },

    saveImage: async (data: SaveImageRequest): Promise<SaveImageResponse> => {
        return api.post<SaveImageResponse>('/users/images/save', data)
    },

    // Account management
    deactivateAccount: async (): Promise<ApiResponse> => {
        return api.put<ApiResponse>('/accounts/deactivate')
    },

    // Email verification
    verifyEmailCodeRequest: async (data: VerifyEmailCodeRequestRequest): Promise<ApiResponse> => {
        return api.post<ApiResponse>('/users/verify-email-code-request', data)
    },

    verifyEmailCode: async (data: VerifyEmailCodeRequest): Promise<ApiResponse> => {
        return api.post<ApiResponse>('/users/verify-email-code', data)
    },
}
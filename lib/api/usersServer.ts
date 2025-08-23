import { serverApi } from '../apiServer'
import type { UserProfileByUrlResponse, VerifyEmailCodeRequestRequest, VerifyEmailCodeRequest, ApiResponse } from './users'


export const usersServerApi = {
    getProfileByUrl: async (uniqueUrl: string): Promise<UserProfileByUrlResponse> => {
        return serverApi.get<UserProfileByUrlResponse>(`/users/profile/${uniqueUrl}`)
    },

    getUserProfile: async (): Promise<UserProfileByUrlResponse> => {
        return serverApi.get<UserProfileByUrlResponse>('/users/profile')
    },

    verifyEmailCodeRequest: async (data: VerifyEmailCodeRequestRequest): Promise<ApiResponse> => {
        return serverApi.post<ApiResponse>('/users/verify-email-code-request', data)
    },

    verifyEmailCode: async (data: VerifyEmailCodeRequest): Promise<ApiResponse> => {
        return serverApi.post<ApiResponse>('/users/verify-email-code', data)
    },
}
import { serverApi } from '../apiServer'
import type { UserProfileByUrlResponse } from './users'


export const usersServerApi = {
    getProfileByUrl: async (uniqueUrl: string): Promise<UserProfileByUrlResponse> => {
        return serverApi.get<UserProfileByUrlResponse>(`/users/profile/${uniqueUrl}`)
    },

    getUserProfile: async (): Promise<UserProfileByUrlResponse> => {
        return serverApi.get<UserProfileByUrlResponse>('/users/profile')
    },
}
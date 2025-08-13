// lib/api/communitiesServer.ts
import { serverApi } from '../apiServer';
import type { 
    CommunityResponse,
    CommunitySearchResponse,
    CommunityPermissionsResponse,
    CommunityMembersResponse,
    JoinRequestsResponse
} from './communities';

export const communityServerApi = {
    // Get community details (server-side)
    getCommunity: async (identifier: string | number): Promise<CommunityResponse> => {
        return serverApi.get<CommunityResponse>(`/communities/${identifier}`);
    },

    // Get community permissions (server-side)
    getCommunityPermissions: async (communityId: number): Promise<CommunityPermissionsResponse> => {
        return serverApi.get<CommunityPermissionsResponse>(`/communities/${communityId}/permissions`);
    },

    // Search communities (server-side)
    searchCommunities: async (
        query: string, 
        limit: number = 20, 
        offset: number = 0
    ): Promise<CommunitySearchResponse> => {
        const params = new URLSearchParams({
            query,
            limit: limit.toString(),
            offset: offset.toString()
        });
        return serverApi.get<CommunitySearchResponse>(`/community-search/search?${params}`);
    },

    // Get community members (server-side)
    getCommunityMembers: async (
        communityId: number,
        limit: number = 20,
        offset: number = 0,
        role?: string
    ): Promise<CommunityMembersResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
            ...(role && { role })
        });
        return serverApi.get<CommunityMembersResponse>(`/communities/${communityId}/members?${params}`);
    },

    // Get join requests (server-side)
    getJoinRequests: async (
        communityId: number,
        limit: number = 20,
        offset: number = 0
    ): Promise<JoinRequestsResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        return serverApi.get<JoinRequestsResponse>(`/communities/${communityId}/join-requests?${params}`);
    }
};
// lib/api/communities.ts
import { api } from '../api';

export interface TempUploadUrlRequest {
    fileType: string;
    entityType: 'community';
    imageType: 'profile' | 'banner';
}

export interface TempUploadUrlResponse {
    status: string;
    data: {
        uploadUrl: string;
        fileUrl: string;
        provider: string;
        key: string;
    };
}

export interface CreateCommunityRequest {
    name: string;
    tagline: string;
    description: string;
    is_private: boolean;
    location: {
        city: string;
        lat: number;
        lng: number;
    };
    tags: string[];
    profile_image?: {
        provider: string;
        key: string;
        alt_text: string;
    };
    cover_image?: {
        provider: string;
        key: string;
        alt_text: string;
    };
}

export interface CommunityImage {
    id: number;
    imageType: string;
    provider: string;
    key: string;
    altText: string | null;
    position: number;
    createdAt: string;
    updatedAt: string;
}

export interface MemberImage {
    provider: string;
    key: string;
    altText: string | null;
}

export interface CommunityLocation {
    id: number;
    city: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CommunitySubscription {
    plan: string;
    status: string;
    isPro: boolean;
}

export interface CommunityMembershipDetails {
    id: number;
    role: string;
    joinedAt: string;
    isActive: boolean;
}

export interface CommunityUserInfo {
    isMember: boolean;
    isAdmin: boolean;
    membershipDetails: CommunityMembershipDetails | null;
    activeRestrictions: unknown | null;
    joinRequestStatus: string | null;
    joinRequestId: number;
    joinRequestDate: string | null;
}

export interface CommunityData {
    id: number;
    name: string;
    unique_url: string;
    uniqueUrl: string;
    tagline: string;
    description: string;
    guidelines: string | null;
    isPrivate: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    profileImage: CommunityImage | null;
    coverImage: CommunityImage | null;
    location: CommunityLocation;
    tags: string[];
    memberCount: number;
    subscription: CommunitySubscription;
    user?: CommunityUserInfo; // Only present when user is authenticated
}

export interface CommunityResponse {
    status: string;
    data: CommunityData;
}

export interface CommunitySearchResult {
    id: number;
    name: string;
    uniqueUrl: string;
    tagline: string;
    isPrivate: boolean;
    profileImage: CommunityImage | null;
    coverImage: CommunityImage | null;
    memberCount: number;
    tags: string[];
    location: CommunityLocation;
    createdAt: string;
}

export interface CommunitySearchResponse {
    status: string;
    data: CommunitySearchResult[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export interface CommunityPermissions {
    isMember: boolean;
    isOwner: boolean;
    isOrganizer: boolean;
    isModerator: boolean;
    isAdmin: boolean;
    role: string;
    canCreateEvents: boolean;
    canEditCommunity: boolean;
    canManageMembers: boolean;
    canViewAnalytics: boolean;
    canManageRoles: boolean;
    canDeleteCommunity: boolean;
    canTransferOwnership: boolean;
    canManageSubscription: boolean;
}

export interface CommunityPermissionsResponse {
    status: string;
    data: CommunityPermissions;
}

export interface CommunityMember {
    id: number;
    uniqueUrl: string;
    fullName: string;
    email: string;
    role: string;
    joinedAt: string;
    isActive: boolean;
    profileImage: MemberImage;
}

export interface CommunityMembersResponse {
    status: string;
    data: CommunityMember[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export interface JoinRequest {
    id: number;
    userId: number;
    communityId: number;
    message: string | null;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        fullName: string;
        email: string;
        profileImage: string | null;
    };
}

export interface JoinRequestsResponse {
    status: string;
    data: JoinRequest[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export interface UpdateCommunityRequest {
    name?: string;
    tagline?: string;
    description?: string;
    guidelines?: string;
    is_private?: boolean;
    location?: {
        city: string;
        lat: number;
        lng: number;
        address: string;
    };
}

export interface UpdateImageRequest {
    provider: string;
    key: string;
    alt_text: string;
}

export interface UpdateTagsRequest {
    tags: string[];
}

export interface UpdateTagsResponse {
    status: string;
    message: string;
    data: {
        tags: string[];
    };
}

export interface JoinCommunityRequest {
    message?: string;
}

export interface RespondToJoinRequest {
    status: 'approved' | 'rejected';
}

export interface ApiSuccessResponse {
    status: string;
    message: string;
}

export const communityApi = {
    getTempUploadUrl: async (data: TempUploadUrlRequest): Promise<TempUploadUrlResponse> => {
        return api.post<TempUploadUrlResponse>('/temp-upload/url', data);
    },

    uploadFile: async (uploadUrl: string, file: File): Promise<void> => {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to upload file');
        }
    },

    createCommunity: async (data: CreateCommunityRequest): Promise<CommunityResponse> => {
        return api.post<CommunityResponse>('/communities', data);
    },

    getCommunity: async (identifier: string | number): Promise<CommunityResponse> => {
        return api.get<CommunityResponse>(`/communities/${identifier}`);
    },

    getCommunityPermissions: async (communityId: number): Promise<CommunityPermissionsResponse> => {
        return api.get<CommunityPermissionsResponse>(`/communities/${communityId}/permissions`);
    },

    searchCommunities: async (
        query: string, 
        limit: number = 20, 
        offset: number = 0,
        lat?: number,
        lng?: number,
        radius?: number
    ): Promise<CommunitySearchResponse> => {
        const params = new URLSearchParams({
            query,
            limit: limit.toString(),
            offset: offset.toString(),
            ...(lat !== undefined && { lat: lat.toString() }),
            ...(lng !== undefined && { lng: lng.toString() }),
            ...(radius !== undefined && { radius: radius.toString() })
        });
        return api.get<CommunitySearchResponse>(`/community-search/search?${params}`);
    },

    updateCommunity: async (
        communityId: number, 
        data: UpdateCommunityRequest
    ): Promise<CommunityResponse> => {
        return api.put<CommunityResponse>(`/communities/${communityId}`, data);
    },

    updateProfileImage: async (
        communityId: number, 
        data: UpdateImageRequest
    ): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/communities/${communityId}/profile-image`, data);
    },

    updateCoverImage: async (
        communityId: number, 
        data: UpdateImageRequest
    ): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/communities/${communityId}/cover-image`, data);
    },

    updateTags: async (
        communityId: number, 
        data: UpdateTagsRequest
    ): Promise<UpdateTagsResponse> => {
        return api.put<UpdateTagsResponse>(`/communities/${communityId}/tags`, data);
    },

    joinCommunity: async (
        communityId: number, 
        data?: JoinCommunityRequest
    ): Promise<ApiSuccessResponse> => {
        return api.post<ApiSuccessResponse>(`/communities/${communityId}/join`, data);
    },

    leaveCommunity: async (communityId: number): Promise<ApiSuccessResponse> => {
        return api.delete<ApiSuccessResponse>(`/communities/${communityId}/members/me`);
    },

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
        return api.get<CommunityMembersResponse>(`/communities/${communityId}/members?${params}`);
    },

    getJoinRequests: async (
        communityId: number,
        limit: number = 20,
        offset: number = 0
    ): Promise<JoinRequestsResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        return api.get<JoinRequestsResponse>(`/communities/${communityId}/join-requests?${params}`);
    },

    respondToJoinRequest: async (
        communityId: number,
        requestId: number,
        data: RespondToJoinRequest
    ): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/communities/${communityId}/join-requests/${requestId}`, data);
    },

    deactivateCommunity: async (communityId: number): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/communities/${communityId}/deactivate`);
    },

    reactivateCommunity: async (communityId: number): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/communities/${communityId}/reactivate`);
    },

    deleteCommunity: async (communityId: number): Promise<ApiSuccessResponse> => {
        return api.delete<ApiSuccessResponse>(`/communities/${communityId}`);
    },

    getUserCommunities: async (
        uniqueIdentifier: string,
        limit: number = 20,
        offset: number = 0
    ): Promise<CommunitySearchResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        return api.get<CommunitySearchResponse>(`/users/${uniqueIdentifier}/communities?${params}`);
    },

    getMyCommunities: async (
        limit: number = 20,
        offset: number = 0
    ): Promise<CommunitySearchResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        return api.get<CommunitySearchResponse>(`/users/my/communities?${params}`);
    },

    getCommunityRecommendations: async (
        limit: number = 20,
        offset: number = 0,
        lat?: number,
        lng?: number
    ): Promise<CommunitySearchResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
            ...(lat !== undefined && { lat: lat.toString() }),
            ...(lng !== undefined && { lng: lng.toString() })
        });
        return api.get<CommunitySearchResponse>(`/recommendations/communities?${params}`);
    }
};
// lib/api/events.ts
import { api } from '../api';

export interface EventImage {
    id: number;
    imageType: string;
    provider: string;
    key: string;
    altText: string | null;
    position: number;
    createdAt: string;
    updatedAt: string;
}

export interface EventLocation {
    id: number;
    city: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEventRequest {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    timezone: string;
    location: {
        city: string;
        name: string;
        lat: number;
        lng: number;
        address: string;
    };
    maxAttendees?: number;
    eventType: string;
    content?: string;
    supportersOnly?: boolean;
    cover_image?: {
        provider: string;
        key: string;
        alt_text: string;
    };
}

export interface UpdateEventRequest {
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    timezone?: string;
    location?: {
        city: string;
        name: string;
        lat: number;
        lng: number;
        address: string;
    };
    maxAttendees?: number;
    locationDetails?: string;
    eventType?: string;
}

export interface EventData {
    id: number;
    title: string;
    description: string;
    uniqueUrl: string;
    startTime: string;
    endTime: string;
    currentAttendees: number;
    hasPassed: boolean;
    isOngoing: boolean;
    createdAt: string;
    coverImage: EventImage | null;
    location: EventLocation;
    community: {
        id: number;
        name: string;
        uniqueUrl: string;
    };
    // Optional fields that might be present in other responses
    timezone?: string;
    eventType?: string;
    content?: string | null;
    locationDetails?: string; // Added to match EventDetails type expectations
    supportersOnly?: boolean;
    maxAttendees?: number | null;
    attendeeCount?: number;
    isActive?: boolean;
    updatedAt?: string;
    creator?: {
        id: number;
        fullName: string;
        uniqueUrl: string;
        profileImage: EventImage | null;
    };
    userAttendance?: {
        isAttending: boolean;
        attendanceStatus: string;
        registeredAt: string | null;
    };
}

export interface EventResponse {
    status: string;
    data: {
        canAccess: boolean;
        event: EventData;
        userContext: {
            attendanceStatus: string;
            membership: {
                role: string;
                is_premium: boolean;
                joined_at: string;
            };
        };
    };
}

export interface EventSearchResult {
    id: number;
    title: string;
    uniqueUrl: string;
    description: string;
    startTime: string;
    endTime: string;
    timezone: string;
    eventType: string;
    attendeeCount: number;
    currentAttendees: number;
    maxAttendees: number | null;
    coverImage: EventImage | null;
    location: EventLocation;
    community: {
        id: number;
        name: string;
        uniqueUrl: string;
        profileImage: EventImage | null;
    };
    createdAt: string;
}

export interface EventSearchResponse {
    status: string;
    data: EventSearchResult[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        page: number;
        hasMore: boolean;
    };
}

export interface CommunityEventsResponse {
    status: string;
    data: {
        events: EventSearchResult[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            page: number;
            hasMore: boolean;
        };
    };
}

export interface EventAttendee {
    id: number;
    fullName: string;
    email: string;
    uniqueUrl: string;
    attendanceStatus: string;
    registeredAt: string;
    profileImage: EventImage | null;
}

export interface EventAttendeesResponse {
    status: string;
    data: EventAttendee[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        page: number;
        hasMore: boolean;
    };
}

export interface JoinEventRequest {
    message?: string;
    status?: 'attending' | 'not_attending' | 'maybe';
}


export interface TempUploadUrlRequest {
    fileType: string;
    entityType: 'event';
    imageType: 'cover';
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

export interface ApiSuccessResponse {
    status: string;
    message: string;
}

export interface EventFilters {
    upcoming?: boolean;
    pastEvents?: boolean;
    startDate?: string;
    endDate?: string;
    timezone?: string;
    eventType?: string;
}

export const eventApi = {
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

    createEvent: async (
        communityId: number, 
        data: CreateEventRequest
    ): Promise<EventResponse> => {
        return api.post<EventResponse>(`/events/communities/${communityId}/events`, data);
    },

    getEvent: async (eventId: number): Promise<EventResponse> => {
        return api.get<EventResponse>(`/events/${eventId}`);
    },

    updateEvent: async (
        eventId: number, 
        data: UpdateEventRequest
    ): Promise<EventResponse> => {
        return api.put<EventResponse>(`/events/${eventId}`, data);
    },

    deleteEvent: async (eventId: number): Promise<ApiSuccessResponse> => {
        return api.delete<ApiSuccessResponse>(`/events/${eventId}`);
    },

    getCommunityEvents: async (
        communityId: number,
        page: number = 1,
        limit: number = 20,
        filters?: EventFilters
    ): Promise<CommunityEventsResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters?.upcoming !== undefined && { upcoming: filters.upcoming.toString() }),
            ...(filters?.pastEvents !== undefined && { pastEvents: filters.pastEvents.toString() }),
            ...(filters?.startDate && { startDate: filters.startDate }),
            ...(filters?.endDate && { endDate: filters.endDate }),
            ...(filters?.timezone && { timezone: filters.timezone }),
            ...(filters?.eventType && { eventType: filters.eventType })
        });
        return api.get<CommunityEventsResponse>(`/events/communities/${communityId}/events?${params}`);
    },

    getMyEvents: async (
        page: number = 1,
        limit: number = 20,
        filters?: EventFilters
    ): Promise<EventSearchResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters?.upcoming !== undefined && { upcoming: filters.upcoming.toString() }),
            ...(filters?.pastEvents !== undefined && { pastEvents: filters.pastEvents.toString() }),
            ...(filters?.startDate && { startDate: filters.startDate }),
            ...(filters?.endDate && { endDate: filters.endDate }),
            ...(filters?.timezone && { timezone: filters.timezone }),
            ...(filters?.eventType && { eventType: filters.eventType })
        });
        return api.get<EventSearchResponse>(`/events/user/my-events?${params}`);
    },

    manageRSVP: async (
        eventId: number, 
        data?: JoinEventRequest
    ): Promise<ApiSuccessResponse> => {
        return api.post<ApiSuccessResponse>(`/events/${eventId}/attendance`, data);
    },


    getEventAttendees: async (
        eventId: number,
        page: number = 1,
        limit: number = 20
    ): Promise<EventAttendeesResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        return api.get<EventAttendeesResponse>(`/events/${eventId}/attendees?${params}`);
    },

    updateCoverImage: async (
        eventId: number,
        data: {
            provider: string;
            key: string;
            alt_text: string;
        }
    ): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/events/${eventId}/cover-image`, data);
    }
};
// lib/api/eventServer.ts
import { serverApi } from '../apiServer';
import type { 
    EventResponse,
    EventSearchResponse,
    EventAttendeesResponse
} from './events';

export const eventServerApi = {
    // Get event by ID (server-side)
    getEvent: async (eventId: number): Promise<EventResponse> => {
        return serverApi.get<EventResponse>(`/events/${eventId}`);
    },

    // Get event by ID (server-side) - alias for consistency with page usage
    getEventById: async (eventId: number): Promise<EventResponse> => {
        return serverApi.get<EventResponse>(`/events/${eventId}`);
    },

    // Get community events (server-side)
    getCommunityEvents: async (
        communityId: number,
        page: number = 1,
        limit: number = 20
    ): Promise<EventSearchResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        return serverApi.get<EventSearchResponse>(`/communities/${communityId}/events?${params}`);
    },

    // Get event attendees (server-side)
    getEventAttendees: async (
        eventId: number,
        page: number = 1,
        limit: number = 20
    ): Promise<EventAttendeesResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        return serverApi.get<EventAttendeesResponse>(`/events/${eventId}/attendees?${params}`);
    }
};

// Export the getEventById function for the page component
export const getEventById = eventServerApi.getEventById;
// lib/api/events.ts
import { EventDetails, RSVPResponse } from '@/types/event'


// Mock data for testing remove
const mockEventData: EventDetails = {
    id: 1,
    uniqueUrl: "test-event-123",
    title: "Test Event",
    description: "Test Description for this amazing event that everyone should attend",
    eventType: "physical",
    startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    endTime: new Date(Date.now() + 90000000).toISOString(),
    timezone: "UTC",
    locationDetails: "Test location details",
    formattedDate: "January 15, 2025",
    formattedTime: "10:00 AM",
    communityName: "Test Community",
    maxAttendees: 50,
    currentAttendees: 10,
    attendeeCount: 10,
    coverImage: {
        id: 1,
        entityType: "event",
        entityId: 1,
        imageType: "cover",
        provider: "s3",
        key: null,
        altText: "Event cover image",
    },
    tags: [
        { id: 1, name: "Music" },
        { id: 2, name: "Live" },
        { id: 3, name: "Entertainment" },
    ],
    startingIn: "1 day",
    isPastEvent: false,
    post: {
        id: 1,
        communityId: 1,
        userId: 1,
        content: "Join us for an amazing event! This will be a great opportunity to meet fellow community members and enjoy some fantastic entertainment. Don't miss out on this incredible experience!",
        isSupportersOnly: false,
    },
    location: {
        id: 1,
        name: "Test Venue",
        locationType: "physical",
        lat: 40.7128,
        lng: -74.006,
        address: "123 Test Street, New York, NY",
    },
    requestedByUserId: 1,
    canManage: true
}

// Additional mock events for different scenarios
const mockEvents: Record<string, EventDetails> = {
    "test-event-123": mockEventData,
    "past-event": {
        ...mockEventData,
        uniqueUrl: "past-event",
        title: "Past Event",
        description: "This event has already ended",
        startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        endTime: new Date(Date.now() - 82800000).toISOString(),
        formattedDate: "January 10, 2025",
        startingIn: "",
        isPastEvent: true,
        canManage: false,
    },
    "no-permission-event": {
        ...mockEventData,
        uniqueUrl: "no-permission-event",
        title: "No Permission Event",
        description: "You can't manage this event",
        canManage: false,
    },
    "full-event": {
        ...mockEventData,
        uniqueUrl: "full-event",
        title: "Full Event",
        description: "This event is at capacity",
        currentAttendees: 50,
        attendeeCount: 50,
    }
}

// Set to true for testing, false when you want to use real API
const USE_MOCK_DATA = true

// Mock user state (you can modify this for testing different scenarios)
let mockUserIsAttending = false
let mockCurrentAttendees = 10


export async function getEventByUrl(url: string): Promise<EventDetails> {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Simulate different responses based on URL
        if (url === "not-found") {
            throw new Error('Event not found')
        }
        
        if (url === "access-denied") {
            throw new Error('Access denied')
        }
        
        const event = mockEvents[url]
        if (!event) {
            // Default to the main test event
            return { ...mockEventData, uniqueUrl: url }
        }
        
        return event
    }
    
    const response = await fetch(`/api/events/${url}`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`, // Your auth implementation
        },
    })

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Event not found')
        }
        if (response.status === 403) {
            throw new Error('Access denied')
        }
        throw new Error('Failed to fetch event')
    }

    return response.json()
}

export async function updateRSVP(eventId: number): Promise<RSVPResponse> {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Toggle user attendance status
        mockUserIsAttending = !mockUserIsAttending
        
        // Update attendee count
        if (mockUserIsAttending) {
            mockCurrentAttendees++
        } else {
            mockCurrentAttendees = Math.max(0, mockCurrentAttendees - 1)
        }
        
        // Simulate occasional errors for testing
        if (Math.random() < 0.1) { // 10% chance of error
            throw new Error('Failed to update RSVP')
        }
        
        return {
            success: true,
            isAttending: mockUserIsAttending,
            attendeeCount: mockCurrentAttendees
        }
    }
    
    const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to update RSVP')
    }

    return response.json()
}

export async function checkManagePermission(eventId: number): Promise<boolean> {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Return different permissions based on event ID for testing
        if (eventId === 999) {
            return false // Test case for no permission
        }
        
        return true // Default to having permission
    }
    
    const response = await fetch(`/api/events/${eventId}/can-manage`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    })

    if (!response.ok) {
        return false
    }

    const { canManage } = await response.json()
    return canManage
}

// Replace with your actual auth token retrieval
function getAuthToken(): string {
    // Implementation depends on your auth system
    return localStorage.getItem('authToken') || ''
}
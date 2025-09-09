export interface EventFormData {
    title: string
    description: string
    eventType: "physical" | "online"
    startTime: string // Local datetime string (not UTC)
    endTime: string   // Local datetime string (not UTC)
    locationDetails: string
    location: {
        name: string
        locationType: string
        lat: number | null
        lng: number | null
        address: string
    }
    coverImageKey: string | null
    coverImageProvider?: string // Added for API integration
    coverImageUrl?: string // Added for preview
    maxAttendees: number
    timezone: string // IANA timezone identifier
    eventDate: string
    startTimeInput: string // HH:MM format for form input
    endTimeInput: string   // HH:MM format for form input
}

export interface EventFormStep {
    id: number
    navigation: string
    component: React.ComponentType<EventStepProps>
}

export interface EventStepProps {
    navigation: string
    formData: EventFormData
    updateFormData: (data: Partial<EventFormData>) => void
    nextStep: () => void
    previousStep: () => void
    isValid: boolean
    errors: Record<string, string>
    handleImageUpload?: (file: File) => Promise<boolean>
    isUploading?: boolean
    submitForm?: () => Promise<boolean>
}

export interface UploadUrlResponse {
    uploadUrl: string
    fileUrl: string
}

export interface EventImage {
    id: number
    entityType: string
    entityId: number
    imageType: string
    provider: string
    key: string
    altText: string
}

export interface EventTag {
    id: number
    name: string
}

export interface EventPost {
    id: number
    communityId: number
    userId: number
    content: string
    isSupportersOnly: boolean
}

export interface EventLocation {
    id: number
    name: string
    locationType: 'physical' | 'virtual'
    lat?: number
    lng?: number
    address?: string
}

export interface EventCommunity {
    id: number
    name: string
    uniqueUrl: string
}

export interface MembershipShort {
    role: string
    is_premium: boolean
    joined_at: string
}

// EventDetails is now just an alias for EventData from the API
// This ensures compatibility between API response and component expectations
export type EventDetails = {
    id: number
    uniqueUrl: string
    title: string
    description: string
    startTime: string
    endTime: string
    timezone?: string // Made optional to match EventData
    eventType?: string // Made optional to match EventData
    attendeeCount?: number // Made optional to match EventData
    maxAttendees?: number | null // Made optional to match EventData
    currentAttendees?: number
    locationDetails?: string
    hasPassed: boolean
    isOngoing: boolean
    createdAt: string
    coverImage: {
        id: number;
        imageType: string;
        provider: string;
        key: string;
        altText: string | null;
        position: number;
        createdAt: string;
        updatedAt: string;
    } | null
    location: {
        id: number;
        city: string;
        name: string;
        lat: number;
        lng: number;
        address: string;
        createdAt: string;
        updatedAt: string;
    }
    community: {
        id: number;
        name: string;
        uniqueUrl: string;
    }
}

export interface RSVPResponse {
    success: boolean
    isAttending: boolean
    attendeeCount: number
}
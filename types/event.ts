export interface EventFormData {
    title: string
    description: string
    eventType: "physical" | "online"
    startTime: string // ISO 8601 date string
    endTime: string   // ISO 8601 date string
    locationDetails: string
    location: {
        name: string
        locationType: string
        lat: number | null
        lng: number | null
        address: string
    }
    coverImageKey: string | null
    maxAttendees: number
    timezone: string
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

export interface EventDetails {
    id: number
    uniqueUrl: string
    title: string
    description: string
    eventType: 'physical' | 'virtual'
    startTime: string
    endTime: string
    timezone: string
    locationDetails?: string
    formattedDate: string
    formattedTime: string
    communityName: string
    maxAttendees: number
    currentAttendees: number
    attendeeCount: number
    coverImage?: EventImage
    tags: EventTag[] | [string]
    startingIn: string
    isPastEvent: boolean
    post?: EventPost
    location?: EventLocation
    requestedByUserId?: number
    canManage: boolean
}

export interface RSVPResponse {
    success: boolean
    isAttending: boolean
    attendeeCount: number
}
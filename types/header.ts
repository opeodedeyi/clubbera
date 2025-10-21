export interface User {
    id: number
    uniqueUrl?: string
    fullName: string
    email: string
    bio?: string
    gender?: string
    birthday?: string | null
    preferences?: Record<string, unknown>
    isEmailConfirmed: boolean
    isActive: boolean
    role?: string
    Image?: Array<{
        imageType: string
        provider: string
        key: string
        position: number
    }>
    profileImage?: {
        id: number
        key: string
        altText: string
        provider: string
        url: string
    } | null
    bannerImage?: {
        id: number
        key: string
        altText: string
        provider: string
        url: string
    } | null
    interests?: string[]
    skills?: string[]
    location?: {
        lat: number
        lng: number
        address: string
    } | null
}

export interface HeaderVariant {
    showSearch?: boolean
    showNotifications?: boolean
    showNavigation?: boolean
    customActions?: React.ReactNode
    className?: string
    communityData?: {
        id: number
        name: string
        uniqueUrl: string
    }
}

export interface HeaderProps {
    variant?: HeaderVariant
    className?: string
}
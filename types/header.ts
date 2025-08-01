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
    images?: Array<{
        imageType: string
        provider: string
        key: string
        position: number
    }>
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
}

export interface HeaderProps {
    variant?: HeaderVariant
    className?: string
}
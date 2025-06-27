export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role?: string
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
'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import type { User } from '@/types/header';


// 🎯 Mock user for development
const MOCK_USER: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/images/temp/profilePlaceholder.png',
    role: 'user'
}

interface AuthContextType {
    user: User | null
    loading: boolean
    mounted: boolean
    login: (token: string, userData: User) => void
    logout: () => void
    updateUser: (userData: Partial<User>) => void
    // 🎯 Development only
    toggleMockAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
        checkAuthStatus()
    }, [])

    useEffect(() => {
        if (!mounted || loading) return

        const protectedPaths = ['/home', '/profile', 'manage/communities', 'manage/appearance', '/community/create']
        const authPaths = ['/join', '/login', '/signup', '/forgot-password', '/resetpassword']
        
        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
        const isAuthPath = authPaths.some(path => pathname.startsWith(path))

        // If user logged out and on protected page → redirect to login
        if (!user && isProtectedPath) {
            router.push('/login')
            return
        }

        // If user logged in and on auth page → redirect to home
        if (user && isAuthPath) {
            router.push('/home')
            return
        }

        // If user logged in and on root → redirect to home
        if (user && pathname === '/') {
            router.push('/home')
            return
        }

    }, [user, pathname, mounted, loading, router])

    const checkAuthStatus = async () => {
        try {
            const token = getCookie('authToken')
            if (!token) {
                setLoading(false)
                return
            }

            // 🎯 In development, just use mock user
            if (process.env.NODE_ENV === 'development') {
                setUser(MOCK_USER)
                setLoading(false)
                return
            }

            // 🎯 In production, this would call the real API
            // const userData = await api.get('/auth/me')
            // setUser(userData)
        } catch (error) {
            deleteCookie('authToken')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = (token: string, userData: User) => {
        // Store in cookies with proper options
        setCookie('authToken', token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            httpOnly: false, // Need access in client-side
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })
        setUser(userData)
    }

    const logout = () => {
        deleteCookie('authToken')
        setUser(null)
    }

    const updateUser = (userData: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null)
    }

    // 🎯 Development only - toggle between logged in/out
    const toggleMockAuth = () => {
        if (process.env.NODE_ENV === 'development') {
            if (user) {
                logout()
            } else {
                login('mock-token', MOCK_USER)
            }
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user,
            loading,
            mounted,
            login,
            logout,
            updateUser,
            toggleMockAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
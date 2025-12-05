'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import type { User } from '@/types/header';


interface AuthContextType {
    user: User | null
    loading: boolean
    mounted: boolean
    showEmailVerification: boolean
    login: (token: string, userData: User) => void
    logout: () => void
    updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)
    const [showEmailVerification, setShowEmailVerification] = useState(false)
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
        const emailVerificationPaths = ['/profile', '/community/create', '/community/', 'manage/communities']
        
        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
        const isAuthPath = authPaths.some(path => pathname.startsWith(path))
        const isEmailVerificationPath = emailVerificationPaths.some(path => pathname.startsWith(path))

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

        // Show email verification modal if user's email is not confirmed on certain pages
        if (user && !user.isEmailConfirmed && isEmailVerificationPath) {
            setShowEmailVerification(true)
        } else {
            setShowEmailVerification(false)
        }

    }, [user, pathname, mounted, loading, router])

    const checkAuthStatus = async () => {
        try {
            const token = getCookie('authToken')
            if (!token) {
                setLoading(false)
                return
            }

            const response = await authApi.getUserProfile()

            console.log('getUserProfile response:', response); // Add this
            console.log('User isEmailConfirmed from profile:', response.data.isEmailConfirmed); // Add this

            if (response.status === 'success') {
                setUser(response.data)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            deleteCookie('authToken')
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = (token: string, userData: User) => {
        console.log('Login called with userData:', userData); // Add this
        console.log('isEmailConfirmed value:', userData.isEmailConfirmed); // Add this

        setCookie('authToken', token, {
            maxAge: 60 * 60 * 24 * 60, // 60 days
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        setUser(userData)
    }

    const logout = () => {
        deleteCookie('authToken')
        setUser(null)
        router.push('/login')
    }

    const updateUser = (userData: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null)
        
        // Close email verification modal if email is now confirmed
        if (userData.isEmailConfirmed === true) {
            setShowEmailVerification(false)
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user,
            loading,
            mounted,
            showEmailVerification,
            login,
            logout,
            updateUser }}>
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
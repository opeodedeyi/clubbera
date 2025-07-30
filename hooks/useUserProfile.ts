import { useState, useEffect } from 'react'
import { usersApi, type UserProfileByUrlResponse } from '@/lib/api/users'

interface UseUserProfileReturn {
    profile: UserProfileByUrlResponse['data'] | null
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export const useUserProfile = (uniqueUrl: string): UseUserProfileReturn => {
    const [profile, setProfile] = useState<UserProfileByUrlResponse['data'] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await usersApi.getProfileByUrl(uniqueUrl)
            
            if (response.status === 'success') {
                setProfile(response.data)
            } else {
                setError('Failed to load profile')
            }
        } catch (err: any) {
            console.error('Profile fetch error:', err)
            
            if (err.message.includes('API Error: 404')) {
                setError('User not found')
            } else if (err.message.includes('Failed to fetch')) {
                setError('Network error. Please check your connection.')
            } else {
                setError('Failed to load profile. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (uniqueUrl) {
            fetchProfile()
        }
    }, [uniqueUrl])

    const refetch = async () => {
        await fetchProfile()
    }

    return {
        profile,
        loading,
        error,
        refetch
    }
}
// lib/api.ts
import { getCookie } from 'cookies-next'

// Define proper types
// interface ApiResponse<T = unknown> {
//     data?: T
//     message?: string
//     error?: string
// }

type RequestData = Record<string, unknown> | FormData | string | null

class ApiClient {
    private getAuthToken(): string | undefined {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
            return undefined
        }
        
        try {
            return getCookie('authToken')?.toString()
        } catch (error) {
            console.warn('Failed to get auth token:', error)
            return undefined
        }
    }

    async request<T = unknown>(
        endpoint: string, 
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.getAuthToken()
        
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config)
        
        if (response.status === 401) {
            // Token invalid - let auth context handle cleanup
            if (typeof window !== 'undefined') {
                window.location.href = '/login'
            }
            throw new Error('Unauthorized')
        }

        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error')
            throw new Error(`API Error: ${response.status} - ${errorText}`)
        }

        // Handle empty responses
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return {} as T
        }

        try {
            return await response.json()
        } catch (error) {
            console.log(error);
            throw new Error('Failed to parse response as JSON')
        }
    }

    get<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint)
    }

    post<T = unknown>(endpoint: string, data?: RequestData): Promise<T> {
        const body = this.prepareBody(data)
        const headers = this.getHeaders(data)
        
        return this.request<T>(endpoint, {
            method: 'POST',
            body,
            headers,
        })
    }

    put<T = unknown>(endpoint: string, data?: RequestData): Promise<T> {
        const body = this.prepareBody(data)
        const headers = this.getHeaders(data)
        
        return this.request<T>(endpoint, {
            method: 'PUT',
            body,
            headers,
        })
    }

    patch<T = unknown>(endpoint: string, data?: RequestData): Promise<T> {
        const body = this.prepareBody(data)
        const headers = this.getHeaders(data)
        
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body,
            headers,
        })
    }

    delete<T = unknown>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    }

    private prepareBody(data?: RequestData): string | FormData | null {
        if (!data) return null
        if (data instanceof FormData) return data
        if (typeof data === 'string') return data
        return JSON.stringify(data)
    }

    private getHeaders(data?: RequestData): Record<string, string> {
        if (data instanceof FormData) {
            // Don't set Content-Type for FormData, let browser set it with boundary
            return {}
        }
        return {
            'Content-Type': 'application/json',
        }
    }
}

export const api = new ApiClient()
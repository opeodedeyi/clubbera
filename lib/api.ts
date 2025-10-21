// lib/api.ts
import { getCookie } from 'cookies-next';

type RequestData = Record<string, unknown> | FormData | string | null | object

class ApiClient {
    private getAuthToken(): string | undefined {
        if (typeof window === 'undefined') {
            return undefined
        }
        
        try {
            const token = getCookie('authToken')?.toString()
            console.log('Client API: Getting token:', !!token) // Debug log
            return token
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
        
        console.log('Client API request:', { 
            endpoint, 
            hasToken: !!token,
            method: options.method || 'GET'
        })

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        console.log('Request headers:', config.headers)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config)
        
        if (response.status === 401) {
            console.error('401 Unauthorized - token might be invalid or expired')
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
        
        return this.request<T>(endpoint, {
            method: 'POST',
            body,
        })
    }

    put<T = unknown>(endpoint: string, data?: RequestData): Promise<T> {
        const body = this.prepareBody(data)
        
        return this.request<T>(endpoint, {
            method: 'PUT',
            body,
        })
    }

    patch<T = unknown>(endpoint: string, data?: RequestData): Promise<T> {
        const body = this.prepareBody(data)
        
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body,
        })
    }

    delete<T = unknown>(endpoint: string, data?: RequestData): Promise<T> {
        const body = this.prepareBody(data)

        return this.request<T>(endpoint, {
            method: 'DELETE',
            body,
        })
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
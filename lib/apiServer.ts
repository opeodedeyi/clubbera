import { cookies } from 'next/headers'

type RequestData = Record<string, unknown> | FormData | string | null | object

class ServerApiClient {
    private async getAuthToken(): Promise<string | undefined> {
        try {
            const cookieStore = await cookies()
            return cookieStore.get('authToken')?.value
        } catch (error) {
            console.warn('Failed to get auth token on server:', error)
            return undefined
        }
    }

    async request<T = unknown>(
        endpoint: string, 
        options: RequestInit = {}
    ): Promise<T> {
        const token = await this.getAuthToken()

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        const response = await fetch(`${process.env.API_URL}${endpoint}`, config)
        
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error')
            throw new Error(`API Error: ${response.status} - ${errorText}`)
        }

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
            return {}
        }
        return {
            'Content-Type': 'application/json',
        }
    }
}

export const serverApi = new ServerApiClient()
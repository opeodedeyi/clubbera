import { getCookie } from 'cookies-next'

class ApiClient {
    async request(endpoint: string, options: RequestInit = {}) {
        const token = getCookie('authToken')
        
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
            window.location.href = '/login'
            return
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`)
        }

        return response.json()
    }

    get(endpoint: string) {
        return this.request(endpoint)
    }

    post(endpoint: string, data: any) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    put(endpoint: string, data: any) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    delete(endpoint: string) {
        return this.request(endpoint, { method: 'DELETE' })
    }
}

export const api = new ApiClient()
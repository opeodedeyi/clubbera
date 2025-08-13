// hooks/useGoogleLogin.ts
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authApi, type GoogleLoginRequest } from '@/lib/api/auth';

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    prompt: () => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                    revoke: (email: string, callback: () => void) => void;
                };
            };
        };
    }
}

export interface UseGoogleLoginReturn {
    isLoading: boolean;
    error: string | null;
    initializeGoogleAuth: () => void;
    handleGoogleLogin: () => void;
    clearError: () => void;
}

export const useGoogleLogin = (): UseGoogleLoginReturn => {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const handleCredentialResponse = async (response: any) => {
        console.log('Google credential response:', response);
        setIsLoading(true);
        setError(null);

        try {
            console.log('Sending ID token to backend...'); // Debug log
            
            const requestData: GoogleLoginRequest = {
                idToken: response.credential
            };

            console.log('Request data:', requestData); // Debug log

            const apiResponse = await authApi.googleLogin(requestData);
            console.log('Backend API response:', apiResponse); // Debug log

            if (apiResponse.status === 'success' && apiResponse.data.token) {
                console.log('Google login successful, calling auth context login');
                login(apiResponse.data.token, apiResponse.data.user);
                router.push('/dashboard'); // or wherever you want to redirect
            } else {
                setError(apiResponse.message || 'Google login failed. Please try again.');
            }
        } catch (err: unknown) {
            console.error('Google login error:', err); // This should show you the actual error
            
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
            
            if (errorMessage.includes('API Error: 401')) {
                setError('Google authentication failed.');
            } else if (errorMessage.includes('API Error: 403')) {
                setError('Account access denied.');
            } else if (errorMessage.includes('Failed to fetch')) {
                setError('Network error. Please check your connection and try again.');
            } else if (errorMessage.includes('Unexpected token')) {
                setError('Server error. Please try again later.');
                console.error('Looks like the server returned HTML instead of JSON. Check if your backend endpoint exists.');
            } else {
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const initializeGoogleAuth = useCallback(() => {
        if (typeof window !== 'undefined' && window.google) {
            console.log('Initializing Google Auth...');
            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
            });
            console.log('Google Auth initialized');
        }
    }, []);

    const handleGoogleLogin = () => {
        console.log('Triggering Google login prompt...');
        if (typeof window !== 'undefined' && window.google) {
            window.google.accounts.id.prompt();
        } else {
            setError('Google authentication is not available');
        }
    };

    return {
        isLoading,
        error,
        initializeGoogleAuth,
        handleGoogleLogin,
        clearError,
    };
};
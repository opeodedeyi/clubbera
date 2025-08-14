// hooks/useGoogleLogin.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { authApi, type GoogleLoginRequest } from '@/lib/api/auth';

interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
}

interface GoogleOAuth2Response {
    code: string;
    scope: string;
    state?: string;
}

interface GoogleOAuth2Client {
    requestCode(): void;
}

interface GoogleCodeError {
    type: 'popup_failed_to_open' | 'popup_closed' | 'unknown_error';
}

interface GooglePromptNotification {
    isNotDisplayed(): boolean;
    isSkippedMoment(): boolean;
    isDismissedMoment(): boolean;
    getNotDisplayedReason(): string;
    getSkippedReason(): string;
    getDismissedReason(): string;
}

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize(config: {
                        client_id: string;
                        callback: (response: GoogleCredentialResponse) => void;
                        auto_select?: boolean;
                        cancel_on_tap_outside?: boolean;
                        context?: 'signin' | 'signup' | 'use';
                    }): void;
                    prompt(callback?: (notification: GooglePromptNotification) => void): void;
                    cancel(): void;
                };
                oauth2: {
                    initCodeClient(config: {
                        client_id: string;
                        scope: string;
                        ux_mode?: 'popup' | 'redirect';
                        callback?: (response: GoogleOAuth2Response) => void;
                        error_callback?: (error: GoogleCodeError) => void;
                    }): GoogleOAuth2Client;
                };
            };
        };
    }
}

export interface UseGoogleLoginReturn {
    isLoading: boolean;
    error: string | null;
    isGoogleReady: boolean;
    handleGoogleLogin: () => void;
    clearError: () => void;
}

export const useGoogleLogin = (): UseGoogleLoginReturn => {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGoogleReady, setIsGoogleReady] = useState(false);
    
    const authInProgress = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const oneTapInitialized = useRef(false);

    const clearError = () => setError(null);

    const handleAuthSuccess = useCallback(async (response: GoogleCredentialResponse | GoogleOAuth2Response) => {
        console.log('Google auth success');
        authInProgress.current = false;
        setIsLoading(true);

        try {
            let requestData: GoogleLoginRequest;

            if ('credential' in response) {
                requestData = { idToken: response.credential };
            } else {
                requestData = { code: response.code };
            }

            const apiResponse = await authApi.googleLogin(requestData);
            
            if (apiResponse.status === 'success' && apiResponse.data.token) {
                login(apiResponse.data.token, apiResponse.data.user);
                router.push('/dashboard');
            } else {
                setError(apiResponse.message || 'Login failed. Please try again.');
            }
        } catch (err: unknown) {
            console.error('Auth API error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Network error occurred.';
            
            if (errorMessage.includes('Failed to fetch')) {
                setError('Network error. Please check your connection.');
            } else if (errorMessage.includes('Unexpected token')) {
                setError('Server error. Please try again later.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [login, router]);

    const handleOAuthError = useCallback((error: GoogleCodeError) => {
        authInProgress.current = false;
        setIsLoading(false);

        switch (error.type) {
            case 'popup_failed_to_open':
                setError('Popup blocked. Please allow popups and try again.');
                break;
            case 'popup_closed':
                console.log('User closed popup - no error needed');
                break;
            default:
                setError('Authentication failed. Please try again.');
        }
    }, []);

    const triggerOAuthFallback = useCallback(() => {
        console.log('Falling back to OAuth popup');
        
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
            setError('Google Client ID not configured');
            return;
        }

        try {
            const oauthClient = window.google.accounts.oauth2.initCodeClient({
                client_id: clientId,
                scope: 'email profile',
                ux_mode: 'popup',
                callback: handleAuthSuccess as (response: GoogleOAuth2Response) => void,
                error_callback: handleOAuthError,
            });

            oauthClient.requestCode();
        } catch (error) {
            console.error('OAuth fallback failed:', error);
            authInProgress.current = false;
            setIsLoading(false);
            setError('Authentication failed. Please try again.');
        }
    }, [handleAuthSuccess, handleOAuthError]);

    const handleOneTapPrompt = useCallback((notification: GooglePromptNotification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('One Tap not displayed, using OAuth fallback');
            triggerOAuthFallback();
        } else if (notification.isDismissedMoment()) {
            console.log('One Tap dismissed by user, using OAuth fallback');
            triggerOAuthFallback();
        }
    }, [triggerOAuthFallback]);

    useEffect(() => {
        const loadGoogleScript = () => {
            if (window.google?.accounts) {
                initializeClients();
                return;
            }

            if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
                const checkLoaded = () => {
                    if (window.google?.accounts) {
                        initializeClients();
                    } else {
                        setTimeout(checkLoaded, 100);
                    }
                };
                checkLoaded();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeClients;
            script.onerror = () => setError('Failed to load Google authentication');
            document.head.appendChild(script);
        };

        const initializeClients = () => {
            const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
            if (!clientId) {
                setError('Google Client ID not configured');
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleAuthSuccess as (response: GoogleCredentialResponse) => void,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    context: 'signin',
                });

                oneTapInitialized.current = true;
                setIsGoogleReady(true);
                console.log('Google clients initialized');
            } catch (error) {
                console.error('Failed to initialize Google clients:', error);
                setError('Failed to initialize Google authentication');
            }
        };

        loadGoogleScript();
    }, [handleAuthSuccess]);

    useEffect(() => {
        if (authInProgress.current && timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (authInProgress.current) {
            timeoutRef.current = setTimeout(() => {
                if (authInProgress.current) {
                    console.warn('Auth timeout - resetting state');
                    authInProgress.current = false;
                    setIsLoading(false);
                    setError('Authentication timed out. Please try again.');
                }
            }, 30000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [authInProgress.current]);

    useEffect(() => {
        return () => {
            authInProgress.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleGoogleLogin = useCallback(() => {
        if (authInProgress.current || isLoading) {
            console.log('Authentication already in progress');
            return;
        }

        if (!isGoogleReady || !oneTapInitialized.current) {
            setError('Google authentication not ready. Please refresh and try again.');
            return;
        }

        console.log('Starting Google authentication with One Tap...');
        authInProgress.current = true;
        setIsLoading(true);
        clearError();

        try {
            window.google.accounts.id.prompt(handleOneTapPrompt);
        } catch (error) {
            console.error('One Tap failed, trying OAuth fallback:', error);
            triggerOAuthFallback();
        }
    }, [isGoogleReady, isLoading, handleOneTapPrompt, triggerOAuthFallback]);

    return {
        isLoading,
        error,
        isGoogleReady,
        handleGoogleLogin,
        clearError,
    };
};
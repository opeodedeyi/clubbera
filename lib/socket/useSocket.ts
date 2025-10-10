// lib/socket/useSocket.ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket, disconnectSocket, isSocketConnected } from './socketClient';

interface UseSocketReturn {
    socket: Socket | null;
    isConnected: boolean;
    on: <T = unknown>(event: string, callback: (data: T) => void) => void;
    off: (event: string, callback?: (...args: unknown[]) => void) => void;
    emit: <T = unknown>(event: string, data?: T) => void;
}

/**
 * Generic React hook for Socket.IO connection
 * Supports any Socket.IO event - not limited to messaging
 *
 * @example
 * // Messaging
 * const { on, off } = useSocket();
 * useEffect(() => {
 *   const handler = (data) => console.log(data);
 *   on('new_message', handler);
 *   return () => off('new_message', handler);
 * }, []);
 *
 * @example
 * // Notifications
 * const { on } = useSocket();
 * on('notification', (data) => showNotification(data));
 *
 * @example
 * // Presence
 * const { emit, on } = useSocket();
 * emit('user_online', { userId: 123 });
 * on('user_status_changed', (data) => updateUserStatus(data));
 */
export const useSocket = (): UseSocketReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Initialize socket connection
        console.log('useSocket: Initializing socket connection');
        socketRef.current = getSocket();

        if (socketRef.current) {
            console.log('useSocket: Socket initialized:', socketRef.current.id);
            // Update connection status
            const updateConnectionStatus = () => {
                setIsConnected(isSocketConnected());
                console.log('useSocket: Connection status updated:', isSocketConnected());
            };

            socketRef.current.on('connect', updateConnectionStatus);
            socketRef.current.on('disconnect', updateConnectionStatus);

            // Set initial connection status
            updateConnectionStatus();

            // Cleanup on unmount
            return () => {
                if (socketRef.current) {
                    socketRef.current.off('connect', updateConnectionStatus);
                    socketRef.current.off('disconnect', updateConnectionStatus);
                }
                // Don't disconnect on unmount - keep connection alive
                // Only disconnect when user logs out
            };
        } else {
            console.warn('useSocket: Failed to initialize socket');
        }
    }, []);

    // Generic event listener
    const on = useCallback(<T = unknown>(event: string, callback: (data: T) => void) => {
        const socket = socketRef.current;
        console.log('useSocket.on: Registering listener for event:', event, 'Socket exists:', !!socket);
        if (socket) {
            socket.on(event, callback as (...args: unknown[]) => void);
            console.log('useSocket.on: Listener registered for event:', event);
        } else {
            console.warn('useSocket.on: No socket available for event:', event);
        }
    }, []);

    // Generic event unsubscribe
    const off = useCallback((event: string, callback?: (...args: unknown[]) => void) => {
        const socket = socketRef.current;
        console.log('useSocket.off: Unregistering listener for event:', event);
        if (socket) {
            if (callback) {
                socket.off(event, callback);
            } else {
                socket.off(event);
            }
        }
    }, []);

    // Generic event emitter
    const emit = useCallback(<T = unknown>(event: string, data?: T) => {
        const socket = socketRef.current;
        console.log('useSocket.emit: Emitting event:', event, 'Socket exists:', !!socket);
        if (socket) {
            socket.emit(event, data);
        } else {
            console.warn('useSocket.emit: No socket available for event:', event);
        }
    }, []);

    return {
        socket: socketRef.current,
        isConnected,
        on,
        off,
        emit
    };
};

/**
 * Hook to disconnect socket (use on logout)
 */
export const useDisconnectSocket = () => {
    return disconnectSocket;
};

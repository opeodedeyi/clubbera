// lib/socket/socketClient.ts
import { io, Socket } from 'socket.io-client';
import { getCookie } from 'cookies-next';
import type {
    NewMessageEvent,
    NewCommunityMessageEvent,
    UserTypingEvent,
    MessageReadReceiptEvent
} from '../types/messages';

let socket: Socket | null = null;


// Get the Socket.IO instance, creating it if it doesn't exist
export const getSocket = (): Socket | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    // Only create socket once - don't recreate on disconnect
    if (!socket) {
        const token = getCookie('authToken')?.toString();

        if (!token) {
            console.warn('No auth token found, cannot initialize socket');
            return null;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error('NEXT_PUBLIC_API_URL is not defined');
            return null;
        }

        // Remove /api suffix for Socket.IO connection (connects to root)
        const socketUrl = apiUrl.replace(/\/api\/?$/, '');

        console.log('🔌 Creating NEW socket instance');
        socket = io(socketUrl, {
            auth: {
                token
            },
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            transports: ['websocket', 'polling'] // Try websocket first, fallback to polling
        });

        // Connection event handlers
        socket.on('connect', () => {
            console.log('Socket connected:', socket?.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        // Listen for the 'connected' event from backend
        socket.on('connected', (data: { message: string; timestamp: string; userId?: number }) => {
            console.log('✅ Connected to Socket.IO server:', data);
            // Backend automatically joins user to user_${userId} room, no need to emit join_room
        });

        // Debug: Log ALL socket events
        socket.onAny((eventName, ...args) => {
            console.log('📡 Socket event received:', eventName, args);
        });
    }

    return socket;
};

// Disconnect the socket
export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

// Check if socket is connected
export const isSocketConnected = (): boolean => {
    return socket?.connected ?? false;
};

// Reconnect the socket
export const reconnectSocket = (): void => {
    if (socket && !socket.connected) {
        socket.connect();
    }
};

// Join user's personal room for receiving messages and notifications
export const joinUserRoom = (userId: number): void => {
    const socketInstance = getSocket();
    if (socketInstance && socketInstance.connected) {
        const roomName = `user_${userId}`;
        console.log(`🚪 Attempting to join room: ${roomName}`);
        socketInstance.emit('join_room', { room: roomName });
    } else {
        console.warn('Cannot join room - socket not connected');
    }
};

// Event listener type helpers
export type MessageEventCallback = (data: NewMessageEvent) => void;
export type CommunityMessageEventCallback = (data: NewCommunityMessageEvent) => void;
export type TypingEventCallback = (data: UserTypingEvent) => void;
export type ReadReceiptEventCallback = (data: MessageReadReceiptEvent) => void;

// Subscribe to new message events
export const onNewMessage = (callback: MessageEventCallback): void => {
    const socketInstance = getSocket();
    if (socketInstance) {
        socketInstance.on('new_message', callback);
    }
};

// Subscribe to new community message events
export const onNewCommunityMessage = (callback: CommunityMessageEventCallback): void => {
    const socketInstance = getSocket();
    if (socketInstance) {
        socketInstance.on('new_community_message', callback);
    }
};

// Subscribe to typing indicator events
export const onUserTyping = (callback: TypingEventCallback): void => {
    const socketInstance = getSocket();
    if (socketInstance) {
        socketInstance.on('user_typing', callback);
    }
};

// Subscribe to message read receipt events
export const onMessageReadReceipt = (callback: ReadReceiptEventCallback): void => {
    const socketInstance = getSocket();
    if (socketInstance) {
        socketInstance.on('message_read_receipt', callback);
    }
};

// Unsubscribe from event
export const offEvent = (eventName: string, callback?: (...args: unknown[]) => void): void => {
    const socketInstance = getSocket();
    if (socketInstance) {
        if (callback) {
            socketInstance.off(eventName, callback);
        } else {
            socketInstance.off(eventName);
        }
    }
};

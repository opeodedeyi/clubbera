// lib/hooks/useNotifications.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { notificationsApi } from '../api/notifications';
import { useSocket } from '../socket/useSocket';
import type { Notification, NotificationQueryOptions, NewNotificationEvent } from '../types/notifications';

interface UseNotificationsReturn {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
    fetchNotifications: (options?: NotificationQueryOptions) => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    markAsRead: (notification: Notification) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    handleNotificationClick: (notification: Notification) => void;
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

/**
 * Custom hook for managing notifications with real-time updates
 *
 * Features:
 * - Fetches notifications with pagination and filtering
 * - Real-time notification updates via Socket.IO
 * - Unread count tracking
 * - Mark as read functionality (single, grouped, and all)
 * - Automatic notification click handling
 *
 * @example
 * const {
 *   notifications,
 *   unreadCount,
 *   markAsRead,
 *   markAllAsRead
 * } = useNotifications();
 */
export const useNotifications = (): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { on, off } = useSocket();

    /**
     * Fetch notifications from API
     */
    const fetchNotifications = useCallback(async (options: NotificationQueryOptions = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await notificationsApi.getNotifications(options);
            setNotifications(response.data.notifications);
        } catch (err) {
            console.error('Failed to fetch notifications:', err);

            let errorMessage = 'Failed to load notifications';
            if (err instanceof Error) {
                const match = err.message.match(/{"status":"error","message":"([^"]+)"}/);
                if (match && match[1]) {
                    errorMessage = match[1];
                }
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch unread notification count
     */
    const fetchUnreadCount = useCallback(async () => {
        try {
            const response = await notificationsApi.getUnreadCount();
            setUnreadCount(response.data.unreadCount);
        } catch (err) {
            console.error('Failed to fetch unread count:', err);
        }
    }, []);

    /**
     * Mark notification(s) as read
     * Handles both single and grouped notifications
     */
    const markAsRead = useCallback(async (notification: Notification) => {
        try {
            if (notification.is_grouped && notification.notification_ids) {
                // Grouped notification - mark all notifications in group
                await notificationsApi.markMultipleAsRead({
                    notificationIds: notification.notification_ids
                });

                // Update local state
                setNotifications(prev =>
                    prev.map(notif =>
                        notif.id === notification.id
                            ? { ...notif, is_read: true }
                            : notif
                    )
                );
            } else {
                // Single notification
                await notificationsApi.markAsRead(notification.id as number);

                // Update local state
                setNotifications(prev =>
                    prev.map(notif =>
                        notif.id === notification.id
                            ? { ...notif, is_read: true }
                            : notif
                    )
                );
            }

            // Refresh unread count
            fetchUnreadCount();
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    }, [fetchUnreadCount]);

    /**
     * Mark all notifications as read
     */
    const markAllAsRead = useCallback(async () => {
        try {
            await notificationsApi.markAllAsRead();

            // Update local state
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, is_read: true }))
            );
            setUnreadCount(0);
        } catch (err) {
            console.error('Failed to mark all as read:', err);
        }
    }, []);

    /**
     * Handle notification click
     * Marks notification as read and handles navigation
     */
    const handleNotificationClick = useCallback((notification: Notification) => {
        // Mark as read when clicked
        if (!notification.is_read) {
            markAsRead(notification);
        }

        // TODO: Add navigation logic based on notification type
        // Example:
        // if (notification.type === 'new_message') {
        //     router.push(`/messages/user/${notification.metadata.senderId}`);
        // } else if (notification.type === 'new_event') {
        //     router.push(`/event/${notification.trigger_entity_id}`);
        // }
    }, [markAsRead]);

    /**
     * Listen for real-time notifications
     */
    useEffect(() => {
        const handleNewNotification = (data: NewNotificationEvent) => {
            console.log('🔔 New notification event received:', data);
            const newNotification = data.notification;

            // Add new notification to the list
            setNotifications(prev => {
                console.log('Adding notification to state, previous count:', prev.length);
                return [newNotification, ...prev];
            });

            // Update unread count
            setUnreadCount(prev => {
                console.log('Updating unread count from', prev, 'to', prev + 1);
                return prev + 1;
            });

            // Optional: Show toast notification
            // showToast(newNotification.title, newNotification.message);
        };

        console.log('Setting up notification socket listener');
        on<NewNotificationEvent>('new_notification', handleNewNotification);

        return () => {
            console.log('Cleaning up notification socket listener');
            off('new_notification', handleNewNotification);
        };
    }, [on, off]);

    /**
     * Initial fetch on mount
     */
    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();
    }, [fetchNotifications, fetchUnreadCount]);

    return {
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead,
        handleNotificationClick,
        setNotifications
    };
};

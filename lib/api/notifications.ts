// lib/api/notifications.ts
import { api } from '../api';
import type {
    NotificationQueryOptions,
    NotificationsResponse,
    UnreadCountResponse,
    NotificationResponse,
    MarkMultipleReadRequest,
    MarkMultipleReadResponse,
    CreateNotificationRequest,
    BulkNotificationsRequest,
    CleanupResponse,
    ApiSuccessResponse
} from '../types/notifications';

export const notificationsApi = {
    /**
     * Get all notifications for the current user
     * Supports pagination, filtering, and grouping
     */
    getNotifications: async (options: NotificationQueryOptions = {}): Promise<NotificationsResponse> => {
        const params = new URLSearchParams({
            limit: (options.limit || 50).toString(),
            offset: (options.offset || 0).toString(),
            unreadOnly: (options.unreadOnly || false).toString(),
            grouped: (options.grouped !== false).toString() // Default to true
        });
        return api.get<NotificationsResponse>(`/notifications?${params}`);
    },

    /**
     * Get unread notification count
     */
    getUnreadCount: async (): Promise<UnreadCountResponse> => {
        return api.get<UnreadCountResponse>('/notifications/unread-count');
    },

    /**
     * Mark a single notification as read
     */
    markAsRead: async (notificationId: number): Promise<NotificationResponse> => {
        return api.put<NotificationResponse>(`/notifications/${notificationId}/read`);
    },

    /**
     * Mark multiple notifications as read (for grouped notifications)
     */
    markMultipleAsRead: async (data: MarkMultipleReadRequest): Promise<MarkMultipleReadResponse> => {
        return api.put<MarkMultipleReadResponse>('/notifications/mark-multiple-read', data);
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async (): Promise<MarkMultipleReadResponse> => {
        return api.put<MarkMultipleReadResponse>('/notifications/mark-all-read');
    },

    /**
     * Create a single notification (Admin/System use)
     */
    createNotification: async (data: CreateNotificationRequest): Promise<NotificationResponse> => {
        return api.post<NotificationResponse>('/notifications', data);
    },

    /**
     * Create multiple notifications (Admin/System use)
     */
    createBulkNotifications: async (data: BulkNotificationsRequest): Promise<ApiSuccessResponse> => {
        return api.post<ApiSuccessResponse>('/notifications/bulk', data);
    },

    /**
     * Cleanup old notifications (Admin/System use)
     */
    cleanupOldNotifications: async (daysOld: number = 30): Promise<CleanupResponse> => {
        return api.delete<CleanupResponse>(`/notifications/cleanup?daysOld=${daysOld}`);
    }
};

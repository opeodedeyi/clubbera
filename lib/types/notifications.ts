// lib/types/notifications.ts

export type NotificationType =
    | 'new_message'
    | 'new_community_message'
    | 'message_reply'
    | 'community_join_request'
    | 'join_request_approved'
    | 'join_request_rejected'
    | 'community_announcement'
    | 'community_role_changed'
    | 'user_joined_community'
    | 'new_event'
    | 'event_updated'
    | 'event_cancelled'
    | 'event_reminder'
    | 'waitlist_promoted'
    | 'event_rsvp'
    | 'new_post'
    | 'post_reply';

export type TriggerEntityType = 'message' | 'community' | 'event' | 'post' | 'user';

export interface Notification {
    id: number | string; // Can be number or "grouped_123" for grouped notifications
    user_id?: number;
    type: NotificationType;
    trigger_entity_type: TriggerEntityType;
    trigger_entity_id: number;
    actor_user_id?: number | null;
    actor_name?: string;
    actor_url?: string;
    title: string;
    message?: string | null;
    metadata: Record<string, unknown>;
    is_read: boolean;
    created_at: string;
    is_grouped?: boolean;
    count?: number;
    actors?: string[]; // List of actor names (for grouped notifications)
    actor_ids?: number[]; // List of actor IDs (for grouped notifications)
    notification_ids?: number[]; // List of notification IDs in group
}

export interface NotificationPagination {
    limit: number;
    offset: number;
    hasMore: boolean;
}

export interface NotificationsResponse {
    status: string;
    data: {
        notifications: Notification[];
        pagination: NotificationPagination;
    };
}

export interface UnreadCountResponse {
    status: string;
    data: {
        unreadCount: number;
    };
}

export interface NotificationResponse {
    status: string;
    data: {
        notification: Notification;
    };
}

export interface MarkMultipleReadRequest {
    notificationIds: number[];
}

export interface MarkMultipleReadResponse {
    status: string;
    data: {
        updatedCount: number;
    };
}

export interface CreateNotificationRequest {
    userId: number;
    type: NotificationType;
    triggerEntityType: TriggerEntityType;
    triggerEntityId: number;
    actorUserId?: number;
    title: string;
    message?: string;
    metadata?: Record<string, unknown>;
}

export interface BulkNotificationsRequest {
    notifications: CreateNotificationRequest[];
}

export interface CleanupResponse {
    status: string;
    data: {
        deletedCount: number;
        daysOld: number;
    };
}

export interface ApiSuccessResponse {
    status: string;
    message: string;
}

// Socket.IO event payloads
export interface NewNotificationEvent {
    notification: Notification;
}

// Query options for fetching notifications
export interface NotificationQueryOptions {
    limit?: number;
    offset?: number;
    unreadOnly?: boolean;
    grouped?: boolean;
}

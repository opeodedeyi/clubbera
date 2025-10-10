import { formatDate } from '@/lib/utils/dateFormatter';
import Icon from '@/components/ui/Icon/Icon';
import type { Notification, NotificationType } from '@/lib/types/notifications';
import type { IconName } from '@/types/icon';
import styles from './NotificationItem.module.css';

interface NotificationItemProps {
    notification: Notification;
    onClick?: (notification: Notification) => void;
}

// Helper function to determine icon and color based on notification type
const getNotificationIconAndColor = (type: NotificationType): { icon: IconName; color: string } => {
    // Event-related notifications
    const eventTypes: NotificationType[] = [
        'new_event',
        'event_updated',
        'event_cancelled',
        'event_reminder',
        'waitlist_promoted',
        'event_rsvp'
    ];

    // Community-related notifications
    const communityTypes: NotificationType[] = [
        'community_join_request',
        'join_request_approved',
        'join_request_rejected',
        'community_announcement',
        'community_role_changed',
        'user_joined_community'
    ];

    // Message-related notifications
    const messageTypes: NotificationType[] = [
        'new_message',
        'new_community_message',
        'message_reply'
    ];

    if (eventTypes.includes(type)) {
        return { icon: 'calendar', color: 'var(--color-event)' };
    }

    if (communityTypes.includes(type)) {
        return { icon: 'group', color: 'var(--color-community)' };
    }

    if (messageTypes.includes(type)) {
        return { icon: 'mail', color: 'var(--color-default)' };
    }

    // Default for posts and others (using notification icon instead of bell)
    return { icon: 'notification', color: 'var(--color-default)' };
};

export default function NotificationItem({ notification, onClick }: NotificationItemProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(notification);
        }
    };

    const { icon, color } = getNotificationIconAndColor(notification.type);

    // Render icon based on type to satisfy TypeScript
    const renderIcon = () => {
        if (icon === 'notification') {
            return <Icon name="notification" color={color} />;
        }
        // Simple icons (calendar, group, mail)
        return <Icon name={icon as 'calendar' | 'group' | 'mail'} color={color} />;
    };

    return (
        <div
            className={styles.notificationItem}
            onClick={handleClick}
            role="button"
            tabIndex={0}
        >
            {renderIcon()}

            <div className={styles.notificationText}>
                <h4 className={styles.notificationType}>{notification.title}</h4>
                <p className={styles.notificationContent}>{notification.message}</p>
                <p className={styles.notificationTime}>{formatDate(notification.created_at, 'time')}</p>
            </div>
        </div>
    );
}

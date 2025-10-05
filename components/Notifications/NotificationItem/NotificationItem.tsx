import { formatDate } from '@/lib/utils/dateFormatter';
import Icon from '@/components/ui/Icon/Icon';
import styles from './NotificationItem.module.css';

export interface Notification {
    id: number;
    type: 'event' | 'community' | 'other';
    content: string;
    timestamp: string | Date;
    read: boolean;
}

interface NotificationItemProps {
    notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
    return (
        <div className={styles.notificationItem}>
            <Icon name="calendar" color='var(--color-event)'/>

            <div className={styles.notificationText}>
                <h4 className={styles.notificationType}>Event RSVP</h4>
                <p className={styles.notificationContent}>{notification.content}</p>
                <p className={styles.notificationTime}>{formatDate(notification.timestamp, 'time')}</p>
            </div>
        </div>
    );
}

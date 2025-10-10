import NotificationItem from '../NotificationItem/NotificationItem';
import type { Notification } from '@/lib/types/notifications';
import styles from './NotificationDayGroup.module.css';

interface NotificationDayGroupProps {
    dayLabel: string;
    notifications: Notification[];
    onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationDayGroup({ dayLabel, notifications, onNotificationClick }: NotificationDayGroupProps) {
    return (
        <div className={styles.daySection}>
            <p className={styles.dayLabel}>{dayLabel}</p>

            <div className={styles.notificationsList}>
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={onNotificationClick} />
                ))}
            </div>
        </div>
    );
}

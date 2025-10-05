import NotificationItem, { Notification } from '../NotificationItem/NotificationItem';
import styles from './NotificationDayGroup.module.css';

interface NotificationDayGroupProps {
    dayLabel: string;
    notifications: Notification[];
}

export default function NotificationDayGroup({ dayLabel, notifications }: NotificationDayGroupProps) {
    return (
        <div className={styles.daySection}>
            <p className={styles.dayLabel}>{dayLabel}</p>

            <div className={styles.notificationsList}>
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    );
}

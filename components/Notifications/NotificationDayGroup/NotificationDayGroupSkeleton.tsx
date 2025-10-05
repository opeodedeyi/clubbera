import NotificationItemSkeleton from '../NotificationItem/NotificationItemSkeleton';
import styles from './NotificationDayGroup.module.css';

interface NotificationDayGroupSkeletonProps {
    itemCount?: number;
}

export default function NotificationDayGroupSkeleton({ itemCount = 3 }: NotificationDayGroupSkeletonProps) {
    return (
        <div className={styles.daySection}>
            <div className="skeleton" style={{ width: '80px', height: '18px', borderRadius: 'var(--radius-md)' }}></div>

            <div className={styles.notificationsList}>
                {Array.from({ length: itemCount }).map((_, index) => (
                    <NotificationItemSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

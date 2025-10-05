import styles from './NotificationItem.module.css';

export default function NotificationItemSkeleton() {
    return (
        <div className={styles.notificationItem}>
            <div className="skeleton" style={{ width: '24px', height: '24px', borderRadius: 'var(--radius-md)', flexShrink: 0 }}></div>

            <div className={styles.notificationText}>
                <div className="skeleton" style={{ width: '120px', height: '20px', borderRadius: 'var(--radius-md)' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '16px', borderRadius: 'var(--radius-md)' }}></div>
                <div className="skeleton" style={{ width: '60px', height: '14px', borderRadius: 'var(--radius-md)' }}></div>
            </div>
        </div>
    );
}

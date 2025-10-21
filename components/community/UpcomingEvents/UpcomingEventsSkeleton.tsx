import styles from './UpcomingEvents.module.css';

interface UpcomingEventsSkeletonProps {
    variant: 'admin' | 'member';
    className?: string;
}

export default function UpcomingEventsSkeleton({ variant, className }: UpcomingEventsSkeletonProps) {
    if (variant === 'admin') {
        return (
            <div className={`${styles.eventsAdmin} ${className || ''}`}>
                <div className={styles.eventsAdminTop}>
                    <div className="skeleton" style={{ width: '80px', height: '24px' }}></div>
                    <div className="skeleton" style={{ width: '100px', height: '20px' }}></div>
                </div>

                <div className={styles.eventsAdminMain}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3-5)' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                            <div className="skeleton" style={{ width: '120px', height: '16px' }}></div>
                            <div className="skeleton" style={{ width: '80px', height: '16px' }}></div>
                        </div>
                        <div className="skeleton" style={{ width: '200px', height: '20px' }}></div>
                    </div>

                    <div className={styles.AdminImg}>
                        <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: '0' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.eventsMember} ${className || ''}`}>
            <div className="skeleton" style={{ width: '150px', height: '24px' }}></div>

            <div className={styles.eventsMemberMain}>
                <div className={styles.memberImg}>
                    <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: '0' }}></div>
                </div>

                <div className={styles.memberBody}>
                    <div className={styles.sameLine}>
                        <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                        <div className="skeleton" style={{ width: '150px', height: '14px' }}></div>
                    </div>

                    <div className={styles.memberBodyText}>
                        <div className="skeleton" style={{ width: '100%', height: '20px', marginBottom: 'var(--spacing-2)' }}></div>
                        <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: 'var(--spacing-1)' }}></div>
                        <div className="skeleton" style={{ width: '80%', height: '16px' }}></div>
                    </div>

                    <div className={styles.sameLine}>
                        <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                        <div className="skeleton" style={{ width: '100px', height: '16px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import styles from './PostCardSkeleton.module.css';

export default function PostCardSkeleton() {
    return (
        <div className={styles.postCard}>
            {/* Header with user info and community */}
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <div className="skeleton" style={{ width: '25px', height: '25px', borderRadius: 'var(--radius-full)' }}></div>

                    <div className={styles.userDetails}>
                        <div className="skeleton" style={{ width: '120px', height: '16px' }}></div>
                        <div className="skeleton" style={{ width: '80px', height: '14px' }}></div>
                    </div>
                </div>

                <div className={styles.communityInfo}>
                    <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                    <div className="skeleton" style={{ width: '100px', height: '16px' }}></div>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                <div className="skeleton" style={{ width: '85%', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                <div className="skeleton" style={{ width: '60%', height: '16px' }}></div>
            </div>

            {/* Footer with stats */}
            <div className={styles.footer}>
                <div className={styles.stat}>
                    <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                    <div className="skeleton" style={{ width: '30px', height: '14px' }}></div>
                </div>
                <div className={styles.stat}>
                    <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                    <div className="skeleton" style={{ width: '30px', height: '14px' }}></div>
                </div>
            </div>
        </div>
    );
}

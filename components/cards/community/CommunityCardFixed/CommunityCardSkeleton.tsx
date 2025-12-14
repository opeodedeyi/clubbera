import styles from './CommunityCard.module.css';

interface CommunityCardSkeletonProps {
    className?: string;
}

export default function CommunityCardSkeleton({ className }: CommunityCardSkeletonProps) {
    return (
        <div className={`${styles.cardLink} ${className || ''}`}>
            <div className={styles.card}>
                {/* Cover Image Skeleton - Desktop only */}
                <div className={styles.cardCover}>
                    <div className="skeleton" style={{ width: '100%', height: '100%' }}></div>
                </div>

                {/* Profile Image Skeleton */}
                <div className={styles.cardProfile}>
                    <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-xl)' }}></div>
                </div>

                {/* Text Content Skeleton */}
                <div className={styles.cardText}>
                    <div className={styles.cardTextMain}>
                        <div className="skeleton" style={{ width: '70%', height: '16px' }}></div>
                        <div className="skeleton" style={{ width: '100%', height: '14px', marginTop: 'var(--spacing-2)' }}></div>
                        <div className="skeleton" style={{ width: '85%', height: '14px', marginTop: 'var(--spacing-1)' }}></div>
                    </div>
                    <div className={styles.cardTextMember}>
                        <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                        <div className="skeleton" style={{ width: '80px', height: '14px' }}></div>
                    </div>
                </div>

                {/* Arrow Skeleton - Mobile only */}
                <div className={styles.cardArrow}>
                    <div className="skeleton" style={{ width: '16px', height: '16px', borderRadius: 'var(--radius-sm)' }}></div>
                </div>
            </div>
        </div>
    );
}

import styles from './EventCard.module.css';

interface EventCardSkeletonProps {
    className?: string;
}

export default function EventCardSkeleton({ className }: EventCardSkeletonProps) {
    return (
        <div className={className}>
            <div className={styles.container}>
                <div className={styles.containerImage}>
                    <div className="skeleton" style={{ width: '100%', height: '100%' }}></div>
                </div>

                <div className={styles.containerBody}>
                    <div className={styles.spaceBetween}>
                        <div className="skeleton" style={{ width: '120px', height: '16px' }}></div>
                        <div className="skeleton" style={{ width: '40px', height: '16px' }}></div>
                    </div>

                    <div className={styles.containerBodyText}>
                        <div className="skeleton" style={{ width: '80%', height: '20px' }}></div>
                        <div className="skeleton" style={{ width: '100%', height: '16px', marginTop: '4px' }}></div>
                        <div className="skeleton" style={{ width: '100%', height: '16px', marginTop: '2px' }}></div>
                        <div className="skeleton" style={{ width: '60%', height: '16px', marginTop: '2px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

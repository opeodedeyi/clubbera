import EventsCardSkeleton from '@/components/events/EventsCard/EventsCardSkeleton';
import styles from './EventsContent.module.css';

interface EventsTimelineSkeletonProps {
    cardCount?: number;
}

export default function EventsTimelineSkeleton({ cardCount = 2 }: EventsTimelineSkeletonProps) {
    return (
        <div className={styles.timeline}>
            <div className={`${styles.timelineDate} desktop-only-flex`}>
                <div className="skeleton" style={{ width: '100px', height: '24px', marginBottom: 'var(--spacing-2)' }}></div>
                <div className="skeleton" style={{ width: '120px', height: '14px' }}></div>
            </div>

            <div className={styles.timelineHL}></div>

            <div className={styles.cardContent}>
                <div className={`${styles.timelineDate} ${styles.cardContentExtraSpacing} tablet-mobile-flex`}>
                    <div className="skeleton" style={{ width: '100px', height: '24px', marginBottom: 'var(--spacing-2)' }}></div>
                    <div className="skeleton" style={{ width: '120px', height: '14px' }}></div>
                </div>

                {Array.from({ length: cardCount }).map((_, i) => (
                    <EventsCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

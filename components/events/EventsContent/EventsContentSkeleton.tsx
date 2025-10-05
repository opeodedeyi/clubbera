import PageWrapper from "@/components/ui/PageWrapper/PageWrapper";
import EventsCardSkeleton from '@/components/events/EventsCard/EventsCardSkeleton';
import styles from './EventsContent.module.css';

export default function EventsContentSkeleton() {
    return (
        <PageWrapper showParticles={false}>
            <div className={styles.navigation}>
                <div className="skeleton" style={{ width: '120px', height: '40px' }}></div>

                <div style={{ display: 'flex', gap: 'var(--spacing-2)', borderRadius: 'var(--radius-full)', padding: 'var(--spacing-1)' }}>
                    <div className="skeleton" style={{ width: '100px', height: '40px', borderRadius: 'var(--radius-full)' }}></div>
                    <div className="skeleton" style={{ width: '100px', height: '40px', borderRadius: 'var(--radius-full)' }}></div>
                </div>
            </div>

            <main className={styles.contentContainer}>
                {/* First timeline section */}
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

                        <EventsCardSkeleton />
                        <EventsCardSkeleton />
                    </div>
                </div>

                {/* Second timeline section */}
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

                        <EventsCardSkeleton />
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
}

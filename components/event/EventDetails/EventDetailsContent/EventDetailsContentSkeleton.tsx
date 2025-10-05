import BackButton from '@/components/ui/BackButton/BackButton';
import styles from "./EventDetailsContent.module.css";

const EventDetailsContentSkeleton = () => {
    return (
        <div className={styles.container}>
            <BackButton />

            <div className={styles.content}>
                <div className={styles.contentTop}>
                    {/* Event Image Skeleton */}
                    <div className="skeleton" style={{
                        width: '100%',
                        maxWidth: '600px',
                        height: '280px',
                        borderRadius: 'var(--radius-2xl)'
                    }}></div>

                    <div className={styles.contentTopRight}>
                        {/* Next Event Card Skeleton */}
                        <div className="skeleton" style={{
                            width: '100%',
                            height: '120px',
                            borderRadius: 'var(--radius-xl)'
                        }}></div>

                        {/* Reservation Status Card Skeleton (desktop) */}
                        <div className="skeleton desktop-only-flex" style={{
                            width: '100%',
                            height: '100px',
                            borderRadius: 'var(--radius-xl)'
                        }}></div>
                    </div>
                </div>

                <div className={styles.contentBottom}>
                    <div className={styles.contentBottomLeft}>
                        {/* Event Buttons Skeleton (desktop) */}
                        <div className="skeleton desktop-only-flex" style={{
                            width: '100%',
                            height: '48px',
                            borderRadius: 'var(--radius-full)'
                        }}></div>

                        {/* Title Skeleton */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            <div className="skeleton" style={{
                                width: '80%',
                                height: '32px',
                                borderRadius: 'var(--radius-md)'
                            }}></div>
                            <div className="skeleton" style={{
                                width: '100%',
                                height: '20px',
                                borderRadius: 'var(--radius-md)'
                            }}></div>
                            <div className="skeleton" style={{
                                width: '90%',
                                height: '20px',
                                borderRadius: 'var(--radius-md)'
                            }}></div>
                            <div className="skeleton" style={{
                                width: '70%',
                                height: '20px',
                                borderRadius: 'var(--radius-md)'
                            }}></div>
                        </div>

                        {/* Timing Info Skeleton (mobile) */}
                        <div className="tablet-mobile-flex" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '50px',
                            width: '100%'
                        }}>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-4)'
                            }}>
                                <div className="skeleton" style={{ width: '200px', height: '20px' }}></div>
                                <div className="skeleton" style={{ width: '180px', height: '20px' }}></div>
                                <div className="skeleton" style={{ width: '220px', height: '20px' }}></div>
                            </div>
                            <div className="skeleton" style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: 'var(--radius-xl)'
                            }}></div>
                        </div>

                        {/* Host Info Skeleton */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            <div className="skeleton" style={{ width: '160px', height: '24px' }}></div>
                            <div className="skeleton" style={{ width: '200px', height: '20px' }}></div>
                        </div>

                        {/* Reservation Status Card Skeleton (mobile) */}
                        <div className="skeleton tablet-mobile-flex" style={{
                            width: '100%',
                            height: '100px',
                            borderRadius: 'var(--radius-xl)'
                        }}></div>

                        {/* Event Buttons Skeleton (mobile) */}
                        <div className="skeleton tablet-mobile-flex" style={{
                            width: '100%',
                            height: '48px',
                            borderRadius: 'var(--radius-full)'
                        }}></div>
                    </div>

                    <div className={styles.contentBottomRight}>
                        {/* Timing Info Skeleton (desktop) */}
                        <div className="desktop-only-flex" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '50px',
                            width: '100%',
                            paddingLeft: 'var(--spacing-6)'
                        }}>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-4)'
                            }}>
                                <div className="skeleton" style={{ width: '200px', height: '20px' }}></div>
                                <div className="skeleton" style={{ width: '180px', height: '20px' }}></div>
                                <div className="skeleton" style={{ width: '220px', height: '20px' }}></div>
                            </div>
                            <div className="skeleton" style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: 'var(--radius-xl)'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsContentSkeleton;

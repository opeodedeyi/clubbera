import BackButton from '@/components/ui/BackButton/BackButton';
import styles from './ManageEventContent.module.css';
import layoutStyles from '@/components/layout/ManageEventLayout/ManageEventLayout.module.css';

const ManageEventContentSkeleton = () => {
    return (
        <div className={layoutStyles.container}>
            <div className={layoutStyles.containerLeft}>
                <BackButton className='self-start'/>

                <div className={layoutStyles.containerContent}>
                    {/* Sticky Title */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                        <div className="skeleton" style={{ width: '180px', height: '32px' }}></div>
                        <div className="skeleton" style={{ width: '140px', height: '40px', borderRadius: 'var(--radius-full)' }}></div>
                    </div>

                    {/* Main Form Section */}
                    <div className={styles.form}>
                        {/* Event Image Skeleton */}
                        <div className="skeleton" style={{
                            width: '100%',
                            height: '200px',
                            borderRadius: 'var(--radius-xl)'
                        }}></div>

                        {/* Title Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '100px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>

                        {/* Description Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '140px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>

                        {/* Max Attendees Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '140px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>
                    </div>

                    {/* Timing Section */}
                    <div className={styles.form}>
                        <div className="skeleton" style={{ width: '80px', height: '28px', marginBottom: 'var(--spacing-4)' }}></div>

                        {/* Date Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '90px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>

                        {/* Start Time Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '80px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>

                        {/* End Time Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '70px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className={styles.form}>
                        <div className="skeleton" style={{ width: '80px', height: '28px', marginBottom: 'var(--spacing-4)' }}></div>

                        {/* Event Type Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '90px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>

                        {/* Location Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '110px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>

                        {/* Location Details Input Skeleton */}
                        <div>
                            <div className="skeleton" style={{ width: '140px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '100px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Sidebar Skeleton */}
            <div className="desktop-only-flex" style={{
                width: '280px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-background-light)',
                height: 'fit-content',
                position: 'sticky',
                top: '100px'
            }}>
                <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: 'var(--radius-md)' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: 'var(--radius-md)' }}></div>
                <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: 'var(--radius-md)' }}></div>
            </div>
        </div>
    );
};

export default ManageEventContentSkeleton;

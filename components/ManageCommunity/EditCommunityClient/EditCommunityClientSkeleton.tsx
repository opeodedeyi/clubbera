import BackButton from '@/components/ui/BackButton/BackButton';
import styles from './EditCommunityClient.module.css';

export default function EditCommunityClientSkeleton() {
    return (
        <>
            <BackButton className={`${styles.backBtn} self-start`}/>

            {/* Community Images Skeleton */}
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: '0 var(--spacing-20)'
            }}>
                <div className="skeleton" style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: 'var(--radius-xl)'
                }}></div>
                <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                    <div className="skeleton" style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: 'var(--radius-xl)'
                    }}></div>
                    <div className="skeleton" style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: 'var(--radius-xl)'
                    }}></div>
                </div>
            </div>

            <div style={{
                width: '100%',
                padding: '0 var(--spacing-20)',
                display: 'flex',
                gap: 'var(--spacing-12)'
            }}>
                {/* Main Content */}
                <div className={styles.mainContent}>
                    {/* Community Overview Section */}
                    <div className={styles.section}>
                        {/* Section Title */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="skeleton" style={{ width: '200px', height: '28px', marginBottom: 'var(--spacing-2)' }}></div>
                                <div className="skeleton" style={{ width: '250px', height: '16px' }}></div>
                            </div>
                            <div className="skeleton" style={{ width: '140px', height: '40px', borderRadius: 'var(--radius-full)' }}></div>
                        </div>

                        <div className={styles.sideBySide}>
                            {/* Left Form Column */}
                            <div className={styles.form}>
                                {/* Name Input */}
                                <div>
                                    <div className="skeleton" style={{ width: '60px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                                </div>

                                {/* City Input */}
                                <div>
                                    <div className="skeleton" style={{ width: '40px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                                </div>

                                {/* Tagline Input */}
                                <div>
                                    <div className="skeleton" style={{ width: '70px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '80px', borderRadius: 'var(--radius-md)' }}></div>
                                </div>

                                {/* Description Input */}
                                <div>
                                    <div className="skeleton" style={{ width: '90px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: 'var(--radius-md)' }}></div>
                                </div>
                            </div>

                            {/* Right Form Column */}
                            <div className={styles.form}>
                                {/* Tags Input */}
                                <div>
                                    <div className="skeleton" style={{ width: '50px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '44px', borderRadius: 'var(--radius-md)' }}></div>
                                </div>

                                {/* Guidelines Input */}
                                <div>
                                    <div className="skeleton" style={{ width: '200px', height: '16px', marginBottom: 'var(--spacing-2)' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '200px', borderRadius: 'var(--radius-md)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Settings Section */}
                    <div className={styles.section}>
                        {/* Section Title */}
                        <div>
                            <div className="skeleton" style={{ width: '150px', height: '28px', marginBottom: 'var(--spacing-2)' }}></div>
                            <div className="skeleton" style={{ width: '220px', height: '16px' }}></div>
                        </div>

                        <div className={styles.form}>
                            <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: 'var(--radius-xl)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation Skeleton */}
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
        </>
    );
}

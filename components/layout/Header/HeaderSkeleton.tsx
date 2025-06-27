import ClubberaLogo from '@/components/ui/Icon/ClubberaLogo';
import styles from './Header.module.css'

interface HeaderSkeletonProps {
    className?: string
}

export default function HeaderSkeleton({ className = '' }: HeaderSkeletonProps) {
    return (
        <header className={`${styles.header} ${className}`}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <ClubberaLogo variant="custom" textColor="var(--color-text)" />
                    </div>

                    <nav className={`${styles.nav} desktop-only-flex`}>
                        <div className={styles.skeleton} style={{ width: '60px', height: '20px' }}></div>
                        <div className={styles.skeleton} style={{ width: '80px', height: '20px' }}></div>
                        <div className={styles.skeleton} style={{ width: '70px', height: '20px' }}></div>
                    </nav>
                </div>

                <div className={styles.actions}>
                    <div className={styles.skeleton} style={{ width: '40px', height: '40px', borderRadius: '100px' }}></div>
                    <div className={styles.skeleton} style={{ width: '40px', height: '40px', borderRadius: '100px' }}></div>
                </div>
            </div>
        </header>
    )
}
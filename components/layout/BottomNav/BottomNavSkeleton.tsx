import styles from './BottomNav.module.css';

export default function BottomNavSkeleton() {
    return (
        <nav className={styles.bottomNav}>
            {[...Array(4)].map((_, index) => (
                <div key={index} className={`${styles.navItem} ${styles.skeleton}`}>
                    <div className={styles.iconSkeleton} />
                </div>
            ))}
        </nav>
    );
}
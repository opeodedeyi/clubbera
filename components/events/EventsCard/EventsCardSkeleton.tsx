import styles from './EventsCard.module.css';

export default function EventsCardSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.containerBody}>
                <div className="skeleton" style={{ width: '80px', height: '20px' }}></div>
                <div className="skeleton" style={{ width: '200px', height: '24px', marginTop: '4px' }}></div>
            </div>

            <div className={styles.containerImage}>
                <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-xl)' }}></div>
            </div>
        </div>
    );
}

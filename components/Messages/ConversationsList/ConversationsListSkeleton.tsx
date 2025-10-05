import styles from './ConversationsList.module.css';

export default function ConversationsListSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.conversations}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={styles.conversation}>
                        <div className={`${styles.avatar} skeleton`}></div>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                <div className="skeleton" style={{ width: '120px', height: '18px', borderRadius: 'var(--radius-md)' }}></div>
                            </div>
                            <div className="skeleton" style={{ width: '180px', height: '14px', borderRadius: 'var(--radius-md)' }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

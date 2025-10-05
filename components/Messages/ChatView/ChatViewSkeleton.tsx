import { useMediaQuery } from '@/hooks/useMediaQuery';
import ActionIcon from '@/components/ui/ActionIcon/ActionIcon';
import styles from './ChatView.module.css';

export default function ChatViewSkeleton() {
    const isMobile = !useMediaQuery('(min-width: 1024px)');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isMobile && (
                    <ActionIcon
                        as="link"
                        href="/messages"
                        icon={{ name: "arrowLeft", color: "var(--color-text-light)" }}
                        aria-label="Go to messages" />
                )}
                <div className="skeleton" style={{ width: '120px', height: '20px' }}></div>
            </div>

            <div className={styles.messagesContainer}>
                {/* Received message */}
                <div className={`${styles.message} ${styles.received}`}>
                    <div className={styles.bubble} style={{ opacity: 0.6 }}>
                        <div className="skeleton" style={{ width: '150px', height: '14px', marginBottom: '8px' }}></div>
                        <div className="skeleton" style={{ width: '60px', height: '10px' }}></div>
                    </div>
                </div>

                {/* Sent message */}
                <div className={`${styles.message} ${styles.sent}`}>
                    <div className={styles.bubble} style={{ opacity: 0.6 }}>
                        <div className="skeleton" style={{ width: '180px', height: '14px', marginBottom: '8px', background: 'rgba(255, 255, 255, 0.3)' }}></div>
                        <div className="skeleton" style={{ width: '60px', height: '10px', background: 'rgba(255, 255, 255, 0.3)' }}></div>
                    </div>
                </div>

                {/* Received message */}
                <div className={`${styles.message} ${styles.received}`}>
                    <div className={styles.bubble} style={{ opacity: 0.6 }}>
                        <div className="skeleton" style={{ width: '200px', height: '14px', marginBottom: '8px' }}></div>
                        <div className="skeleton" style={{ width: '60px', height: '10px' }}></div>
                    </div>
                </div>

                {/* Sent message */}
                <div className={`${styles.message} ${styles.sent}`}>
                    <div className={styles.bubble} style={{ opacity: 0.6 }}>
                        <div className="skeleton" style={{ width: '130px', height: '14px', marginBottom: '8px', background: 'rgba(255, 255, 255, 0.3)' }}></div>
                        <div className="skeleton" style={{ width: '60px', height: '10px', background: 'rgba(255, 255, 255, 0.3)' }}></div>
                    </div>
                </div>

                {/* Received message */}
                <div className={`${styles.message} ${styles.received}`}>
                    <div className={styles.bubble} style={{ opacity: 0.6 }}>
                        <div className="skeleton" style={{ width: '160px', height: '14px', marginBottom: '8px' }}></div>
                        <div className="skeleton" style={{ width: '60px', height: '10px' }}></div>
                    </div>
                </div>
            </div>

            <div className={styles.messagesFooter}>
                <div className="skeleton" style={{ flex: 1, height: '24px' }}></div>
                <div className="skeleton" style={{ width: '80px', height: '40px', borderRadius: 'var(--radius-full)' }}></div>
            </div>
        </div>
    );
}

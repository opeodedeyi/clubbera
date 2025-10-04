import styles from './MessagesLayout.module.css';

interface MessagesLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    isDesktop?: boolean;
}

export default function MessagesLayout({ children, showHeader, isDesktop }: MessagesLayoutProps) {
    return (
        <div className={styles.mainContainer}>
            {(isDesktop || showHeader) &&
                <div className={styles.containerHeader}>
                    <h2 className={styles.headerTitle}>Messages</h2>
                </div>
            }

            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}
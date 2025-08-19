import styles from './NoPost.module.css';


interface NoPostProps {
    text?: string
}

export default function NoPost({text}: NoPostProps) {
    return (
        <div className={styles.noPost}>
            <div className={styles.noPostCard}>
                <div className={styles.noPostCardHeader}>
                    <div className={styles.noPostCardRow}>
                        <span className={styles.shadowCircle}></span>
                        <span className={styles.shadowText}></span>
                    </div>
                    <div className={styles.noPostCardRow}>
                        <span className={styles.shadowTextShort}></span>
                        <span className={styles.shadowText}></span>
                    </div>
                </div>

                <div className={styles.noPostCardBody}>
                    <span className={styles.shadowTextMid}></span>
                    <span className={styles.shadowTextLong}></span>
                    <span className={styles.shadowTextMid}></span>
                    <span className={styles.shadowTextFull}></span>
                    <span className={styles.shadowTextLong}></span>
                    <span className={styles.shadowTextShort}></span>
                </div>

                <div className={styles.noPostCardFooter}>
                    <div className={styles.noPostCardRow}>
                        <span className={styles.shadowCircle}></span>
                        <span className={styles.shadowCircle}></span>
                    </div>
                </div>
            </div>

            <p className={styles.noPostText}>{text}</p>
        </div>
    )
}
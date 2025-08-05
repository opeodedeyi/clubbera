import Button from '@/components/ui/Button/Button';
import BrandIcon from '@/components/ui/Icon/BrandIcon';
import styles from './NoContent.module.css';


function NoPostCard() {
    return (
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
    )
}

function CreateCommunityCard() {
    return (
        <div className={styles.createCommCard}>
            <p className={styles.createCommCardTitle}>Create a community built <br />for real Connection.</p>

            <Button as='link' variant='plain' className={styles.createCommCardBtn} href='/community/create'>Create Community</Button>

            <BrandIcon name='clubberaGame' className={`${styles.particle} ${styles.design1}`}/>
            <BrandIcon name='clubberaHex' className={`${styles.particle} ${styles.design2}`}/>
            <BrandIcon name='clubberaOreo' className={`${styles.particle} ${styles.design3}`}/>
            <BrandIcon name='clubberaPlay' className={`${styles.particle} ${styles.design4}`}/>
            <BrandIcon name='clubberaTaiwo' className={`${styles.particle} ${styles.design5}`}/>
            <BrandIcon name='clubberaTriangle' className={`${styles.particle} ${styles.design6}`}/>
            <BrandIcon name='clubberaKehinde' className={`${styles.particle} ${styles.design7}`}/>
        </div>
    )
}

export default function NoContent() {
    return (
        <div className={styles.container}>
            <div className={styles.noPost}>
                <NoPostCard />

                <p className={styles.noPostText}>You need to join a <br />community to view feed</p>
            </div>

            <CreateCommunityCard />
        </div>
    )
}
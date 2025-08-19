import Button from '@/components/ui/Button/Button';
import NoPost from '@/components/ui/NoPost/NoPost';
import styles from './NoContent.module.css';


function CreateCommunityCard() {
    return (
        <div className={styles.createCommCard}>
            <p className={styles.createCommCardTitle}>Create a community built <br />for real Connection.</p>

            <Button as='link' variant='plain' className={styles.createCommCardBtn} href='/community/create'>Create Community</Button>

            <span className={`${styles.particle} ${styles.design1}`}/>
            <span className={`${styles.particle} ${styles.design2}`}/>
            <span className={`${styles.particle} ${styles.design3}`}/>
        </div>
    )
}

export default function NoContent() {
    return (
        <div className={styles.container}>
            <NoPost text="You need to join community to view feed"/>

            <CreateCommunityCard />
        </div>
    )
}
import Icon from '@/components/ui/Icon/Icon';
import styles from './MessagesEmptyStateSkeleton.module.css';

export default function MessagesEmptyStateSkeleton() {
    return (
        <>
            <Icon className={styles.artIcon} name="lineArt" color="var(--color-default)"/>
            <div className={`skeleton ${styles.textSkeleton}`}></div>
        </>
    );
}

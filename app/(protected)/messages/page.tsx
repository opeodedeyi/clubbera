import Icon from '@/components/ui/Icon/Icon';
import styles from '@/styles/pages/messages.module.css';

export default function MessagesEmptyPage() {
    return (
        <div className={`${styles.chatArea} ${styles.emptyChat}`}>
            <Icon className={styles.artIcon} name="lineArt" color="var(--color-default)"/>
            <p>Chat, plan, and connect <br />— all within the app</p>
        </div>
    );
}

import MessagesEmptyStateSkeleton from '@/components/Messages/MessagesEmptyStateSkeleton/MessagesEmptyStateSkeleton';
import styles from '@/styles/pages/messages.module.css';

export default function MessagesLoading() {
    return (
        <div className={`${styles.chatArea} ${styles.emptyChat}`}>
            <MessagesEmptyStateSkeleton />
        </div>
    );
}

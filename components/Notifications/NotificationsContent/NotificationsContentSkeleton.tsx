import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import NotificationDayGroupSkeleton from '../NotificationDayGroup/NotificationDayGroupSkeleton';
import styles from './NotificationsContent.module.css';

export default function NotificationsContentSkeleton() {
    return (
        <CenterContainer>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Notifications</h1>
                </div>

                <div className={styles.notificationsWrapper}>
                    <NotificationDayGroupSkeleton itemCount={2} />
                    <NotificationDayGroupSkeleton itemCount={3} />
                </div>
            </div>
        </CenterContainer>
    );
}

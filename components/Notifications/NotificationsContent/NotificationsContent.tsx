'use client';

import { isToday, isYesterday } from 'date-fns';
import { formatDate } from '@/lib/utils/dateFormatter';
import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import NotificationDayGroup from '../NotificationDayGroup/NotificationDayGroup';
import NotificationsContentSkeleton from './NotificationsContentSkeleton';
import { useNotifications } from '@/lib/hooks/useNotifications';
import type { Notification } from '@/lib/types/notifications';
import styles from './NotificationsContent.module.css';

interface GroupedNotifications {
    [dayLabel: string]: Notification[];
}

export default function NotificationsContent() {
    const {
        notifications,
        loading,
        error,
        handleNotificationClick
    } = useNotifications();

    const groupNotificationsByDay = (notifications: Notification[]): GroupedNotifications => {
        const groups: GroupedNotifications = {};

        notifications.forEach((notification) => {
            const notifDate = new Date(notification.created_at);

            let dayLabel: string;
            if (isToday(notifDate)) {
                dayLabel = "Today";
            } else if (isYesterday(notifDate)) {
                dayLabel = "Yesterday";
            } else {
                dayLabel = formatDate(notifDate, 'long');
            }

            if (!groups[dayLabel]) {
                groups[dayLabel] = [];
            }
            groups[dayLabel].push(notification);
        });

        return groups;
    };

    const groupedNotifications = groupNotificationsByDay(notifications);

    if (loading) {
        return <NotificationsContentSkeleton />;
    }

    if (error) {
        return (
            <CenterContainer>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>Notifications</h1>
                    </div>
                    <div className={styles.emptyState}>
                        {error}
                    </div>
                </div>
            </CenterContainer>
        );
    }

    return (
        <CenterContainer>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Notifications</h1>
                </div>

                {Object.keys(groupedNotifications).length > 0 ? (
                    <div className={styles.notificationsWrapper}>
                        {Object.entries(groupedNotifications).map(([dayLabel, notifs]) => (
                            <NotificationDayGroup
                                key={dayLabel}
                                dayLabel={dayLabel}
                                notifications={notifs}
                                onNotificationClick={handleNotificationClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        Opps, Nothing to see here
                    </div>
                )}
            </div>
        </CenterContainer>
    );
}

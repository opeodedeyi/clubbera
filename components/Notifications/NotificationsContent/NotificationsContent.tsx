'use client';

import { useState, useEffect } from 'react';
import { isToday, isYesterday } from 'date-fns';
import { formatDate } from '@/lib/utils/dateFormatter';
import CenterContainer from "@/components/layout/CenterContainer/CenterContainer";
import NotificationDayGroup from '../NotificationDayGroup/NotificationDayGroup';
import { Notification } from '../NotificationItem/NotificationItem';
import styles from './NotificationsContent.module.css';

interface GroupedNotifications {
    [dayLabel: string]: Notification[];
}

// Mock data - replace with actual API call
const mockNotifications: Notification[] = [
    {
        id: 1,
        type: "event",
        content: "New event created in Tech Community: Weekly Meetup",
        timestamp: new Date().toISOString(),
        read: false,
    },
    {
        id: 2,
        type: "community",
        content: "John Doe requested to join Your Community",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
    },
    {
        id: 3,
        type: "other",
        content: "Sarah liked your post",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
    },
];

export default function NotificationsContent() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

    useEffect(() => {
        // TODO: Replace with actual API call
        const fetchNotifications = async () => {
            try {
                // Simulate API call
                // const data = await notificationApi.getNotifications();
                // setNotifications(data);
                setNotifications(mockNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const groupNotificationsByDay = (notifications: Notification[]): GroupedNotifications => {
        const groups: GroupedNotifications = {};

        notifications.forEach((notification) => {
            const notifDate = new Date(notification.timestamp);

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
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        No notifications
                    </div>
                )}
            </div>
        </CenterContainer>
    );
}

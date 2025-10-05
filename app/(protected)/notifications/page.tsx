import { Suspense } from 'react';
import NotificationsContent from '@/components/Notifications/NotificationsContent/NotificationsContent';
import NotificationsContentSkeleton from '@/components/Notifications/NotificationsContent/NotificationsContentSkeleton';

export default function NotificationsPage() {
    return (
        <Suspense fallback={<NotificationsContentSkeleton />}>
            <NotificationsContent />
        </Suspense>
    );
}

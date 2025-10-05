import { Suspense } from 'react';
import EventsContent from '@/components/events/EventsContent/EventsContent';
import EventsContentSkeleton from '@/components/events/EventsContent/EventsContentSkeleton';

export default function Events() {
    return (
        <Suspense fallback={<EventsContentSkeleton />}>
            <EventsContent />
        </Suspense>
    )
}
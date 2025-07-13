import { Suspense } from 'react';
import EventsContent from '@/components/events/EventsContent/EventsContent';

export default function Events() {
    return (
        <Suspense fallback={<EventsLoading />}>
            <EventsContent />
        </Suspense>
    )
}

function EventsLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
                <div className="flex gap-4 mb-6">
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                    <div className="h-10 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="h-96 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}
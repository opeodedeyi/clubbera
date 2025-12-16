import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import EventDetailsContent from '@/components/event/EventDetails/EventDetailsContent/EventDetailsContent';
import EventDetailsContentSkeleton from '@/components/event/EventDetails/EventDetailsContent/EventDetailsContentSkeleton';
import { getEventById } from '@/lib/api/eventServer';
import { type AttendanceStatus } from '@/lib/utils/attendanceFormatter';

interface EventPageProps {
    params: Promise<{
        identifier: string
    }>
}

function toAttendanceStatus(status: string | null | undefined): AttendanceStatus {
    if (!status) return null;
    
    const validStatuses: AttendanceStatus[] = ['attending', 'not_attending', 'waitlisted', 'maybe', 'pending'];
    if (validStatuses.includes(status as AttendanceStatus)) {
        return status as AttendanceStatus;
    }
    
    return null; // Fallback for unknown statuses
}


export default async function EventPage({ params }: EventPageProps) {
    try {
        const { identifier } = await params
        const eventId = parseInt(identifier);
        if (isNaN(eventId)) {
            notFound();
        }

        const response = await getEventById(eventId)
        const { event, userContext, canAccess } = response.data;
        const attendanceStatus = toAttendanceStatus(userContext?.attendanceStatus);

        if (!canAccess) {
            return <AccessDeniedPage />;
        }

        return (
            <div>
                <Suspense fallback={<EventDetailsContentSkeleton />}>
                    <EventDetailsContent
                        initialEvent={event}
                        attendanceStatus={attendanceStatus}
                        membership={userContext?.membership} />
                </Suspense>
            </div>
        )
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Event not found') || 
                error.message.includes('404') ||
                error.message.includes('API Error: 404')) {
                notFound();
            }
            if (error.message.includes('Access denied') || 
                error.message.includes('403') ||
                error.message.includes('API Error: 403')) {
                return <AccessDeniedPage />;
            }
        }

        console.error('Event page error:', error);
        throw error; // Let error boundary handle other errors
    }
}

function AccessDeniedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-600">You don&apos;t have permission to view this event.</p>
            </div>
        </div>
    )
}
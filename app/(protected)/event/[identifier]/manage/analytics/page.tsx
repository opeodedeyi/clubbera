import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import EventAnalytics from '@/components/ManageEvent/EventAnalytics/EventAnalytics';
import { getEventById } from '@/lib/api/eventServer';
import { communityServerApi } from '@/lib/api/communitiesServer';

interface ManageEventPageProps {
    params: Promise<{
        identifier: string
    }>
}


export default async function ManageAnalyticsPage({ params }: ManageEventPageProps) {
    try {
        const { identifier } = await params
        const eventId = parseInt(identifier);
        if (isNaN(eventId)) {
            notFound();
            return;
        }
        
        const response = await getEventById(eventId)
        const { event } = response.data;
        const communityPermissions = await communityServerApi.getCommunityPermissions(event.community.id);
        const canViewAnalytics = communityPermissions.data.canViewAnalytics;

        if (!canViewAnalytics) {
            return <AccessDeniedPage />;
        }
        
        return (
            <div>
                <Suspense fallback={<EventLoadingSkeleton />}>
                    <EventAnalytics initialEvent={event} />
                </Suspense>
            </div>
        )
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Event not found') {
                notFound()
            }
            if (error.message === 'Access denied') {
                return <AccessDeniedPage />
            }
        }
        throw error // Let error boundary handle other errors
    }
}

function EventLoadingSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-6"></div>
            </div>
        </div>
    )
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
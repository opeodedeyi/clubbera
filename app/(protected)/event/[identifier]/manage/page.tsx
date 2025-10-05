import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ManageEventContent from '@/components/ManageEvent/ManageEventContent/ManageEventContent';
import ManageEventContentSkeleton from '@/components/ManageEvent/ManageEventContent/ManageEventContentSkeleton';
import { getEventById } from '@/lib/api/eventServer';
import { communityServerApi } from '@/lib/api/communitiesServer';

interface ManageEventPageProps {
    params: Promise<{
        identifier: string
    }>
}


export default async function ManageEventPage({ params }: ManageEventPageProps) {
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
        const canManageEvents = communityPermissions.data.canCreateEvents;

        if (!canManageEvents) {
            return <AccessDeniedPage />;
        }
        
        return (
            <div>
                <Suspense fallback={<ManageEventContentSkeleton />}>
                    <ManageEventContent initialEvent={event} />
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
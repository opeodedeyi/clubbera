import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ManageEventContent from '@/components/event/ManageEvent/ManageEventContent/ManageEventContent';
import { getEventByUrl } from '@/lib/api/events';

interface ManageEventPageProps {
    params: Promise<{
        url: string
    }>
}


export default async function ManageEventPage({ params }: ManageEventPageProps) {
    try {
        const { url } = await params
        console.log('Event URL:', url)
        const event = await getEventByUrl(url)
        
        return (
            <div>
                <Suspense fallback={<EventLoadingSkeleton />}>
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
        <p className="text-gray-600">You don't have permission to view this event.</p>
      </div>
    </div>
  )
}
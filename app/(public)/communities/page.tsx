import { Suspense } from 'react';
import CommunitiesContent from '@/components/communities/CommunitiesContent/CommunitiesContent';

export default function Communities() {
    return (
        <Suspense fallback={<CommunitiesLoading />}>
            <CommunitiesContent />
        </Suspense>
    )
}

function CommunitiesLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
                <div className="h-96 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}
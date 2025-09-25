import { communityServerApi } from '@/lib/api/communitiesServer';
import type { CommunityData } from '@/lib/api/communities';
import { notFound, redirect } from 'next/navigation';
import CommunityEventsClient from '@/components/community/CommunityEventsClient/CommunityEventsClient';

interface CommunityPageProps {
    params: Promise<{
        identifier: string;
    }>;
}

export default async function EventsOfCommunityPage({ params }: CommunityPageProps) {
    const { identifier } = await params;
    let community: CommunityData | null = null;
    let error: string | null = null;

    try {
        const response = await communityServerApi.getCommunity(identifier);
        community = response.data;
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to load community';
        if (err instanceof Error && err.message.includes('404')) {
            notFound();
        }
    }

    if (error || !community) {
        notFound();
    }

    const isMember = community.user?.isMember || false;

    if (!isMember) {
        return (
            redirect(`/community/${identifier}`)
        );
    }

    return (
        <CommunityEventsClient 
            community={community} />
    );
}

export async function generateMetadata() {
    return {
        title: 'Community events',
        description: 'Members of Community',
    };
}
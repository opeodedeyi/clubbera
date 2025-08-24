import { communityServerApi } from '@/lib/api/communitiesServer';
import type { CommunityData } from '@/lib/api/communities';
import { notFound, redirect } from 'next/navigation';
import CommunityMembersClient from '@/components/community/CommunityMembersClient/CommunityMembersClient';

interface CommunityPageProps {
    params: Promise<{
        identifier: string;
    }>;
}

export default async function MembersOfCommunityPage({ params }: CommunityPageProps) {
    const { identifier } = await params;
    let community: CommunityData | null = null;
    let error: string | null = null;

    try {
        const response = await communityServerApi.getCommunity(identifier);
        console.log('API response: ', response);
        
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
        <CommunityMembersClient 
            community={community} />
    );
}

export async function generateMetadata() {
    return {
        title: 'Community members',
        description: 'Members of Community',
    };
}
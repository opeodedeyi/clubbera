import { notFound, redirect } from 'next/navigation';
import { communityServerApi } from '@/lib/api/communitiesServer';

interface Props {
    params: Promise<{ identifier: string }>;
}

async function getCommunityData(communityId: number) {
    try {
        const [communityResponse, permissionsResponse] = await Promise.all([
            communityServerApi.getCommunity(communityId), // may not be needed
            communityServerApi.getCommunityPermissions(communityId)
        ]);
        
        return {
            community: communityResponse.data, // may not be needed
            permissions: permissionsResponse.data
        };
    } catch (error) {
        console.error('Server-side API error:', error);
        return null;
    }
}

export default async function EditCommunityPage({ params }: Props) {
    const { identifier } = await params;
    const communityId = parseInt(identifier);
    
    if (isNaN(communityId)) {
        notFound();
    }

    const data = await getCommunityData(communityId);

    if (!data) {
        notFound();
    }
    
    if (!data.permissions.canManageMembers) {
        redirect(`/community/${identifier}`);
    }

    return (
        // change to view member page
        <></>
    );
}

export async function generateMetadata() {
     return {
        title: 'Manage Members of Community',
        description: 'Manage members of your community',
    };
}
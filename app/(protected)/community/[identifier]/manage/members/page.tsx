import { notFound, redirect } from 'next/navigation';
import { communityServerApi } from '@/lib/api/communitiesServer';
import MembersClient from '@/components/ManageCommunity/MembersClient/MembersClient';

interface Props {
    params: Promise<{ identifier: string }>;
}

async function getCommunityData(communityId: number) {
    try {
        const [permissionsResponse] = await Promise.all([
            communityServerApi.getCommunityPermissions(communityId)
        ]);
        
        return {
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
        <MembersClient
            communityId={communityId}
            permissions={data.permissions}/>
    );
}

export async function generateMetadata() {
     return {
        title: 'Manage Members of Community',
        description: 'Manage members of your community',
    };
}
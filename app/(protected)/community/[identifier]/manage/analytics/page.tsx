import { notFound, redirect } from 'next/navigation';
import { communityServerApi } from '@/lib/api/communitiesServer';
import AnalyticsClient from '@/components/ManageCommunity/AnalyticsClient/AnalyticsClient';

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
    
    if (!data.permissions.canViewAnalytics) {
        redirect(`/community/${identifier}`);
    }

    return (
        <AnalyticsClient
            communityId={communityId}
            permissions={data.permissions} />
    );
}

export async function generateMetadata({ params }: Props) {
    try {
        const { identifier } = await params;
        return {
            title: `Analytics - Community ${identifier}`,
            description: `View analytics and insights for community ${identifier}`,
        };
    } catch (error) {
        console.log(error);

        return {
            title: 'Community Not Found',
            description: 'The community you are looking for does not exist.',
        };
    }
}
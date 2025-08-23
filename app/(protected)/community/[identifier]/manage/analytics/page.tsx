import { notFound, redirect } from 'next/navigation';
import { communityServerApi } from '@/lib/api/communitiesServer';
import EditCommunityClient from '@/components/ManageCommunity/EditCommunityClient/EditCommunityClient';

interface Props {
    params: Promise<{ identifier: string }>;
}

async function getCommunityData(communityId: number) {
    try {
        const [communityResponse, permissionsResponse] = await Promise.all([
            communityServerApi.getCommunity(communityId),
            communityServerApi.getCommunityPermissions(communityId)
        ]);
        
        return {
            community: communityResponse.data,
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
        // change to view analytics page
        <EditCommunityClient 
            community={data.community}
            permissions={data.permissions} />
    );
}

export async function generateMetadata({ params }: Props) {
    const { identifier } = await params;
    const communityId = parseInt(identifier);

    try {
        const data = await getCommunityData(communityId);
        const community = data?.community;

        const profileImageUrl = community.profileImage?.key 
            ? `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${community.profileImage?.key}`
            : null;
        
        return {
            title: `Manage ${community.name} - Community`,
            description: community.tagline || community.description,
            openGraph: {
                title: community.name,
                description: community.tagline || community.description,
                ...(profileImageUrl && { images: [profileImageUrl] }),
            },
        };
    } catch (error) {
        console.log(error);
        
        return {
            title: 'Community Not Found',
            description: 'The community you are looking for does not exist.',
        };
    }
}
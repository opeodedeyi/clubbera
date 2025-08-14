import { notFound } from 'next/navigation';
import { communityServerApi } from '@/lib/api/communitiesServer';
import type { CommunityData } from '@/lib/api/communities';
import CommunityMemberView from '@/components/community/CommunityMemberView/CommunityMemberView';
import CommunityGuestView from '@/components/community/CommunityGuestView/CommunityGuestView';

interface CommunityPageProps {
    params: Promise<{
        identifier: string;
    }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
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
        // return <ErrorPage error={error} />;
        return <>error</>
    }

    const isMember = community.user?.isMember || false;
    // const isAdmin = community.user?.isAdmin || false;
    // const isOwner = community.user?.membershipDetails?.role === 'owner';

    if (isMember) {
        return (
            <CommunityMemberView 
                community={community} />
        );
    }

    return (
        <CommunityGuestView 
            community={community} />
    );
}

export async function generateMetadata({ params }: CommunityPageProps) {
    const { identifier } = await params;

    try {
        const response = await communityServerApi.getCommunity(identifier);
        const community = response.data;

        const profileImageUrl = community.profileImage?.key 
            ? `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${community.profileImage.key}`
            : null;
        
        return {
            title: `${community.name} - Community`,
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
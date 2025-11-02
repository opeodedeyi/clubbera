'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PostCard from '@/components/post/PostCard/PostCard';
import PostInput from '@/components/post/PostInput/PostInputComponent/PostInput';
import NoContent from '../NoContent/NoContent';
import FeedSkeleton from './FeedSkeleton';
import styles from './Feed.module.css';
import { communityApi } from '@/lib/api/communities';
import { postsApi } from '@/lib/api/posts';
import type { Post } from '@/lib/types/posts';
import type { UploadedImage } from '@/hooks/usePostInput';

interface Community {
    id: string;
    name: string;
}

interface PollOption {
    text: string;
}

interface PollData {
    question: string;
    options: PollOption[];
    duration: number | null;
}


export default function Feed() {
    const queryClient = useQueryClient();

    // Fetch user's communities
    const { data: communitiesData, isLoading: isLoadingCommunities } = useQuery({
        queryKey: ['my-communities'],
        queryFn: async () => {
            const response = await communityApi.getMyCommunities(50, 0);
            return response.data;
        }
    });

    // Transform communities data for PostInput
    const communities: Community[] = communitiesData?.map(community => ({
        id: community.id.toString(),
        name: community.name
    })) || [];

    // Fetch posts from feed
    const { data: feedData, isLoading: isLoadingFeed } = useQuery({
        queryKey: ['feed'],
        queryFn: async () => {
            const response = await postsApi.getFeed({ limit: 20, offset: 0 });
            console.log('Fetched feed posts:', response.data);
            return response.data;
        },
        enabled: !!communitiesData && communitiesData.length > 0
    });

    // Create post mutation
    const createPostMutation = useMutation({
        mutationFn: async ({
            communityId,
            content,
            pollData,
            uploadedImages
        }: {
            communityId: string;
            content: string;
            pollData?: PollData;
            uploadedImages?: UploadedImage[];
        }) => {
            if (pollData) {
                // Calculate end date from duration
                const endDate = pollData.duration
                    ? new Date(Date.now() + pollData.duration * 60 * 60 * 1000).toISOString()
                    : null;

                return postsApi.createPoll({
                    communityId: parseInt(communityId),
                    content,
                    isSupportersOnly: false,
                    pollData: {
                        question: pollData.question,
                        options: pollData.options,
                        settings: {
                            allowMultipleVotes: false,
                            endDate
                        }
                    }
                });
            } else {
                return postsApi.createPost({
                    communityId: parseInt(communityId),
                    content,
                    isSupportersOnly: false,
                    images: uploadedImages?.map(img => ({
                        provider: img.provider,
                        key: img.key,
                        altText: img.altText
                    }))
                });
            }
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        }
    });

    const handlePostSubmit = (communityId: string, content: string, pollData?: PollData, uploadedImages?: UploadedImage[]) => {
        if (!pollData && !uploadedImages && !content.trim()) return;
        createPostMutation.mutate({ communityId, content, pollData, uploadedImages });
    };

    if (isLoadingCommunities || isLoadingFeed) {
        return <FeedSkeleton />;
    }

    if (!communities || communities.length === 0) {
        return (
            <div className={styles.feed}>
                <NoContent />
            </div>
        );
    }

    if (!feedData || feedData.length === 0) {
        return (
            <div className={styles.feed}>
                <PostInput
                    communities={communities}
                    onSubmit={handlePostSubmit} />
                <NoContent />
            </div>
        );
    }

    return (
        <div className={styles.feed}>
            <PostInput
                communities={communities}
                onSubmit={handlePostSubmit}
                className='desktop-only-flex' />

            {feedData.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
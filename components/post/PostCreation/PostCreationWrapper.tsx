'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostInputPopup from '@/components/post/PostInput/PostInputPopup/PostInputPopup';
import { usePostCreation } from '@/components/providers/PostCreationProvider';
import { useHeaderVariant } from '@/components/providers/HeaderVariantProvider';
import { communityApi } from '@/lib/api/communities';
import { postsApi } from '@/lib/api/posts';
import type { PollData, UploadedImage } from '@/hooks/usePostInput';

// interface PollOption {
//     text: string;
// }

// interface PollDataForAPI {
//     question: string;
//     options: PollOption[];
//     duration: number | null;
// }

export default function PostCreationWrapper() {
    const { isOpen, preselectedCommunityId, closeCreatePost } = usePostCreation();
    const { variant } = useHeaderVariant();
    const queryClient = useQueryClient();

    // Fetch user's communities
    const { data: communitiesData } = useQuery({
        queryKey: ['my-communities'],
        queryFn: async () => {
            const response = await communityApi.getMyCommunities(50, 0);
            return response.data;
        },
        enabled: isOpen
    });

    // Transform communities for PostInputPopup
    const communities = communitiesData?.map(community => ({
        id: community.id.toString(),
        name: community.name
    })) || [];

    // Determine initial community ID
    const initialCommunityId = preselectedCommunityId ||
        (variant?.communityData ? variant.communityData.id.toString() : undefined);

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
        onSuccess: async (_, variables) => {
            // Invalidate relevant queries to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ['community-posts', parseInt(variables.communityId)] });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        }
    });

    const handlePostSubmit = (
        communityId: string,
        content: string,
        pollData?: PollData,
        uploadedImages?: UploadedImage[]
    ) => {
        if (!pollData && !uploadedImages && !content.trim()) return;
        createPostMutation.mutate({ communityId, content, pollData, uploadedImages });
    };

    if (!isOpen || communities.length === 0) return null;

    return (
        <PostInputPopup
            communities={communities}
            isOpen={isOpen}
            onClose={closeCreatePost}
            onSubmit={handlePostSubmit}
            initialCommunityId={initialCommunityId} />
    );
}

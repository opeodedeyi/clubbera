'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostCard from '@/components/post/PostCard/PostCard';
import PostInput from '@/components/post/PostInput/PostInputComponent/PostInput';
import NoPost from '@/components/ui/NoPost/NoPost';
import CommunityPostsSkeleton from './CommunityPostsSkeleton';
import { CommunityData } from '@/lib/api/communities';
import { postsApi } from '@/lib/api/posts';
import type { Post } from '@/lib/types/posts';
import type { UploadedImage } from '@/hooks/usePostInput';
import styles from './CommunityPosts.module.css';

interface PollOption {
    text: string;
}

interface PollData {
    question: string;
    options: PollOption[];
    duration: number | null;
}

interface CommunityPostsProps {
    community: CommunityData;
    className?: string;
}

export default function CommunityPosts({ community, className }: CommunityPostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const queryClient = useQueryClient();

    // Fetch posts for this specific community
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await postsApi.getCommunityPosts(community.id, { limit: 20, offset: 0 });

                // Sort by created_at date (newest first)
                const sortedPosts = response.data.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setPosts(sortedPosts);
            } catch (error) {
                console.error('Failed to fetch community posts:', error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [community.id]);

    // Create post mutation
    const createPostMutation = useMutation({
        mutationFn: async ({
            content,
            pollData,
            uploadedImages
        }: {
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
                    communityId: community.id,
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
                    communityId: community.id,
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
        onSuccess: async (response) => {
            // Refetch posts to get complete data with user info
            try {
                const postsResponse = await postsApi.getCommunityPosts(community.id, { limit: 20, offset: 0 });

                // Sort by created_at date (newest first)
                const sortedPosts = postsResponse.data.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setPosts(sortedPosts);
                queryClient.invalidateQueries({ queryKey: ['community-posts', community.id] });
            } catch (error) {
                console.error('Failed to refetch posts:', error);
            }
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        }
    });

    const handlePostSubmit = (communityId: string, content: string, pollData?: PollData, uploadedImages?: UploadedImage[]) => {
        if (!pollData && !uploadedImages && !content.trim()) return;
        createPostMutation.mutate({ content, pollData, uploadedImages });
    };

    // Transform community data for PostInput (single community)
    const communityForInput = {
        id: community.id.toString(),
        name: community.name
    };

    if (isLoading) {
        return <CommunityPostsSkeleton />;
    }

    if (posts.length === 0) {
        return (
            <div className={`${styles.communityPosts} ${className || ''}`}>
                <PostInput
                    communities={[communityForInput]}
                    onSubmit={handlePostSubmit}
                />
                <div className={styles.communityNoPosts}>
                    <NoPost text="Opps, this community has no posts" />
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.communityPosts} ${className || ''}`}>
            <PostInput
                communities={[communityForInput]}
                onSubmit={handlePostSubmit}
            />

            {posts.map(post => (
                <PostCard key={post.id} post={post} variant="community" />
            ))}
        </div>
    );
}

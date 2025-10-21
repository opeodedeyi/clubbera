'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PostCard from '@/components/post/PostCard/PostCard';
import PostInput from '@/components/post/PostInput/PostInput';
import NoContent from '../NoContent/NoContent';
import FeedSkeleton from './FeedSkeleton';
import styles from './Feed.module.css';
import { communityApi } from '@/lib/api/communities';
import { postsApi } from '@/lib/api/posts';
import type { Post } from '@/lib/types/posts';

interface Community {
    id: string;
    name: string;
}


export default function Feed() {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
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

    // Fetch posts from all communities
    useEffect(() => {
        if (!communitiesData || communitiesData.length === 0) {
            setAllPosts([]);
            return;
        }

        const fetchAllPosts = async () => {
            try {
                const postsPromises = communitiesData.map(community =>
                    postsApi.getCommunityPosts(community.id, { limit: 20, offset: 0 })
                );

                const postsResponses = await Promise.all(postsPromises);
                const allFetchedPosts = postsResponses.flatMap(response => response.data);

                // Sort by created_at date (newest first)
                allFetchedPosts.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setAllPosts(allFetchedPosts);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                setAllPosts([]);
            }
        };

        fetchAllPosts();
    }, [communitiesData]);

    // Create post mutation
    const createPostMutation = useMutation({
        mutationFn: async ({ communityId, content }: { communityId: string; content: string }) => {
            return postsApi.createPost({
                communityId: parseInt(communityId),
                content,
                isSupportersOnly: false
            });
        },
        onSuccess: (response) => {
            // Add new post to the top of the feed
            setAllPosts(prev => [response.data, ...prev]);
            queryClient.invalidateQueries({ queryKey: ['my-communities'] });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        }
    });

    const handlePostSubmit = (communityId: string, content: string) => {
        if (!content.trim()) return;
        createPostMutation.mutate({ communityId, content });
    };

    if (isLoadingCommunities) {
        return <FeedSkeleton />;
    }

    if (!communities || communities.length === 0) {
        return (
            <div className={styles.feed}>
                <NoContent />
            </div>
        );
    }

    if (allPosts.length === 0) {
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
                onSubmit={handlePostSubmit} />

            {allPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
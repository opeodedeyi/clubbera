'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostCard from '@/components/post/PostCard/PostCard';
import PostInput from '@/components/post/PostInput/PostInput';
import NoPost from '@/components/ui/NoPost/NoPost';
import CommunityPostsSkeleton from './CommunityPostsSkeleton';
import { CommunityData } from '@/lib/api/communities';
import { postsApi } from '@/lib/api/posts';
import type { Post } from '@/lib/types/posts';
import styles from './CommunityPosts.module.css';

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
        mutationFn: async ({ content }: { content: string }) => {
            return postsApi.createPost({
                communityId: community.id,
                content,
                isSupportersOnly: false
            });
        },
        onSuccess: (response) => {
            // Add new post to the top of the feed
            setPosts(prev => [response.data, ...prev]);
            queryClient.invalidateQueries({ queryKey: ['community-posts', community.id] });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        }
    });

    const handlePostSubmit = (communityId: string, content: string) => {
        if (!content.trim()) return;
        createPostMutation.mutate({ content });
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

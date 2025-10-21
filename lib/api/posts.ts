// lib/api/posts.ts
import { api } from '../api';
import type {
    Post,
    PostResponse,
    PostsResponse,
    RepliesResponse,
    ReactionsResponse,
    ReactionResponse,
    UserReactionResponse,
    ApiSuccessResponse,
    CreatePostRequest,
    CreatePollRequest,
    CreateReplyRequest,
    UpdateReplyRequest,
    VotePollRequest,
    AddReactionRequest,
    RemoveReactionRequest,
    GetCommunityPostsOptions,
    GetRepliesOptions,
    GetReactionsOptions
} from '../types/posts';

export const postsApi = {
    createPost: async (data: CreatePostRequest): Promise<PostResponse> => {
        return api.post<PostResponse>('/posts', data);
    },

    getPost: async (postId: number): Promise<PostResponse> => {
        return api.get<PostResponse>(`/posts/${postId}`);
    },

    getCommunityPosts: async (
        communityId: number,
        options: GetCommunityPostsOptions = {}
    ): Promise<PostsResponse> => {
        const params = new URLSearchParams({
            limit: (options.limit || 20).toString(),
            offset: (options.offset || 0).toString(),
            ...(options.contentType && { contentType: options.contentType }),
            ...(options.supportersOnly !== undefined && { supportersOnly: options.supportersOnly.toString() })
        });
        return api.get<PostsResponse>(`/posts/community/${communityId}?${params}`);
    },

    deletePost: async (postId: number): Promise<ApiSuccessResponse> => {
        return api.delete<ApiSuccessResponse>(`/posts/${postId}`);
    },

    createPoll: async (data: CreatePollRequest): Promise<PostResponse> => {
        return api.post<PostResponse>('/posts/polls', data);
    },

    votePoll: async (pollId: number, data: VotePollRequest): Promise<PostResponse> => {
        return api.post<PostResponse>(`/posts/polls/${pollId}/vote`, data);
    },

    endPoll: async (pollId: number): Promise<ApiSuccessResponse> => {
        return api.post<ApiSuccessResponse>(`/posts/polls/${pollId}/end`);
    },

    getReplies: async (
        postId: number,
        options: GetRepliesOptions = {}
    ): Promise<RepliesResponse> => {
        const params = new URLSearchParams({
            limit: (options.limit || 20).toString(),
            offset: (options.offset || 0).toString()
        });
        return api.get<RepliesResponse>(`/posts/${postId}/replies?${params}`);
    },

    createReply: async (postId: number, data: CreateReplyRequest): Promise<PostResponse> => {
        return api.post<PostResponse>(`/posts/${postId}/replies`, data);
    },

    updateReply: async (replyId: number, data: UpdateReplyRequest): Promise<PostResponse> => {
        return api.put<PostResponse>(`/posts/replies/${replyId}`, data);
    },

    deleteReply: async (replyId: number): Promise<ApiSuccessResponse> => {
        return api.delete<ApiSuccessResponse>(`/posts/replies/${replyId}`);
    },

    getReactions: async (
        postId: number,
        options: GetReactionsOptions = {}
    ): Promise<ReactionsResponse> => {
        const params = new URLSearchParams({
            limit: (options.limit || 20).toString(),
            offset: (options.offset || 0).toString()
        });
        return api.get<ReactionsResponse>(`/posts/${postId}/reactions?${params}`);
    },

    addReaction: async (postId: number, data: AddReactionRequest): Promise<ReactionResponse> => {
        return api.post<ReactionResponse>(`/posts/${postId}/reactions`, data);
    },

    removeReaction: async (postId: number, data: RemoveReactionRequest): Promise<ReactionResponse> => {
        return api.delete<ReactionResponse>(`/posts/${postId}/reactions`, data);
    },

    getUserReaction: async (postId: number): Promise<UserReactionResponse> => {
        return api.get<UserReactionResponse>(`/posts/${postId}/reactions/me`);
    }
};

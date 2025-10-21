// lib/types/posts.ts

export type ContentType = 'post' | 'poll' | 'event';
export type ReactionType = 'like';

export interface PostImage {
    id?: number;
    provider: string;
    key: string;
    altText?: string | null;
    alt_text?: string | null;
}

export interface PostUser {
    id: number;
    full_name: string;
    fullName?: string;
    unique_url: string;
    uniqueUrl?: string;
    profile_image?: PostImage | null;
    profileImage?: PostImage | null;
}

export interface PollOption {
    text: string;
    votes?: number;
}

export interface PollSettings {
    allowMultipleVotes: boolean;
    endDate: string | null;
}

export interface PollVote {
    userId: number;
    optionIndices: number[];
    votedAt: string;
}

export interface PollData {
    question: string;
    options: PollOption[];
    settings: PollSettings;
    votes?: PollVote[];
}

export interface UserVote {
    optionIndices: number[];
    votedAt: string;
    voteCount: number;
}

export interface Post {
    id: number;
    community_id: number;
    communityId?: number;
    user_id: number;
    userId?: number;
    content: string;
    content_type: ContentType;
    contentType?: ContentType;
    is_supporters_only: boolean;
    isSupportersOnly?: boolean;
    is_hidden: boolean;
    isHidden?: boolean;
    parent_id?: number | null;
    parentId?: number | null;
    is_edited?: boolean;
    isEdited?: boolean;
    edited_at?: string | null;
    editedAt?: string | null;
    user: PostUser;
    community_name: string;
    communityName?: string;
    community_url: string;
    communityUrl?: string;
    likes_count: number;
    likesCount?: number;
    replies_count: number;
    repliesCount?: number;
    user_has_liked?: boolean;
    userHasLiked?: boolean;
    images?: PostImage[];
    poll_data?: PollData;
    pollData?: PollData;
    userHasVoted?: boolean;
    userVote?: UserVote | null;
    created_at: string;
    createdAt?: string;
    updated_at: string;
    updatedAt?: string;
}

export interface Reaction {
    id: number;
    post_id: number;
    postId?: number;
    user_id: number;
    userId?: number;
    reaction_type: ReactionType;
    reactionType?: ReactionType;
    user?: PostUser;
    created_at: string;
    createdAt?: string;
}

// Request types
export interface CreatePostRequest {
    communityId: number;
    content: string;
    isSupportersOnly?: boolean;
    images?: {
        provider: string;
        key: string;
        altText?: string;
    }[];
}

export interface CreatePollRequest {
    communityId: number;
    content: string;
    isSupportersOnly?: boolean;
    pollData: {
        question: string;
        options: { text: string }[];
        settings: {
            allowMultipleVotes: boolean;
            endDate?: string | null;
        };
    };
}

export interface CreateReplyRequest {
    content: string;
    images?: {
        provider: string;
        key: string;
        altText?: string;
    }[];
}

export interface UpdateReplyRequest {
    content: string;
}

export interface VotePollRequest {
    optionIndices: number[];
}

export interface AddReactionRequest {
    reactionType: ReactionType;
}

export interface RemoveReactionRequest {
    reactionType: ReactionType;
}

// Response types
export interface PostResponse {
    status: string;
    data: Post;
}

export interface PostsResponse {
    status: string;
    data: Post[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
    };
}

export interface RepliesResponse {
    status: string;
    data: Post[];
    pagination: {
        limit: number;
        offset: number;
        hasMore: boolean;
    };
}

export interface ReactionsResponse {
    status: string;
    data: {
        reactions: Reaction[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
        };
    };
}

export interface ReactionResponse {
    status: string;
    message: string;
    data?: Reaction;
}

export interface UserReactionResponse {
    status: string;
    data: {
        hasReacted: boolean;
        reaction: Reaction | null;
    };
}

export interface ApiSuccessResponse {
    status: string;
    message: string;
    data?: {
        id: number;
        is_hidden?: boolean;
        isHidden?: boolean;
    };
}

// Query options
export interface GetCommunityPostsOptions {
    limit?: number;
    offset?: number;
    contentType?: ContentType;
    supportersOnly?: boolean;
}

export interface GetRepliesOptions {
    limit?: number;
    offset?: number;
}

export interface GetReactionsOptions {
    limit?: number;
    offset?: number;
}

// lib/types/messages.ts

export type RecipientType = 'user' | 'community';
export type MessageType = 'direct' | 'community';

export interface Message {
    id: number;
    sender_id: number;
    recipient_type: RecipientType;
    recipient_id: number;
    is_sent_by_me: boolean;
    content: string;
    sender_name: string;
    parent_message_id: number | null;
    is_read: boolean;
    created_at: string;
}

export interface Conversation {
    id: number;
    message_type: MessageType;
    content: string;
    conversation_name: string;
    conversation_url: string;
    conversation_recipient_id: number| string;
    sender_name: string;
    sender_id: number | string;
    unread_count: number;
    created_at: string;
    recipient_type?: RecipientType;
    recipient_id?: number;
}

export interface SendMessageRequest {
    recipientType: RecipientType;
    recipientId: number;
    content: string;
    parentMessageId?: number | null;
}

export interface MarkConversationReadRequest {
    recipientType: RecipientType;
    recipientId: number;
}

export interface TypingIndicatorRequest {
    recipientType: RecipientType;
    recipientId: number;
    isTyping: boolean;
}

export interface ConversationsResponse {
    status: string;
    data: {
        conversations: Conversation[];
    };
}

export interface RecipientProfileImage {
    id: number;
    provider: string;
    key: string;
    alt_text: string | null;
}

export interface RecipientInfo {
    id: number;
    full_name?: string;  // For users
    name?: string;       // For communities
    unique_url: string;
    profile_image: RecipientProfileImage | null;
}

export interface MessagesPagination {
    limit: number;
    offset: number;
    hasMore: boolean;
}

export interface MessagesResponse {
    status: string;
    data: {
        messages: Message[];
        recipient: RecipientInfo;
        pagination: MessagesPagination;
    };
}

export interface UnreadCountResponse {
    status: string;
    data: {
        unreadCount: number;
    };
}

export interface MessageResponse {
    status: string;
    data: {
        message: Message;
    };
}

export interface ApiSuccessResponse {
    status: string;
    message: string;
}

// Socket.IO event payloads
export interface NewMessageEvent {
    message: Message;
}

export interface NewCommunityMessageEvent {
    message: Message;
}

export interface UserTypingEvent {
    userId: number;
    isTyping: boolean;
    recipientType: RecipientType;
    recipientId: number;
}

export interface MessageReadReceiptEvent {
    messageId: number;
    readBy: number;
}

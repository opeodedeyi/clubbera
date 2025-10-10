// lib/api/messages.ts
import { api } from '../api';
import type {
    SendMessageRequest,
    MarkConversationReadRequest,
    TypingIndicatorRequest,
    ConversationsResponse,
    MessagesResponse,
    UnreadCountResponse,
    MessageResponse,
    ApiSuccessResponse,
    RecipientType
} from '../types/messages';

export const messagesApi = {
    // Send a message to a user or community
    sendMessage: async (data: SendMessageRequest): Promise<MessageResponse> => {
        return api.post<MessageResponse>('/messages', data);
    },

    // Get all conversations for the current user
    getConversations: async (limit: number = 20, offset: number = 0): Promise<ConversationsResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        return api.get<ConversationsResponse>(`/messages/conversations?${params}`);
    },

    // Get messages for a specific conversation
    getConversation: async (
        recipientType: RecipientType,
        recipientId: number,
        limit: number = 50,
        offset: number = 0
    ): Promise<MessagesResponse> => {
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        });
        return api.get<MessagesResponse>(`/messages/${recipientType}/${recipientId}?${params}`);
    },

    // Mark a specific message as read
    markMessageAsRead: async (messageId: number): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>(`/messages/${messageId}/read`);
    },

    // Mark an entire conversation as read
    markConversationAsRead: async (data: MarkConversationReadRequest): Promise<ApiSuccessResponse> => {
        return api.put<ApiSuccessResponse>('/messages/conversations/read', data);
    },

    // Delete a message
    deleteMessage: async (messageId: number): Promise<ApiSuccessResponse> => {
        return api.delete<ApiSuccessResponse>(`/messages/${messageId}`);
    },

    // Get unread message count
    getUnreadCount: async (): Promise<UnreadCountResponse> => {
        return api.get<UnreadCountResponse>('/messages/unread-count');
    },

    // Search messages in a conversation
    searchMessages: async (
        query: string,
        recipientType?: RecipientType,
        recipientId?: number,
        limit: number = 20
    ): Promise<MessagesResponse> => {
        const params = new URLSearchParams({
            query,
            limit: limit.toString(),
            ...(recipientType && { recipientType }),
            ...(recipientId && { recipientId: recipientId.toString() })
        });
        return api.get<MessagesResponse>(`/messages/search?${params}`);
    },

    // Send typing indicator
    sendTypingIndicator: async (data: TypingIndicatorRequest): Promise<void> => {
        await api.post('/messages/typing', data);
    }
};

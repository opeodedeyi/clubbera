'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { usePathname } from 'next/navigation';
import { messagesApi } from '@/lib/api/messages';
import { useSocket } from '@/lib/socket/useSocket';
import type { Conversation } from '@/lib/types/messages';
import ConversationsListSkeleton from './ConversationsListSkeleton';
import styles from './ConversationsList.module.css';

export default function ConversationsList() {
    const pathname = usePathname();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { on, off } = useSocket();

    // Fetch conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await messagesApi.getConversations();
                setConversations(response.data.conversations);
            } catch (err) {
                console.error('Failed to fetch conversations:', err);

                // Extract error message from API response
                let errorMessage = 'Failed to load conversations';
                if (err instanceof Error) {
                    // Parse the API error message from the error string
                    const match = err.message.match(/{"status":"error","message":"([^"]+)"}/);
                    if (match && match[1]) {
                        errorMessage = match[1];
                    }
                }

                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();
    }, []);

    // Listen for new messages via Socket.IO
    useEffect(() => {
        const handleNewMessage = () => {
            // Refetch conversations when new message arrives
            messagesApi.getConversations().then(response => {
                setConversations(response.data.conversations);
            }).catch(err => {
                console.error('Failed to refresh conversations:', err);
            });
        };

        on('new_message', handleNewMessage);
        on('new_community_message', handleNewMessage);

        return () => {
            off('new_message', handleNewMessage);
            off('new_community_message', handleNewMessage);
        };
    }, [on, off]);

    if (loading) {
        return <ConversationsListSkeleton />;
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.conversations}>
                    <div className={styles.emptyState}>
                        <Icon className={styles.chatIcon} name="message" fillColor="var(--color-text-muted)" strokeColor="var(--color-background)" />
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.conversations}>
                {conversations.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Icon className={styles.chatIcon} name="message" fillColor="var(--color-text-muted)" strokeColor="var(--color-background)" />
                        <p>Opps, Nothing to see here</p>
                    </div>
                ) : (
                    conversations.map((conversation) => {
                        // Determine recipient type and ID from conversation
                        const recipientType = conversation.message_type === 'direct' ? 'user' : 'community';
                        const recipientId = conversation.recipient_id || conversation.id;

                        const href = `/messages/${recipientType}/${recipientId}`;
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={conversation.id}
                                href={href}
                                className={`${styles.conversation} ${isActive ? styles.active : ''}`}>
                                <div className={styles.avatar}>
                                    {conversation.conversation_name[0]}
                                </div>

                                <div className={styles.details}>
                                    <div className={styles.title}>
                                        <span className={styles.name}>{conversation.conversation_name}</span>
                                        {conversation.unread_count > 0 && (
                                            <span className={styles.unreadBadge}>{conversation.unread_count}</span>
                                        )}
                                    </div>

                                    <span className={styles.lastMessage}>{conversation.content}</span>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}

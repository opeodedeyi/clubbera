'use client';

import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import ActionIcon from '@/components/ui/ActionIcon/ActionIcon';
import { messagesApi } from '@/lib/api/messages';
import { useSocket } from '@/lib/socket/useSocket';
import type { Message, RecipientType } from '@/lib/types/messages';
import { format } from 'date-fns';
import ChatViewSkeleton from './ChatViewSkeleton';
import styles from './ChatView.module.css';

interface ChatViewProps {
    chatId: string;
    chatType: 'user' | 'community';
    currentUserId?: number; // Pass from parent if available
}

export default function ChatView({ chatId, chatType }: ChatViewProps) {
    const isMobile = !useMediaQuery('(min-width: 1024px)');
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const [sending, setSending] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [conversationName, setConversationName] = useState('');

    const { on, off } = useSocket();

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await messagesApi.getConversation(
                    chatType as RecipientType,
                    parseInt(chatId)
                );
                // Reverse to show oldest first (top) and newest last (bottom)
                setMessages(response.data.messages.reverse());

                // Set conversation name from recipient info
                const recipient = response.data.recipient;
                setConversationName(recipient.full_name || recipient.name || 'Unknown');

                // Mark conversation as read
                await messagesApi.markConversationAsRead({
                    recipientType: chatType as RecipientType,
                    recipientId: parseInt(chatId)
                });
            } catch (err) {
                console.error('Failed to fetch messages:', err);

                // Extract error message from API response
                let errorMessage = 'Failed to load messages';
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

        fetchMessages();
    }, [chatId, chatType]);

    // Scroll to bottom when messages change
    useEffect(() => {
        requestAnimationFrame(() => {
            scrollToBottom();
        });
    }, [messages]);

    // Listen for new messages
    useEffect(() => {
        const handleNewMessage = (data: { message: Message }) => {
            console.log('🔔 Socket event received:', data);
            const newMessage = data.message;

            // Only add message if it's for this conversation
            const isForThisConversation =
                (newMessage.recipient_type === chatType &&
                 newMessage.recipient_id === parseInt(chatId)) ||
                (newMessage.sender_id === parseInt(chatId) && chatType === 'user');

            console.log('Is for this conversation?', isForThisConversation, {
                chatType,
                chatId,
                messageRecipientType: newMessage.recipient_type,
                messageRecipientId: newMessage.recipient_id,
                messageSenderId: newMessage.sender_id
            });

            if (isForThisConversation) {
                setMessages(prev => {
                    // Avoid duplicates - check if message already exists
                    const exists = prev.some(m => m.id === newMessage.id);
                    if (exists) {
                        console.log('Message already exists, skipping');
                        return prev;
                    }
                    console.log('Adding new message to state');
                    return [...prev, newMessage];
                });

                // Mark as read
                messagesApi.markConversationAsRead({
                    recipientType: chatType as RecipientType,
                    recipientId: parseInt(chatId)
                }).catch(err => console.error('Failed to mark as read:', err));
            }
        };

        const handleTyping = (data: { userId: number; isTyping: boolean; recipientId: number }) => {
            if (data.recipientId === parseInt(chatId)) {
                setIsTyping(data.isTyping);
            }
        };

        console.log('Setting up socket listeners for chat:', chatId, chatType);
        on('new_message', handleNewMessage);
        on('new_community_message', handleNewMessage);
        on('user_typing', handleTyping);

        return () => {
            console.log('Cleaning up socket listeners');
            off('new_message', handleNewMessage);
            off('new_community_message', handleNewMessage);
            off('user_typing', handleTyping);
        };
    }, [chatId, chatType, on, off]);

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 1.5 * 16 * 7)}px`;

        setMessageInput(e.target.value);

        // Send typing indicator
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        messagesApi.sendTypingIndicator({
            recipientType: chatType as RecipientType,
            recipientId: parseInt(chatId),
            isTyping: true
        }).catch(err => console.error('Failed to send typing indicator:', err));

        // Stop typing indicator after 3 seconds
        typingTimeoutRef.current = setTimeout(() => {
            messagesApi.sendTypingIndicator({
                recipientType: chatType as RecipientType,
                recipientId: parseInt(chatId),
                isTyping: false
            }).catch(err => console.error('Failed to send typing indicator:', err));
        }, 3000);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || sending) return;

        try {
            setSending(true);
            const response = await messagesApi.sendMessage({
                recipientType: chatType as RecipientType,
                recipientId: parseInt(chatId),
                content: messageInput.trim()
            });

            // Add the sent message to the list with is_sent_by_me flag
            setMessages(prev => [...prev, { ...response.data.message, is_sent_by_me: true }]);
            setMessageInput('');

            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }

            // Stop typing indicator
            await messagesApi.sendTypingIndicator({
                recipientType: chatType as RecipientType,
                recipientId: parseInt(chatId),
                isTyping: false
            });
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (loading) {
        return <ChatViewSkeleton />;
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isMobile && (
                    <ActionIcon
                        as="link"
                        href="/messages"
                        icon={{ name: "arrowLeft", color: "var(--color-text-light)" }}
                        aria-label="Go to messages" />
                )}
                <p className={styles.chatName}>{conversationName || `${chatType} ${chatId}`}</p>
            </div>

            <div ref={messagesContainerRef} className={styles.messagesContainer}>
                {messages.map((message) => {
                    return (
                        <div
                            key={message.id}
                            className={`${styles.message} ${message.is_sent_by_me ? styles.sent : styles.received}`}>
                            <div className={styles.bubble}>
                                <p>{message.content}</p>
                                <span className={styles.timestamp}>
                                    {format(new Date(message.created_at), 'h:mm a')}
                                </span>
                            </div>
                        </div>
                    );
                })}
                {isTyping && (
                    <div className={`${styles.message} ${styles.received}`}>
                        <div className={styles.bubble}>
                            <p className={styles.typingIndicator}>typing...</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.messagesFooter}>
                <textarea
                    ref={textareaRef}
                    placeholder="Type a message"
                    className={styles.input}
                    rows={1}
                    value={messageInput}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    disabled={sending} />
                <Button
                    variant="default"
                    iconRight={<Icon name="arrowRight" size="sm" />}
                    iconOnlyMobile={true}
                    className='self-end'
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim() || sending}>
                    {sending ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
    );
}

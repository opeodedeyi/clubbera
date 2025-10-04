'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import ActionIcon from '@/components/ui/ActionIcon/ActionIcon';
import styles from './ChatView.module.css';

// Temporary mock data - replace with your actual data fetching
const mockMessages = [
    { id: '1', sender: 'them', text: 'Hey! How are you doing?', timestamp: '10:30 AM' },
    { id: '2', sender: 'me', text: 'I\'m good! How about you?', timestamp: '10:32 AM' },
    { id: '3', sender: 'them', text: 'Great! Just wanted to check in', timestamp: '10:33 AM' },
    { id: '4', sender: 'me', text: 'Thanks for checking in!', timestamp: '10:35 AM' },
    { id: '5', sender: 'them', text: 'No problem! Talk later?', timestamp: '10:36 AM' },
    { id: '6', sender: 'me', text: 'Sure, bye!', timestamp: '10:37 AM' },
    { id: '7', sender: 'them', text: 'See you!', timestamp: '10:38 AM' },
    { id: '8', sender: 'me', text: 'Take care!', timestamp: '10:39 AM' },
    { id: '9', sender: 'me', text: 'I Love you', timestamp: '10:39 AM' },
    { id: '10', sender: 'them', text: 'You too!', timestamp: '10:40 AM' }
];

interface ChatViewProps {
    chatId: string;
    chatType: 'user' | 'community';
}

export default function ChatView({ chatId, chatType }: ChatViewProps) {
    const router = useRouter();
    const isMobile = !useMediaQuery('(min-width: 1024px)');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 1.5 * 16 * 7)}px`;
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatId]);

    const handleBack = () => {
        router.push('/messages');
    };

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
                <p className={styles.chatName}>Afolabi T.</p>
            </div>

            <div className={styles.messagesContainer}>
                {mockMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${message.sender === 'me' ? styles.sent : styles.received}`}>
                        <div className={styles.bubble}>
                            <p>{message.text}</p>
                            <span className={styles.timestamp}>{message.timestamp}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.messagesFooter}>
                <textarea
                    ref={textareaRef}
                    placeholder="Type a message"
                    className={styles.input}
                    rows={1}
                    onChange={handleTextareaChange} />
                <Button
                    variant="default"
                    iconRight={<Icon name="arrowRight" size="sm" />}
                    iconOnlyMobile={true}
                    className='self-end'>
                    Send
                </Button>
            </div>
        </div>
    );
}

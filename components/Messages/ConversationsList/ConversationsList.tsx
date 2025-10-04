'use client';

import Link from 'next/link';
import Icon from '@/components/ui/Icon/Icon';
import { usePathname } from 'next/navigation';
import styles from './ConversationsList.module.css';


const mockConversations = [
    { id: '1', type: 'user', name: 'John Doe', lastMessage: 'Hey, how are you?', timestamp: '2m ago', unread: 2 },
    { id: '2', type: 'community', name: 'Tech Community', lastMessage: 'Welcome to the group!', timestamp: '1h ago', unread: 0 },
    { id: '3', type: 'user', name: 'Jane Smith', lastMessage: 'See you tomorrow', timestamp: '3h ago', unread: 1 },
];

export default function ConversationsList() {
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <div className={styles.conversations}>
                {mockConversations.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Icon className={styles.chatIcon} name="message" fillColor="var(--color-text-muted)" strokeColor="var(--color-background)" />
                        <p>Opps, Nothing to see here</p>
                    </div>
                ) : (
                    mockConversations.map((conversation) => {
                        const href = `/messages/${conversation.type}/${conversation.id}`;
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={conversation.id}
                                href={href}
                                className={`${styles.conversation} ${isActive ? styles.active : ''}`}>
                                <div className={styles.avatar}>
                                    {conversation.name[0]}
                                </div>

                                <div className={styles.details}>
                                    <div className={styles.title}>
                                        <span className={styles.name}>{conversation.name}</span>
                                        {conversation.unread > 0 && (
                                            <span className={styles.unreadBadge}>{conversation.unread}</span>
                                        )}
                                    </div>

                                    <span className={styles.lastMessage}>{conversation.lastMessage}</span>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}

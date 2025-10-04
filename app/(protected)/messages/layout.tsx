'use client';

import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MessagesLayout from '@/components/layout/MessagesLayout/MessagesLayout';
import ConversationsList from '@/components/Messages/ConversationsList/ConversationsList';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const pathname = usePathname();
    const isConversationOpen = pathname !== '/messages';

    return (
        <MessagesLayout isDesktop={isDesktop} showHeader={!isConversationOpen}>
            <>
                {(isDesktop || (!isDesktop && !isConversationOpen)) && (
                    <ConversationsList />
                )}

                {(isDesktop || isConversationOpen) && (
                    <>
                        {children}
                    </>
                )}
            </>
        </MessagesLayout>
    );
}

import ChatView from '@/components/Messages/ChatView/ChatView';

export default async function UserChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ChatView chatId={id} chatType="user" />;
}

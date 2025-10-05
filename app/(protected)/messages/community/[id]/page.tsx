import ChatView from '@/components/Messages/ChatView/ChatView';

export default async function CommunityChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ChatView chatId={id} />;
}

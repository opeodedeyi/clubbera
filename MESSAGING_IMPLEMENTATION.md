# Messaging System Implementation

## Overview
Successfully implemented a real-time messaging system for the Clubbera application, supporting both direct user-to-user messaging and community messaging.

## Files Structure

### Type Definitions
- **`lib/types/messages.ts`**
  - All TypeScript interfaces for messages, conversations, and Socket.IO events
  - Includes recipient info with profile images
  - Pagination support

### API Layer
- **`lib/api/messages.ts`**
  - Client-side API functions for all messaging endpoints
  - Functions: sendMessage, getConversations, getConversation, markAsRead, deleteMessage, getUnreadCount, searchMessages, sendTypingIndicator

### Socket.IO Integration
- **`lib/socket/socketClient.ts`**
  - Socket.IO client configuration with JWT authentication
  - Auto-reconnection with exponential backoff
  - Event listeners for: new_message, new_community_message, user_typing, message_read_receipt

- **`lib/socket/useSocket.ts`**
  - React hook for Socket.IO integration
  - Manages connection lifecycle
  - Returns event listener functions

### Components
- **`components/Messages/ConversationsList/ConversationsList.tsx`**
  - Displays list of all conversations
  - Real-time updates when new messages arrive
  - Shows unread counts and last message preview
  - Uses date-fns for relative timestamps

- **`components/Messages/ChatView/ChatView.tsx`**
  - Full chat interface for individual conversations
  - Real-time message sending/receiving
  - Typing indicators
  - Auto-scroll to latest message
  - Enter to send, Shift+Enter for new line
  - Mark conversations as read automatically
  - Shows recipient name from API response

### Pages
- **`app/(protected)/messages/page.tsx`** - Empty state when no conversation selected
- **`app/(protected)/messages/user/[id]/page.tsx`** - User direct messages
- **`app/(protected)/messages/community/[id]/page.tsx`** - Community messages
- **`app/(protected)/messages/layout.tsx`** - Messages layout with sidebar

## Features Implemented

### ✅ Core Messaging
- Send messages to users or communities
- Receive messages in real-time
- Message history with pagination support
- Conversation list with latest message

### ✅ Real-time Features
- Instant message delivery via Socket.IO
- Typing indicators (3-second timeout)
- Read receipts
- Connection status monitoring

### ✅ UI/UX
- Responsive design (mobile + desktop)
- Auto-scroll to latest message
- Message timestamps (formatted with date-fns)
- Loading states
- Error handling
- Unread message badges
- Conversation name from recipient info

### ✅ Performance
- Optimized API calls with pagination
- Event cleanup on component unmount
- Persistent Socket.IO connection
- Efficient re-renders

## API Endpoints Used

All endpoints use the base URL from `NEXT_PUBLIC_API_URL`:

- `POST /messages` - Send message
- `GET /messages/conversations` - Get all conversations
- `GET /messages/{recipientType}/{recipientId}` - Get conversation messages
- `PUT /messages/{messageId}/read` - Mark message as read
- `PUT /messages/conversations/read` - Mark conversation as read
- `DELETE /messages/{messageId}` - Delete message
- `GET /messages/unread-count` - Get unread count
- `GET /messages/search` - Search messages
- `POST /messages/typing` - Send typing indicator

## Socket.IO Events

### Listening For:
- `new_message` - New direct message
- `new_community_message` - New community message
- `user_typing` - Typing indicator updates
- `message_read_receipt` - Message read status

### Connection Events:
- `connect` - Connection established
- `disconnect` - Connection lost
- `connect_error` - Connection error
- `error` - General error

## Environment Variables Required

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

## Dependencies Used

- `socket.io-client` - Real-time WebSocket communication
- `date-fns` - Date formatting and relative time
- `cookies-next` - JWT token storage and retrieval

## Authentication

- JWT token automatically retrieved from cookies (`authToken`)
- Included in all API requests via Authorization header
- Socket.IO authenticates using the same token

## Next Steps (Future Enhancements)

### Optional Features to Add:
1. **User Context Integration**
   - Pass `currentUserId` from auth context to ChatView
   - Better message ownership detection

2. **Message Threading**
   - Reply to specific messages
   - Show parent message context

3. **File Attachments**
   - Upload images/files
   - Preview attachments

4. **Message Actions**
   - Delete message UI
   - Edit sent messages
   - Forward messages

5. **Advanced Search**
   - Search across all conversations
   - Filter by date, sender, etc.

6. **Notifications**
   - Browser notifications for new messages
   - Sound alerts
   - Desktop notifications

7. **Message Status**
   - Sent, delivered, read indicators
   - Show message status icons

8. **Infinite Scroll**
   - Load older messages on scroll up
   - Virtual scrolling for performance

9. **Optimistic Updates**
   - Show message immediately before server confirms
   - Retry failed messages

10. **Presence Indicators**
    - Online/offline status
    - Last seen timestamps

## Testing

To test the implementation:

1. Ensure backend API is running
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Login to get JWT token
4. Navigate to `/messages`
5. Start a conversation with a user or community
6. Test real-time features with multiple browser windows

## Troubleshooting

### Socket.IO not connecting:
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify JWT token exists in cookies
- Check browser console for connection errors
- Ensure backend Socket.IO server is running

### Messages not updating:
- Check Socket.IO connection status
- Verify event listeners are attached
- Check network tab for API call failures

### Typing indicator issues:
- Ensure 3-second timeout is working
- Check Socket.IO events are firing
- Verify recipient is receiving typing events

## Notes

- Fixed bug in `community/[id]/page.tsx` where chatType was incorrectly set to "user"
- API endpoints don't need `/api` prefix as it's included in base URL
- Recipient info (name, profile image) now comes from conversation response
- All timestamps use ISO 8601 format from backend
- Message ownership detection can be improved with user context

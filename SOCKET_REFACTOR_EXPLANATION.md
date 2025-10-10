# Socket Hook Refactor - Generic vs Specific

## ❌ Old Implementation (Limited)

### Problems:
```typescript
interface UseSocketReturn {
    socket: Socket | null;
    isConnected: boolean;
    onNewMessage: (callback: MessageEventCallback) => void;
    onNewCommunityMessage: (callback: CommunityMessageEventCallback) => void;
    onUserTyping: (callback: TypingEventCallback) => void;
    onMessageReadReceipt: (callback: ReadReceiptEventCallback) => void;
    offEvent: (eventName: string, callback?: (...args: unknown[]) => void) => void;
}
```

**Issues:**
- ✗ Only supports 4 hardcoded events (messaging-specific)
- ✗ Need to modify hook for every new feature
- ✗ Can't use for notifications, presence, video calls, etc.
- ✗ Not scalable or reusable

### Usage:
```typescript
const { onNewMessage, onNewCommunityMessage, offEvent } = useSocket();

onNewMessage(handleMessage);
onNewCommunityMessage(handleCommunityMessage);
```

---

## ✅ New Implementation (Generic & Flexible)

### Benefits:
```typescript
interface UseSocketReturn {
    socket: Socket | null;
    isConnected: boolean;
    on: <T = unknown>(event: string, callback: (data: T) => void) => void;
    off: (event: string, callback?: (...args: unknown[]) => void) => void;
    emit: <T = unknown>(event: string, data?: T) => void;
}
```

**Advantages:**
- ✓ Works with **ANY** Socket.IO event
- ✓ Never needs modification for new features
- ✓ Type-safe with generics
- ✓ Supports both listening AND emitting
- ✓ Future-proof and scalable

### Usage:
```typescript
const { on, off, emit } = useSocket();

// Same messaging functionality
on('new_message', handleMessage);
on('new_community_message', handleCommunityMessage);
```

---

## Real-World Use Cases Now Supported

### 1. **Messaging** (Current)
```typescript
const { on, off } = useSocket();

useEffect(() => {
    const handler = (data: Message) => addMessage(data);
    on('new_message', handler);
    return () => off('new_message', handler);
}, []);
```

### 2. **Notifications** (Future)
```typescript
const { on } = useSocket();

useEffect(() => {
    on('notification', (data: Notification) => {
        showToast(data.message);
    });
}, []);
```

### 3. **User Presence** (Future)
```typescript
const { on, emit } = useSocket();

// Send presence
emit('user_online', { userId: 123 });

// Listen for others
on('user_status_changed', (data) => {
    updateUserStatus(data.userId, data.status);
});
```

### 4. **Live Reactions** (Future)
```typescript
const { on, emit } = useSocket();

// Send reaction
const handleReact = () => {
    emit('event_reaction', { eventId: 456, reaction: '👍' });
};

// See others' reactions
on('reaction_added', (data) => {
    animateReaction(data.reaction);
});
```

### 5. **Video Call Signaling** (Future)
```typescript
const { on, emit } = useSocket();

emit('call_user', { userId: 789 });
on('incoming_call', (data) => showCallUI(data));
```

### 6. **Collaborative Editing** (Future)
```typescript
const { on, emit } = useSocket();

// Send document changes
emit('document_edit', { docId: 123, changes: [...] });

// Receive others' edits
on('document_updated', (data) => applyChanges(data));
```

### 7. **Live Event Updates** (Future)
```typescript
const { on } = useSocket();

on('event_attendance_changed', (data) => {
    updateAttendeeCount(data.eventId, data.count);
});
```

---

## Migration Impact

### Components Updated:
1. ✅ `ConversationsList.tsx` - Uses `on`, `off` instead of specific handlers
2. ✅ `ChatView.tsx` - Uses `on`, `off` instead of specific handlers

### Breaking Changes:
- **None!** The new API is cleaner but functionally identical

### Code Changes:
```diff
- const { onNewMessage, onNewCommunityMessage, offEvent } = useSocket();
+ const { on, off } = useSocket();

- onNewMessage(handleMessage);
- offEvent('new_message', handleMessage);
+ on('new_message', handleMessage);
+ off('new_message', handleMessage);
```

---

## Why This Matters

### Scalability
- Adding a new real-time feature? Just use `on('new_event', handler)`
- No need to touch the hook ever again

### Type Safety
- Generic types: `on<NotificationData>('notification', handler)`
- TypeScript infers correct data types

### Industry Standard
- Matches Socket.IO's native API (`socket.on`, `socket.emit`)
- Easier for other developers to understand

### Future Features
When you want to add:
- Push notifications
- Live presence indicators
- Real-time analytics
- Collaborative features
- Video/audio calls

You can use the **same hook** without any modifications! 🚀

---

## Summary

**Old:** "I can only do messaging events"
**New:** "I can handle any real-time event you throw at me"

The refactored hook is:
- More flexible
- More maintainable
- More scalable
- Industry-standard
- Future-proof

All while keeping the exact same functionality for messaging!

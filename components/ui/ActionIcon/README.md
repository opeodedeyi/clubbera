# ActionIcon Component Usage

A transparent wrapper around icons that makes them clickable as buttons or links.

### Import and use:

```typescript
import ActionIcon from "@/components/ui/ActionIcon";
```

### Basic usage as button:

```typescript
<ActionIcon
    icon={{ name: "close" }}
    onClick={() => handleClose()}
    aria-label="Close modal"
/>
```

### Basic usage as link:

```typescript
<ActionIcon
    as="link"
    href="/profile"
    icon={{ name: "user" }}
    aria-label="Go to profile"
/>
```

### Required props:

-   icon - Object containing icon props (see Icon readme for details)
-   aria-label - Required for accessibility

### Button props (default):

-   onClick - Function to call when clicked
-   type - button, submit, or reset (optional, defaults to button)
-   disabled - Boolean to disable the button (optional)

### Link props (when as="link"):

-   href - URL to navigate to
-   target - Link target like \_blank (optional)
-   rel - Link relationship like noopener noreferrer (optional)

The icon prop takes all the same properties as the Icon component. Refer to the Icon readme for available names, sizes, colors, and hover effects.

## Examples

### Close button:

```typescript
<ActionIcon
    icon={{ name: "close", hover: "close" }}
    onClick={() => setShowModal(false)}
    aria-label="Close modal"
/>
```

### Navigation link:

```typescript
<ActionIcon
    as="link"
    href="/settings"
    icon={{ name: "settings", size: "sm", hover: "color" }}
    aria-label="Open settings"
/>
```

### External link:

```typescript
<ActionIcon
    as="link"
    href="https://example.com"
    target="_blank"
    rel="noopener noreferrer"
    icon={{ name: "arrow-right", hover: "scale" }}
    aria-label="View external site"
/>
```

### Notification with custom colors:

```typescript
<ActionIcon
    icon={{
        name: "notification",
        color: "var(--color-error)",
        hover: "scale",
    }}
    onClick={() => showNotifications()}
    aria-label="View notifications"
/>
```

### Disabled state:

```typescript
<ActionIcon
    icon={{ name: "plus" }}
    onClick={() => createItem()}
    disabled={!canCreate}
    aria-label="Create new item"
/>
```

The component is completely transparent with no background, border, or padding by default. It only provides the click functionality and proper accessibility attributes.

Use it for close buttons in modals, navigation triggers in headers, action buttons in cards, or any time you need a clickable icon without visual styling.

The aria-label prop is required because screen readers need to know what the icon button does since icons alone aren't descriptive enough.

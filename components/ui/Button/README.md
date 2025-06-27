# Button Component

Flexible button component supporting 5 variants, 2 sizes, icons, and loading states.

### Basic Usage

```typescript
import Button from '@/components/ui/Button'

// Basic button
<Button>Click me</Button>

// As link
<Button as="link" href="/communities">Communities</Button>
```

## Examples

### Variants

```typescript
<Button variant="default">Default</Button>
<Button variant="community">Join Community</Button>
<Button variant="event">RSVP Event</Button>
<Button variant="plain">Cancel</Button>
<Button variant="disabled">Disabled</Button>
```

### Sizes

```typescript
<Button size="large">Large Button</Button>   {/* 50px height, 40px padding */}
<Button size="small">Small Button</Button>   {/* 42px height, 20px padding */}
```

### With Icons

```typescript
// Left icon
<Button iconLeft={<img src="/icons/plus.svg" alt="" />}>
    Create
</Button>

// Right icon
<Button iconRight={<img src="/icons/arrow.svg" alt="" />}>
    Next
</Button>

// Icon only
<Button
    iconOnly={<img src="/icons/edit.svg" alt="Edit" />}
    aria-label="Edit item" />
```

### Loading State

```typescript
<Button loading={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
```

### As Links

```typescript
<Button as="link" href="/create" variant="community">
    Create Community
</Button>

<Button
    as="link"
    href="https://example.com"
    target="_blank"
    iconRight={<img src="/icons/external.svg" alt="" />}>
    External Link
</Button>
```

### Styling

-   **Minimum width**: 96px (icon-only buttons are square)
-   **Heights**: 42px (small), 50px (large)
-   **Border radius**: Uses `--radius-md` CSS variable
-   **Colors**: Uses CSS custom properties for theming

### Accessibility

-   Supports focus states
-   Use `aria-label` for icon-only buttons
-   Loading state disables interaction
-   Proper keyboard navigation

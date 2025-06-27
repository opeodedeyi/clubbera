# Icon System Usage

A flexible icon system for Clubbera with full color control and hover effects.

### Import the Icon component and use it throughout your app:

```typescript
import Icon from '@/components/ui/Icon'
```

### Basic usage:

```typescript
<Icon name="search" />
<Icon name="user" size="lg" />
<Icon name="close" color="var(--color-error)" />
```

Available icon names: search, notification, close, user, settings, plus, arrow-right
Available sizes: xs (12px), sm (16px), md (20px), lg (24px), xl (28px), xxl (32px), xxxl (36px). Default is md.
Available hover effects: none (default), opacity, scale, color, close, primary

### Simple icons (search, close, user, settings, plus, arrow-right) take a color prop:

```typescript
<Icon name="search" color="var(--color-primary)" />
<Icon name="close" color="var(--color-error)" hover="close" />
<Icon name="user" size="sm" hover="scale" />
```

The notification icon is special because it has inner fill and outer stroke. You can control colors in three ways:

### Option 1 - Same color for both fill and stroke:

```typescript
<Icon name="notification" color="var(--color-error)" />
```

### Option 2 - Different colors for fill and stroke:

```typescript
<Icon 
    name="notification" 
    fillColor="var(--color-warning)" 
    strokeColor="var(--color-text)"  />
```

### Option 3 - General color with specific override:

```typescript
<Icon 
    name="notification" 
    color="var(--color-primary)"
    strokeColor="var(--color-text)" />
```

### Hover effects explained:

none - No hover effect (default)
opacity - Reduces opacity on hover
scale - Slightly scales up on hover, good for buttons
color - Brightens the color on hover
close - Turns red on hover, good for close/delete buttons
primary - Turns primary color on hover

## Examples in real components:

### In a search bar:

```typescript
<div className={styles.searchContainer}>
    <Icon name="search" size="sm" color="var(--color-text-muted)" />
    <input type="text" placeholder="Search..." />
    {value && (
        <button onClick={clearSearch}>
            <Icon name="close" size="sm" hover="close" />
        </button>
    )}
</div>
```

### In a header:

```typescript
<button>
    <Icon name="notification" color="var(--color-text-secondary)" hover="color" />
</button>

<button>
    <Icon name="user" hover="scale" />
</button>
```

### In buttons:

```typescript
<Button>
    <Icon name="plus" size="sm" hover="scale" />
    Create Community
</Button>

<button onClick={onClose}>
    <Icon name="close" hover="close" />
</button>
```

### Use CSS custom properties for theme-aware colors:

var(--color-primary)
var(--color-error)
var(--color-success)
var(--color-warning)
var(--color-text)
var(--color-text-secondary)
var(--color-text-muted)

For decorative icons that don't need interaction, use hover="none" (which is the default).

For interactive icons like buttons, use hover="scale" or hover="color".

For close/delete actions, use hover="close" to turn the icon red on hover.

The icon system is fully typed, so TypeScript will help you with available props for each icon type.
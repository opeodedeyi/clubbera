# Responsive Utilities

Desktop-first responsive system with tablet consideration.

## Breakpoints

-   **Desktop**: 1280px+ (default, no media query)
-   **Tablet**: 768px - 1279px
-   **Mobile**: 0px - 767px

## Complete Class Reference

### Basic Display Classes

| Class           | Desktop (1280px+) | Tablet (768-1279px) | Mobile (0-767px) | Usage                   |
| --------------- | ----------------- | ------------------- | ---------------- | ----------------------- |
| `.desktop-only` | ✅ Show           | ❌ Hide             | ❌ Hide          | Desktop-only content    |
| `.tablet-only`  | ❌ Hide           | ✅ Show             | ❌ Hide          | Tablet-specific content |
| `.mobile-only`  | ❌ Hide           | ❌ Hide             | ✅ Show          | Mobile-only content     |

### Flex Display Classes

| Class                | Desktop (1280px+) | Tablet (768-1279px) | Mobile (0-767px) | Usage                  |
| -------------------- | ----------------- | ------------------- | ---------------- | ---------------------- |
| `.desktop-only-flex` | ✅ Flex           | ❌ Hide             | ❌ Hide          | Desktop flex container |
| `.tablet-only-flex`  | ❌ Hide           | ✅ Flex             | ❌ Hide          | Tablet flex container  |
| `.mobile-only-flex`  | ❌ Hide           | ❌ Hide             | ✅ Flex          | Mobile flex container  |

### Grid Display Classes

| Class                | Desktop (1280px+) | Tablet (768-1279px) | Mobile (0-767px) | Usage                  |
| -------------------- | ----------------- | ------------------- | ---------------- | ---------------------- |
| `.desktop-only-grid` | ✅ Grid           | ❌ Hide             | ❌ Hide          | Desktop grid container |
| `.tablet-only-grid`  | ❌ Hide           | ✅ Grid             | ❌ Hide          | Tablet grid container  |
| `.mobile-only-grid`  | ❌ Hide           | ❌ Hide             | ✅ Grid          | Mobile grid container  |

### Range Classes

| Class             | Desktop (1280px+) | Tablet (768-1279px) | Mobile (0-767px) | Usage                     |
| ----------------- | ----------------- | ------------------- | ---------------- | ------------------------- |
| `.desktop-tablet` | ✅ Show           | ✅ Show             | ❌ Hide          | Show on desktop & tablet  |
| `.tablet-mobile`  | ❌ Hide           | ✅ Show             | ✅ Show          | Show on tablet & mobile   |
| `.tablet-up`      | ✅ Show           | ✅ Show             | ❌ Hide          | Tablet and larger         |
| `.mobile-up`      | ✅ Show           | ✅ Show             | ✅ Show          | All sizes (mobile and up) |

### Hide Classes

| Class           | Desktop (1280px+) | Tablet (768-1279px) | Mobile (0-767px) | Usage                |
| --------------- | ----------------- | ------------------- | ---------------- | -------------------- |
| `.hide-mobile`  | ✅ Show           | ✅ Show             | ❌ Hide          | Hide only on mobile  |
| `.hide-tablet`  | ✅ Show           | ❌ Hide             | ✅ Show          | Hide only on tablet  |
| `.hide-desktop` | ❌ Hide           | ✅ Show             | ✅ Show          | Hide only on desktop |

## Usage Examples

### Navigation Menu

```jsx
{
    /* Desktop: Full navigation */
}
<nav className="desktop-only-flex">
    <Link href="/home">Home</Link>
    <Link href="/communities">Communities</Link>
    <Link href="/events">Events</Link>
    <Link href="/help">Help Center</Link>
</nav>;

{
    /* Tablet: Condensed navigation */
}
<nav className="tablet-only-flex">
    <Link href="/home">Home</Link>
    <Link href="/communities">Communities</Link>
    <button>More...</button>
</nav>;

{
    /* Mobile: Hamburger menu */
}
<button className="mobile-only">
    <MenuIcon />
</button>;
```

### Button Text Variations

```jsx
{
    /* Full text on desktop */
}
<Button className="desktop-only">Create New Community</Button>;

{
    /* Shorter text on tablet */
}
<Button className="tablet-only">Create Community</Button>;

{
    /* Icon only on mobile */
}
<Button className="mobile-only">
    <PlusIcon />
</Button>;
```

### Layout Grids

```jsx
{
    /* Desktop: 3 columns */
}
<div className="desktop-only-grid grid-cols-3 gap-6">
    {items.map((item) => (
        <Card key={item.id} item={item} />
    ))}
</div>;

{
    /* Tablet: 2 columns */
}
<div className="tablet-only-grid grid-cols-2 gap-4">
    {items.map((item) => (
        <Card key={item.id} item={item} />
    ))}
</div>;

{
    /* Mobile: Single column */
}
<div className="mobile-only-flex flex-col gap-3">
    {items.map((item) => (
        <Card key={item.id} item={item} />
    ))}
</div>;
```

### Progressive Content

```jsx
{
    /* Show detailed description on larger screens */
}
<p className="hide-mobile">{event.fullDescription}</p>;

{
    /* Show summary on mobile */
}
<p className="mobile-only">{event.shortDescription}</p>;
```

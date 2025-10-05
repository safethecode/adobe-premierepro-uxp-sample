# UXP CSS Limitations

## Supported CSS Properties (Complete List)

UXP only supports a limited subset of CSS properties. Here's the complete list:

### Layout & Display

- `display`
- `flex-basis`, `flex-direction`, `flex-grow`, `flex-shrink`, `flex-wrap`, `flex`
- `align-content`, `align-items`, `align-self`
- `justify-content`
- `overflow`, `overflow-x`, `overflow-y`
- `visibility`

### Spacing

- `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- `width`, `height`
- `min-width`, `min-height`
- `max-width`, `max-height`
- `top`, `right`, `bottom`, `left` (limited support)

### Borders

- `border`, `border-style`, `border-width`, `border-color`
- `border-top`, `border-top-style`, `border-top-width`, `border-top-color`
- `border-right`, `border-right-style`, `border-right-width`, `border-right-color`
- `border-bottom`, `border-bottom-style`, `border-bottom-width`, `border-bottom-color`
- `border-left`, `border-left-style`, `border-left-width`, `border-left-color`
- `border-radius`, `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius`

### Background

- `background`, `background-color`, `background-image`
- `background-repeat`, `background-size`, `background-attachment`

### Typography

- `color`
- `font-family`, `font-size`, `font-style`, `font-weight`
- `text-align`, `text-overflow`
- `letter-spacing`
- `white-space`

### Other

- `opacity`

## NOT Supported (Use Workarounds)

### ❌ Positioning

- `position` (absolute, relative, fixed, sticky)
- `z-index`
- **Workaround**: Use flexbox layout exclusively

### ❌ Transforms & Transitions

- `transform`, `translate`, `rotate`, `scale`, `skew`
- `transition`, `animation`
- **Workaround**: Use opacity changes for hover effects

### ❌ Shadows & Effects

- `box-shadow`, `text-shadow`
- `filter`, `backdrop-filter`
- **Workaround**: Use borders or nested elements

### ❌ Grid Layout

- All `grid-*` properties
- **Workaround**: Use flexbox instead

### ❌ Modern CSS

- `gap` (row-gap, column-gap)
- `clip-path`
- `mask`
- `blend-mode`
- **Workaround**: Custom utilities in `src/styles/compat.css`

## Development Guidelines

### DO ✅

```css
/* Use flexbox */
.container {
  display: flex;
  flex-direction: column;
}

/* Use opacity for interactions */
.button:hover {
  opacity: 0.8;
}

/* Use borders for pseudo-shadows */
.card {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Use inline styles for values not in Tailwind */
<div style={{ minHeight: '100vh' }}>
```

### DON'T ❌

```css
/* Don't use transforms */
.button:active {
  transform: scale(0.95); /* Won't work! */
}

/* Don't use transitions */
.element {
  transition: all 0.3s; /* Won't work! */
}

/* Don't use box-shadow */
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Won't work! */
}

/* Don't use position absolute */
.overlay {
  position: absolute; /* Won't work! */
  z-index: 10; /* Won't work! */
}

/* Don't use gap */
.flex {
  gap: 1rem; /* Won't work! Use flex-gap-4 instead */
}
```

## Custom Utilities

See `src/styles/compat.css` for UXP-compatible utility classes:

- `.flex-gap-*` - Gap replacement using margins
- `.shadow-border` - Shadow replacement using borders
- `.interactive` - Hover/active states using opacity
- `.disabled` - Disabled state styling

## Tailwind Configuration

The `tailwind.config.js` has `corePlugins` disabled for unsupported features.
This prevents accidentally using incompatible CSS.

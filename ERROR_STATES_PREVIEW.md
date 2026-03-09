# Error States Visual Preview

## Error Page Layout

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              [Gradient Background]                  │
│                                                     │
│     ┌───────────────────────────────────┐          │
│     │                                   │          │
│     │         ┌─────────────┐           │          │
│     │         │             │           │          │
│     │         │   🔍 Icon   │           │          │
│     │         │             │           │          │
│     │         └─────────────┘           │          │
│     │                                   │          │
│     │    Payment Link Not Found         │          │
│     │                                   │          │
│     │  This payment link doesn't exist  │          │
│     │  or has expired. Please check the │          │
│     │  link and try again, or contact   │          │
│     │  the sender for a new payment     │          │
│     │  link.                            │          │
│     │                                   │          │
│     │  ┌─────────────────────────────┐  │          │
│     │  │      Try Again (Blue)       │  │          │
│     │  └─────────────────────────────┘  │          │
│     │                                   │          │
│     │  ┌─────────────────────────────┐  │          │
│     │  │      Go Back (Gray)         │  │          │
│     │  └─────────────────────────────┘  │          │
│     │                                   │          │
│     │  Need help? Contact Support       │          │
│     │                                   │          │
│     └───────────────────────────────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Error Icons by Type

| Error Type   | Icon | Color Scheme        |
| ------------ | ---- | ------------------- |
| Not Found    | 🔍   | Red/Orange gradient |
| Expired      | ⏰   | Red/Orange gradient |
| Network      | 📡   | Red/Orange gradient |
| Security     | 🔒   | Red/Orange gradient |
| Timeout      | ⏱️   | Red/Orange gradient |
| Config       | ⚙️   | Red/Orange gradient |
| Setup Failed | ❌   | Red/Orange gradient |
| Generic      | ⚠️   | Red/Orange gradient |

## Button States

### Try Again Button (Shown for recoverable errors)

- **Color**: Blue (#3B82F6)
- **Hover**: Darker Blue (#2563EB)
- **Shadow**: Blue glow
- **Text**: White, medium weight

### Go Back Button (Always shown)

- **Color**: Light Gray (#F3F4F6)
- **Hover**: Medium Gray (#E5E7EB)
- **Text**: Dark Gray (#374151), medium weight

## Responsive Behavior

### Desktop (> 768px)

- Card width: 448px (max-w-md)
- Padding: 32px
- Icon size: 80px
- Font sizes: Title 24px, Body 16px

### Mobile (< 768px)

- Card width: Full width with 16px margin
- Padding: 24px
- Icon size: 64px
- Font sizes: Title 20px, Body 14px

## Color Palette

```css
/* Background */
background: linear-gradient(to bottom right, #fef2f2, #fff7ed);

/* Card */
background: #ffffff;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Icon Container */
background: #fee2e2; /* Red-100 */

/* Title */
color: #111827; /* Gray-900 */

/* Message */
color: #4b5563; /* Gray-600 */

/* Support Link */
color: #2563eb; /* Blue-600 */
hover: #1d4ed8; /* Blue-700 */
```

## Accessibility Features

- ✅ High contrast text
- ✅ Large, readable fonts
- ✅ Clear visual hierarchy
- ✅ Keyboard navigable buttons
- ✅ Screen reader friendly
- ✅ Focus indicators on interactive elements

## Example Error Messages

### Short & Clear

✅ "Payment link not found"
✅ "Connection error"
✅ "Request timed out"

### Actionable

✅ "Please check your internet connection and try again"
✅ "Please contact the sender to request a new payment link"
✅ "Please try again in a few minutes"

### Avoid

❌ "HTTP 404 Error"
❌ "ECONNREFUSED"
❌ "Unhandled exception in payment module"

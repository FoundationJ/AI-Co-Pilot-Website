# Homepage First Fold - Visual Description

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Navigation Bar                                      │
│  AI Co-Pilot        Playbook  Framework  Work  Talks  Contact               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│  ┌────────────────────────────────────┐  ┌─────────────────────────────┐   │
│  │                                    │  │                             │   │
│  │  Intelligent systems               │  │      [Subtle Visual]        │   │
│  │  that augment                      │  │                             │   │
│  │  human capability                  │  │         input               │   │
│  │                                    │  │          ·                  │   │
│  │  (Very large, bold headline)       │  │         / \                 │   │
│  │  (52-92px responsive)              │  │        ·   ·                │   │
│  │                                    │  │      process                │   │
│  │                                    │  │         |                   │   │
│  │  We build AI co-pilots that        │  │         ◉ (crimson accent)  │   │
│  │  empower teams to work faster,     │  │         |                   │   │
│  │  smarter, and more creatively.     │  │       output                │   │
│  │                                    │  │                             │   │
│  │  (Softer text, 17-19px)            │  │   [Ultra-subtle workflow    │   │
│  │  (Max width 34rem)                 │  │    diagram with thin lines  │   │
│  │                                    │  │    and nodes. Very low      │   │
│  │                                    │  │    contrast, barely visible]│   │
│  │  ┌──────────────────┐  ─ Free     │  │                             │   │
│  │  │  View Playbook   │   download  │  │   [Opacity: 65%, increases  │   │
│  │  └──────────────────┘             │  │    to 80% on hover]         │   │
│  │  (Button with hover scale)        │  │                             │   │
│  │                                    │  │                             │   │
│  └────────────────────────────────────┘  └─────────────────────────────┘   │
│                                                                               │
│                                  ⌄                                           │
│                               Explore                                        │
│                          (subtle indicator)                                  │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Design Specifications

### Left Column (Content)
```
┌─────────────────────────────────────┐
│                                     │
│  HEADLINE                           │
│  - Size: 3.25rem → 5.75rem          │
│  - Weight: 600 (semibold)           │
│  - Line height: 1.05                │
│  - Letter spacing: -0.025em         │
│  - Color: #0A0A0A (near black)      │
│  - Max 2 lines                      │
│                                     │
│  SUBHEADLINE                        │
│  - Size: 1.0625rem → 1.1875rem      │
│  - Color: muted/75% opacity         │
│  - Line height: 1.65                │
│  - Max width: 34rem (544px)         │
│  - Letter spacing: -0.006em         │
│                                     │
│  CTA BUTTON                         │
│  - Text: 15px medium weight         │
│  - Padding: 22px × 28px             │
│  - Border radius: 10px              │
│  - Background: Black                │
│  - Hover: Scale 1.02 + shadow       │
│  - Active: Scale 0.98               │
│                                     │
│  "Free download" hint               │
│  - Divider line (8px × 1px)         │
│  - Text: 14px, very subtle          │
│  - Opacity: 40%                     │
│                                     │
└─────────────────────────────────────┘
```

### Right Column (Visual)
```
┌─────────────────────────────────────┐
│                                     │
│  WORKFLOW VISUALIZATION             │
│                                     │
│  Ultra-subtle SVG diagram:          │
│                                     │
│       ·  ─────  ·  ─────  ·         │
│      input    process   analyze     │
│                  │                  │
│                  │                  │
│                  ◉ (CRIMSON)        │
│                / | \                │
│               /  |  \               │
│              ·   ·   ·              │
│                  │                  │
│                  ·                  │
│               output                │
│                                     │
│  Features:                          │
│  - Thin lines (0.8px)               │
│  - Small nodes (2-5px radius)       │
│  - Grid background (5% opacity)     │
│  - Labels at 8px (12% opacity)      │
│  - ONE crimson accent (#991B1B)     │
│  - Pulse animation (4s slow)        │
│  - Animated data flow dots          │
│  - Overall opacity: 65%             │
│  - Hover: 80% opacity               │
│                                     │
└─────────────────────────────────────┘
```

## Color Palette

```
Background:   #FFFFFF (white)
Foreground:   #0A0A0A (near black)
Muted Text:   #727272 (45% opacity)
Borders:      #E5E5E5 (90% lightness)

Crimson Accent: #991B1B (deep red)
  - Used sparingly on ONE node
  - Provides subtle visual interest
  - Evokes brush-style accent
```

## Typography Stack

```
Font Family: Inter (Google Fonts)
Features:
  - Ligatures enabled (rlig, calt)
  - Stylistic sets (ss01, ss02)
  - Precise letter spacing
  - Optimized line heights

Sizes:
  h1: 52px → 92px (responsive)
  p:  17px → 19px
  button: 15px
  hint: 14px
  label: 8px
```

## Spacing System

```
Vertical Rhythm:
  Section padding: 96px → 128px → 160px
  Headline margin: 24px → 32px
  Subheadline margin: 40px → 56px
  
Horizontal:
  Container: max-width 1400px, 24px padding
  Grid gap: 64px → 80px → 128px
  
Grid Ratio:
  Desktop: 1.1fr (left) / 0.9fr (right)
  Mobile: 1fr (stacked)
```

## Micro-Interactions

```
CTA Button:
  Hover:  scale(1.02) + shadow-md + bg-opacity(90%)
  Active: scale(0.98)
  Duration: 200ms

WorkflowVisual:
  Hover: opacity 65% → 80%
  Duration: 700ms
  
Scroll Indicator:
  Hover: opacity 15% → 30%
  Bounce animation: 2.5s
  
Crimson Node:
  Pulse: 4s infinite
  
Data Flow Dots:
  Fade in/out: 3s staggered
```

## Responsive Behavior

### Desktop (1024px+)
- 2-column asymmetric grid
- Visual at 550px height
- Full typography scale
- Hover states active

### Tablet (768-1023px)
- Reduced spacing
- Slightly smaller type
- Visual at 450px height

### Mobile (<768px)
- Single column stacking
- Visual below content at 280px
- Visual opacity: 35%
- Simplified spacing
- "Free download" hint hidden

## Accessibility

- Semantic HTML (h1, p, button, nav)
- High contrast ratios (WCAG AA+)
- Focus states on interactive elements
- Keyboard navigation supported
- Screen reader friendly
- Reduced motion support

## Performance

- SVG visual: ~3KB gzipped
- Pure CSS animations (no JS)
- 60fps smooth transitions
- No layout shift
- Fast first paint

---

## Key Design Decisions

### Why Asymmetric Grid?
- Creates visual tension and interest
- Avoids boring 50/50 split
- Gives content priority (1.1fr)
- More dynamic and modern

### Why Ultra-Subtle Visual?
- Doesn't compete with content
- Adds depth without distraction
- Linear-inspired minimalism
- "Whisper, don't shout"

### Why Crimson Accent?
- Breaks pure grayscale
- Adds warmth and soul
- Used sparingly (design restraint)
- Inspired by brush-style logos

### Why Precise Typography?
- Shows design care
- Enhances readability
- Creates hierarchy
- Feels premium and considered

---

## What Makes It "Linear-Like"

✅ Typography-first hierarchy
✅ Generous whitespace (breathing room)
✅ High contrast black/white
✅ Minimal, purposeful motion
✅ No gradients or neon
✅ Calm, confident aesthetic
✅ Precise spacing and alignment
✅ Details matter (letter spacing, etc.)
✅ Subtle, not flashy
✅ Product-grade polish

## What Adds "Soul"

✨ Crimson accent (warmth)
✨ Workflow visualization (contextual)
✨ "Free download" hint (friendly)
✨ Micro-interactions (responsive)
✨ Data flow animation (alive)
✨ Hover states (interactive)
✨ Asymmetric layout (dynamic)
✨ Precise details (crafted)

---

**Result**: A homepage first fold that feels calm, elegant, and intentional - like a well-designed product should feel.

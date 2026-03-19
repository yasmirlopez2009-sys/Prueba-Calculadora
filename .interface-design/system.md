# Design System - Advanced Pro

## Direction
Personality: Sophistication & Depth (Glassmorphism)
Foundation: Deep Space (Indigo-950)
Depth: Layered glass with subtle blur and gradients
Spacing: 4px base (4, 8, 12, 16, 24, 32, 48)

## Tokens
### Spacing
Base: 4px
Scale: 4, 8, 12, 16, 24, 32, 48

### Colors
--bg-main: #020617 (slate-950)
--glass-bg: rgba(30, 41, 59, 0.7)
--glass-border: rgba(255, 255, 255, 0.1)
--text-primary: #f8fafc (slate-50)
--text-secondary: #94a3b8 (slate-400)
--accent-primary: #6366f1 (indigo-500)
--accent-secondary: #ec4899 (pink-500)
--op-bg: rgba(245, 158, 11, 0.2)
--op-text: #f59e0b (amber-500)
--func-bg: rgba(99, 102, 241, 0.1)
--func-text: #818cf8 (indigo-400)

## Patterns
### Glass Card
- Backdrop Blur: 12px
- Border: 1px solid var(--glass-border)
- Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5)
- Radius: 24px

### Advanced Button
- Height: 52px
- Transition: all 0.2s ease-out
- Active: scale(0.95), brightness(1.1)
- Hover: brightness(1.2), shadow-glow

### Advanced Display
- Large: 4rem font, weight 300
- Small: 1rem font, weight 400 (for history/memory)
- Alignment: Right
- Glow: subtle text-shadow on active numbers

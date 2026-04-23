---
name: Marcus's World
description: An interactive 8-bit RPG résumé website blending pixel art nostalgia with modern professional storytelling
colors:
  # Core dark theme (the site is dark-themed with the overworld map)
  background-dark: "#0f1f0f"
  background-parchment: "#faf6ee"
  foreground-dark: "#D4E8C4"
  foreground-parchment: "#2A1A0A"

  # Primary — emerald green (Meta HQ, growth, success)
  primary: "#10B981"
  primary-dark: "#065F46"
  primary-light: "#A7F3D0"
  primary-surface: "#ECFDF5"
  on-primary: "#ffffff"

  # Secondary — forest green (DFS, nature, stability)
  secondary: "#2E7D32"
  secondary-dark: "#1B5E20"
  secondary-light: "#4CAF50"
  secondary-surface: "#E8F5E9"
  on-secondary: "#ffffff"

  # Accent — gold/amber (awards, highlights, RPG treasure)
  accent-gold: "#FFD700"
  accent-amber: "#F59E0B"
  accent-warm: "#D97706"
  accent-surface: "#FFFBEB"

  # Career zone colors
  zone-meta: "#10B981"
  zone-dfs: "#2E7D32"
  zone-music: "#E65100"
  zone-university: "#1565C0"
  zone-farm: "#5A8A3C"
  zone-coffee: "#5D4037"

  # RPG UI chrome
  rpg-border: "#8B6914"
  rpg-plaque-light: "#D4C4A0"
  rpg-plaque-dark: "#3D2B1A"
  rpg-shadow: "#2A1A0A"

  # Semantic
  error: "#DC2626"
  on-error: "#ffffff"
  muted: "#858481"

typography:
  pixel-display:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 2px
  pixel-heading:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 1.5px
  pixel-label:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: 8px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 1px
  pixel-micro:
    fontFamily: "'Press Start 2P', monospace"
    fontSize: 6px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.5px
  body-lg:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
  body-md:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-sm:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  heading-lg:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 20px
    fontWeight: 800
    lineHeight: 28px
  heading-md:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
  label-md:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  label-sm:
    fontFamily: "'Nunito', sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px

rounded:
  none: 0px
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  section: 80px

components:
  rpg-dialog-box:
    backgroundColor: "{colors.background-parchment}"
    textColor: "{colors.foreground-parchment}"
    rounded: "0px"
    padding: "{spacing.md}"
  rpg-modal:
    backgroundColor: "{colors.background-parchment}"
    textColor: "{colors.foreground-parchment}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  rpg-plaque:
    backgroundColor: "{colors.rpg-plaque-light}"
    textColor: "{colors.rpg-plaque-dark}"
    rounded: "0px"
    padding: "{spacing.xs}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.pixel-label}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary}"
  hud-bar:
    backgroundColor: "rgba(15, 31, 15, 0.9)"
    textColor: "{colors.foreground-dark}"
    height: 85px
    padding: "{spacing.md}"
  zone-card:
    backgroundColor: "{colors.background-parchment}"
    textColor: "{colors.foreground-parchment}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  stat-bar:
    height: 8px
    rounded: "{rounded.full}"
    padding: "0px"
  year-badge:
    backgroundColor: "rgba(139, 105, 20, 0.9)"
    textColor: "{colors.accent-gold}"
    typography: "{typography.pixel-micro}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
---

## Brand & Style

Marcus's World is an **8-bit RPG-themed interactive resume** that transforms a traditional career portfolio into an explorable pixel art overworld. The brand personality is **nostalgic yet professional** — it should feel like discovering a beloved retro game, but every element serves the serious purpose of communicating Marcus's career story to hiring managers and recruiters.

The design philosophy rests on a duality: **pixel art nostalgia** for the game layer (map, HUD, dialog boxes, labels) and **clean modern typography** for the content layer (zone details, resume snapshot, testimonials). These two worlds should feel harmonious, not jarring.

Target audience: hiring managers, recruiters, and professional contacts who need to quickly assess Marcus's qualifications while being delighted by the creative presentation.

## Colors

The palette is rooted in **nature and growth** — reflecting Marcus's journey from Singapore to New Zealand to Meta.

- **Emerald Green** (`#10B981`) is the primary action color, representing Meta and forward momentum. Used for CTAs, the main building highlight, and success states.
- **Forest Green** (`#2E7D32`) is the secondary anchor, representing DFS Group and stability. Used for secondary UI elements and the DFS zone.
- **Gold/Amber** (`#FFD700` / `#F59E0B`) represents achievements, awards, and RPG treasure. Used sparingly for year badges, award highlights, and the Mensa stat. Never used as a background fill — only as accent strokes and small badges.
- **Parchment** (`#faf6ee`) is the modal/content background, evoking old maps and scrolls. All modals and the resume snapshot use this warm off-white.
- **Dark Forest** (`#0f1f0f`) is the deep background behind the overworld map, creating an immersive nighttime RPG atmosphere.

Each career zone has its own signature color to create visual wayfinding across the map. These colors should only appear within their respective zone contexts and never bleed into other zones.

## Typography

The site uses a **dual-font system** that reinforces the game-meets-professional duality:

1. **Press Start 2P** — the pixel font. Used exclusively for game UI elements: HUD labels, building names, dialog headers, button text, year badges, and section headers within modals. Always uppercase. Never used for body copy or long-form text. Line-height must be `1.8` to prevent clipping of pixel characters.

2. **Nunito** — the body font. A rounded, friendly sans-serif that pairs well with pixel art without feeling childish. Used for all readable content: zone descriptions, bullet points, testimonials, and the resume snapshot. Weights 400 (body), 600 (labels), 700 (subheadings), and 800 (headings) are loaded.

**Hierarchy rule:** Pixel font establishes *where you are* (navigation, labels, headers). Nunito explains *what you're reading* (content, details, stories). Never mix these roles.

## Layout & Spacing

The layout has three distinct spatial modes:

1. **Overworld Map** — full-viewport, immersive. The pixel art map fills the screen below the HUD. On desktop, the map fits the viewport. On mobile, it's wider than the viewport with horizontal swipe panning. Buildings are positioned as percentage-based hotspots over the background image.

2. **Modal Overlays** — centered, scrollable panels on a blurred backdrop. Max width 3xl (768px) for zone modals and resume snapshot. Max height 92vh with internal scroll. The parchment background and gold border create a "scroll unfurling" metaphor.

3. **HUD Bar** — fixed top bar (85px height) with semi-transparent dark background. Contains the globe icon, discovery counter, progress bar, quick-access buttons, and audio toggle. Must never obscure building labels on the map.

Spacing follows an 8px base scale. Section gaps within modals use `lg` (24px). Between major sections, use `xl` (40px). The RPG dialog box uses pixel-precise 4px borders with double-border inset technique.

## Elevation & Depth

The site uses a **layered depth model** that mirrors RPG game rendering:

- **Layer 0 — Map Background:** The pixel art overworld image. Always behind everything.
- **Layer 1 — Map Overlays:** Year badges, building hotspot glows, pulsing indicators. Use `z-10` to `z-20`.
- **Layer 2 — HUD:** Fixed top bar at `z-30`. Semi-transparent with backdrop blur.
- **Layer 3 — Dialog Box:** The RPG-style message box at `z-25`. Uses the classic double-border box shadow technique.
- **Layer 4 — Modals:** Full-screen overlays at `z-50`. Blurred backdrop + centered content panel.

Shadows are used sparingly and should feel "pixel-appropriate" — hard-edged `4px 4px 0` drop shadows for RPG elements (dialog boxes, plaques), soft diffused shadows for modern elements (modal panels, cards).

## Shapes

The shape language follows the **pixel art aesthetic** for game elements and **soft modern curves** for content:

- **RPG Elements** (dialog box, plaques, year badges): Sharp corners or very small radius (2-4px). Hard-edged borders. The double-border inset technique (`border` + `box-shadow inset`) creates the classic RPG text box look.
- **Modern Elements** (modal panels, cards, buttons): `rounded-md` (12px) to `rounded-xl` (24px). Softer, more contemporary feel.
- **Badges & Pills** (discovery checkmarks, stat labels): `rounded-full` for circular/pill shapes.
- **Building Hotspots**: `rounded-lg` with colored glow borders on hover.

## Components

### RPG Dialog Box
The signature UI element. Parchment background with a 4px solid dark border, 2px inset parchment border, and 4px inset dark border creating the classic triple-border RPG look. Hard drop shadow at `4px 4px 0`. Speaker name appears in a colored tab above the box. Text uses Nunito body-md. "NEXT" prompt blinks in the bottom-right corner.

### HUD Bar
Fixed top navigation with dark semi-transparent background and backdrop blur. Contains: globe/compass icon (left), discovery counter with pixel text (center-left), segmented progress bar (center), quick-access buttons in colored pill outlines (center-right), and audio toggle (right). On mobile, the quick-access buttons move to a horizontal scrollable strip below the map.

### Zone Modal
Full-screen overlay with blurred backdrop. Content panel uses parchment background with gold border and hard shadow. Zone image at top with gradient overlay. Zone name in pixel font, description in Nunito. Detail sections with period labels and bullet points. Scroll indicator at bottom.

### Resume Snapshot
Professional one-sheet layout within the RPG frame. Parchment background. Header with portrait, name (pixel font), and contact links. Sections: Skills & Tools, Professional Experience (with DFS grouped as one block showing 4 promotions), Education, What Makes Marcus Unique (card grid), and a "What I'm Looking For" statement. Footer with "Last Updated" date and download button.

### Mobile Building Strip
Horizontal scrollable strip of building cards at the bottom of the mobile view. Each card shows zone icon, name (pixel font), and tagline (Nunito). Discovered zones get a green checkmark badge. Dark semi-transparent background with backdrop blur.

## Do's and Don'ts

### Do
- Always use Press Start 2P for UI labels and Nunito for content — never swap them
- Keep zone colors confined to their respective zones
- Use the parchment/gold/dark-border treatment consistently for all modals
- Maintain the 4px hard shadow on RPG elements for the retro feel
- Use `image-rendering: pixelated` on all pixel art assets
- Keep the HUD minimal — it should inform, not distract from the map
- Ensure all text on the dark map background uses light colors with sufficient contrast
- Use motion sparingly — subtle pulses for undiscovered zones, gentle hover lifts for buildings

### Don't
- Don't use pixel font for paragraphs or long-form text — it's unreadable at body sizes
- Don't mix zone colors across different zones (e.g., no emerald green in the Music zone)
- Don't use rounded corners on RPG dialog boxes — they should feel sharp and retro
- Don't add gradients to the pixel art map — it should stay flat and crisp
- Don't use more than 2 animation effects simultaneously — the site should feel polished, not chaotic
- Don't place white text on light map areas without a dark backing container
- Don't use generic Tailwind colors (gray-500, blue-600) — always use the defined palette tokens
- Don't add new fonts — the dual-font system is intentional and complete

---
name: Kawaii-Retro Shift System
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414845'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#717975'
  outline-variant: '#c1c8c4'
  surface-tint: '#44655a'
  primary: '#44655a'
  on-primary: '#ffffff'
  primary-container: '#c7ebdd'
  on-primary-container: '#4b6b60'
  inverse-primary: '#abcec1'
  secondary: '#745665'
  on-secondary: '#ffffff'
  secondary-container: '#fdd5e7'
  on-secondary-container: '#795a69'
  tertiary: '#665e3c'
  on-tertiary: '#ffffff'
  tertiary-container: '#efe3b8'
  on-tertiary-container: '#6d6542'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6eadc'
  primary-fixed-dim: '#abcec1'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#2d4d43'
  secondary-fixed: '#ffd8e9'
  secondary-fixed-dim: '#e3bcce'
  on-secondary-fixed: '#2b1421'
  on-secondary-fixed-variant: '#5b3e4d'
  tertiary-fixed: '#eee3b7'
  tertiary-fixed-dim: '#d1c79d'
  on-tertiary-fixed: '#211b02'
  on-tertiary-fixed-variant: '#4e4727'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -1px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  pixel-data:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  gutter: 12px
  offset-shadow: 4px
---

## Brand & Style

This design system blends the nostalgic "girly" aesthetic of the late 90s/early 2000s with a modern Neo-Brutalist gaming interface. It is designed to alleviate the high stress of veterinary shift handovers by creating an environment that feels playful, empathetic, and tactile.

The visual language is characterized by "hard" digital structures—thick borders, monospaced fonts, and 8-bit icons—softened by a confectionery color palette and rounded corners. The goal is to make professional medical data entry feel as engaging as a retro handheld pet simulator, ensuring high user retention and reducing cognitive load through clear, high-contrast separation of information.

## Colors

The palette uses a high-chroma, low-value approach typical of retro gaming interfaces. 

- **Mint Green (#C7EBDD):** Used for the primary application background and "Safe" status indicators.
- **Pastel Pink (#F7CFE1):** The primary color for window headers, cards, and primary action buttons.
- **Cream & Soft Yellow:** Reserved for secondary information cards and subtle highlights within a list.
- **Warm Orange (#FF7A45):** Specifically for Critical Alerts and the Main Call to Action (e.g., "End Shift").
- **Dark Outlines (#2D2D2D):** All structural elements must use this color for 3px borders to maintain the Neo-Brutalist look.

## Typography

Typography balances the "Tech" and "Cute" pillars of the system. 

- **Headlines:** Use **Space Grotesk**. Its geometric quirks mirror the Neo-Brutalist style while remaining highly legible.
- **Body:** Use **Quicksand**. The rounded terminals provide the "girly" softness required to offset the heavy borders.
- **Data/Labels:** Use **Space Mono**. This monospaced font should be used for timestamps, medical dosages, and patient IDs to evoke the 8-bit gaming aesthetic.

All text should maintain high contrast against backgrounds. Avoid using grey; use the Dark Outline color for all text to keep the "inked" look.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model optimized for one-handed mobile use. 

- **Grid:** A 4-column mobile grid with 16px side margins.
- **Rhythm:** All spacing is based on a 4px baseline unit. 
- **The "Window" Concept:** Content should be housed in "Windows" (cards with headers). These windows use a 3px solid border and a 4px solid offset shadow.
- **Tactile Padding:** Buttons and interactive elements feature generous internal padding (min 16px height) to ensure they are easy to tap in a fast-paced clinical environment.

## Elevation & Depth

This system rejects natural shadows and blurs in favor of **Hard-Offset Elevation**. 

- **Depth Level 1:** Elements appear "flat" on the mint background with a 3px border.
- **Depth Level 2 (Interactive):** Elements (Buttons/Cards) feature a solid 4px shadow offset to the bottom-right. The shadow color is always the Dark Outline (#2D2D2D).
- **Depth Level 3 (Active/Pressed):** When a user taps an element, the offset shadow disappears, and the element shifts 4px down and 4px to the right to simulate a physical "click."
- **Layering:** Use color-blocking rather than shadows to show hierarchy. A pink header bar on a white card indicates the top level of a component.

## Shapes

The design system uses "Softened Geometry." While the aesthetic is brutalist, sharp corners are avoided to maintain a friendly, approachable feel for a pet-focused app.

- **Standard Radius:** 8px for cards and large containers.
- **Small Radius:** 4px for buttons, input fields, and tags.
- **Borders:** A consistent 3px solid stroke is applied to every container.
- **Icons:** Icons should be contained within square or circular boxes with 3px borders, never floating freely without a "frame."

## Components

### Buttons
Primary buttons use the Pink background with a 3px dark border and 4px black offset shadow. Text is centered and bold. CTA buttons use the Warm Orange background to denote urgency or primary flow completion.

### Cards (The "Handover Window")
Modeled after 90s OS pop-ups. Each card has a colored "Title Bar" (usually Pink or Yellow) containing the patient name or category. The main content area is the Off-White Input Background.

### Input Fields
Inputs use the #FFFDF7 background to distinguish them from static cards. They feature a 3px border. On focus, the border thickens or changes to the Primary Mint color, and the shadow remains solid.

### Status Chips
Use 8-bit pet icons (dogs, cats, bunnies) alongside text. Chips are rounded-pill shapes with a 2px border and no shadow to keep them secondary to main buttons.

### Navigation
A bottom-bar dock with large, chunky icons. Use doodle-style icons (hearts for vitals, paw prints for patient list) with thick strokes. The active state is indicated by the icon "lifting" with a larger offset shadow.
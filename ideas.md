# Meshmonitoring Landing Page — Design Brainstorm

## Context
Landing page for meshmonitoring.com — a community-driven mesh network monitoring platform for YYC (Calgary) and Canada. Services include firehose data streams, mesh mappers, and analyzers built on Meshtastic/LoRa radio networks.

---

<response>
<probability>0.07</probability>
<text>

## Idea A — "Deep Signal" (Cyberpunk Terminal Aesthetic)

**Design Movement:** Cyberpunk / Brutalist Terminal

**Core Principles:**
- Raw, unfiltered data-forward design — the UI feels like it was built by engineers, for engineers
- Monochrome base with electric accent pops (neon green, amber)
- Deliberate asymmetry and grid-breaking layouts
- Typography as a structural element, not decoration

**Color Philosophy:**
- Background: near-black `#0a0d0f` with subtle scanline texture
- Primary accent: electric green `#00ff88` — signals, radio waves, data pulses
- Secondary: amber `#ffb700` for alerts and highlights
- Text: off-white `#e8edf0` with muted grays for secondary content
- Cards: dark slate `#111518` with 1px neon-green border glow

**Layout Paradigm:**
- Full-bleed hero with animated mesh node graph in background (SVG/canvas)
- Cards arranged in a staggered, slightly rotated grid — intentionally imperfect
- Left-rail navigation with monospace labels
- Horizontal rule dividers styled as signal waveforms

**Signature Elements:**
- Animated pulsing radio signal rings on node icons
- Monospace font for all technical labels and URLs
- Scanline overlay texture on hero section

**Interaction Philosophy:**
- Cards glow brighter on hover with a neon border animation
- Cursor changes to crosshair near interactive elements
- Subtle CRT flicker on page load

**Animation:**
- Hero: particle mesh nodes slowly drift and connect/disconnect
- Cards: slide-in from bottom with stagger delay on page load
- Hover: border glow expands outward (box-shadow animation)

**Typography System:**
- Display: `JetBrains Mono` — monospace, technical authority
- Body: `Space Grotesk` — modern, geometric, readable
- Labels: `JetBrains Mono` uppercase with letter-spacing

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B — "Northern Signal" (Arctic Topographic)

**Design Movement:** Scandinavian Minimalism meets Topographic Data Visualization

**Core Principles:**
- Clean, breathable whitespace with precise information hierarchy
- Topographic contour lines as decorative motif (referencing terrain mapping)
- Muted, cold palette inspired by Alberta's northern geography
- Cards as "stations" on a map — each with its own identity

**Color Philosophy:**
- Background: cold white `#f4f6f8` with faint topographic line texture
- Primary: deep navy `#1a2744` — authority, precision
- Accent: signal blue `#2563eb` — connectivity, data flow
- Cards: pure white with navy left-border accent stripe
- Status indicators: green `#10b981` for live/active

**Layout Paradigm:**
- Asymmetric hero: large typographic statement left, animated map visualization right
- Cards in a 2-3 column masonry-style grid, varying heights
- Thin horizontal rules as section dividers
- Footer with coordinate-style metadata

**Signature Elements:**
- Subtle topographic contour line SVG background pattern
- Left-border accent stripe on each card (color-coded by service type)
- Coordinate typography (lat/long style) for decorative metadata

**Interaction Philosophy:**
- Cards lift with a precise shadow on hover — no glow, just depth
- Smooth underline animations on links
- Section transitions use opacity fade

**Animation:**
- Hero: contour lines slowly animate (subtle parallax scroll)
- Cards: fade-up entrance with 100ms stagger
- Hover: translateY(-4px) with shadow deepening

**Typography System:**
- Display: `Syne` — geometric, distinctive, modern
- Body: `DM Sans` — clean, neutral, highly readable
- Mono labels: `IBM Plex Mono` for URLs and technical data

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea C — "Radio Dark" (Dark Prestige Dashboard)

**Design Movement:** Dark Prestige / Operational Intelligence

**Core Principles:**
- Dark-first design that feels like a mission control interface
- Structured information density without clutter
- Subtle gradients and glassmorphism for depth
- Each card is a "live station" with status indicators

**Color Philosophy:**
- Background: deep charcoal `#0f1117` with very subtle blue tint
- Surface: `#1a1d27` for cards and panels
- Primary accent: electric blue `#3b82f6` — connectivity, signal
- Secondary accent: cyan `#06b6d4` for live/active states
- Text: `#e2e8f0` primary, `#94a3b8` secondary/muted
- Borders: `rgba(255,255,255,0.08)` — subtle, glassy

**Layout Paradigm:**
- Full-width dark hero with animated mesh network visualization
- Cards in a responsive 2-3 column grid with glassmorphism effect
- Sticky minimal header with logo and tagline
- Section dividers using gradient lines

**Signature Elements:**
- Glassmorphism card surfaces with backdrop-blur
- Animated "live" pulse indicator on each card
- Subtle grid dot pattern on hero background

**Interaction Philosophy:**
- Cards scale slightly on hover with border glow
- Smooth color transitions on interactive elements
- Status indicators pulse continuously

**Animation:**
- Hero: animated SVG mesh nodes with connecting lines
- Cards: staggered fade-in from below on load
- Hover: scale(1.02) + border-color transition + glow

**Typography System:**
- Display: `Outfit` — clean, modern, slightly geometric
- Body: `Inter` — reliable readability (acceptable here as secondary)
- Mono: `Fira Code` for URLs and technical identifiers

</text>
</response>

---

## Selected Approach: **Idea C — "Radio Dark"**

Dark prestige aesthetic with glassmorphism cards, animated mesh visualization, and a mission-control feel. This best fits the technical nature of mesh network monitoring while remaining accessible to community members. The electric blue + cyan palette references radio signal frequencies and data connectivity.

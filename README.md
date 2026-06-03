# Databased Website

The official website of **Databased** — the undergraduate Computer Science club at the Indian Institute of Science (IISc), Bengaluru. Run entirely by B.Tech. Mathematics and Computing students under the CSA department.

**Live site:** [databased.csa.iisc.ac.in](https://databased.csa.iisc.ac.in)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Pages](#pages)
6. [Component Catalog](#component-catalog)
7. [Data Schemas](#data-schemas)
8. [Adding Content](#adding-content)
9. [Deployment](#deployment)
10. [Configuration](#configuration)
11. [Implementation Notes](#implementation-notes)

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14 | React framework, App Router, static export |
| [React](https://react.dev/) | 18 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animations and transitions |
| [Lucide React](https://lucide.dev/) | 0.400 | Icon library |
| [ogl](https://github.com/oframe/ogl) | 1 | WebGL renderer (Grainient background) |

**Fonts:** Inter (body) · JetBrains Mono (code/labels)

**Deployment:** GitHub Actions → GitHub Pages (static export)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build (static export)
npm run build
# → ./out/ directory

# Lint
npm run lint
```

**Requirements:** Node.js 22+, npm

**Environment variables:**

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Subdirectory path for GitHub Pages | `/dbd_website_new` |
| `AIRTABLE_API_KEY` | Read-only API key for fetching data | `patXXXXXXXXXXXXXX` |

Create a `.env.local` file in the project root. Never commit it.

---

## Project Structure

```
databasediisc.github.io/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, navbar, footer)
│   ├── globals.css               # Global styles, CSS variables, theme
│   ├── page.tsx                  # / — Home page
│   ├── not-found.tsx             # 404 page
│   ├── about/
│   │   └── page.tsx              # /about — About & Members
│   ├── events/
│   │   └── page.tsx              # /events — Events listing
│   ├── blog/
│   │   └── page.tsx              # /blog — Blog posts
│   ├── pages/                    # Modernized event-specific pages
│   │   ├── open-day-2024/page.tsx
│   │   ├── open-day-2025/page.tsx
│   │   ├── algorithms/page.tsx
│   │   ├── hack-and-seek/page.tsx
│   │   └── ideathon/page.tsx
│   └── resources/
│       └── page.tsx              # /resources — Learning resources
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky top navigation bar
│   │   ├── Footer.tsx            # Site footer with social links
│   │   ├── BackgroundEffects.tsx # DotField canvas background (all pages)
│   │   ├── InnerLayout.tsx       # Wrapper for Grainient background overlay
│   │   └── AnnouncementBanner.tsx# Dismissible top announcement banner
│   ├── home/
│   │   ├── Hero.tsx              # Full-viewport hero section
│   │   ├── AboutTeaser.tsx       # "Who we are" teaser with IISc sketch
│   │   ├── FeaturedEvents.tsx    # 4-card recent events grid
│   │   └── WhatWeDo.tsx          # 4-card activities grid
│   ├── events/
│   │   ├── EventCard.tsx         # Individual event card
│   │   ├── EventFilters.tsx      # Filter pill buttons (All / CTF / Talk…)
│   │   └── EventsClient.tsx      # Client-side filter + render logic
│   ├── about/
│   │   ├── MemberCard.tsx        # Individual member card (avatar, links)
│   │   └── MemberGrid.tsx        # Filterable member grid
│   ├── blog/
│   │   └── PostCard.tsx          # Blog post card (tags, author, date)
│   ├── background/
│   │   └── DotField.tsx          # Canvas dot-field with cursor interaction
│   └── ui/
│       ├── Button.tsx            # Button (filled / outlined / ghost)
│       ├── Tag.tsx               # Pill tag (CTF, Talk, Workshop…)
│       ├── SectionHeading.tsx    # Section heading with eyebrow + subtitle
│       └── Grainient.tsx         # WebGL animated gradient background
│
├── data/                         # JSON content files — edit these to update content
│   ├── events.json               # Club events
│   ├── members.json              # Team members
│   └── resources.json            # Learning resources
│
├── public/                       # Static assets (served at /)
│   ├── icon.png                  # Club logo (used in navbar)
│   ├── text.png                  # Logo text asset
│   ├── textOld.png               # Legacy logo text asset
│   └── iisc-linesketch.png       # IISc campus line-art illustration
│
├── pages/                        # Legacy static event pages (separate from App Router)
│   ├── launch/                   # Club launch event page
│   ├── math-sessions/            # Math Sessions page
│   ├── paradox/                  # Paradox CTF page
│   ├── projects/                 # Projects page
│   └── commons/                  # Shared legacy CSS/JS
│
├── scripts/
│   └── fetch-airtable-data.js    # Build-time script to pull data from Airtable
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD: build + deploy to GitHub Pages
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind theme (colors, fonts, animations)
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.js             # PostCSS (Tailwind + autoprefixer)
└── manifest.json                 # PWA manifest
```

---

## Design System

### Color Palette

All colors are CSS custom properties defined in `app/globals.css`. Tailwind classes reference them via `tailwind.config.ts`.

**Dark mode (default):**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `bg-bg-base` | `--c-bg-base` | `#0c0d0f` | Page background |
| `bg-bg-surface` | `--c-bg-surface` | `#14161d` | Cards, sections |
| `bg-bg-elevated` | `--c-bg-elevated` | `#1e212b` | Hover states, dropdowns |
| `text-text-primary` | `--c-text-primary` | `#ffffff` | Headings, strong text |
| `text-text-secondary` | `--c-text-secondary` | `#8a8f9e` | Body copy |
| `text-text-muted` | `--c-text-muted` | `#474c5c` | Metadata, placeholders |
| `text-accent` | `--c-accent` | `#10f933` | Logo green — nav active, CTAs, focus rings |
| `text-mono` | `--c-mono` | `#ff6600` | Logo orange — secondary tags, hover states |
| `border-border` | `--c-border` | — | Default borders |
| `border-border-subtle` | `--c-border-subtle` | — | Faint dividers |

*Note: The website is exclusively dark-mode to maintain a consistent cyber/hacker aesthetic.*

**Accent usage rules:**
- **Green** (`--c-accent`): active nav underline, primary button borders, focus rings, `<code>` text, card hover borders
- **Orange** (`--c-mono`): "Upcoming" badges, CTF tag pills, ghost button hover state
- Never fill large areas at full saturation — the logo is the primary expression of both colors

### Typography

| Use | Font | Weight | Notes |
|---|---|---|---|
| Headings | Inter | 700–900 | Tight tracking |
| Body | Inter | 400 | Relaxed line-height |
| Labels / Tags / Dates | JetBrains Mono | 400 | Smaller size, no all-caps |

Tailwind classes: `font-sans` (Inter) · `font-mono` (JetBrains Mono)

### Animations

- **Entrance:** `whileInView` fade-up (~0.4s) via Framer Motion, `viewport={{ once: true }}`
- **Stagger:** grids stagger children by `i * 0.08s`
- **Hover:** `border-color` transitions + `translateY(-2px)` on cards
- **Reduced motion:** `globals.css` includes `@media (prefers-reduced-motion: reduce)` — all transitions set to `0s`

---

## Pages

### `/` — Home

**File:** `app/page.tsx`

Composed of four sections rendered in order:

| Section | Component | Description |
|---|---|---|
| Hero | `Hero.tsx` | Full-viewport, logo + CTAs + scroll indicator |
| About Teaser | `AboutTeaser.tsx` | 2-col: text left, IISc sketch right |
| Featured Events | `FeaturedEvents.tsx` | First 4 events from `events.json` |
| What We Do | `WhatWeDo.tsx` | 4 activity cards with icons |

The hero uses a dot-grid texture overlay and a vignette. No server-side data fetching — events are imported directly from the JSON file.

---

### `/about` — About & Members

**File:** `app/about/page.tsx`

| Section | Content |
|---|---|
| About text | 3 paragraphs describing the club |
| Supervisor credit | Prof. Chiranjib Bhattacharya, CSA Dept |
| Member grid | Filterable grid from `data/members.json` |

Filter tabs: **All** · **Core Team** · **Coordinators**

---

### `/events` — Events

**File:** `app/events/page.tsx`

Passes all events from `data/events.json` to `EventsClient` (client component) which handles client-side filtering.

Filter pills: **All** · **CTF** · **Talk** · **Workshop** · **Competition** · **Other**

Past events display at lower opacity; upcoming events get an accent-color border.

---

### `/blog` — Blog

**File:** `app/blog/page.tsx`

Currently uses hardcoded static post data (3 posts). Renders `PostCard` components in a grid. Includes a note directing contributors to the GitHub repo. Designed for future MDX expansion.

---

### `/resources` — Learning Resources

**File:** `app/resources/page.tsx`

14 curated resources rendered from `data/resources.json`, grouped by category.

Categories: Competitive Programming · CTF / Security · Machine Learning · Systems & Architecture · General CS

Each resource shows a difficulty badge: **Beginner** · **Intermediate** · **Advanced**

---

## Component Catalog

### Layout

#### `Navbar.tsx`
- Fixed top header, always dark background with bottom border
- Desktop: logo left, 5 nav links center-right, theme toggle far right
- Mobile: hamburger → fullscreen overlay nav with staggered link animations
- Active link: green underline indicator
- Uses `usePathname()` to determine active route

#### `Footer.tsx`
- 3-column grid: brand info · page links · contact
- Social icons: GitHub, Instagram, Facebook, LinkedIn (inline SVGs)
- Email: `databased.csa@iisc.ac.in`
- Copyright year computed dynamically

#### `BackgroundEffects.tsx`
- Fixed, full-screen, `z-index: 0`, `pointer-events: none`
- Renders `DotField` with the following config:
  - `dotRadius: 2.5`, `dotSpacing: 18`
  - Cursor bulge: `cursorRadius: 80`, `bulgeStrength: 80`
  - Gradient: orange → green
  - No sparkle, no wave animation

#### `AnnouncementBanner.tsx`
- Dismissible top banner (renders above navbar)
- Content: recruitment message for 2025–26 coordinators
- Dismiss state stored in component (resets on page reload)

#### `InnerLayout.tsx`
- Wrapper that renders `Grainient` as a fixed background behind children
- `Grainient` at `z-index: 1`, children at `z-index: 2`
- Used by non-home page layouts when the Grainient background is enabled

---

### Home

#### `Hero.tsx`
```
Full viewport height
├── Dot grid overlay + vignette gradient
├── Eyebrow: "IISc · Bengaluru · CSA Dept."
├── Logo image (masked with radial gradient)
├── Subheading: "IISc's Undergraduate CS Club"
├── Description paragraph
├── CTAs: [About Us] [View Events]
└── Scroll indicator (animated bounce)
```

#### `AboutTeaser.tsx`
```
2-column grid (md: breakpoint)
├── Left: SectionHeading + welcome text + "More about us →"
└── Right: IISc campus line sketch (80% opacity, fade-in from right)
```

Text uses `text-justify` for flush right edge alignment.

#### `FeaturedEvents.tsx`
- Receives first 4 events as props from `app/page.tsx`
- Responsive grid: 1 col → 2 → 4
- Each card staggered by 0.08s delay
- "View all events →" link at bottom

#### `WhatWeDo.tsx`
Four activity cards:

| Icon | Title |
|---|---|
| `Code2` | Competitive Programming |
| `Shield` | Capture the Flag |
| `Presentation` | Tech Talks & Workshops |
| `Users` | Alumni Sessions |

---

### Events

#### `EventCard.tsx`

```
┌─────────────────────────────────┐
│ [Type Tag]             [↗ link] │
│ Event Title                     │
│ Short description (3 lines max) │
│ ── ── ── ── ── ── ── ── ── ──  │
│ DD MMM YYYY                     │
└─────────────────────────────────┘
```

- Past events: muted border
- Upcoming events: accent-color border highlight
- Date formatted to Indian locale (`en-IN`)

#### `EventFilters.tsx`
- Button group: All, CTF, Talk, Workshop, Competition, Other
- Active: accent background + white text
- `aria-pressed` for accessibility

#### `EventsClient.tsx`
- `'use client'` — manages `activeFilter` state
- Filters `events[]` prop by type
- `AnimatePresence` wraps the grid for smooth filter transitions
- Shows "No events found" message when filter returns empty

---

### About

#### `MemberCard.tsx`
```
┌──────────────────┐
│   [Avatar / ??]  │
│   Member Name    │
│   Role · Year    │
│   [GH] [LI]      │
└──────────────────┘
```

Avatar: circular photo if `photo` field set, otherwise initials fallback (first letters of first + last name).

#### `MemberGrid.tsx`
- `'use client'` — filter state
- Filter tabs: All · Core Team · Coordinators
- 4-column grid (responsive: 2 col sm, 3 col md, 4 col lg)
- `AnimatePresence mode="wait"` for tab transition

---

### UI Primitives

#### `Button.tsx`

| Variant | Appearance |
|---|---|
| `filled` | Green border + text, filled on hover |
| `outlined` | Dim border, turns orange on hover |
| `ghost` | No border, text only |

| Size | Padding |
|---|---|
| `sm` | `px-3 py-1.5` |
| `md` (default) | `px-5 py-2.5` |
| `lg` | `px-7 py-3.5` |

Renders as `<a>` when `href` prop is passed, otherwise `<button>`.

#### `Tag.tsx`

| Type | Color |
|---|---|
| `CTF`, `Competition` | Orange (`--c-mono`) |
| `Talk` | Green (`--c-accent`) |
| `Workshop` | Sky blue |
| `Other` | Muted gray |

Sizes: `sm` · `md`

#### `SectionHeading.tsx`
```
[EYEBROW]        ← accent color, uppercase, mono font
Heading Text     ← large, bold, Inter
Optional subtitle ← secondary text color
```

`'use client'` — uses Framer Motion `whileInView` fade-up. Accepts `centered` prop for centered layouts.

---

### Background / Visual

#### `DotField.tsx`

Canvas-based animated dot field rendered at full viewport size.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `dotRadius` | number | 1.5 | Dot size in pixels |
| `dotSpacing` | number | 20 | Grid spacing between dots |
| `cursorRadius` | number | 60 | Radius of cursor influence zone |
| `bulgeOnly` | boolean | false | Only bulge, don't attract |
| `bulgeStrength` | number | 40 | How far dots move toward cursor |
| `glowRadius` | number | 50 | Size of glow under cursor |
| `glowColor` | string | — | CSS color for glow |
| `gradientFrom` | string | — | Dot color gradient start |
| `gradientTo` | string | — | Dot color gradient end |
| `sparkle` | boolean | false | Random sparkle on dots |
| `waveAmplitude` | number | 0 | Idle wave animation strength |

Rendering: `requestAnimationFrame` loop, `ResizeObserver` for viewport changes. Mouse position tracked via `window.mousemove`.

#### `Grainient.tsx`

WebGL fragment shader gradient using the `ogl` library. Requires WebGL 2.

**Props (all optional):**

| Prop | Default | Description |
|---|---|---|
| `color1` | `#ff6600` | First blend color |
| `color2` | `#10f933` | Second blend color |
| `color3` | `#0c0d0f` | Third blend color (base) |
| `timeSpeed` | `0.08` | Overall animation speed |
| `grainAmount` | `0.06` | Film grain intensity |
| `saturation` | `0.35` | Output color saturation |
| `contrast` | `1.3` | Output contrast |
| `warpStrength` | `1.0` | Distortion intensity |
| `warpFrequency` | `4.0` | Distortion frequency |

The component appends a `<canvas>` to its container div and tears it down on unmount. `ResizeObserver` handles viewport resize. Full prop list in the component source.

---

## Data Schemas

### `data/events.json`

```typescript
interface Event {
  id: string           // Unique slug, e.g. "hack-and-seek-2024"
  title: string        // Display name
  date: string         // ISO 8601, e.g. "2024-10-05"
  type: "CTF" | "Talk" | "Workshop" | "Competition" | "Other"
  description: string  // Short summary (1–2 sentences)
  link?: string | null // Optional URL to event page or external resource
}
```

**Current events (12 total):** CTF × 2 · Competition × 2 · Workshop × 3 · Talk × 2 · Other × 3

---

### `data/members.json`

```typescript
interface Member {
  name: string
  role: string                        // e.g. "President", "CTF Lead"
  year: string                        // Graduation year, e.g. "2025"
  category: "Core Team" | "Coordinators"
  photo?: string                      // Path or URL (optional; initials shown if absent)
  links?: {
    github?: string                   // Full GitHub profile URL
    linkedin?: string                 // Full LinkedIn profile URL
  }
}
```

**Current members (10 total):** Core Team × 5 · Coordinators × 5

---

### `data/resources.json`

```typescript
interface Resource {
  title: string
  category: string                    // e.g. "Competitive Programming"
  link: string                        // Full URL
  description: string                 // One-sentence summary
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}
```

**Current resources (14 total)** across 6 categories.

---

## Adding Content

### Airtable Sync

Event and member data is managed in Airtable. During the GitHub Actions build process, `scripts/fetch-airtable-data.js` runs automatically, fetches the latest data from Airtable, and writes it to `data/events.json` and `data/members.json`.

**To update data locally:**
1. Ensure your `.env.local` has a valid `AIRTABLE_API_KEY`.
2. Run `npm run dev` or `node scripts/fetch-airtable-data.js` to refresh the JSON files.

*Note: You can manually edit the JSON files for local testing, but your changes will be overwritten by the Airtable sync during the next build.*

---

### Add an event

To add an event, add a row to the "Events" table in Airtable. Ensure all required fields are filled (Title, Date, Type, Description). If you upload an image to Airtable, it will be automatically linked. Alternatively, manual fallback events are hardcoded for edge cases directly in `events.json` (such as the legacy CTF / Algorithm Festival pages).

---

### Add a member

To add a member, add a row to the "Members" table in Airtable. The "Category" should be "Core Team" or "Coordinators". You can provide their GitHub and LinkedIn URLs directly in the table.

---

### Add a resource

Edit `data/resources.json`:

```json
{
  "title": "Resource Title",
  "category": "CTF / Security",
  "link": "https://example.com",
  "description": "One sentence about what this resource covers.",
  "difficulty": "Intermediate"
}
```

Resources are grouped by `category` on the page — use an existing category name to group it correctly, or introduce a new one (it will create a new section automatically).

---

### Add a blog post

Currently the blog page (`app/blog/page.tsx`) uses hardcoded post data. To add a post, append to the `posts` array in that file:

```typescript
{
  title: 'Post Title',
  date: '2025-09-01',
  author: 'Author Name',
  excerpt: 'Short description shown on the listing page.',
  tags: ['CTF', 'Tutorial'],
  slug: 'post-slug',
}
```

For a full MDX-based blog with individual post pages, add `/content/blog/*.mdx` files and create a dynamic route at `app/blog/[slug]/page.tsx`. See the CLAUDE.md for the intended architecture.

---

## Deployment

### How it works

Pushing to `master` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Checks out code
2. Sets up Node 22 with npm cache
3. Runs `npm ci`
4. Runs `node scripts/fetch-airtable-data.js` to pull fresh data (injecting `AIRTABLE_API_KEY` from GitHub Secrets).
5. Runs `npm run build` with `NEXT_PUBLIC_BASE_PATH=/dbd_website_new`
6. Deploys the `./out/` directory to the `gh-pages` branch via `peaceiris/actions-gh-pages@v4`

GitHub Pages serves the `gh-pages` branch at the live URL.

### Static export

The site uses `output: 'export'` in `next.config.js`, which generates a fully static `./out/` directory. This means:

- No server-side rendering at request time
- No API routes
- `next/image` optimization is disabled (`images: { unoptimized: true }`)
- All data is loaded at build time from JSON files

### Base path

The site is deployed to a subdirectory (`/dbd_website_new`), not the domain root. This is handled by:

- `basePath` in `next.config.js` (tells Next.js router the prefix)
- `assetPrefix` in `next.config.js` (prefixes static asset URLs)
- `NEXT_PUBLIC_BASE_PATH` env var (used in components for manually constructed image `src` attributes)

Any `<img src=...>` or hardcoded asset path in components must be prefixed:

```tsx
src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/my-image.png`}
```

Use `next/image` where possible — it handles the prefix automatically.

---

## Configuration

### `next.config.js`

```js
{
  output: 'export',           // Generate static HTML
  trailingSlash: true,        // /about → /about/index.html
  images: { unoptimized: true },
  basePath,                   // From NEXT_PUBLIC_BASE_PATH env var
  assetPrefix,
  pageExtensions: ['tsx', 'ts', 'jsx', 'mdx']
}
```

### `tailwind.config.ts`

Extends Tailwind with:
- **Custom colors:** All reference CSS variables with `<alpha-value>` for opacity modifier support (e.g. `bg-accent/10`)
- **Font families:** `sans` → Inter, `mono` → JetBrains Mono
- **Custom animation:** `blink` keyframe for the cursor in terminal-style UI elements
- **Content paths:** `./app/**/*.{tsx}`, `./components/**/*.{tsx}`

### `tsconfig.json`

- `target: ES2017`
- `moduleResolution: bundler`
- `paths: { "@/*": ["./*"] }` — import alias for project root
- `strict: true`
- `jsx: preserve` — Next.js handles JSX transform

---

## Implementation Notes

### CSS variables and Tailwind opacity

Color variables in `globals.css` use the RGB channel format with `<alpha-value>`:

```css
--c-accent: 16 249 51;
```

This lets Tailwind's opacity modifiers work correctly:

```tsx
className="bg-accent/10"   // rgba(16, 249, 51, 0.1)
className="text-accent"    // rgb(16, 249, 51)
```

### Legacy pages

The `/pages/` directory contains standalone HTML/CSS/JS event microsites (Paradox CTF, Open Day, Algorithm Festival, etc.) that predate the Next.js redesign. They are served as-is and are not integrated into the App Router. They use their own CSS in `/pages/commons/`.

### Canvas-based background

`DotField` runs a `requestAnimationFrame` loop and redraws the entire canvas every frame. Mouse position is tracked via a global `mousemove` listener. When `bulgeOnly` is true, dots move away from (rather than toward) the cursor, creating the repulsion effect visible on the site.

### Client vs server components

The project defaults to server components. `'use client'` is used only where required:

- Interactive state (`useState`, `useEffect`): Navbar, ThemeToggle, filters, member/event grids
- Browser APIs (canvas, WebGL, `window`, `localStorage`): DotField, Grainient, ThemeToggle
- Framer Motion (requires DOM): Hero, SectionHeading, card grids

Framer Motion `whileInView` requires `'use client'` — this is why `SectionHeading` and card components are client components even though they contain no interactive state.

### Image paths in components

Because of the base path configuration, any manually written `src` attribute must be prefixed:

```tsx
// Correct
src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/icon.png`}

// Wrong — breaks on GitHub Pages
src="/icon.png"
```

`next/image` handles this automatically if used. The project uses `<img>` in several places because `next/image` requires explicit `width`/`height` or `fill` and doesn't support all layout patterns needed.

# CLAUDE.md — Databased Website Redesign

## Always do first

 **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions. 

## Project Overview

This is a redesign of the **Databased** website — the undergraduate Computer Science club at IISc (Indian Institute of Science), run by B.Tech. (Mathematics and Computing) students under the CSA department. The goal is to retain the same information architecture as the current site at `https://databased.csa.iisc.ac.in/` but deliver a significantly more polished, modern design with better UX, accessibility, and visual identity.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS variables for theming
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** `Inter` (body) + `JetBrains Mono` (code/accent text, fits the CS club identity)
- **Deployment:** Vercel (or static export for GitHub Pages)
- **Content:** JSON/MDX files for events and members (easy to update without touching code)

---

## Design Language
 
### Aesthetic
Clean, dark, and professional — designed to frame the logo without competing with it. The logo uses **#10f933** (electric green) and **#ff6600** (vivid orange), so the rest of the site should be largely neutral: deep backgrounds, cool-toned surfaces, and muted text. The logo is the only place both colors live together at full saturation. Everywhere else, pull from them very sparingly as small UI accents — a hover border, a tag pill, an active indicator — so the logo always feels like the loudest thing on the page.
 
### Color Palette
 
**Backgrounds** — deep, neutral, slightly cool-tinted to complement the warmth of the orange in the logo:
```
--bg-base:        #0c0d0f   /* near-black with a cool blue-gray undertone */
--bg-surface:     #13151a   /* card and section backgrounds */
--bg-elevated:    #1c1f27   /* hover states, modals, dropdowns */
--border:         #252830   /* default borders */
--border-subtle:  #1a1d24   /* very faint dividers */
```
 
**Text** — neutral whites and grays, no color casts:
```
--text-primary:   #eaeaea   /* headings and strong body text */
--text-secondary: #8a8f9e   /* body copy, descriptions */
--text-muted:     #474c5c   /* placeholders, metadata, disabled */
```
 
**Logo colors — used as accents only, never as backgrounds or large fills:**
```
--green:          #10f933   /* logo green — active nav indicator, focus ring, primary CTA border */
--green-dim:      #10f91a12 /* very faint green tint — tag pill backgrounds, stat block tints */
--orange:         #ff6600   /* logo orange — secondary tag pills, "upcoming" badge, hover on ghost buttons */
--orange-dim:     #ff660010 /* very faint orange tint — used even more sparingly than green-dim */
```
 
**UI chrome:**
```
--surface-code:   #161820   /* code block backgrounds */
--shadow:         rgba(0, 0, 0, 0.5)
```
 
### Accent Usage Rules
- The logo is the **primary** expression of both colors. On the rest of the site, they appear only as small, purposeful accents.
- **Green** is used for: the active nav link underline, primary button borders + text, focus rings, the card hover border on featured content, `<code>` text color.
- **Orange** is used for: "Upcoming" event badges, CTF/competition tag pills, hover state on outlined/ghost buttons, a thin decorative rule on the section heading for Events.
- Never fill a large area (button background, card background, section background) with either color at full saturation — it would overpower the logo.
- When both appear on the same page section (e.g. an event card with a green border and an orange "Upcoming" badge), keep at least one of them dimmed or very small in size so they don't fight each other.


### Typography
- Headings: `Inter`, weight 700–900, tight tracking
- Body: `Inter`, weight 400, relaxed line-height
- Labels/Tags/Dates: `JetBrains Mono`, weight 400, smaller size
- No all-caps headers — use sentence case

### Motion
- Subtle entrance animations (fade-up, ~0.4s) on scroll, using Framer Motion `whileInView`
- No heavy parallax or 3D transforms
- Hover: border-color transitions, slight `translateY(-2px)` lifts on cards
- Page transitions: fade in/out (0.2s)

---

## Site Structure

### Pages

```
/                  → Home
/about             → About & Members
/events            → All Events
/blog              → Blog / Write-ups (new — for CTF write-ups, tutorials)
/resources         → Resources (new — curated links, reading lists)
```

### Navigation
- Sticky top navbar, blurred glass background on scroll (`backdrop-filter: blur`)
- Logo (text mark "Databased" in mono font) on the left
- Links on the right: Home, About, Events, Blog, Resources
- Mobile: hamburger → fullscreen overlay nav
- Active link: accent underline

---

## Page Specs

---

### `/` — Home

#### Section 1: Hero
- Full-viewport height
- Large typographic headline: `"Databased"` in display size, monospaced
- Subheading: `"IISc's Undergraduate CS Club"` in secondary text color
- One-line description below
- Two CTAs side by side: `[About Us]` (filled) and `[View Events]` (outlined)
- Subtle animated background: a static noise texture or a very low-opacity grid pattern. No video, no particles.
- The IISc line sketch image can be placed as a faint watermark on the right side of the hero

#### Section 2: About Teaser
- Two-column layout (text left, decorative element right)
- Short paragraph about the club (2–3 sentences max)
- "More About Us →" link, styled as a text CTA with arrow
- Right side: a minimal stat block, e.g.:
  ```
  40+   Members
  3+    Years Active
  50+   Events Hosted
  ```

#### Section 3: Featured Events
- Heading: `"Recent Events"`
- Horizontal scrollable row of event cards (3–4 visible on desktop)
- Each card: event name, date (in mono font), short description, tag pill (e.g. `CTF`, `Talk`, `Workshop`)
- "View All Events →" link at the bottom

#### Section 4: What We Do
- Grid of 4 activity cards, each with a small icon and label:
  - Competitive Programming
  - Capture the Flag (CTF)
  - Tech Talks & Workshops
  - Alumni Sessions
- Cards use `--bg-surface` background, accent-colored icon, minimal border

#### Section 5: Contact / Footer
- Email: `databased.csa@iisc.ac.in`
- Social icons row: Facebook, Instagram, LinkedIn, GitHub (use Lucide icons or SVGs)
- Footer bottom bar: `© Databased, IISc` + a small "Made with ♥ by the team" note
- No separate contact page needed for now

---

### `/about` — About & Members

#### Section 1: About Text
- Full club description paragraph
- Leadership line (e.g., "Headed by [Name], M.Tech CSA. Supervised by Prof. Chiranjib Bhattacharya.")
- Keep it factual, no lorem ipsum in production

#### Section 2: Members Grid
- CSS grid of member cards
- Each card: avatar (circular photo or initials fallback), name, role/year, optional GitHub/LinkedIn icon links
- Filter tabs at the top: `All | Core Team | Coordinators` (if applicable)
- Data source: `/data/members.json`

Member JSON schema:
```json
{
  "name": "string",
  "role": "string",
  "year": "string",
  "photo": "string (path or URL)",
  "links": {
    "github": "string (optional)",
    "linkedin": "string (optional)"
  }
}
```

---

### `/events` — Events

#### Layout
- Page header: "Events"
- Filter bar: `All | CTF | Talk | Workshop | Competition` — filter pills, client-side
- Masonry or uniform grid of event cards
- Each card: title, date (mono), tags, short description, optional external link button
- Older events shown in a muted style (slightly lower opacity) vs upcoming (accent border highlight)

Event JSON schema (`/data/events.json`):
```json
{
  "id": "string",
  "title": "string",
  "date": "YYYY-MM-DD",
  "type": "CTF | Talk | Workshop | Competition | Other",
  "description": "string",
  "link": "string (optional)",
  "image": "string (optional)"
}
```

---

### `/blog` — Blog / Write-ups (New Page)

- List of posts rendered from MDX files in `/content/blog/`
- Each post: title, date, author, tags (e.g., `CTF`, `Tutorial`, `Opinion`)
- Individual post pages at `/blog/[slug]`
- Syntax highlighting for code blocks (use `rehype-pretty-code` or `shiki`)
- No CMS needed initially — MDX files managed via Git

---

### `/resources` — Resources (New Page)

- Curated list of learning resources organised by category:
  - Competitive Programming
  - Systems & Architecture
  - Machine Learning
  - CTF / Security
  - General CS
- Each resource: title, link, short description, difficulty tag (`Beginner | Intermediate | Advanced`)
- Data source: `/data/resources.json`

---

## Content Files

All dynamic content lives in `/data/` or `/content/` — never hardcoded in components.

```
/data/
  members.json
  events.json
  resources.json
/content/
  blog/
    *.mdx
```

---

## Components to Build

```
components/
  layout/
    Navbar.tsx
    Footer.tsx
    PageWrapper.tsx        ← handles page transitions
  ui/
    Button.tsx             ← variants: filled, outlined, ghost
    Tag.tsx                ← pill tags with color by type
    Card.tsx               ← base card with border hover
    StatBlock.tsx          ← animated counter stat
    SectionHeading.tsx     ← consistent heading + optional subtext
  home/
    Hero.tsx
    AboutTeaser.tsx
    FeaturedEvents.tsx
    WhatWeDo.tsx
  events/
    EventCard.tsx
    EventFilters.tsx
  about/
    MemberCard.tsx
    MemberGrid.tsx
  blog/
    PostCard.tsx
    PostList.tsx
```

---

## Accessibility & Performance

- All images: `alt` text required, use `next/image` for optimization
- Color contrast: all text must meet WCAG AA against their background
- Focus rings: visible on all interactive elements (use a custom ring in Tailwind config)
- No motion for users with `prefers-reduced-motion`: wrap all Framer Motion animations in a check
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` used correctly
- Lighthouse target: Performance ≥ 90, Accessibility ≥ 95

---

## What to Preserve from the Old Site

- All existing content (About text, contact email, social links)
- The announcement banner at the top (make it dismissible)
- The IISc line-sketch image asset
- The dark theme and overall club identity

## What to Improve

| Old | New |
|---|---|
| Lorem ipsum placeholder text | Replace with real copy or leave clearly marked `TODO:` |
| Static HTML | Component-based, easy to update |
| No events filtering | Tag-based filter pills |
| No blog/resources section | Add `/blog` and `/resources` |
| Basic social icons (PNG images) | SVG/Lucide icons, consistent sizing |
| No mobile nav animation | Smooth fullscreen overlay |
| Generic fonts | Inter + JetBrains Mono for identity |

---

## Development Notes

- Run `npm run dev` for local dev server
- All environment variables (if any) go in `.env.local` — never commit secrets
- Keep components small and single-responsibility
- Prefer server components by default; use `"use client"` only for interactive parts (filters, nav toggle, animations)
- No external UI libraries (shadcn, MUI, etc.) — keep the design custom and intentional

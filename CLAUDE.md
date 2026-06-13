# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

A **Vite app with SSG prerendering**. `npm run dev` for local dev. `npm run build` runs the client build, an SSR build, and `scripts/prerender.mjs`, which renders every route in `PRERENDER_PATHS` (src/routes.js) into `docs/<path>/index.html` with per-route title/description/canonical, plus `sitemap.xml`, `robots.txt`, and a `404.html` SPA fallback.

**GitHub Pages serves the committed `docs/` folder on `main`. After editing anything in `src/` or `public/`, run `npm run build` and commit `docs/`.**

## Pre-launch honesty rules (do not break these)

The site is pre-launch: **Edition 01 has not opened yet.**

- No fabricated artists, editions, sales counts, archive entries, or impact numbers. The brand's history starts at Edition 01.
- No checkout — piece pages use "Register interest" (Brevo private view signup) instead.
- Artwork shown is always labelled a **studio study**; the Edition 01 artist/artwork is "announced at the opening".
- Vocabulary: **edition closed** (not "sold out"), **acquire** (not "buy"), **private view list** (not "newsletter"), **opening** (not "drop/launch"). Always the accent in *Limité*. No em dashes in collector-facing copy. Prices state currency: `$95 AUD`.
- When the opening date is confirmed, set `AL_OPENS` at the top of `ui.jsx` and rebuild.

## Email capture (Brevo)

All private-view forms (home section, private view page, product pages) submit through `usePrivateViewSignup` in `ui.jsx`, which POSTs `EMAIL` + honeypot + locale as FormData (no-cors) to the Brevo form URL in `AL_BREVO_ACTION`. That form feeds **Brevo list #3 ("Landing Page")** — the same list as the original landing page. The response is unreadable in no-cors mode, so any non-network-error counts as success.

## Architecture

Standard ES modules under `src/`, bundled by Vite. `src/main.jsx` mounts in the browser (hydrates prerendered HTML; falls back to client render after a legacy `#/` redirect); `src/entry-server.jsx` renders per-route for the prerender step. Components must stay SSR-safe: touch `window`/`localStorage` only inside effects or behind guards.

**Three rooms.** The IA is collapsed to three: **the wall** (home, `/`), **the practice** (`/practice/`), **the list** (`/list/`). Primary nav is the wordmark + those three + one "Private view" action; everything else (Journal, Artists, Archive, Future edition preview) lives in a quiet full-screen menu and the footer. Legacy paths still resolve: `/about/` `/work/` `/artists/` → the practice, `/private/` → the list, `/collection/` → the wall. `parsePath` marks these `redirect:true` and `app.jsx` rewrites the URL to `canonicalFor(loc)`. Do not re-expand the primary nav.

**Routing** is path-based (`parsePath`/`pathFor`/`canonicalFor`/`titleFor` in `src/routes.js`). `go(route, arg)` pushes history state; a `popstate` listener updates state and every route sets `document.title`. Header/footer use real `<a href>` (crawlable) that preventDefault into `go()`. Other top-level state: `joined` (read from `localStorage` after mount).

**File responsibilities:**
- `ui.jsx` — `AL` (brand/edition data), `alPrice`, `usePrivateViewSignup`, `Header` (3 rooms + action + full-screen `.site-menu`), `Footer`, `ImageWell`, `Wordmark`. (No `EditionLine` — removed.)
- `content.jsx` — `AL_FAQ`, `AL_ABOUT`, `AL_WORK`; `journal-data.jsx` — `AL_JOURNAL`
- `motion.jsx` — `Reveal`, `useParallax`, `REDUCED`. Cursor spotlight, magnetic buttons, and **pointer-drift** were removed deliberately — do not reintroduce.
- `hero-morph.jsx` — **the frame hero** (`HeroMorph`): one museum-lit framed work on a textured dark wall; on scroll the wall recedes (`.fh-wall` scale + `.fh-scrim`), the work fills, and the wall label (`.fh-resolve`) resolves. **No garment** — the SVG tee was retired. Reduced-motion → static `.fh-static`. `position: sticky` is load-bearing; `.app-root` uses `overflow-x: clip`, never `hidden`.
- `collection.jsx` — `StudyWall`: the studies walked one per viewport on the dark gallery ground (`.sw`), wall label beneath. No grid, no garment.
- `practice.jsx` — `Practice`: the 50/50 manifesto, principles, how an edition works, what ships, the case to artists, an honestly-empty artist module, the work-with-us invitation, then the FAQ.
- `pages.jsx` — `TheList` (the private view list room).
- `home.jsx` — composes the wall: `HeroMorph` + `StudyWall` + `WaxDivider` + a `PracticePath` + `PrivateView`.
- `home-sections.jsx` — `PrivateView` only (the list capture, shared by the wall + the list).
- `product.jsx` — `Product`: the future-edition preview, a framed study + concept labels (no garment, no price).
- `artwork.jsx` — `ART` registry + `FramedArt`. `TeeMockup`/`HoodieMockup` still exist but are UNUSED; do not map prints onto vector garments anywhere. The shared frame markup is `.fh-frame / .fh-mat / .fh-window / .fh-glass`.
- `app.jsx` — route switch; `routes.js` — path/title/desc/canonical + `PRERENDER_PATHS`. (`signature.jsx`, the duplicate morph, was deleted; `about.jsx` is unused, folded into the practice.)

## Design tokens

CSS custom properties in `public/styles.css`. **Palette is the five brand hues only — no bronze:**
- `--studio-black #1A1A18` · `--white #F5F2EC` (Atelier white) · `--canvas #C8B89A` (Raw canvas) · `--dust #8C7B6B` (Studio dust) · `--ink #2C2C2A`
- `--bronze` is RETIRED: the token still exists (≈100 usages) but resolves to `--dust`. Don't reintroduce the bronze hue `#B5A28E`. Reserve `--canvas` (Raw canvas) for warm signature accents on dark grounds (the AL seal, the 047/080 plate, the now-pip).
- **Fonts:** `--serif` (Cormorant Garamond 300, *Limité* always italic), `--sans` (Jost), `--mono` (DM Sans)
- **Legibility floors:** min label font size 10px; dark-surface body text ≥ `rgba(245,242,236,0.55)`.

## Stylesheet

One consolidated `public/styles.css`, in cascade order: @font-face (self-hosted latin woff2 in `assets/fonts/`) → tokens/base → pages → site → home → updates → Phase 2 additions (full-bleed hero, garment beat, roster/archive, PDP gallery, mobile pass). Append new rules at the end so they win the cascade. Fonts are self-hosted — do not reintroduce the Google Fonts CDN @import.

## Content vs. data

- **Brand data** (edition details, products, colourways, sizes): `AL` object in `ui.jsx`
- **Site copy** (FAQ text, about/work content): `content.jsx`
- **Journal articles**: `journal-data.jsx`

When updating copy or brand data, edit those source files — not the screen components — then rebuild.

## Imagery

Artwork imagery is real photography (`assets/art-*.jpg`), registered in `ART` (artwork.jsx) and always presented as studio studies. The home hero is one full-bleed artwork with a single CTA — do not reintroduce the floating frame cluster. Garment-on-body, print-process, and unboxing photography is still to be shot; the SVG garment mockups and `.hatch` wells hold those slots until then.

## Head / social

`index.html` owns the title, meta description, OG/Twitter tags (`og.png`, 1200×630), `favicon.svg`, and `apple-touch-icon.png`. The OG/canonical URLs point at `https://www.atelierlimite.com/`.

## Email (Brevo)

Transactional template **id 5, "Private view · Welcome"** exists in the Brevo account (sender id 1, atelierlimite.studio@gmail.com). It is the welcome email for private view signups; attach it to a list-3 automation in the Brevo UI (automations are not exposed via API).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

The `.jsx` sources are **prebuilt** to `app.js` — there is no Babel in the browser and React loads as the production UMD build from CDN.

```
npm install        # once
npm run build      # compiles all .jsx (in load order) → app.js
```

**After editing any `.jsx` file you must run `npm run build` and commit the regenerated `app.js`.** To test locally, serve the folder (`python3 -m http.server`) or open `index.html` directly — there are no module imports, so `file://` works.

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

A **single-page React app with a build step but no bundler**. The build script in `package.json` concatenates the `.jsx` files in load order; each file exposes its exports on `window`, so order matters and there are no ES module imports.

**Routing** is hash-based (`parseHash`/`hashFor`/`titleFor` in `app.jsx`): `#/`, `#/piece/:id`, `#/collection`, `#/artists`, `#/journal`, `#/journal/:slug`, `#/editions`, `#/about`, `#/work`, `#/private`, `#/archive`. `go(route, arg)` writes `location.hash`; the `hashchange` listener updates state and every route sets `document.title`. The only other top-level state is `joined` (private-view membership, persisted to `localStorage` as `al_private_view`).

**File responsibilities:**
- `ui.jsx` — `AL` (all brand/edition data), `AL_OPENS`, `AL_BREVO_ACTION`, `alPrice`, `usePrivateViewSignup`, `Header`, `EditionLine` (static strip, replaced the marquee ticker), `Footer`, `ImageWell`, `Wordmark`
- `content.jsx` — `AL_FAQ`, `AL_ABOUT`, `AL_WORK` (all static copy)
- `journal-data.jsx` — `AL_JOURNAL` (evergreen model-explainer articles)
- `motion.jsx` — `Reveal`, `useParallax`, `usePointerDrift` (reduced-motion aware; the cursor spotlight and magnetic buttons were removed deliberately — do not reintroduce)
- `artwork.jsx` — `ART` photo registry (`assets/art-*.jpg`, seven supplied studies) + framed-art/tee/hoodie mockup components; mockups print the real artwork via SVG `<image>`
- `home.jsx` / `home-sections.jsx` — home screen and its sections
- `product.jsx` — piece detail with register-interest form
- `app.jsx` — mounts the React root; defines `go()` and routing

## Design tokens

Defined as CSS custom properties in `styles.css`:
- **Storefront palette:** `--ink` (`#131310`), `--ivory` (`#F6F3ED`), `--surface` (`#1A1A17`), `--bronze` (`#B5A28E`)
- **Fonts:** `--serif` (Cormorant Garamond 300), `--sans` (Jost), `--mono` (DM Sans)
- Dark hatched placeholders for images: `.hatch` class with `ImageWell` component
- **Legibility floors:** minimum label font size is 10px; body text on dark surfaces uses at least `rgba(246,243,237,0.55)`. Don't go below either.

## Stylesheet

One consolidated `styles.css`, in cascade order: @font-face (self-hosted latin woff2 in `assets/fonts/`) → tokens/base → pages → site → home → updates → Phase 2 additions (full-bleed hero, garment beat, roster/archive, PDP gallery, mobile pass). Append new rules at the end so they win the cascade. Fonts are self-hosted — do not reintroduce the Google Fonts CDN @import.

## Content vs. data

- **Brand data** (edition details, products, colourways, sizes): `AL` object in `ui.jsx`
- **Site copy** (FAQ text, about/work content): `content.jsx`
- **Journal articles**: `journal-data.jsx`

When updating copy or brand data, edit those source files — not the screen components — then rebuild.

## Imagery

Artwork imagery is real photography (`assets/art-*.jpg`), registered in `ART` (artwork.jsx) and always presented as studio studies. The home hero is one full-bleed artwork with a single CTA — do not reintroduce the floating frame cluster. Garment-on-body, print-process, and unboxing photography is still to be shot; the SVG garment mockups and `.hatch` wells hold those slots until then.

## Head / social

`index.html` owns the title, meta description, OG/Twitter tags (`og.png`, 1200×630), `favicon.svg`, and `apple-touch-icon.png`. The OG/canonical URLs point at `https://www.atelierlimite.com/`.

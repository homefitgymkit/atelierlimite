# Atelier Limité — Storefront

The pre-launch storefront for **atelierlimite.com**. Studio dark palette, Cormorant Garamond + Jost, gallery vocabulary throughout. The site is honest about where the brand is: **Edition 01 has not opened yet** — no invented artists, no invented sales history, no fake checkout.

## What the site does

- Presents the model: one artist per edition, a numbered run on GOTS-certified organic cotton, 50% of net profit to the artist.
- Shows the two planned Edition 01 garments (Heavyweight Tee · $95 AUD, Heavyweight Hoodie · $185 AUD) with **Register interest** instead of a checkout.
- Captures emails to the **private view list** — every form (home section, private view page, piece pages) POSTs to the Brevo form that feeds **Brevo list #3 ("Landing Page")**, the same list the original landing page used.
- Artwork shown anywhere is labelled a **studio study**; Edition 01's artwork and artist are announced at the opening.

## Build

The `.jsx` sources are prebuilt to `app.js` — there is **no Babel in the browser** and React loads as the production UMD build.

```
npm install        # once
npm run build      # compiles all .jsx (in load order) → app.js
```

Commit `app.js` after building; GitHub Pages serves the static result. To preview locally: `python3 -m http.server` and open `http://localhost:8000`.

**If you edit any `.jsx` file you must run `npm run build` again.**

## Setting the opening date

When the Edition 01 date is confirmed, set `AL_OPENS` at the top of `ui.jsx` (e.g. `"Opens Thursday 14 March, 7pm AEDT"`), rebuild, commit.

## Screens

| Route | File | What it is |
|---|---|---|
| `home` | `home.jsx` | Hero · static edition line · wall-to-wardrobe · garments · first-artist note · how-it-works · private-view signup |
| `product` | `product.jsx` | Piece detail — gallery, planned colourways/sizes, **register interest**, "what's included" band |
| `collection` | `collection.jsx` | Gallery wall of studio studies (tap a frame to see the work worn) |
| `artists` | `artists.jsx` | Pre-launch roster page — first name announced at the opening + artist call |
| `archive` | `artists.jsx` | Honest empty state — nothing has closed yet (footer link only) |
| `about` | `about.jsx` | About / FAQ — principles, vocabulary strip, grouped accordion FAQ |
| `work` | `pages.jsx` | Work with us — the 50/50 pitch: criteria, steps, commitments |
| `private` | `pages.jsx` | Private view — full signup page, wired to Brevo |
| `journal` | `journal.jsx` | Journal index + article template (evergreen model explainers) |

## Architecture

Plain `useState` routing in `app.jsx` (`route` string, `go(route, arg)`), no router. Each source file exposes its exports on `window`; `package.json`'s build script concatenates them in load order. Shared data (`AL`), the Brevo signup hook (`usePrivateViewSignup`), and chrome live in `ui.jsx`.

```
atelierlimite/
├── index.html        ← head (title/meta/OG/favicon) + production React + app.js
├── app.js            ← built output (commit after `npm run build`)
├── ui.jsx            ← AL data · Brevo signup hook · Header · EditionLine · Footer
├── content.jsx       ← FAQ, about + work-with-us copy
├── journal-data.jsx  ← journal articles
├── motion.jsx        ← Reveal · parallax · pointer drift (reduced-motion aware)
├── artwork.jsx       ← SVG studio studies + framed-art/tee/hoodie mockups
├── home.jsx / home-sections.jsx / product.jsx / collection.jsx
├── artists.jsx / about.jsx / pages.jsx / article.jsx / journal.jsx
├── app.jsx           ← top-level state + routing
├── styles*.css       ← tokens + per-area styles (styles-updates.css loads last)
├── og.png · favicon.svg · apple-touch-icon.png
└── CNAME             ← www.atelierlimite.com
```

## Honesty rules (keep these)

- No fabricated artists, editions, sales counts, or impact numbers. The brand's history starts at Edition 01.
- Editions are never "sold out", they are **edition closed**. Nothing is "bought", it is **acquired**. The list is the **private view list**, not a newsletter.
- Prices always state the currency: `$95 AUD`.
- No em dashes in collector-facing copy. No urgency mechanics.
- All imagery is a placeholder (`ImageWell` hatched wells / SVG studies) until real photography exists.

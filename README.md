# Atelier Limité — Storefront

The pre-launch storefront for **atelierlimite.com**. Studio dark palette, Cormorant Garamond + Jost, gallery vocabulary throughout. The site is honest about where the brand is: **Edition 01 has not opened yet** — no invented artists, no invented sales history, no fake checkout.

## What the site does

- Presents the model: one artist per edition, a numbered run on GOTS-certified organic cotton, 50% of net profit to the artist.
- Shows the two planned Edition 01 garments (Heavyweight Tee · $95 AUD, Heavyweight Hoodie · $185 AUD) with **Register interest** instead of a checkout.
- Captures emails to the **private view list** — every form (home section, private view page, piece pages) POSTs to the Brevo form that feeds **Brevo list #3 ("Landing Page")**, the same list the original landing page used.
- Artwork shown anywhere is labelled a **studio study**; Edition 01's artwork and artist are announced at the opening.

## Build

A Vite build with **prerendered routes**: every page ships as real static HTML (own title, description, canonical) and hydrates into the React app. React is bundled (no CDN), fonts and artwork are self-hosted.

```
npm install        # once
npm run dev        # local dev server
npm run build      # vite build + SSR render of all 20 routes → docs/
```

GitHub Pages serves the **`docs/` folder on `main`** — commit `docs/` after building. `npm run build` also regenerates `sitemap.xml`, `robots.txt`, and the `404.html` SPA fallback.

**If you edit anything in `src/` or `public/` you must run `npm run build` and commit the regenerated `docs/`.**

## Setting the opening date

When the Edition 01 date is confirmed, set `AL_OPENS` at the top of `src/ui.jsx` (e.g. `"Opens Thursday 14 March, 7pm AEDT"`), rebuild, commit.

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

Path routing in `src/routes.js` (`/piece/tee/`, `/journal/:slug/`, ...): every route is prerendered to its own `index.html`, header/footer links are real `<a href>` elements, old `#/...` links redirect. No router library. Source files are ES modules under `src/`, bundled by Vite. Shared data (`AL`), the Brevo signup hook (`usePrivateViewSignup`), and chrome live in `src/ui.jsx`.

```
atelierlimite/
├── index.html             ← Vite entry: head + <!--app-html--> placeholder
├── vite.config.mjs        ← outputs to docs/
├── scripts/prerender.mjs  ← SSR-renders all routes + sitemap + 404
├── src/
│   ├── main.jsx           ← browser mount (hydrate) + legacy #/ redirect
│   ├── entry-server.jsx   ← SSR entry for prerendering
│   ├── routes.js          ← parsePath/pathFor/titleFor/descFor + route list
│   ├── app.jsx            ← App root + route switch
│   ├── ui.jsx             ← AL data · Brevo signup hook · Header · Footer
│   ├── signature.jsx      ← SignatureScroll (artwork→garment) + JournalForward
│   ├── artwork.jsx        ← ART photo registry + garment mockups
│   └── …content, journal-data, motion, home, product, pages, etc.
├── public/                ← copied verbatim into docs/
│   ├── styles.css · og.png · favicon.svg · apple-touch-icon.png · CNAME
│   └── assets/art-*.jpg · assets/fonts/*.woff2
└── docs/                  ← BUILT OUTPUT, committed; GitHub Pages serves this
```

## Honesty rules (keep these)

- No fabricated artists, editions, sales counts, or impact numbers. The brand's history starts at Edition 01.
- Editions are never "sold out", they are **edition closed**. Nothing is "bought", it is **acquired**. The list is the **private view list**, not a newsletter.
- Prices always state the currency: `$95 AUD`.
- No em dashes in collector-facing copy. No urgency mechanics.
- Artwork imagery is the supplied studio-study photography (`assets/art-*.jpg`), always labelled as studies. Garment-on-body, print-process, and unboxing photography is still to be shot; mockups and hatched wells hold those slots.

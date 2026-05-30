# Atelier Limité — Storefront UI Kit

A high-fidelity, interactive recreation of **atelierlimite.com**, the flagship digital surface. Built from the **live site source** (`assets/source/Wesbite Home.html`) plus the journal article template, so it reflects the *current* design language — the deeper "studio" dark variant, **Jost** label sans, the grain overlay, and the edition ticker — not the earlier deck-derived look.

> Open `index.html` and click through: browse the current edition, open a piece, pick a colourway + size, **acquire** it (the bag drawer slides in), check out to the **certificate of edition**, read a **journal article**, and join the **private view list**.

## Screens

| Route | File | What it is |
|---|---|---|
| `home` | `home.jsx` | Hero (current edition) · ticker · collection grid · artist-in-focus · how-it-works · impact strip · private-view signup |
| `product` | `product.jsx` | Edition/piece detail — gallery, colourway swatches, size chips, acquire, "what's included" band |
| `certificate` | `product.jsx` | Post-acquisition **certificate of edition** with the collector's number + AL wax seal |
| `artists` | `artists.jsx` | The artist roster (current + past editions), clickable through to each artist |
| `artist` | `artists.jsx` | **Artist detail** — portrait, status, bio, statement quote, their edition's pieces |
| `archive` | `artists.jsx` | Closed editions — permanent catalogue (**hidden from primary nav**, linked from footer) |
| `about` | `about.jsx` | **About / FAQ** — brand story, four principles, vocabulary strip, grouped accordion FAQ (all real FAQ copy) |
| `work` | `pages.jsx` | **Work with us** — the 50/50 pitch: criteria, how-it-works steps, commitments, contact CTA |
| `private` | `pages.jsx` | **Private view** — full signup page with the 48h / 4 / 0 promise stats |
| `article` | `article.jsx` | Journal article template (reference long-form layout) |
| bag drawer | `ui.jsx` | Slide-in bag with subtotal + the 50/50 artist-split note |

All content (FAQs, garment range, about + work-with-us copy) lives in `content.jsx`, curated from the brand's own journal pages.

## Navigation map

`Editions → product · Artists → artists → artist · About → about (+FAQ) · Work with us → work · Private view → private`. Archive is reachable from the footer and from artist/archive cross-links. The bag → checkout → certificate flow is a faithful mock (no real payment).

## Architecture

Plain `useState` at the top of `app.jsx`; the "route" is a string in app state (no router). Cart, drawer, and current screen all live at the top level. Shared chrome, data, and primitives are in `ui.jsx` and exported to `window` so each Babel script can pick them up.

```
ui_kits/storefront/
├── index.html        ← entry; loads React + all scripts
├── styles.css        ← chrome, hero, grid, how, impact, private view, footer (+ self-hosted fonts)
├── styles-pages.css  ← product detail, bag drawer, certificate, journal article
├── styles-site.css   ← about/FAQ, work-with-us, private-view, artist-detail
├── content.jsx       ← all site copy: FAQs, garment range, about + work content
├── ui.jsx            ← AL data · Wordmark · ImageWell · Header · Ticker · Footer · BagDrawer
├── home.jsx          ← Home and its sections
├── product.jsx       ← Product detail + Certificate
├── artists.jsx       ← Artists roster + Artist detail + Archive
├── about.jsx         ← About / FAQ page
├── pages.jsx         ← Work with us + Private view pages
├── article.jsx       ← Journal article template
└── app.jsx           ← top-level state + routing
```

## Faithful vs. placeholder

**Faithful to the live site / journal source:**
- Studio palette (`#131310 / #1A1A17 / #222220` + bronze `#B5A28E`), grain overlay, 42° image hatch
- Cormorant Garamond 300 (self-hosted) + Jost (self-hosted) + DM Sans (journal, CDN)
- Sticky header + edition ticker marquee, multi-column footer with ABN-style bottom bar
- Product card anatomy, edition-number motif `047/080`, "Edition closed" / "Acquire" gallery vocabulary
- Wide uppercase tracking, hairline grid tiles, no shadows, square corners
- Journal article template (anatomy block, pull-quote, stat row, `+`→`×` FAQ accordion)
- Edition 03 · *Sydney to Melbourne* · Mia Torres · 80 pieces · spray & stencil (lore-consistent with the brand)

**Placeholder / invented (flag for redesign):**
- **All imagery** is dark hatched image wells — real product/artwork/studio photography is not provided. Drop photos into the `ImageWell` slots.
- Artist names other than Mia Torres are fabricated but lore-consistent.
- No real checkout/payment, account, or search — the acquire→certificate flow is a faithful mock.
- **Icons:** none used. The brand ships no icon set (a referenced `assets/icons/` set was never provided); the design is type-led by intent. If functional icons are ever needed, substitute thin-line Feather via CDN and flag it.

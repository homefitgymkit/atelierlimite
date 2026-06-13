---
description: Creative-director + frontend-QA review of the landing-page hero (artwork → tee scroll), with screenshots and a fix pass
---

You are reviewing the Atelier Limité landing page as BOTH a luxury fashion/art **creative director** and an exacting **frontend QA tester**. Restraint and polish are the brand: quiet, cinematic, premium. Be specific and honest; flag anything that looks like a coding demo rather than a campaign.

Work through these steps in order.

## 1. Serve the site
- Check whether the dev server is up: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/`.
- If it is not 200, start it in the background — `npm run dev` — and wait until the log prints `Local:` before continuing. If it comes up on a non-default port, note it and set `HERO_URL` accordingly for the next step.

## 2. Capture the hero at five scroll points (desktop + mobile)
- Run the project's QA script: `npm run test:hero-screenshots` (override with `HERO_URL=http://localhost:<port>/` if needed).
- It writes `desktop-000…100.png` and `mobile-000…100.png` (0/25/50/75/100% scroll) into `test-results/hero-scroll/`.
- If the script errors, capture the same ten frames directly with the **Playwright MCP** into the same folder (desktop 1440×900, mobile 390×844), scrolling the `.hm` section to each progress point.

## 3. Read every screenshot and review
Open all ten (both viewports, all five points) and assess:
- **Artwork continuity** — does the *same* artwork travel from frame to chest, or does it disappear, fade to nothing, jump upward, or get swapped for a different image?
- **Tee realism** — does the shirt read as premium, product-photographed (soft shoulders, neckline shadow, folds, fabric, contact shadow), or like a flat grey placeholder?
- **Print embedding** — does the print sit *in* the fabric (grain, ink absorption, soft clip) or pasted flat on top as a rectangle?
- **Motion quality** — slow, cinematic, intentional; NO bounce, harsh glow, cheap gradients, flicker, or jumpy steps between frames.
- **Typography** — hierarchy and spacing; everything important (headline, subheadline, edition detail, CTA) readable and never accidentally cropped. Oversized type is fine only if clearly decorative.
- **CTA** — present, visible, and usable at the 100% frame.
- **Mobile** — no overlap, no tiny unreadable text, no horizontal scroll, no awkward cropping; artwork/shirt/CTA/edition all clearly visible.

## 4. Report
Give a **concise numbered list of issues**. For each: the frame(s) it shows up in (e.g. `desktop-050`, `mobile-100`), a severity (**blocker** vs **polish**), and a one-line fix. Lead with the worst. If a criterion passes cleanly, say so in a single line — do not pad. End with a one-line overall verdict against the brief's intent (gallery-meets-luxury-streetwear, quiet but not flat).

## 5. Fix on approval
Ask me to approve the fix list. **Only after I approve**, implement the changes (the hero lives in `src/hero-morph.jsx` and its styles in `public/styles.css`), then re-run `npm run test:hero-screenshots` and confirm each issue is resolved by re-reading the new frames. Do not commit or push unless I explicitly ask.

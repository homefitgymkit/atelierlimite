# Atelier Limité — Landing Page

Pre-launch waitlist landing page. Single-file HTML, no build step, deploys to GitHub Pages.

## Stack
- Static HTML/CSS/JS, no framework
- Brevo for email capture → list ID 3 ("Landing Page")
- Ambient audio loop (footsteps), opt-in via the sound toggle

## Structure
```
/
├── index.html
├── CNAME                                                       ← atelierlimite.com
├── .nojekyll                                                   ← disable Jekyll
└── uploads/
    └── universfield-heavy-walking-footsteps-352771.mp3
```

## Deploy

1. **Create the repo** — `atelierlimite` (or your preferred name) under `homefitgymkit` org or personal account
2. **Push these files** to the `main` branch root
3. **Settings → Pages** → Source: `main` branch / `/` (root) → Save
4. **DNS** at the domain registrar for `atelierlimite.com`:
   - `A` records to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - `AAAA` records (optional, IPv6):
     ```
     2606:50c0:8000::153
     2606:50c0:8001::153
     2606:50c0:8002::153
     2606:50c0:8003::153
     ```
   - `CNAME` for `www`: → `<username>.github.io.`
5. **In GitHub Pages settings** → Custom domain: `atelierlimite.com` → **Enforce HTTPS** (wait ~10 min for cert)

## Brevo integration

Form posts directly to:
```
https://7ea0b4b9.sibforms.com/serve/MUIFAJ2j...
```
Fields:
- `EMAIL` (the visible input)
- `email_address_check` (honeypot, hidden, must stay empty)
- `locale=en`

We submit via `fetch` with `mode: 'no-cors'` — guarantees delivery without depending on Brevo's CORS headers. Trade-off: we can't read the response, so the wax-seal animation fires optimistically. Brevo's own confirmation email (double opt-in) is the user's actual receipt.

## Mobile

Breakpoint: `820px`. Below that:
- Horizontal scroll collapses to vertical stack
- Custom cursor disabled
- Magnetic submit button disabled (no `hover` pointer)
- Touch targets ≥44px on button, input uses `font-size: 16px` to prevent iOS zoom

## To-do before launch

- [ ] Add Edition 01 artist name to teaser (currently redacted as `XXXXXXXX`)
- [ ] Set real countdown date (currently +47 days from page load)
- [ ] Confirm `@atelierlimite` handle is reserved on IG / TikTok / YouTube / Pinterest
- [ ] Verify audio file licence (universfield, Pixabay-style attribution)
- [ ] Add favicon + OG image (currently missing)
- [ ] Test Brevo double opt-in email content matches the brand voice

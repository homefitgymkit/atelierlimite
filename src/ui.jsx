/* ============================================================
   Atelier Limité, Storefront UI Kit · shared UI + chrome + data
   ============================================================ */
import React, { useState } from "react";
import { pathFor } from "./routes.js";

/* ---------- DATA ---------- */
/* Pre-launch: Edition 01 has not opened yet. Set AL_OPENS to the real
   date once it is confirmed, e.g. "Opens Thursday 14 March, 7pm AEDT". */
const AL_OPENS = "Opening to be announced";

const AL = {
  edition: {
    no: "01",
    opens: AL_OPENS,
    artist: "Announced at the opening",
    size: 80, /* planned run, split across two garments */
    claimed: 0, /* pre-launch: nothing claimed yet. Wire to real data at launch. */
  },
  colourways: [
    { id: "black", name: "Studio Black", hex: "#1A1A18" },
    { id: "white", name: "Atelier White", hex: "#F5F2EC" },
    { id: "canvas", name: "Raw Canvas", hex: "#C8B89A" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  /* Edition 01 is planned across two garments, 40 pieces each = 80 total */
  products: [
    { id: "tee",    name: "Heavyweight Tee",    price: 95,  gsm: "280gsm organic cotton", editionSize: 40, tone: "#232320" },
    { id: "hoodie", name: "Heavyweight Hoodie", price: 185, gsm: "380gsm organic cotton", editionSize: 40, tone: "#1E1E1B" },
  ],
  included: [
    { n: "01", t: "Certificate of edition", b: "350gsm, bearing your unique number." },
    { n: "02", t: "Artist postcard & statement", b: "A6 print + a card in the artist's words." },
    { n: "03", t: "Mini poster", b: "A5 matte, the full artwork." },
    { n: "04", t: "Wax-sealed kraft box", b: "AL monogram seal. No virgin plastic." },
  ],
};

/* Prices are AUD; always say so for international collectors. */
function alPrice(p) { return "$" + p + " AUD"; }

/* ---------- PRIVATE VIEW SIGNUP (Brevo) ---------- */
/* Same Brevo form the original landing page used (Brevo list #3,
   "Landing Page"). The serve endpoint accepts cross-origin POSTs; we
   use no-cors mode to guarantee delivery even if CORS headers vary,
   so we cannot read the response and treat any non-network-error as
   success. Brevo's double opt-in email is the subscriber's real proof. */
const AL_BREVO_ACTION = "https://7ea0b4b9.sibforms.com/serve/MUIFAJ2jVYUyVUSLGIIUOxInXPrJOLsqdBTNYKmyeGdou0v65dkTBF2lAdPLoSbh24u_0qriI2WvDJGupc441oGWqF37gsNijy4-0uvZ2iq7Jz-7tFCbMtMzHGIx_uyt7hzPz2RwIYaUdLPEG21GqmF0GvdBed-HP56Lvxyugz0sdYPEZiMvWvukERwqCaLonQKb_XsMACkSnwO--A==";

async function alSubscribe(email) {
  const body = new FormData();
  body.append("EMAIL", email);
  body.append("email_address_check", ""); /* Brevo honeypot, must stay empty */
  body.append("locale", "en");
  await fetch(AL_BREVO_ACTION, { method: "POST", mode: "no-cors", body });
}

function usePrivateViewSignup(onJoin) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(ev) {
    if (ev) ev.preventDefault();
    if (busy) return;
    const v = email.trim();
    if (!v || !/.+@.+\..+/.test(v)) { setError("Please enter a valid email"); return; }
    setBusy(true); setError("");
    try {
      await alSubscribe(v);
      if (onJoin) onJoin();
    } catch (err) {
      setError("Network error, please retry");
    } finally {
      setBusy(false);
    }
  }
  function onChange(e) { setEmail(e.target.value); if (error) setError(""); }
  return { email, onChange, busy, error, submit };
}

/* ---------- WORDMARK ---------- */
function Wordmark({ className = "site-logo", onClick }) {
  return (
    <a className={className} href="/" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}>Atelier <em>Limité</em></a>
  );
}

/* ---------- IMAGE WELL (placeholder) ---------- */
function ImageWell({ tone = "#1E1E1B", mark, style, className = "" }) {
  return (
    <div className={"hatch " + className} style={{ background: tone, ...style }}>
      {mark && <span className="well-mark">{mark}</span>}
    </div>
  );
}

/* ---------- HEADER ---------- */
function Header({ route, go }) {
  // Archive is intentionally hidden from primary nav (reachable via footer).
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["home", "Home"], ["product", "Edition 01"], ["collection", "Collection"],
    ["artists", "Artists"], ["journal", "Journal"], ["about", "About"], ["work", "Work with us"],
  ];
  const isCurrent = (r) =>
    route === r || (r === "product" && (route === "product" || route === "edition")) ||
    (r === "journal" && route === "journal-article");
  const navTo = (r) => (e) => { e.preventDefault(); setMenuOpen(false); go(r); };
  return (
    <header className="site-header" data-menu-open={menuOpen}>
      <Wordmark onClick={() => { setMenuOpen(false); go("home"); }} />
      <nav className="site-nav">
        {nav.map(([r, label]) => (
          <a key={r} href={pathFor(r)} data-current={isCurrent(r)} onClick={navTo(r)}>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="nav-action-btn" href={pathFor("private")} onClick={navTo("private")}>Private view</a>
        <button className="nav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav className="site-nav-mobile" data-open={menuOpen}>
        {nav.map(([r, label]) => (
          <a key={r} href={pathFor(r)} data-current={isCurrent(r)} onClick={navTo(r)}>{label}</a>
        ))}
        <a className="snm-extra" href={pathFor("private")} onClick={navTo("private")}>Private view</a>
      </nav>
    </header>
  );
}

/* ---------- EDITION LINE (static, replaces the marquee ticker) ---------- */
function EditionLine() {
  const items = [`Edition ${AL.edition.no}`, AL.edition.opens, "Wear the artwork"];
  return (
    <div className="edition-line">
      {items.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="edition-line-sep">·</span>}
          <span className="edition-line-item">{t}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ go }) {
  const link = (r, label, arg) => (
    <a className="footer-link" href={pathFor(r, arg)} onClick={(e) => { e.preventDefault(); go(r, arg); }}>{label}</a>
  );
  return (
    <React.Fragment>
      <footer className="site-footer">
        <div>
          <div className="footer-brand-logo">Atelier <em>Limité</em></div>
          <p className="footer-brand-tagline">Wear the artwork.</p>
          <p className="footer-brand-detail">Sydney, New South Wales<br/>Australia · Founded 2025<br/>B Corp certification targeted, year three</p>
        </div>
        <div>
          <p className="footer-col-label">Studio</p>
          {link("about", "About")}
          {link("journal", "Journal")}
          {link("artists", "Artists")}
          {link("archive", "Archive")}
          {link("work", "Work with us")}
        </div>
        <div>
          <p className="footer-col-label">Collect</p>
          {link("product", "Edition 01")}
          {link("private", "Private view list")}
          {link("about", "FAQ")}
        </div>
        <div>
          <p className="footer-col-label">Contact</p>
          <a className="footer-link" href="mailto:hello@atelierlimite.com">hello@atelierlimite.com</a>
          <a className="footer-link" href="mailto:artists@atelierlimite.com">artists@atelierlimite.com</a>
          <a className="footer-link" href="https://instagram.com/atelier.limite" target="_blank" rel="noopener">Instagram &middot; @atelier.limite</a>
          <a className="footer-link" href="https://tiktok.com/@atelier.limite" target="_blank" rel="noopener">TikTok &middot; @atelier.limite</a>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="footer-bottom-left">Atelier <em>Limité</em></div>
        <small className="footer-copy">Sydney, Australia · 2026 · Every edition numbered and certified</small>
      </div>
    </React.Fragment>
  );
}

export { AL, AL_OPENS, alPrice, usePrivateViewSignup, Wordmark, ImageWell, Header, EditionLine, Footer };

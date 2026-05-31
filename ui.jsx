/* ============================================================
   Atelier Limité, Storefront UI Kit · shared UI + chrome + data
   Exposes: AL (data), Wordmark, ImageWell, Header, Ticker,
            Footer, BagDrawer  → window
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- DATA ---------- */
const AL = {
  edition: {
    no: "03",
    title: "Sydney to Melbourne",
    artist: "Mia Torres",
    artistSlug: "mia-torres",
    discipline: "Spray and stencil on heavyweight cotton",
    location: "Melbourne, Australia",
    quote: "I started cutting stencils because I wanted the work to leave the studio. Wearing the piece is the logical next step. Each garment is a wall that walks.",
    size: 80,
    remaining: 41,
    closes: "when sold",
    work: "Untitled I",
  },
  artists: [
    { name: "Mia Torres", city: "Melbourne", year: "2025", medium: "Spray and stencil", edition: "Edition 03", current: true,
      bio: "Mia Torres builds stencilled figures from layered acetate and aerosol, small works, public walls, and now wearable editions. Her practice sits between street, gallery, and printmaking." },
    { name: "Aki Nomura", city: "Sydney", year: "2024", medium: "Sumi-e and digital", edition: "Edition 02" },
    { name: "Rosa Vidal", city: "Lisbon", year: "2024", medium: "Collage and screenprint", edition: "Edition 01" },
    { name: "Jordan Pell", city: "Auckland", year: "2025", medium: "Linocut", edition: "Next" },
  ],
  colourways: [
    { id: "black", name: "Studio Black", hex: "#1A1A18" },
    { id: "white", name: "Atelier White", hex: "#F5F2EC" },
    { id: "canvas", name: "Raw Canvas", hex: "#C8B89A" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  /* Edition 03 is split across two garments, 40 pieces each = 80 total */
  products: [
    { id: "tee",   name: "Heavyweight Tee",   price: 95,  gsm: "280gsm organic cotton", editionSize: 40, claimed: 0, remaining: 40, tone: "#232320" },
    { id: "hoodie",name: "Heavyweight Hoodie",price: 185, gsm: "380gsm organic cotton", editionSize: 40, claimed: 0, remaining: 40, tone: "#1E1E1B" },
  ],
  included: [
    { n: "01", t: "Certificate of edition", b: "350gsm, bearing your unique number." },
    { n: "02", t: "Artist postcard & statement", b: "A6 print + a card in the artist's words." },
    { n: "03", t: "Mini poster", b: "A5 matte, the full artwork." },
    { n: "04", t: "Wax-sealed kraft box", b: "AL monogram seal. No virgin plastic." },
  ],
  impact: [
    { num: "3", label: "Artists supported" },
    { num: "260", label: "Trees planted" },
    { num: "$18.4k", label: "Paid to artists" },
    { num: "3", label: "Editions released" },
  ],
};

/* ---------- WORDMARK ---------- */
function Wordmark({ className = "site-logo", onClick }) {
  return (
    <a className={className} onClick={onClick}>Atelier <em>Limité</em></a>
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
function Header({ route, go, bagCount, openBag }) {
  // Archive is intentionally hidden from primary nav (reachable via footer).
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["home", "Home"], ["product", "Editions"], ["collection", "Collection"],
    ["artists", "Artists"], ["journal", "Journal"], ["about", "About"], ["work", "Work with us"],
  ];
  const isCurrent = (r) =>
    route === r || (r === "product" && (route === "product" || route === "edition")) ||
    (r === "artists" && route === "artist") || (r === "journal" && route === "journal-article");
  const goAnd = (r) => { setMenuOpen(false); go(r); };
  return (
    <header className="site-header" data-menu-open={menuOpen}>
      <Wordmark onClick={() => goAnd("home")} />
      <nav className="site-nav">
        {nav.map(([r, label]) => (
          <button key={r} data-current={isCurrent(r)} onClick={() => goAnd(r)}>{label}</button>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="nav-action-btn" onClick={() => goAnd("private")}>Private view</button>
        <button className="nav-bag" onClick={openBag}>Bag (<span>{bagCount}</span>)</button>
        <button className="nav-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav className="site-nav-mobile" data-open={menuOpen}>
        {nav.map(([r, label]) => (
          <button key={r} data-current={isCurrent(r)} onClick={() => goAnd(r)}>{label}</button>
        ))}
        <button className="snm-extra" onClick={() => goAnd("private")}>Private view</button>
      </nav>
    </header>
  );
}

/* ---------- TICKER ---------- */
function Ticker() {
  const items = [`Edition ${AL.edition.no}`, AL.edition.artist, AL.edition.title, `${AL.edition.size} pieces`, `Closes ${AL.edition.closes}`, "Wear the artwork"];
  const run = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {run.map((t, i) => (
          <React.Fragment key={i}>
            <span className="ticker-item">{t}</span>
            <span className="ticker-sep">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ go }) {
  return (
    <React.Fragment>
      <footer className="site-footer">
        <div>
          <div className="footer-brand-logo">Atelier <em>Limité</em></div>
          <p className="footer-brand-tagline">Wear the artwork.</p>
          <p className="footer-brand-detail">Sydney, New South Wales<br/>Australia · Founded 2025<br/>B Corp certification in progress</p>
        </div>
        <div>
          <p className="footer-col-label">Studio</p>
          <a className="footer-link" onClick={() => go("about")}>About</a>
          <a className="footer-link" onClick={() => go("journal")}>Journal</a>
          <a className="footer-link" onClick={() => go("artists")}>Artists</a>
          <a className="footer-link" onClick={() => go("archive")}>Archive</a>
          <a className="footer-link" onClick={() => go("work")}>Work with us</a>
        </div>
        <div>
          <p className="footer-col-label">Collect</p>
          <a className="footer-link" onClick={() => go("product")}>Current edition</a>
          <a className="footer-link" onClick={() => go("private")}>Private view list</a>
          <a className="footer-link" onClick={() => go("about")}>FAQ</a>
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
        <small className="footer-copy">Sydney, Australia · 2025 · All editions are numbered and certified</small>
      </div>
    </React.Fragment>
  );
}

/* ---------- BAG DRAWER ---------- */
function BagDrawer({ open, onClose, items, onRemove, onCheckout }) {
  const subtotal = items.reduce((s, it) => s + it.price, 0);
  return (
    <React.Fragment>
      <div className="bag-overlay" data-open={open} onClick={onClose}></div>
      <aside className="bag-drawer" data-open={open} aria-hidden={!open}>
        <div className="bag-head">
          <span className="bag-head-title">Your bag</span>
          <button className="bag-close" onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <div className="bag-empty">
            <p className="bag-empty-note">Your bag is empty.</p>
            <button className="section-see-all" onClick={onClose}>Continue browsing</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="bag-items">
              {items.map((it, i) => (
                <div className="bag-item" key={i}>
                  <ImageWell className="bag-item-img" tone={it.tone} />
                  <div>
                    <div className="bag-item-artist">{AL.edition.artist}</div>
                    <div className="bag-item-fmt">{it.name} · {it.cw} · {it.size}</div>
                    <div className="bag-item-no">{it.number} / {String(it.editionSize || AL.edition.size).padStart(3, "0")}</div>
                    <button className="bag-item-remove" onClick={() => onRemove(i)}>Remove</button>
                  </div>
                  <div className="bag-item-price">${it.price}</div>
                </div>
              ))}
            </div>
            <div className="bag-foot">
              <div className="bag-subtotal">
                <span className="bag-subtotal-k">Subtotal</span>
                <span className="bag-subtotal-v">${subtotal}</span>
              </div>
              <p className="bag-split-note">${Math.round(subtotal * 0.25)} to {AL.edition.artist}, your half of the patronage.</p>
              <button className="btn-primary dark bag-checkout" onClick={onCheckout}>Acquire, checkout</button>
            </div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

Object.assign(window, { AL, Wordmark, ImageWell, Header, Ticker, Footer, BagDrawer });

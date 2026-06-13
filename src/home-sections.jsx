/* ============================================================
   Atelier Limité, Home sections (collection + supporting)
   ============================================================ */
import { useState } from "react";
import { ART, FramedArt, TeeMockup, HoodieMockup } from "./artwork.jsx";
import { AL, alPrice, usePrivateViewSignup } from "./ui.jsx";
import { Reveal, usePointerDrift } from "./motion.jsx";

/* map each garment to a studio study for the mockups */
const PRODUCT_ART = { tee: "figure", hoodie: "strata" };

function _artLum(hex) {
  const r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  const l = v => v <= 0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  return 0.2126*l(r) + 0.7152*l(g) + 0.0722*l(b);
}

function WallLabelCard({ go, product, index }) {
  const artId = PRODUCT_ART[product.id] || "figure";
  const artBg = (ART[artId] && ART[artId].bg) || "#DDD5C4";
  /* light study → Atelier white fabric; dark study → Studio black (staged on canvas) */
  const teeColor = _artLum(artBg) > 0.35 ? "#F5F2EC" : "#1A1A18";
  const [worn, setWorn] = useState(false);
  const size = product.editionSize || AL.edition.size;
  return (
    <Reveal delay={index * 90}>
      <div className={"wl-card" + (worn ? " is-worn" : "")}>
        <button className="wl-stage" onClick={() => setWorn((v) => !v)} aria-pressed={worn}
          aria-label={worn ? "Show the artwork" : "See it worn"}>
          <span className="wl-flip"><span className="dot"></span>{worn ? "Tap for artwork" : "Tap to wear"}</span>
          <div className="wl-art"><FramedArt id={artId} plate={false} className="on-dark" /></div>
          <div className="wl-tee">{product.id === "hoodie"
            ? <HoodieMockup id={artId} color={teeColor} />
            : <TeeMockup id={artId} color={teeColor} />}</div>
        </button>
        <div className="wl-label">
          <div className="wl-l-artist">Edition {AL.edition.no}</div>
          <div className="wl-l-title">{product.name}</div>
          <div className="wl-l-rows">
            <div className="wl-l-row"><span className="wl-l-k">Blank</span><span className="wl-l-v">{product.gsm}</span></div>
            <div className="wl-l-row"><span className="wl-l-k">Artwork</span><span className="wl-l-v">{AL.edition.artist}</span></div>
            <div className="wl-l-row"><span className="wl-l-k">Run</span><span className="wl-l-v">Edition of {size}, numbered</span></div>
            <div className="wl-l-row"><span className="wl-l-k">Certificate</span><span className="wl-l-v cert">Included</span></div>
          </div>
          <div className="wl-l-foot">
            <span className="wl-l-price">{alPrice(product.price)}</span>
            <button className="wl-l-view" onClick={() => go("product", product.id)}>View piece</button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Collection({ go }) {
  return (
    <section className="collection-2">
      <div className="section-header" style={{ background: "var(--ivory)" }}>
        <div>
          <p className="label">Edition {AL.edition.no} · The garments</p>
          <h2 className="section-h2">The collection</h2>
          <p className="section-note">Two garments planned for Edition 01: the Heavyweight Tee and the Heavyweight Hoodie. The artwork shown is a studio study; the edition's artwork is revealed at the opening. Tap a piece to see how a work is worn.</p>
        </div>
        <button className="section-see-all" onClick={() => go("product")}>View the pieces</button>
      </div>
      <div className="coll-grid">
        {AL.products.map((p, i) => <WallLabelCard key={p.id} go={go} product={p} index={i} />)}
      </div>
    </section>
  );
}

/* Upcoming editions — a gallery exhibitions programme. Honest:
   one edition opening soon, the rest a forward programme. */
const AL_PROGRAMME = [
  { no: "01", when: "Opening soon",      artist: "Announced at the opening", title: "The first edition", status: "now" },
  { no: "02", when: "Edition two",       artist: "To be announced",          title: "Announced at the opening" },
  { no: "03", when: "Edition three",     artist: "To be announced",          title: "Announced at the opening" },
  { no: "04", when: "Edition four",      artist: "To be announced",          title: "Announced at the opening" },
];

function UpcomingEditions({ go }) {
  return (
    <section className="prog">
      <div className="prog-head">
        <p className="label">The programme</p>
        <h2 className="prog-title">Upcoming <em>editions</em></h2>
        <p className="prog-note">Four editions a year, each built around one artist. The first opens to the private view list before anyone else.</p>
      </div>
      <div className="prog-table" role="table" aria-label="Upcoming editions">
        <div className="prog-row prog-row--head" role="row">
          <span role="columnheader">Edition</span>
          <span role="columnheader">When</span>
          <span role="columnheader">Artist</span>
          <span role="columnheader">Title</span>
        </div>
        {AL_PROGRAMME.map((r) => (
          <div key={r.no} className={"prog-row" + (r.status === "now" ? " is-now" : "")} role="row">
            <span className="prog-no" role="cell"><span className="prog-no-k">Edition</span>{r.no}{r.status === "now" && <span className="prog-pip" aria-hidden="true"></span>}</span>
            <span className="prog-when" role="cell"><span className="prog-k">When</span>{r.when}</span>
            <span className="prog-artist" role="cell"><span className="prog-k">Artist</span>{r.artist}</span>
            <span className="prog-titlecell" role="cell"><span className="prog-k">Title</span>{r.title}</span>
          </div>
        ))}
      </div>
      <button className="prog-cta" onClick={() => go("private")}>Be first to the opening →</button>
    </section>
  );
}

/* Studies mosaic — an asymmetric, off-grid wall of the studies with
   generous negative space. Collapses to a clean stack on mobile. */
const MOSAIC = [
  { id: "figure", cls: "m-a" },
  { id: "arc",    cls: "m-b" },
  { id: "field",  cls: "m-c" },
  { id: "bloom",  cls: "m-d" },
  { id: "coast",  cls: "m-e" },
];

function StudiesMosaic() {
  return (
    <section className="mosaic">
      <Reveal className="mosaic-head">
        <p className="label label--light">From the studio</p>
        <h2 className="mosaic-title">Studies, <em>in preparation.</em></h2>
        <p className="mosaic-note">A wall of working studies. Edition 01's artwork takes its place at the opening.</p>
      </Reveal>
      <div className="mosaic-grid">
        {MOSAIC.map((m, i) => (
          <Reveal key={m.id} className={"mosaic-cell " + m.cls} delay={(i % 3) * 90}>
            <figure className="mosaic-fig">
              <img src={ART[m.id].src} alt={ART[m.id].title + " · studio study"} loading="lazy" />
              <figcaption>{ART[m.id].title}</figcaption>
            </figure>
          </Reveal>
        ))}
        <div className="mosaic-void" aria-hidden="true"></div>
      </div>
    </section>
  );
}

function FirstArtist({ go }) {
  const driftRef = usePointerDrift(10);
  return (
    <section className="artist-feature" data-drift-host>
      <div className="af-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div ref={driftRef} style={{ width: "62%" }}><FramedArt id="figure" className="on-dark" /></div>
      </div>
      <div className="af-content">
        <p className="label label--light">Edition {AL.edition.no} · The first artist</p>
        <h2 className="af-name">Announced at the opening.</h2>
        <blockquote className="af-quote">Edition 01's artist is announced to the private view list first, with the artwork, the pieces, and the opening date.</blockquote>
        <div className="af-meta">
          <span className="af-meta-line"></span>
          <button className="af-link" onClick={() => go("private")}>Join the private view</button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Artist selected", "Each edition is themed. We find artists whose work deserves a wider audience, painters, sculptors, photographers, musicians, and more."],
    ["02", "Edition produced", "Limited run, numbered. Screen-printed on GOTS-certified organic cotton with water-based inks. The artist's name on every label."],
    ["03", "You acquire", "Your piece arrives with a 350gsm certificate of edition, an artist postcard, a mini poster, and a wax-sealed package."],
    ["04", "The artist gets paid", "50% of net profit goes directly to the artist, every quarter, with a full transparent statement. The artist keeps their IP."],
  ];
  return (
    <section className="how-section">
      <div className="how-header"><p className="label">How it works</p><span className="how-header-line"></span></div>
      <div className="how-grid">
        {steps.map(([n, t, b], i) => (
          <Reveal as="article" className="how-step" key={n} delay={i * 80}>
            <div className="how-num">{n}</div>
            <h3 className="how-title">{t}</h3>
            <p className="how-body">{b}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PrivateView({ joined, onJoin }) {
  const f = usePrivateViewSignup(onJoin);
  return (
    <section className="pvl-section" id="private">
      <div className="pvl-eyebrow"><span className="pvl-eyebrow-line"></span><span className="label label--light">Private view list</span><span className="pvl-eyebrow-line"></span></div>
      <h2 className="pvl-title">{joined ? "You're on the list." : "48 hours before the public."}</h2>
      <p className="pvl-sub">{joined ? "We'll write when Edition 01 opens, with the occasional studio note. See you at the opening." : "Early access to every edition before it opens to the public, plus studio news straight to your inbox."}</p>
      {!joined && (
        <form className="pvl-form" onSubmit={f.submit}>
          <input className="pvl-input" type="email" placeholder="your@email.com" value={f.email} onChange={f.onChange} required aria-label="Your email" />
          <button className="pvl-btn" type="submit" disabled={f.busy} aria-busy={f.busy}>{f.busy ? "Joining…" : "Join"}</button>
        </form>
      )}
      {!joined && f.error && <p className="form-error-line" role="alert">{f.error}</p>}
      <p className="pvl-note">Early access, studio news, and the occasional offer.</p>
    </section>
  );
}

export { Collection, WallLabelCard, FirstArtist, HowItWorks, PrivateView, PRODUCT_ART, UpcomingEditions, StudiesMosaic };

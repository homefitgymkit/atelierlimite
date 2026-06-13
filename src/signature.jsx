/* ============================================================
   Atelier Limité · Phase 3 home pieces
   SignatureScroll — the one moment of theatre: a slow,
   scroll-driven sequence where the artwork condenses into the
   print on the garment. Photography-based, reduced-motion safe.
   JournalForward — the journal pulled onto the home page.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ART, TeeMockup } from "./artwork.jsx";
import { AL_JOURNAL } from "./journal-data.jsx";
import { REDUCED, Reveal } from "./motion.jsx";

const SIG_ART = "field";

/* smoothstep interpolation of p over [t0, t1] */
function seg(p, a, b, t0, t1) {
  const t = Math.min(1, Math.max(0, (p - t0) / (t1 - t0)));
  const e = t * t * (3 - 2 * t);
  return a + (b - a) * e;
}

export function SignatureScroll() {
  const wrapRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (REDUCED) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const art = ART[SIG_ART];

  if (REDUCED) {
    /* calm fallback: artwork and garment side by side, no scroll theatre */
    return (
      <section className="sig sig-static">
        <div className="sig-static-grid">
          <img className="sig-static-art" src={art.src} alt={art.title + " · studio study"} />
          <div className="sig-static-tee"><TeeMockup id={SIG_ART} color="#F5F2EC" /></div>
        </div>
        <p className="sig-cap is-on" style={{ position: "static", marginTop: 28 }}>A wall that walks.</p>
      </section>
    );
  }

  const artScale = seg(p, 1, 0.24, 0.08, 0.72);
  const artOpacity = seg(p, 1, 0, 0.62, 0.82);
  const teeOpacity = seg(p, 0, 1, 0.42, 0.7);
  const teeScale = seg(p, 1.05, 1, 0.42, 0.8);
  const cap = p < 0.34 ? 0 : p < 0.66 ? 1 : 2;
  const caps = ["The artwork leaves the wall.", "It becomes the piece.", "A wall that walks."];

  return (
    <section className="sig" ref={wrapRef}>
      <div className="sig-sticky">
        <div className="sig-tee" style={{ opacity: teeOpacity, transform: `scale(${teeScale.toFixed(3)})` }}>
          <TeeMockup id={SIG_ART} color="#F5F2EC" />
        </div>
        <div className="sig-art" style={{ transform: `translate(-50%, -50%) scale(${artScale.toFixed(3)})`, opacity: artOpacity }}>
          <img src={art.src} alt={art.title + " · studio study"} />
        </div>
        <div className="sig-caps" aria-live="off">
          {caps.map((t, i) => (
            <p key={i} className={"sig-cap" + (cap === i ? " is-on" : "")}>{t}</p>
          ))}
        </div>
        <div className="sig-plate">{art.title} · {art.note}</div>
      </div>
    </section>
  );
}

/* ---------- The journal, pulled forward onto home ---------- */
export function JournalForward({ go }) {
  const featured = AL_JOURNAL[0];
  const more = AL_JOURNAL.slice(1, 4);
  return (
    <section className="jfwd">
      <Reveal className="jfwd-head">
        <p className="label label--light">The journal</p>
        <h2 className="jfwd-title">Plainly, <em>in writing.</em></h2>
        <p className="jfwd-sub">The model, the numbering, the certificate, the way artists are chosen. No marketing, just the record.</p>
      </Reveal>
      <div className="jfwd-grid">
        <Reveal>
          <button className="jfwd-feature" onClick={() => go("journal-article", featured.slug)}>
            <span className="jfwd-f-tag">{featured.tag}</span>
            <span className="jfwd-f-title">{featured.title}</span>
            <span className="jfwd-f-lead">{featured.lead.slice(0, 150)}…</span>
            <span className="jfwd-f-more">Read the article →</span>
          </button>
        </Reveal>
        <Reveal className="jfwd-list" delay={110}>
          {more.map((a) => (
            <button key={a.slug} className="jfwd-item" onClick={() => go("journal-article", a.slug)}>
              <span className="jfwd-i-title">{a.title}</span>
              <span className="jfwd-i-rt">{a.readtime}</span>
            </button>
          ))}
          <button className="jfwd-all" onClick={() => go("journal")}>All journal entries →</button>
        </Reveal>
      </div>
    </section>
  );
}

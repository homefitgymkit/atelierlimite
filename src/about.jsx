/* ============================================================
   Atelier Limité, About / FAQ page
   ============================================================ */
import { useState } from "react";
import { AL_ABOUT, AL_FAQ } from "./content.jsx";

function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-row" data-open={open}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="faq-q-t">{q}</span>
        <span className="faq-plus">+</span>
      </button>
      <div className="faq-a"><p>{a}</p></div>
    </div>
  );
}

function AboutPage({ go }) {
  return (
    <main className="artist-detail">
      {/* hero */}
      <section className="page-hero">
        <div className="page-hero-bigchar" aria-hidden="true">AL</div>
        <div className="page-hero-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t">About · Atelier Limité</span></div>
          <h1 className="page-title">A wearable gallery, <em>built around the artist.</em></h1>
          <p className="page-lead">{AL_ABOUT.lead}</p>
        </div>
      </section>

      {/* principles */}
      <section className="about-principles">
        {AL_ABOUT.principles.map((p) => (
          <article className="about-principle" key={p.n}>
            <div className="ap-n">{p.n}</div>
            <h3 className="ap-t">{p.t}</h3>
            <p className="ap-b">{p.b}</p>
          </article>
        ))}
      </section>

      {/* vocabulary */}
      <section className="vocab-strip">
        <div className="vocab-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t" style={{ color: "var(--bronze)" }}>How we speak</span></div>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 38, color: "var(--ivory)", letterSpacing: "0.01em", maxWidth: "20ch" }}>The words are chosen to match the model, not the mood.</h2>
          <div className="vocab-grid">
            {AL_ABOUT.vocab.map(([term, def]) => (
              <div className="vocab-cell" key={term}>
                <span className="vocab-term">{term}</span>
                <span className="vocab-def">{def}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-page">
        <div className="faq-page-inner">
          <div className="page-eyebrow" style={{ marginBottom: 18 }}>
            <span className="l" style={{ background: "var(--bronze)" }}></span>
            <span className="t">Frequently asked</span>
          </div>
          <p className="faq-prelaunch-note">Atelier Limité is pre-launch. The answers below describe the model we are building, before Edition 01 exists, not a service running today.</p>
          {AL_FAQ.map((grp) => (
            <div className="faq-group" key={grp.group}>
              <div className="faq-group-head">
                <span className="faq-group-label">{grp.group}</span>
                <span className="faq-group-line"></span>
              </div>
              {grp.items.map((it) => <FaqRow key={it.q} q={it.q} a={it.a} />)}
            </div>
          ))}
        </div>
      </section>

      {/* close */}
      <section className="work-cta">
        <div className="page-eyebrow" style={{ justifyContent: "center" }}>
          <span className="l"></span><span className="t">Still curious?</span><span className="l"></span>
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(30px,4vw,52px)", color: "var(--ivory)", lineHeight: 1.1, marginTop: 14 }}>Be there before the first edition.</h2>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 36 }}>
          <button className="btn-primary" onClick={() => go("product")}>Future edition preview</button>
          <button className="btn-ghost" onClick={() => go("private")}>Join the private view</button>
        </div>
      </section>
    </main>
  );
}

export { AboutPage, FaqRow };

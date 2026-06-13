/* ============================================================
   Atelier Limité, Journal (index + article)
   Reads AL_JOURNAL (journal-data.jsx).
   ============================================================ */
import React from "react";
import { AL_JOURNAL } from "./journal-data.jsx";
import { ART, FramedArt } from "./artwork.jsx";
import { Reveal } from "./motion.jsx";
import { AL } from "./ui.jsx";

const JOURNAL_ART = ["strata", "figure", "arc", "grid", "coast", "bloom", "field", "arc", "grid"];

function JournalIndex({ go }) {
  const feature = AL_JOURNAL[0];
  const rest = AL_JOURNAL.slice(1);
  return (
    <main className="artist-detail">
      <section className="page-hero">
        <div className="page-hero-bigchar" aria-hidden="true">¶</div>
        <div className="page-hero-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t">The journal</span></div>
          <h1 className="page-title">Notes on the <em>model.</em></h1>
          <p className="page-lead">How the editions are intended to work, written plainly: the model, the numbering, the way we choose artists. No marketing, just the record.</p>
        </div>
      </section>

      {/* featured */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 48px 0" }}>
        <Reveal>
          <button className="journal-feature" onClick={() => go("journal-article", feature.slug)}>
            <div className="jf-art"><FramedArt id={JOURNAL_ART[0]} className="on-dark" plate={false} /></div>
            <div className="jf-copy">
              <div className="jf-tag">{feature.tag}</div>
              <h2 className="jf-title">{feature.title}</h2>
              <p className="jf-lead">{feature.lead}</p>
              <div className="jf-more"><span>Read the article</span><span className="jf-arrow">→</span></div>
            </div>
          </button>
        </Reveal>
      </section>

      {/* grid */}
      <section className="journal-grid-wrap">
        <div className="journal-grid">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 80}>
              <button className="journal-card" onClick={() => go("journal-article", a.slug)}>
                <div className="jc-cat">{a.category}</div>
                <h3 className="jc-title">{a.title}</h3>
                <p className="jc-excerpt">{a.lead.slice(0, 132)}…</p>
                <div className="jc-foot"><span className="jc-rt">Read</span><span className="jc-arrow">→</span></div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

function JournalArticle({ go, slug }) {
  const idx = Math.max(0, AL_JOURNAL.findIndex((a) => a.slug === slug));
  const a = AL_JOURNAL[idx];
  const next = AL_JOURNAL[(idx + 1) % AL_JOURNAL.length];
  const artId = JOURNAL_ART[idx % JOURNAL_ART.length];
  if (!a) return null;
  return (
    <main className="article">
      <div className="article-header-wrap">
        <nav className="breadcrumb">
          <button onClick={() => go("home")}>Home</button><span className="sep">·</span>
          <button onClick={() => go("journal")}>Journal</button><span className="sep">·</span>
          <span className="current">{a.title.replace(/\?$/, "")}</span>
        </nav>
        <span className="article-tag">{a.tag}</span>
        <h1 className="article-title">{a.title}</h1>
        <div className="article-meta">
          <span className="article-meta-item">Atelier Limité</span><div className="article-meta-sep"></div>
          <span className="article-meta-item">Sydney, NSW</span>
        </div>
      </div>

      <div className="article-body">
        <article className="article-content">
          <p className="article-lead">{a.lead}</p>
        </article>
      </div>

      {/* framed artwork interlude */}
      <div className="article-body">
        <div className="article-figure">
          <FramedArt id={artId} className="on-dark" />
          <p className="article-figure-cap">{ART[artId].title} · Studio study, artwork in preparation.</p>
        </div>
      </div>

      <div className="article-body">
        <article className="article-content">
          {a.sections.map((s, i) => (
            <React.Fragment key={i}>
              <h2>{s.head}</h2>
              {s.para && <p>{s.para}</p>}
              {i === 1 && (
                <div className="pull-quote"><p>{a.lead.split(".")[0]}.</p></div>
              )}
            </React.Fragment>
          ))}
        </article>
      </div>

      {/* next + CTA */}
      <section className="journal-next">
        <button className="journal-next-card" onClick={() => go("journal-article", next.slug)}>
          <span className="jn-label">Next in the journal</span>
          <span className="jn-title">{next.title}</span>
          <span className="jn-arrow">→</span>
        </button>
      </section>

      <section className="cta-block">
        <div className="cta-eyebrow">Before Edition {AL.edition.no} exists</div>
        <h2 className="cta-title">Be on the <em>founding list.</em></h2>
        <p className="cta-sub">Be first to follow the studies, artist conversations, and future wearable editions.</p>
        <button className="btn-cta" onClick={() => go("private")}>Join the private view</button>
      </section>
    </main>
  );
}

export { JournalIndex, JournalArticle };

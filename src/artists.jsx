/* ============================================================
   Atelier Limité, Storefront UI Kit · Artists + Archive
   Pre-launch: the roster begins with Edition 01. No invented
   names, no invented history.
   ============================================================ */

function ArtistsScreen({ go }) {
  return (
    <main style={{ background: "var(--ivory)" }}>
      <div className="section-header" style={{ borderBottom: "0.5px solid var(--rule)" }}>
        <div>
          <p className="label">The roster</p>
          <h2 className="section-h2">Artists</h2>
        </div>
        <span className="label" style={{ alignSelf: "flex-end" }}>The roster begins with Edition 01</span>
      </div>

      <section className="roster-hero">
        <p className="label" style={{ marginBottom: 18 }}>Edition 01</p>
        <h1 className="roster-title">The first name is <em>announced at the opening.</em></h1>
        <p className="roster-lead">One artist opens the roster with Edition 01: their work, their name on every label, and half of every sale. The private view list hears first.</p>
        <div className="roster-actions">
          <button className="btn-primary dark" onClick={() => go("private")}>Join the private view</button>
          <button className="btn-ghost ink" onClick={() => go("journal-article", "artist-selection")}>How we choose artists</button>
        </div>
      </section>

      <section className="artist-call">
        <p className="label label--light" style={{ marginBottom: 16 }}>Are you an artist?</p>
        <h2 className="artist-call-title">We split everything, 50/50.</h2>
        <p className="artist-call-lead">You keep your IP. We handle production, fulfilment, and the gallery. The work reaches a wider audience and you're paid every quarter.</p>
        <button className="btn-primary" onClick={() => go("work")}>How the model works</button>
      </section>
    </main>
  );
}

function ArchiveScreen({ go }) {
  return (
    <main style={{ background: "var(--ivory)" }}>
      <div className="section-header" style={{ borderBottom: "0.5px solid var(--rule)" }}>
        <div>
          <p className="label">Closed permanently</p>
          <h2 className="section-h2">The archive</h2>
        </div>
        <span className="label" style={{ alignSelf: "flex-end", maxWidth: 220, textAlign: "right", lineHeight: 1.8 }}>Once closed, an edition is never reprinted</span>
      </div>

      <section className="archive-hero">
        <h1 className="archive-title">The archive is empty, <em>deliberately.</em></h1>
        <p className="archive-lead">Editions move here when they close, permanently: never reprinted, never restocked, never reopened. Nothing has closed yet. Edition 01 will be the first to hang here.</p>
        <div style={{ marginTop: 40 }}>
          <button className="btn-primary dark" onClick={() => go("product")}>See Edition 01</button>
        </div>
      </section>
    </main>
  );
}

export { ArtistsScreen, ArchiveScreen };

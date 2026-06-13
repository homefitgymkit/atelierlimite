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
          <p className="label">The first collaborations</p>
          <h2 className="section-h2">Artists</h2>
        </div>
        <span className="label" style={{ alignSelf: "flex-end" }}>Artist conversations open now</span>
      </div>

      <section className="roster-hero">
        <p className="label" style={{ marginBottom: 18 }}>For artists</p>
        <h1 className="roster-title">We're looking for the first artists to <em>shape Atelier Limité.</em></h1>
        <p className="roster-lead">Your work stays yours. We handle production, the edition page, fulfilment, and the collector experience. Profit is shared 50/50, with a transparent statement. We're starting the first conversations now, before Edition 01 exists.</p>
        <div className="roster-actions">
          <a className="btn-primary dark" href="mailto:artists@atelierlimite.com" style={{ textDecoration: "none", display: "inline-block" }}>Start a conversation</a>
          <button className="btn-ghost ink" onClick={() => go("practice")}>How the model works</button>
        </div>
      </section>

      <section className="artist-call">
        <p className="label label--light" style={{ marginBottom: 16 }}>Following along?</p>
        <h2 className="artist-call-title">Be on the founding list.</h2>
        <p className="artist-call-lead">Be first to follow the studies, artist conversations, and future wearable editions as Atelier Limité takes shape.</p>
        <button className="btn-primary" onClick={() => go("list")}>Join the private view</button>
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
          <button className="btn-primary dark" onClick={() => go("home")}>See the study wall</button>
        </div>
      </section>
    </main>
  );
}

export { ArtistsScreen, ArchiveScreen };

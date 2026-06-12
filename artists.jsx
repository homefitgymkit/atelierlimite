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

      <section style={{ borderTop: "0.5px solid var(--rule)", padding: "96px 48px", textAlign: "center" }}>
        <p className="label" style={{ marginBottom: 18 }}>Edition 01</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(34px,5vw,56px)", color: "var(--ink)", lineHeight: 1.1, maxWidth: "18ch", margin: "0 auto" }}>
          The first name is <em style={{ color: "var(--bronze)" }}>announced at the opening.</em>
        </h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--dust)", maxWidth: 460, margin: "24px auto 0", lineHeight: 1.7 }}>
          One artist opens the roster with Edition 01: their work, their name on every label, and half of every sale. The private view list hears first.
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 40 }}>
          <button className="btn-primary dark" onClick={() => go("private")}>Join the private view</button>
          <button className="btn-ghost ink" onClick={() => go("journal-article", "artist-selection")}>How we choose artists</button>
        </div>
      </section>

      <section style={{ background: "var(--surface)", padding: "72px 48px", textAlign: "center" }}>
        <p className="label label--light" style={{ marginBottom: 16 }}>Are you an artist?</p>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", fontSize: 38, color: "var(--ivory)", marginBottom: 14 }}>We split everything, 50/50.</h2>
        <p style={{ fontFamily: "var(--serif)", fontSize: 16, color: "rgba(246,243,237,0.55)", maxWidth: 420, margin: "0 auto 32px", lineHeight: 1.7 }}>You keep your IP. We handle production, fulfilment, and the gallery. The work reaches a wider audience and you're paid every quarter.</p>
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

      <section style={{ padding: "96px 48px 110px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(32px,4.5vw,52px)", color: "var(--ink)", lineHeight: 1.12, maxWidth: "20ch", margin: "0 auto" }}>
          The archive is empty, <em style={{ color: "var(--bronze)" }}>deliberately.</em>
        </h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--dust)", maxWidth: 470, margin: "26px auto 0", lineHeight: 1.7 }}>
          Editions move here when they close, permanently: never reprinted, never restocked, never reopened. Nothing has closed yet. Edition 01 will be the first to hang here.
        </p>
        <div style={{ marginTop: 40 }}>
          <button className="btn-primary dark" onClick={() => go("product")}>See Edition 01</button>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ArtistsScreen, ArchiveScreen });

/* ============================================================
   Atelier Limité — Storefront UI Kit · Artists + Archive
   ============================================================ */

function ArtistsScreen({ go }) {
  return (
    <main style={{ background: "var(--ivory)" }}>
      <div className="section-header" style={{ borderBottom: "0.5px solid var(--rule)" }}>
        <div>
          <p className="label">The roster</p>
          <h2 className="section-h2">Artists</h2>
        </div>
        <span className="label" style={{ alignSelf: "flex-end" }}>{AL.artists.length} collaborators</span>
      </div>

      <section style={{ borderTop: "0.5px solid var(--rule)" }}>
        {AL.artists.map((a, i) => (
          <button
            key={a.name}
            onClick={() => go("artist", a.name)}
            className="artist-row"
            style={{
              width: "100%", textAlign: "left", background: "none", border: "none",
              borderBottom: "0.5px solid var(--rule)", cursor: "pointer",
              display: "grid", gridTemplateColumns: "200px 1fr auto", gap: 40, alignItems: "center",
              padding: "36px 48px", fontFamily: "inherit", transition: "background 0.3s var(--ease)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 300, fontStyle: "italic", color: "var(--bronze)", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 300, color: "var(--ink)", letterSpacing: "0.01em" }}>{a.name}</span>
            </div>
            <div style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--dust)", lineHeight: 2 }}>
              {a.city} · {a.year}<br/>{a.medium}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: a.current ? "var(--bronze)" : "var(--dust)" }}>{a.edition}</span>
              <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 13, color: "var(--bronze)" }}>{a.current ? "Now open →" : "View →"}</span>
            </div>
          </button>
        ))}
      </section>

      <section style={{ background: "var(--surface)", padding: "72px 48px", textAlign: "center" }}>
        <p className="label label--light" style={{ marginBottom: 16 }}>Are you an artist?</p>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", fontSize: 38, color: "var(--ivory)", marginBottom: 14 }}>We split everything, 50/50.</h2>
        <p style={{ fontFamily: "var(--serif)", fontSize: 16, color: "rgba(246,243,237,0.4)", maxWidth: 420, margin: "0 auto 32px", lineHeight: 1.7 }}>You keep your IP. We handle production, fulfilment, and the gallery. The work reaches a wider audience and you're paid every quarter.</p>
        <button className="btn-primary" onClick={() => go("work")}>How the model works</button>
      </section>
    </main>
  );
}

/* ---------- ARTIST DETAIL ---------- */
function ArtistDetail({ go, artistName }) {
  const a = AL.artists.find((x) => x.name === artistName) || AL.artists[0];
  const bio = a.bio || `${a.name} works in ${a.medium.toLowerCase()}, based in ${a.city}. Part of the Atelier Limité roster for ${a.edition}.`;
  const statement = a.current ? AL.edition.quote : `Collaborating with Atelier Limité meant my work could leave the studio and be worn — numbered, named, and shared on equal terms.`;
  return (
    <main className="artist-detail">
      <section className="ad-hero">
        <ImageWell className="ad-portrait" tone="#1C1C19" mark={a.name.split(" ").map((w) => w[0]).join("")} />
        <div className="ad-intro">
          <div className="ad-status">
            {a.current && <span className="dot"></span>}
            <span className="t" style={{ color: a.current ? "var(--bronze)" : "rgba(246,243,237,0.4)" }}>{a.current ? `${a.edition} · Now open` : a.edition}</span>
          </div>
          <h1 className="ad-name">{a.name}</h1>
          <div className="ad-meta"><span>{a.city}</span><span className="sep">·</span><span>{a.year}</span><span className="sep">·</span><span>{a.medium}</span></div>
          <p className="ad-bio">{bio}</p>
          <div style={{ marginTop: 36, display: "flex", gap: 20 }}>
            {a.current
              ? <button className="btn-primary" onClick={() => go("product")}>View the edition</button>
              : <button className="btn-primary" onClick={() => go("archive")}>See in the archive</button>}
            <button className="btn-ghost" onClick={() => go("artists")}>All artists</button>
          </div>
        </div>
      </section>

      <section className="ad-statement">
        <div className="ad-statement-inner">
          <blockquote className="ad-quote">{statement}</blockquote>
          <div className="ad-attrib">{a.name} · {a.edition}</div>
        </div>
      </section>

      {a.current && (
        <React.Fragment>
          <div className="section-header" style={{ borderTop: "0.5px solid var(--rule)" }}>
            <div>
              <p className="label">{AL.edition.title}</p>
              <h2 className="section-h2">The edition</h2>
            </div>
            <button className="section-see-all" onClick={() => go("product")}>View all pieces</button>
          </div>
          <div className="product-grid">
            {AL.products.map((p) => {
              const closed = p.remaining === 0;
              return (
                <button className="product-card" key={p.id} onClick={() => go("product", p.id)}>
                  <div className="product-img-wrap"><ImageWell className="product-img-inner" tone={p.tone} mark={`Ed. ${AL.edition.no}`} /></div>
                  <div className="product-info">
                    <h3 className="product-artist">{AL.edition.work} — {p.name}</h3>
                    <p className="product-format">{a.medium} · {p.gsm}</p>
                    <div className="product-divider"></div>
                    <div className="product-row">
                      <span className="product-price">${p.price}</span>
                      <span className={"product-stock" + (closed ? " closed" : "")}>{closed ? "Edition closed" : `${p.remaining} remaining`}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </main>
  );
}

function ArchiveScreen({ go }) {
  const closed = [
    { ed: "02", artist: "Aki Nomura", title: "Still Water", size: 60, year: "2024" },
    { ed: "01", artist: "Rosa Vidal", title: "First Cut", size: 50, year: "2024" },
  ];
  return (
    <main style={{ background: "var(--ivory)" }}>
      <div className="section-header" style={{ borderBottom: "0.5px solid var(--rule)" }}>
        <div>
          <p className="label">Closed permanently</p>
          <h2 className="section-h2">The archive</h2>
        </div>
        <span className="label" style={{ alignSelf: "flex-end", maxWidth: 220, textAlign: "right", lineHeight: 1.8 }}>Once closed, an edition is never reprinted</span>
      </div>
      <div className="product-grid">
        {closed.map((c) => (
          <button className="product-card" key={c.ed} onClick={() => go("artist", c.artist)}>
            <div className="product-img-wrap">
              <ImageWell className="product-img-inner" tone="#201F1C" mark={`Ed. ${c.ed}`} />
            </div>
            <div className="product-info">
              <h3 className="product-artist">{c.title} — {c.artist}</h3>
              <p className="product-format">Edition {c.ed} · {c.year}</p>
              <div className="product-divider"></div>
              <div className="product-row">
                <span className="product-price" style={{ fontStyle: "italic", fontSize: 16, color: "var(--dust)" }}>{c.size} pieces</span>
                <span className="product-stock closed">Edition closed</span>
              </div>
            </div>
          </button>
        ))}
        <div className="product-card" style={{ cursor: "default", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 19, color: "var(--dust)", textAlign: "center", padding: 40, lineHeight: 1.5 }}>Edition 03 joins the archive<br/>when the last piece sells.</p>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { ArtistsScreen, ArtistDetail, ArchiveScreen });

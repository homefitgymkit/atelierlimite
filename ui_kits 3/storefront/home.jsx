/* ============================================================
   Atelier Limité — Storefront UI Kit · Home screen
   ============================================================ */

function Hero({ go }) {
  const e = AL.edition;
  return (
    <section className="hero">
      <div className="hero-bg-char" aria-hidden="true">M</div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line"></span>
          <span className="hero-eyebrow-text">Now open — Edition {e.no}</span>
        </div>
        <h1 className="hero-title">{e.artist}</h1>
        <p className="hero-subtitle">{e.discipline}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => go("product")}>Acquire a piece</button>
          <button className="btn-ghost" onClick={() => go("article")}>Meet the artist</button>
        </div>
        <p className="hero-count"><span>{e.remaining}</span> / {e.size} pieces remaining</p>
      </div>
      <div className="hero-images">
        <ImageWell tone="#1E1E1B" mark={`Ed. ${e.no}`} />
        <ImageWell tone="#252521" />
      </div>
    </section>
  );
}

function Collection({ go }) {
  return (
    <section>
      <div className="section-header">
        <div>
          <p className="label">Current edition</p>
          <h2 className="section-h2">The collection</h2>
        </div>
        <button className="section-see-all" onClick={() => go("product")}>View all pieces</button>
      </div>
      <div className="product-grid">
        {AL.products.map((p) => {
          const closed = p.remaining === 0;
          return (
            <button className="product-card" key={p.id} onClick={() => go("product", p.id)}>
              <div className="product-img-wrap">
                <ImageWell className="product-img-inner" tone={p.tone} mark={`Ed. ${AL.edition.no}`} />
              </div>
              <div className="product-info">
                <h3 className="product-artist">{AL.edition.work} — {p.name}</h3>
                <p className="product-format">{AL.edition.discipline.split(" on ")[0]} · {p.gsm}</p>
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
    </section>
  );
}

function ArtistFeature({ go }) {
  const e = AL.edition;
  return (
    <section className="artist-feature">
      <ImageWell className="af-image" tone="#1C1C19" mark="MT" />
      <div className="af-content">
        <p className="label label--light">Artist in focus</p>
        <h2 className="af-name">{e.artist}</h2>
        <blockquote className="af-quote">{e.quote}</blockquote>
        <div className="af-meta">
          <span className="af-meta-line"></span>
          <button className="af-link" onClick={() => go("article")}>Read {e.artist.split(" ")[0]}'s story</button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Artist selected", "Each edition is themed. We find artists whose work deserves a wider audience — painters, sculptors, photographers, musicians, and more."],
    ["02", "Edition produced", "Limited run, numbered. Screen-printed on GOTS-certified organic cotton with water-based inks. The artist's name on every label."],
    ["03", "You acquire", "Your piece arrives with a 350gsm certificate of edition, an artist postcard, a mini poster, and a wax-sealed package."],
    ["04", "The artist gets paid", "50% of net profit goes directly to the artist, every quarter, with a full transparent statement. The artist keeps their IP."],
  ];
  return (
    <section className="how-section">
      <div className="how-header">
        <p className="label">How it works</p>
        <span className="how-header-line"></span>
      </div>
      <div className="how-grid">
        {steps.map(([n, t, b]) => (
          <article className="how-step" key={n}>
            <div className="how-num">{n}</div>
            <h3 className="how-title">{t}</h3>
            <p className="how-body">{b}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ImpactStrip() {
  return (
    <section className="impact-strip">
      {AL.impact.map((it) => (
        <div className="impact-item" key={it.label}>
          <div className="impact-num">{it.num}</div>
          <div className="impact-label">{it.label}</div>
        </div>
      ))}
    </section>
  );
}

function PrivateView({ joined, onJoin }) {
  const [email, setEmail] = useState("");
  return (
    <section className="pvl-section" id="private">
      <div className="pvl-eyebrow">
        <span className="pvl-eyebrow-line"></span>
        <span className="label label--light">Private view list</span>
        <span className="pvl-eyebrow-line"></span>
      </div>
      <h2 className="pvl-title">{joined ? "You're on the list." : "48 hours before the public."}</h2>
      <p className="pvl-sub">{joined ? "We'll write once per edition — gallery tone, no noise. See you at the opening." : "Four emails a year. One per edition. In before the opening."}</p>
      {!joined && (
        <form className="pvl-form" onSubmit={(ev) => { ev.preventDefault(); if (email.trim()) onJoin(); }}>
          <input className="pvl-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="pvl-btn" type="submit">Join</button>
        </form>
      )}
      <p className="pvl-note">No noise. No marketing. Just the opening.</p>
    </section>
  );
}

function Home({ go, joined, onJoin }) {
  return (
    <main>
      <Hero go={go} />
      <Collection go={go} />
      <ArtistFeature go={go} />
      <HowItWorks />
      <ImpactStrip />
      <PrivateView joined={joined} onJoin={onJoin} />
    </main>
  );
}

Object.assign(window, { Home, PrivateView });

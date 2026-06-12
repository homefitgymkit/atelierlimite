/* ============================================================
   Atelier Limité, Storefront UI Kit · Piece detail
   Pre-launch: no checkout. Each piece page invites the visitor
   to register interest (the private view list, Brevo-backed).
   ============================================================ */

function Product({ go, productId, joined, onJoin }) {
  const product = AL.products.find((p) => p.id === productId) || AL.products[0];
  const [shot, setShot] = useState(0);
  const shots = [product.tone, "#26241F", "#1C1C19"];
  const f = usePrivateViewSignup(onJoin);

  return (
    <main className="pdp">
      <div className="pdp-top">
        <div className="pdp-gallery">
          <ImageWell className="pdp-gallery-main" tone={shots[shot]} mark={`Edition ${AL.edition.no} · ${product.name}`} />
          <div className="pdp-thumbs">
            {shots.map((t, i) => (
              <button className="pdp-thumb hatch" key={i} data-active={shot === i} style={{ background: t }} onClick={() => setShot(i)}></button>
            ))}
          </div>
        </div>

        <div className="pdp-detail">
          <div className="pdp-eyebrow">
            <span className="pdp-eyebrow-line"></span>
            <span className="pdp-eyebrow-text">Edition {AL.edition.no} · {AL.edition.opens}</span>
          </div>
          <div className="pdp-artist">Artist {AL.edition.artist.toLowerCase()}</div>
          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-price-row">
            <span className="pdp-price">{alPrice(product.price)}</span>
            <span className="pdp-edition-no">/{String(product.editionSize || AL.edition.size).padStart(3, "0")} edition</span>
            <span className="pdp-remaining">Opens with Edition {AL.edition.no}</span>
          </div>

          <div className="pdp-opt-label">Colourways, all three at the opening</div>
          <div className="pdp-opt-row" aria-hidden="true">
            {AL.colourways.map((c) => (
              <span key={c.id} className="pdp-swatch" style={{ background: c.hex, cursor: "default" }} title={c.name}></span>
            ))}
          </div>
          <div className="pdp-opt-label" style={{ marginTop: 18 }}>Sizes {AL.sizes[0]} to {AL.sizes[AL.sizes.length - 1]}</div>

          <div className="pdp-actions" style={{ flexDirection: "column", alignItems: "stretch", gap: 14 }}>
            {joined ? (
              <p className="pdp-joined-note">You're on the private view list. We'll write when Edition {AL.edition.no} opens, 48 hours before the public.</p>
            ) : (
              <form className="pdp-interest-form" onSubmit={f.submit}>
                <input className="pdp-interest-input" type="email" placeholder="your@email.com" value={f.email} onChange={f.onChange} required aria-label="Your email" />
                <button className="btn-primary dark" type="submit" disabled={f.busy} aria-busy={f.busy}>{f.busy ? "Registering…" : "Register interest"}</button>
              </form>
            )}
            {!joined && f.error && <p className="form-error-line ink" role="alert">{f.error}</p>}
            <p className="pdp-honest-note">Nothing is sold before the opening. Registering joins the private view list: you see the edition 48 hours before the public.</p>
            <button className="btn-ghost ink" onClick={() => go("article")} style={{ alignSelf: "flex-start" }}>How editions work</button>
          </div>

          <div className="pdp-meta-list">
            <div className="pdp-meta-item"><span className="pdp-meta-k">Artwork</span><span className="pdp-meta-v">{AL.edition.artist}</span></div>
            <div className="pdp-meta-item"><span className="pdp-meta-k">Blank</span><span className="pdp-meta-v">{product.gsm}, GOTS-certified</span></div>
            <div className="pdp-meta-item"><span className="pdp-meta-k">Print</span><span className="pdp-meta-v">Water-based / discharge, no plastisol</span></div>
            <div className="pdp-meta-item"><span className="pdp-meta-k">Number assigned</span><span className="pdp-meta-v">At point of order</span></div>
          </div>
        </div>
      </div>

      <section className="pdp-included">
        {AL.included.map((it) => (
          <div className="pdp-inc-cell" key={it.n}>
            <div className="pdp-inc-num">{it.n}</div>
            <div className="pdp-inc-title">{it.t}</div>
            <div className="pdp-inc-body">{it.b}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

Object.assign(window, { Product });

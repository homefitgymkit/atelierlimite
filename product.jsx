/* ============================================================
   Atelier Limité, Storefront UI Kit · Product detail + Certificate
   ============================================================ */

function Product({ go, productId, onAdd }) {
  const product = AL.products.find((p) => p.id === productId) || AL.products[0];
  const closed = product.remaining === 0;
  const [cw, setCw] = useState(AL.colourways[0]);
  const [size, setSize] = useState("M");
  const [shot, setShot] = useState(0);
  const shots = [product.tone, "#26241F", "#1C1C19"];

  function acquire() {
    if (closed) return;
    onAdd({ ...product, cw: cw.name, size });
    go("__openbag");
  }

  return (
    <main className="pdp">
      <div className="pdp-top">
        <div className="pdp-gallery">
          <ImageWell className="pdp-gallery-main" tone={shots[shot]} mark={`${AL.edition.work} · Ed. ${AL.edition.no}`} />
          <div className="pdp-thumbs">
            {shots.map((t, i) => (
              <button className="pdp-thumb hatch" key={i} data-active={shot === i} style={{ background: t }} onClick={() => setShot(i)}></button>
            ))}
          </div>
        </div>

        <div className="pdp-detail">
          <div className="pdp-eyebrow">
            <span className="pdp-eyebrow-line"></span>
            <span className="pdp-eyebrow-text">Edition {AL.edition.no}, {AL.edition.artist}</span>
          </div>
          <div className="pdp-artist">{AL.edition.work}</div>
          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-price-row">
            <span className="pdp-price">${product.price}</span>
            <span className="pdp-edition-no">/{String(product.editionSize || AL.edition.size).padStart(3, "0")} edition</span>
            <span className="pdp-remaining">{closed ? "Edition closed" : `${product.remaining} of ${product.editionSize || AL.edition.size} available`}</span>
          </div>

          <div className="pdp-opt-label">Colourway, {cw.name}</div>
          <div className="pdp-opt-row">
            {AL.colourways.map((c) => (
              <button key={c.id} className="pdp-swatch" data-active={cw.id === c.id} style={{ background: c.hex }} onClick={() => setCw(c)} title={c.name}></button>
            ))}
          </div>

          <div className="pdp-opt-label">Size</div>
          <div className="pdp-opt-row">
            {AL.sizes.map((s) => (
              <button key={s} className="pdp-chip" data-active={size === s} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>

          <div className="pdp-actions">
            {closed
              ? <button className="btn-primary dark" style={{ opacity: 0.4, cursor: "not-allowed" }} disabled>Edition closed</button>
              : <button className="btn-primary dark" onClick={acquire}>Acquire, ${product.price}</button>}
            <button className="btn-ghost ink" onClick={() => go("article")}>About this edition</button>
          </div>

          <div className="pdp-meta-list">
            <div className="pdp-meta-item"><span className="pdp-meta-k">Artwork</span><span className="pdp-meta-v">{AL.edition.discipline}</span></div>
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

/* ---------- CERTIFICATE / ORDER CONFIRMATION ---------- */
function Certificate({ go, items }) {
  const lead = items[0] || { name: "Heavyweight Tee", number: "047", cw: "Studio Black", size: "M" };
  return (
    <div className="cert-screen">
      <div className="cert">
        <div className="cert-seal">AL</div>
        <p className="cert-eyebrow">Certificate of edition</p>
        <h1 className="cert-title">Acquired.<br/><em>Welcome, collector.</em></h1>
        <p className="cert-sub">Your piece is sealed and on its way, numbered, named, and yours.</p>

        <div className="cert-row"><span className="cert-k">Artist</span><span className="cert-v">{AL.edition.artist}</span></div>
        <div className="cert-row"><span className="cert-k">Work</span><span className="cert-v">{AL.edition.work}</span></div>
        <div className="cert-row"><span className="cert-k">Piece</span><span className="cert-v">{lead.name} · {lead.cw} · {lead.size}</span></div>
        <div className="cert-row"><span className="cert-k">Edition number</span><span className="cert-v num">{lead.number} / {String(lead.editionSize || AL.edition.size).padStart(3, "0")}</span></div>
        <div className="cert-row"><span className="cert-k">Edition</span><span className="cert-v">No. {AL.edition.no}, {AL.edition.location}</span></div>

        <div className="cert-foot">
          <span className="cert-wordmark">Atelier <em>Limité</em></span>
          <button className="section-see-all" onClick={() => go("home")}>Back to the opening</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Product, Certificate });

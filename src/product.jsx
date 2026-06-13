/* ============================================================
   Atelier Limité · Future Edition Preview
   PRE-LAUNCH: this is a clearly-labelled concept preview, not a
   live product. No price, no confirmed artist / size / stock.
   It shows how an edition will be presented once the first
   collaboration is confirmed, and invites the private view.
   ============================================================ */
import { useState } from "react";
import { AL, usePrivateViewSignup, ImageWell } from "./ui.jsx";
import { ART, TeeMockup, HoodieMockup } from "./artwork.jsx";
import { PRODUCT_ART } from "./home-sections.jsx";

function Product({ go, productId, joined, onJoin }) {
  const product = AL.products.find((p) => p.id === productId) || AL.products[0];
  const artId = PRODUCT_ART[product.id] || "figure";
  const art = ART[artId];
  const Mock = product.id === "hoodie" ? HoodieMockup : TeeMockup;
  const [shot, setShot] = useState(0);
  const f = usePrivateViewSignup(onJoin);

  return (
    <main className="pdp">
      {/* clearly-labelled concept banner */}
      <div className="pdp-concept-banner">
        <span className="pdp-concept-tag">Concept preview</span>
        <span className="pdp-concept-text">A look at how Atelier Limité editions will be presented once the first artist collaboration is confirmed. Nothing here is for sale yet.</span>
      </div>

      <div className="pdp-top">
        <div className="pdp-gallery">
          {shot === 0 && (
            <div className="pdp-gallery-main pdp-stage"><Mock id={artId} color="#F5F2EC" /></div>
          )}
          {shot === 1 && (
            <div className="pdp-gallery-main pdp-art"><img src={art.src} alt={`${art.title}, studio study`} /></div>
          )}
          {shot === 2 && (
            <ImageWell className="pdp-gallery-main" tone={product.tone} mark="Garment photography to come" />
          )}
          <div className="pdp-thumbs">
            <button className="pdp-thumb pdp-thumb-stage" data-active={shot === 0} onClick={() => setShot(0)} aria-label="Garment mockup">
              <Mock id={artId} color="#F5F2EC" />
            </button>
            <button className="pdp-thumb" data-active={shot === 1} onClick={() => setShot(1)} aria-label="The studio study"
              style={{ backgroundImage: `url(${art.src})`, backgroundSize: "cover", backgroundPosition: "center" }}></button>
            <button className="pdp-thumb hatch" data-active={shot === 2} onClick={() => setShot(2)} aria-label="Photography to come"
              style={{ background: product.tone }}></button>
          </div>
        </div>

        <div className="pdp-detail">
          <div className="pdp-eyebrow">
            <span className="pdp-eyebrow-line"></span>
            <span className="pdp-eyebrow-text">Future wearable edition</span>
          </div>
          <div className="pdp-artist">Artist to be announced</div>
          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-concept-rows">
            <div className="pdp-cr"><span className="pdp-cr-k">Artist</span><span className="pdp-cr-v">To be announced</span></div>
            <div className="pdp-cr"><span className="pdp-cr-k">Edition size</span><span className="pdp-cr-v">To be confirmed</span></div>
            <div className="pdp-cr"><span className="pdp-cr-k">Garment</span><span className="pdp-cr-v">{product.gsm}, planned</span></div>
            <div className="pdp-cr"><span className="pdp-cr-k">Artwork</span><span className="pdp-cr-v">Studio study, in preparation</span></div>
          </div>

          <div className="pdp-opt-label">Planned colourways</div>
          <div className="pdp-opt-row" aria-hidden="true">
            {AL.colourways.map((c) => (
              <span key={c.id} className="pdp-swatch" style={{ background: c.hex, cursor: "default" }} title={c.name}></span>
            ))}
          </div>

          <div className="pdp-actions" style={{ flexDirection: "column", alignItems: "stretch", gap: 14 }}>
            {joined ? (
              <p className="pdp-joined-note">You're on the founding private list. We'll write the moment the first edition, artist, and details are confirmed.</p>
            ) : (
              <form className="pdp-interest-form" onSubmit={f.submit}>
                <input className="pdp-interest-input" type="email" placeholder="your@email.com" value={f.email} onChange={f.onChange} required aria-label="Your email" />
                <button className="btn-primary dark" type="submit" disabled={f.busy} aria-busy={f.busy}>{f.busy ? "Joining…" : "Join the private view"}</button>
              </form>
            )}
            {!joined && f.error && <p className="form-error-line ink" role="alert">{f.error}</p>}
            <p className="pdp-honest-note">Private view members will be first to hear when the first edition is confirmed. Nothing is for sale, and no artist, size, or price is set yet.</p>
            <button className="btn-ghost ink" onClick={() => go("article")} style={{ alignSelf: "flex-start" }}>How editions are intended to work</button>
          </div>
        </div>
      </div>

      <section className="pdp-included">
        <p className="pdp-included-intro">Intended to ship with every future edition</p>
        <div className="pdp-included-grid">
          {AL.included.map((it) => (
            <div className="pdp-inc-cell" key={it.n}>
              <div className="pdp-inc-num">{it.n}</div>
              <div className="pdp-inc-title">{it.t}</div>
              <div className="pdp-inc-body">{it.b}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export { Product };

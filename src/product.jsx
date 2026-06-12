/* ============================================================
   Atelier Limité, Storefront UI Kit · Piece detail
   Pre-launch: no checkout. Each piece page invites the visitor
   to register interest (the private view list, Brevo-backed).
   ============================================================ */
import { useState } from "react";
import { AL, alPrice, usePrivateViewSignup, ImageWell } from "./ui.jsx";
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
      <div className="pdp-top">
        <div className="pdp-gallery">
          {shot === 0 && (
            <div className="pdp-gallery-main pdp-stage"><Mock id={artId} color="#E8E1D3" /></div>
          )}
          {shot === 1 && (
            <div className="pdp-gallery-main pdp-art"><img src={art.src} alt={`${art.title} · studio study`} /></div>
          )}
          {shot === 2 && (
            <ImageWell className="pdp-gallery-main" tone={product.tone} mark={`Edition ${AL.edition.no} · ${product.name} · detail to come`} />
          )}
          <div className="pdp-thumbs">
            <button className="pdp-thumb pdp-thumb-stage" data-active={shot === 0} onClick={() => setShot(0)} aria-label="The garment">
              <Mock id={artId} color="#E8E1D3" />
            </button>
            <button className="pdp-thumb" data-active={shot === 1} onClick={() => setShot(1)} aria-label="The artwork"
              style={{ backgroundImage: `url(${art.src})`, backgroundSize: "cover", backgroundPosition: "center" }}></button>
            <button className="pdp-thumb hatch" data-active={shot === 2} onClick={() => setShot(2)} aria-label="Detail, photography to come"
              style={{ background: product.tone }}></button>
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

export { Product };

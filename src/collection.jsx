/* ============================================================
   Atelier Limité, The Collection (gallery)
   A gallery wall of framed studio studies. Tap a frame and the
   work "flicks" out of the frame onto the two garments it would
   be printed on; tap again and it flicks back in.
   Pre-launch: no released works yet, so every frame is a study.
   ============================================================ */
import { useState } from "react";
import { ART, FramedArt, TeeMockup, HoodieMockup } from "./artwork.jsx";
import { Reveal } from "./motion.jsx";
import { AL } from "./ui.jsx";

/* All seven supplied studies, titles + notes come from the ART registry */
const COLLECTION_WORKS = ["figure", "strata", "coast", "grid", "bloom", "arc", "field"]
  .map((id) => ({ id, title: ART[id].title, note: ART[id].note }));

function CollectionWork({ work, index, go }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className="cg-item" delay={(index % 3) * 90} style={{}}>
      <div className={"cg-card" + (open ? " is-open" : "")}>
        <button className="cg-frame" onClick={() => setOpen((v) => !v)} aria-expanded={open}
          aria-label={open ? "Return the artwork to its frame" : "See the artwork worn"}>
          <span className="cg-tag">Study</span>
          <div className="cg-art-layer"><FramedArt id={work.id} plate={false} className="on-dark" /></div>
          <span className="cg-hint">{open ? "Tap to reframe" : "Tap to wear"}</span>
        </button>

        <div className="cg-plate">
          <div>
            <div className="cg-plate-title">{work.title}</div>
            <div className="cg-plate-sub">Studio study · {work.note}</div>
          </div>
          <span className="cg-chevron" aria-hidden="true">{open ? "–" : "+"}</span>
        </div>

        <div className="cg-drop" data-open={open}>
          <div className="cg-drop-inner">
            <p className="cg-drop-label">How a work wears on the two garments</p>
            <div className="cg-garments">
              <div className="cg-garment">
                <div className="cg-garment-stage"><TeeMockup id={work.id} color="#1b1813" /></div>
                <span className="cg-garment-name">Heavyweight Tee</span>
              </div>
              <div className="cg-garment">
                <div className="cg-garment-stage"><HoodieMockup id={work.id} color="#1b1813" /></div>
                <span className="cg-garment-name">Heavyweight Hoodie</span>
              </div>
            </div>
            <button className="cg-view" onClick={() => go("product", "tee")}>View the pieces</button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CollectionGallery({ go }) {
  return (
    <main className="artist-detail">
      <section className="page-hero">
        <div className="page-hero-bigchar" aria-hidden="true">◈</div>
        <div className="page-hero-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t">The collection</span></div>
          <h1 className="page-title">How an <em>artwork</em> becomes an edition.</h1>
          <p className="page-lead">No edition has opened yet, so this wall hangs studio studies: tap any frame and the work lifts out, onto the garments it would be printed on. Edition 01's artwork takes its place at the opening.</p>
        </div>
      </section>

      <section className="cg-wall">
        <div className="cg-grid">
          {COLLECTION_WORKS.map((w, i) => <CollectionWork key={w.id} work={w} index={i} go={go} />)}
        </div>
      </section>

      <section className="cta-block">
        <div className="cta-eyebrow">Edition {AL.edition.no} · {AL.edition.opens}</div>
        <h2 className="cta-title">Be first through <em>the door.</em></h2>
        <p className="cta-sub">Numbered. Named. Worn.</p>
        <button className="btn-cta" onClick={() => go("private")}>Join the private view</button>
      </section>
    </main>
  );
}

export { CollectionGallery, CollectionWork };

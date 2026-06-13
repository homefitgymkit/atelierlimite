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
            <p className="cg-drop-label">A garment test, how a study could wear</p>
            <div className="cg-garments">
              <div className="cg-garment">
                <div className="cg-garment-stage"><TeeMockup id={work.id} color="#1A1A18" /></div>
                <span className="cg-garment-name">Heavyweight Tee</span>
              </div>
              <div className="cg-garment">
                <div className="cg-garment-stage"><HoodieMockup id={work.id} color="#1A1A18" /></div>
                <span className="cg-garment-name">Heavyweight Hoodie</span>
              </div>
            </div>
            <button className="cg-view" onClick={() => go("product", "tee")}>See the future edition preview</button>
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
          <div className="page-eyebrow"><span className="l"></span><span className="t">The study wall</span></div>
          <h1 className="page-title">The <em>first wall.</em></h1>
          <p className="page-lead">No edition is open yet. This wall is where early studies, garment tests, and visual references live before they become wearable editions. Tap any frame to see how a study could wear.</p>
        </div>
      </section>

      <section className="cg-wall">
        <div className="cg-grid">
          {COLLECTION_WORKS.map((w, i) => <CollectionWork key={w.id} work={w} index={i} go={go} />)}
        </div>
      </section>

      <section className="cta-block">
        <div className="cta-eyebrow">Before Edition {AL.edition.no} exists</div>
        <h2 className="cta-title">Follow the wall as <em>it grows.</em></h2>
        <p className="cta-sub">Be first to follow the studies, artist conversations, and future wearable editions.</p>
        <button className="btn-cta" onClick={() => go("private")}>Join the private view</button>
      </section>
    </main>
  );
}

export { CollectionGallery, CollectionWork };

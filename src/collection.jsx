/* ============================================================
   Atelier Limité · The wall (the studies, walked)
   A full-bleed vertical sequence: one study per viewport, large
   and centred on a textured, lit, dark gallery ground, with a
   wall label beneath. Scrolling reads as walking the wall.
   No grid, no garment.
   ============================================================ */
import { ART } from "./artwork.jsx";
import { Reveal } from "./motion.jsx";

const WORKS = ["figure", "strata", "coast", "grid", "bloom", "arc", "field"];

function WallRoom({ id, index }) {
  const art = ART[id];
  const no = String(index + 1).padStart(2, "0");
  return (
    <section className="sw-room">
      <Reveal className="sw-item" y={28}>
        <figure className="fh-frame sw-frame">
          <div className="fh-mat">
            <div className="fh-window">
              <img src={art.src} alt={art.title + ", a studio study"} loading="lazy" />
              <span className="fh-glass" aria-hidden="true"></span>
            </div>
          </div>
        </figure>
        <figcaption className="sw-label">
          <span className="sw-title">{art.title}</span>
          <span className="sw-meta">Studio study · No. {no}</span>
        </figcaption>
      </Reveal>
    </section>
  );
}

/* The wall: an opener, then the studies one per screen. */
function StudyWall() {
  return (
    <div className="sw">
      <section className="sw-open">
        <Reveal className="sw-open-inner">
          <p className="fh-eyebrow">The wall</p>
          <h2 className="sw-open-h">Early studies, before the first edition.</h2>
          <p className="sw-open-sub">Working studies and garment tests. When the first artist is confirmed, their work takes its place on this wall.</p>
        </Reveal>
      </section>
      {WORKS.map((id, i) => <WallRoom key={id} id={id} index={i} />)}
    </div>
  );
}

export { StudyWall };

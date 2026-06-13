/* ============================================================
   Atelier Limité · HeroMorph (the frame)
   The signature gesture: one museum-lit framed work on a vast
   dark wall, the edition plate beneath. On scroll the wall
   recedes, the work fills the frame, and the wall label resolves.
   No garment. One deliberate, slow gesture.

   Dependency-free: a single rAF reads scroll progress (0..1) and
   drives transform/opacity. Reduced-motion + SSR get a calm
   static composition of the framed work, label, and one call.
   ============================================================ */
import { useEffect, useRef } from "react";
import { ART } from "./artwork.jsx";
import { REDUCED } from "./motion.jsx";

const HERO_ART = "figure"; /* the boldest study */

function smooth(p, a, b, t0, t1) {
  const t = Math.min(1, Math.max(0, (p - t0) / (t1 - t0)));
  const e = t * t * (3 - 2 * t);
  return a + (b - a) * e;
}
const f3 = (n) => n.toFixed(3);

/* the framed work: dark gallery frame, ivory mat, the study under glass */
function FramedWork({ artRef, glassRef }) {
  const art = ART[HERO_ART];
  return (
    <figure className="fh-frame">
      <div className="fh-mat">
        <div className="fh-window">
          <img ref={artRef} src={art.src} alt={art.title + ", a studio study"} />
          <span ref={glassRef} className="fh-glass" aria-hidden="true"></span>
        </div>
      </div>
    </figure>
  );
}

/* the wall label that resolves beneath the work */
function WallLabel() {
  return (
    <dl className="fh-label">
      <div><dt>Artist</dt><dd>To be announced</dd></div>
      <div><dt>Work</dt><dd>Studio study</dd></div>
      <div><dt>Edition</dt><dd>Numbered, size to be confirmed</dd></div>
      <div><dt>Medium</dt><dd>Original artwork on organic cotton</dd></div>
    </dl>
  );
}

export function HeroMorph({ go }) {
  const sectionRef = useRef(null);
  const wallRef = useRef(null);
  const scrimRef = useRef(null);
  const frameRef = useRef(null);
  const artRef = useRef(null);
  const glassRef = useRef(null);
  const headRef = useRef(null);
  const resolveRef = useRef(null);

  useEffect(() => {
    if (REDUCED) return;
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));

      /* the wall recedes: a slow push-in + a darkening scrim */
      if (wallRef.current) wallRef.current.style.transform = `scale(${f3(smooth(p, 1.05, 1.0, 0, 1))})`;
      if (scrimRef.current) scrimRef.current.style.opacity = f3(smooth(p, 0, 0.45, 0.3, 1));
      /* the frame eases forward; the work fills it. NOTE: keep the
         centring translate(-50%,-50%) — never clobber it. */
      if (frameRef.current) frameRef.current.style.transform = `translate(-50%, -50%) translateY(${f3(smooth(p, 0, -2, 0, 1))}vh) scale(${f3(smooth(p, 1, 1.05, 0, 0.9))})`;
      if (artRef.current) artRef.current.style.transform = `scale(${f3(smooth(p, 1, 1.07, 0, 0.9))})`;
      /* the museum glass clears as we move in */
      if (glassRef.current) glassRef.current.style.opacity = f3(smooth(p, 0.9, 0, 0.1, 0.5));
      /* the opening line gives way to the wall label + call */
      if (headRef.current) headRef.current.style.opacity = f3(smooth(p, 1, 0, 0.04, 0.34));
      if (resolveRef.current) {
        resolveRef.current.style.opacity = f3(smooth(p, 0, 1, 0.5, 0.82));
        resolveRef.current.style.transform = `translateY(${f3(smooth(p, 14, 0, 0.5, 0.9))}px)`;
        resolveRef.current.style.pointerEvents = p > 0.62 ? "auto" : "none";
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* ---- reduced motion / SSR: calm static composition ---- */
  if (REDUCED) {
    return (
      <section className="fh fh-static">
        <div className="fh-stage">
          <div className="fh-wall" aria-hidden="true"></div>
          <FramedWork artRef={artRef} glassRef={glassRef} />
        </div>
        <div className="fh-copy">
          <p className="fh-eyebrow">Atelier Limité · pre-launch</p>
          <h1 className="fh-h">Wear the artwork.</h1>
          <p className="fh-sub">Artist-led editions, numbered and limited. The first private view is forming, before Edition 01 exists.</p>
          <button className="btn-primary" onClick={() => go("list")}>Join the private view</button>
        </div>
      </section>
    );
  }

  return (
    <section className="fh" ref={sectionRef}>
      <div className="fh-sticky">
        <div className="fh-wall" ref={wallRef} aria-hidden="true"></div>
        <div className="fh-spot" aria-hidden="true"></div>
        <div className="fh-grain" aria-hidden="true"></div>
        <div className="fh-scrim" ref={scrimRef} aria-hidden="true"></div>

        <div className="fh-frame-wrap" ref={frameRef}>
          <FramedWork artRef={artRef} glassRef={glassRef} />
          <div className="fh-plate">Edition 01 · in development</div>
        </div>

        <div className="fh-head" ref={headRef}>
          <p className="fh-eyebrow">Atelier Limité · pre-launch</p>
          <h1 className="fh-h">Wear the artwork.</h1>
          <p className="fh-sub">Artist-led editions, numbered and limited. The first private view is forming, before Edition 01 exists.</p>
        </div>

        <div className="fh-resolve" ref={resolveRef}>
          <WallLabel />
          <button className="btn-primary fh-cta" onClick={() => go("list")}>Join the private view</button>
          <p className="fh-cta-note">Be first to follow the studies, the artist conversations, and the first edition.</p>
        </div>
      </div>
    </section>
  );
}

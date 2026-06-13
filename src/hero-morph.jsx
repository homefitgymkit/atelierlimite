/* ============================================================
   Atelier Limité · HeroMorph
   Cinematic sticky-scroll: a framed, numbered artwork leaves the
   gallery wall and becomes the print on a premium tee. ONE artwork
   element travels continuously frame → chest (no fade-and-swap);
   the ivory mat it sits on becomes the ivory fabric, so the work
   reads as the same object throughout.

   Dependency-free: a single rAF reads scroll progress (0..1) and
   drives transforms/opacity. Reduced-motion + SSR get a calm
   static composition. Tune the storyboard via CONFIG below.
   ============================================================ */
import { useEffect, useRef } from "react";
import { AL } from "./ui.jsx";
import { ART } from "./artwork.jsx";
import { REDUCED } from "./motion.jsx";

const HERO_ART = "figure"; /* art-01 / print-01 — the boldest study */

/* storyboard anchors (percentages of the 100vh stage) */
const CFG = {
  frameTop: 40,   /* artwork centre at rest, on the wall */
  chestTop: 52,   /* artwork centre once printed, on the chest */
  endScale: 0.50, /* print size relative to the framed size */
};

function smooth(p, a, b, t0, t1) {
  const t = Math.min(1, Math.max(0, (p - t0) / (t1 - t0)));
  const e = t * t * (3 - 2 * t);
  return a + (b - a) * e;
}
const px3 = (n) => n.toFixed(3);

/* ---------- premium ivory tee, product-photography inspired ---------- */
/* Soft shoulders, neckline shadow, sleeve + fold shading, fabric
   grain, contact shadow, spotlight. No print here — the travelling
   artwork lands as the print. */
function HeroTee() {
  return (
    <svg className="hm-tee-svg" viewBox="0 0 520 560" aria-hidden="true">
      <defs>
        <radialGradient id="hmTeeSpot" cx="50%" cy="40%" r="62%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.10"/>
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.02"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="hmTeeBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cdc4b2"/>
          <stop offset="0.18" stopColor="#efe9dc"/>
          <stop offset="0.5" stopColor="#f6f1e6"/>
          <stop offset="0.82" stopColor="#ece5d6"/>
          <stop offset="1" stopColor="#c9c0ad"/>
        </linearGradient>
        <linearGradient id="hmTeeShoulder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.10"/>
          <stop offset="0.16" stopColor="#000" stopOpacity="0"/>
        </linearGradient>
        <radialGradient id="hmTeeNeck" cx="50%" cy="0%" r="60%">
          <stop offset="0" stopColor="#000" stopOpacity="0.22"/>
          <stop offset="1" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hmTeeContact" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity="0.5"/>
          <stop offset="1" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
        <filter id="hmTeeGrain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
      </defs>

      {/* spotlight behind the shirt */}
      <ellipse cx="260" cy="250" rx="300" ry="250" fill="url(#hmTeeSpot)"/>
      {/* soft contact shadow */}
      <ellipse cx="260" cy="520" rx="150" ry="22" fill="url(#hmTeeContact)"/>

      {/* body */}
      <path d="M168 96 L96 128 L60 210 L112 244 L140 196 L140 500 Q140 516 158 516 L362 516 Q380 516 380 500 L380 196 L408 244 L460 210 L424 128 L352 96 Q334 150 260 150 Q186 150 168 96 Z"
        fill="url(#hmTeeBody)"/>
      {/* fabric grain */}
      <path d="M168 96 L96 128 L60 210 L112 244 L140 196 L140 500 Q140 516 158 516 L362 516 Q380 516 380 500 L380 196 L408 244 L460 210 L424 128 L352 96 Q334 150 260 150 Q186 150 168 96 Z"
        fill="#fff" filter="url(#hmTeeGrain)" opacity="0.05"/>
      {/* shoulder light */}
      <path d="M168 96 Q260 150 352 96 L352 150 Q260 196 168 150 Z" fill="url(#hmTeeShoulder)"/>
      {/* neckline */}
      <path d="M168 96 Q260 150 352 96 Q330 112 260 112 Q190 112 168 96 Z" fill="url(#hmTeeNeck)"/>
      <path d="M196 104 Q260 142 324 104" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2.2"/>
      <path d="M192 100 Q260 138 328 100" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      {/* sleeve shading */}
      <path d="M96 128 L60 210 L112 244 L140 196 Z" fill="#000" opacity="0.05"/>
      <path d="M424 128 L460 210 L408 244 L380 196 Z" fill="#000" opacity="0.05"/>
      {/* soft vertical folds */}
      <path d="M196 200 Q190 360 204 504" fill="none" stroke="#000" strokeOpacity="0.045" strokeWidth="10"/>
      <path d="M324 200 Q330 360 316 504" fill="none" stroke="#000" strokeOpacity="0.045" strokeWidth="10"/>
      <path d="M260 170 L260 504" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="6"/>
      {/* side shade for roundness */}
      <path d="M140 196 L140 500 Q140 516 158 516 L176 516 L176 196 Z" fill="#000" opacity="0.04"/>
      <path d="M380 196 L380 500 Q380 516 362 516 L344 516 L344 196 Z" fill="#000" opacity="0.04"/>
    </svg>
  );
}

/* ---------- product card ---------- */
function ProductCard({ go }) {
  return (
    <aside className="hm-card">
      <div className="hm-card-eyebrow">Edition {AL.edition.no} · Artist series</div>
      <h3 className="hm-card-title">Artist Edition Tee</h3>
      <dl className="hm-card-rows">
        <div><dt>Fabric</dt><dd>Heavyweight cotton</dd></div>
        <div><dt>Fit</dt><dd>Oversized</dd></div>
        <div><dt>Edition</dt><dd>Limited to 80 pieces</dd></div>
        <div><dt>Price</dt><dd>$95 AUD</dd></div>
      </dl>
      <p className="hm-card-note">Artwork printed as a wearable edition.</p>
      <button className="hm-card-link" onClick={() => go("product", "tee")}>View Edition 01 →</button>
    </aside>
  );
}

export function HeroMorph({ go }) {
  const sectionRef = useRef(null);
  const L = useRef({}).current; /* layer refs by key */
  const set = (k) => (el) => { L[k] = el; };

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

      /* wall + spotlight: very subtle parallax + dim as we move to product */
      if (L.wall) { L.wall.style.transform = `translateY(${px3(smooth(p,0,2.5,0,1))}vh) scale(${px3(smooth(p,1.06,1.0,0,0.5))})`; }
      if (L.spot) { L.spot.style.opacity = px3(smooth(p, 0.9, 0.5, 0.3, 1)); }

      /* frame + glass peel away as the art detaches (do this before
         measuring so the frame centre is its layout position) */
      if (L.frame) {
        L.frame.style.opacity = px3(smooth(p, 1, 0, 0.30, 0.52));
        L.frame.style.transform = `translate(-50%, -50%) scale(${px3(smooth(p,1,1.08,0.30,0.6))}) rotate(${px3(smooth(p,0,-1.6,0.3,0.6))}deg)`;
        L.frame.style.filter = `blur(${px3(smooth(p,0,6,0.34,0.56))}px)`;
      }
      if (L.glass) L.glass.style.opacity = px3(smooth(p, 0.9, 0, 0.14, 0.40));

      /* tee fades up under the descending art */
      if (L.tee) {
        L.tee.style.opacity = px3(smooth(p, 0, 1, 0.46, 0.74));
        L.tee.style.transform = `translate(-50%, -50%) scale(${px3(smooth(p,1.06,1,0.46,0.86))})`;
      }

      /* the travelling artwork: measure the REAL frame centre and the REAL
         tee chest, then interpolate between them. Breakpoint-proof — the
         print always lands on the actual chest, desktop or mobile. */
      if (L.art && L.frame && L.tee && L.sticky) {
        const s = L.sticky.getBoundingClientRect();
        const fr = L.frame.getBoundingClientRect();
        const tr = L.tee.getBoundingClientRect();
        const startX = fr.left + fr.width / 2 - s.left;
        const startY = fr.top + fr.height / 2 - s.top;
        const endX = tr.left + tr.width / 2 - s.left;
        const endY = tr.top + tr.height * 0.45 - s.top; /* chest */
        const artW = L.art.offsetWidth || 1;
        const endScale = (tr.width * 0.42) / artW; /* print ≈ 42% of tee width */
        const cx = smooth(p, startX, endX, 0, 0.84);
        const cy = smooth(p, startY, endY, 0, 0.84);
        const sc = smooth(p, 1, endScale, 0, 0.84);
        L.art.style.transform = `translate(${px3(cx)}px, ${px3(cy)}px) translate(-50%, -50%) scale(${px3(sc)})`;
        const embed = smooth(p, 0, 1, 0.6, 0.96);
        L.art.style.setProperty("--embed", px3(embed));
        L.art.classList.toggle("is-embedded", p > 0.66);
      }

      /* typography phases */
      if (L.a) L.a.style.opacity = px3(smooth(p, 1, 0, 0.20, 0.34));
      if (L.plate) L.plate.style.opacity = px3(smooth(p, 1, 0, 0.24, 0.42));
      if (L.c) L.c.style.opacity = px3(p < 0.5 ? 0 : Math.min(smooth(p,0,1,0.54,0.66), smooth(p,1,0,0.80,0.9)));
      if (L.d) {
        const on = smooth(p, 0, 1, 0.84, 0.97);
        L.d.style.opacity = px3(on);
        L.d.style.transform = `translateY(${px3(smooth(p,16,0,0.84,1))}px)`;
        L.d.style.pointerEvents = p > 0.9 ? "auto" : "none";
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const art = ART[HERO_ART];

  /* ---- reduced-motion / no-scroll: calm stacked composition ---- */
  if (REDUCED) {
    return (
      <section className="hm hm-static">
        <div className="hm-static-inner">
          <div className="hm-static-stage">
            <HeroTee />
            <img className="hm-static-print" src={art.print} alt="" />
          </div>
          <div className="hm-static-copy">
            <div className="hm-plate-line">047 / 080 · Edition {AL.edition.no}</div>
            <h1 className="hm-h">A wall that walks.</h1>
            <p className="hm-sub">Limited wearable editions created with artists.</p>
            <button className="btn-primary" onClick={() => go("private")}>Join the private view</button>
          </div>
          <ProductCard go={go} />
        </div>
      </section>
    );
  }

  return (
    <>
    <section className="hm" ref={sectionRef}>
      <div className="hm-sticky" ref={set("sticky")}>
        {/* 1 wall · 2 grain/light */}
        <div className="hm-wall" ref={set("wall")} aria-hidden="true"></div>
        <div className="hm-spot" ref={set("spot")} aria-hidden="true"></div>
        <div className="hm-grain" aria-hidden="true"></div>

        {/* 3 typography — phase A (on the wall) */}
        <div className="hm-a" ref={set("a")}>
          <div className="hm-eyebrow">Edition {AL.edition.no} · Artist series</div>
          <h1 className="hm-h">The artwork leaves the wall.</h1>
          <p className="hm-sub">Limited wearable editions created with artists.</p>
        </div>

        {/* 4 frame + 5 glass (glass sits over the work, as real museum glass does) */}
        <figure className="hm-frame" ref={set("frame")} aria-hidden="true">
          <div className="hm-frame-mat">
            <div className="hm-frame-window"></div>
          </div>
          <div className="hm-glass" ref={set("glass")}></div>
        </figure>

        {/* edition plate */}
        <div className="hm-plate" ref={set("plate")} aria-hidden="true">047 / 080 · Edition {AL.edition.no}</div>

        {/* 7 tee (under the art) */}
        <div className="hm-tee" ref={set("tee")} aria-hidden="true"><HeroTee /></div>

        {/* 6/8 the travelling artwork = the print. One element, frame → chest */}
        <div className="hm-art" ref={set("art")}>
          <img src={art.print} alt={art.title + " · the edition artwork"} />
          <span className="hm-art-fabric" aria-hidden="true"></span>
        </div>

        {/* transition line — phase C */}
        <p className="hm-c" ref={set("c")} aria-hidden="true">It becomes the piece.</p>

        {/* 9 final headline · CTA · product card — phase D */}
        <div className="hm-d" ref={set("d")}>
          <div className="hm-d-copy">
            <div className="hm-plate-line">047 / 080 · Edition {AL.edition.no}</div>
            <h2 className="hm-h hm-h--final">A wall that walks.</h2>
            <p className="hm-sub">Be first to access limited, artist-led wearable editions.</p>
            <button className="btn-primary hm-cta" onClick={() => go("private")}>Join the private view</button>
          </div>
          <ProductCard go={go} />
        </div>
      </div>
    </section>
    {/* mobile-only: the product card as the next block, so it never
        collides with the centred tee inside the 100vh sticky */}
    <section className="hm-card-after"><ProductCard go={go} /></section>
    </>
  );
}

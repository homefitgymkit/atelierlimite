/* ============================================================
   Atelier Limité, Home
   Hero = the signature morph: a framed, numbered artwork lifts
   off the wall and settles onto the garment (load + scroll).
   ============================================================ */
import { useEffect, useRef } from "react";
import { AL, alPrice } from "./ui.jsx";
import { ART, TeeMockup, FramedArt } from "./artwork.jsx";
import { Reveal, REDUCED } from "./motion.jsx";
import { Collection, FirstArtist, HowItWorks, PrivateView, UpcomingEditions, StudiesMosaic } from "./home-sections.jsx";
import { JournalForward } from "./signature.jsx";

const HERO_ART = "figure";

/* live-ish scarcity line; pre-launch this reads 0 of 80 claimed */
function ScarcityLine({ className = "" }) {
  const e = AL.edition;
  return (
    <p className={"scarcity " + className}>
      <span>Edition {e.no}</span>
      <span className="scarcity-dot">·</span>
      <span><em>{e.claimed || 0}</em> of {e.size} claimed</span>
      <span className="scarcity-dot">·</span>
      <span>opening soon</span>
    </p>
  );
}

function smooth(p, a, b, t0, t1) {
  const t = Math.min(1, Math.max(0, (p - t0) / (t1 - t0)));
  const e = t * t * (3 - 2 * t);
  return a + (b - a) * e;
}

function HeroCopy({ go }) {
  const e = AL.edition;
  return (
    <div className="hs-copy">
      <span className="hg-eyebrow"><span className="pip"></span><span className="t">Edition {e.no} · {e.opens}</span></span>
      <h1 className="hg-title">Artists turn their work into <em>limited editions</em> you can wear.</h1>
      <ScarcityLine />
      <div className="hg-actions">
        <button className="btn-primary" onClick={() => go("private")}>Join the private view</button>
      </div>
    </div>
  );
}

function Hero({ go }) {
  const sectionRef = useRef(null);
  const wallRef = useRef(null);
  const frameRef = useRef(null);
  const garmentRef = useRef(null);
  const capRefs = useRef([]);

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

      if (wallRef.current) wallRef.current.style.opacity = smooth(p, 1, 0, 0.12, 0.5).toFixed(3);
      if (frameRef.current) {
        const ty = smooth(p, 0, -16, 0.12, 0.7);
        const sc = smooth(p, 1, 0.46, 0.12, 0.7);
        const rot = smooth(p, 0, -2.5, 0.12, 0.5);
        const op = smooth(p, 1, 0, 0.52, 0.72);
        frameRef.current.style.transform = `translate(-50%, calc(-50% + ${ty}vh)) scale(${sc.toFixed(3)}) rotate(${rot.toFixed(2)}deg)`;
        frameRef.current.style.opacity = op.toFixed(3);
      }
      if (garmentRef.current) {
        const sc = smooth(p, 1.1, 1, 0.46, 0.82);
        const op = smooth(p, 0, 1, 0.46, 0.68);
        garmentRef.current.style.transform = `translate(-50%, -50%) scale(${sc.toFixed(3)})`;
        garmentRef.current.style.opacity = op.toFixed(3);
      }
      const capOn = p < 0.36 ? 0 : p < 0.74 ? 1 : 2;
      capRefs.current.forEach((el, i) => { if (el) el.style.opacity = i === capOn ? "1" : "0"; });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const caps = ["The artwork leaves the wall.", "It becomes the piece.", "A wall that walks."];

  if (REDUCED) {
    return (
      <section className="hero-stage is-static">
        <div className="hs-sticky">
          <div className="hs-wall"><span className="hs-rail"></span></div>
          <figure className="hs-frame hs-frame--static">
            <div className="hs-frame-inner"><FramedArt id={HERO_ART} plate={false} /></div>
            <figcaption className="hs-plate"><span>047 / 080</span><span>Edition {AL.edition.no}</span></figcaption>
          </figure>
          <HeroCopy go={go} />
        </div>
      </section>
    );
  }

  return (
    <section className="hero-stage" ref={sectionRef}>
      <div className="hs-sticky">
        <div className="hs-wall" ref={wallRef} aria-hidden="true"><span className="hs-rail"></span></div>
        <div className="hs-garment" ref={garmentRef} aria-hidden="true">
          <TeeMockup id={HERO_ART} color="#F5F2EC" stage={false} />
        </div>
        <figure className="hs-frame" ref={frameRef}>
          <div className="hs-frame-inner"><FramedArt id={HERO_ART} plate={false} /></div>
          <figcaption className="hs-plate"><span>047 / 080</span><span>Edition {AL.edition.no}</span></figcaption>
        </figure>
        <div className="hs-caps" aria-hidden="true">
          {caps.map((t, i) => (
            <p key={i} className="hs-cap" ref={(el) => (capRefs.current[i] = el)} style={{ opacity: i === 0 ? 1 : 0 }}>{t}</p>
          ))}
        </div>
        <HeroCopy go={go} />
      </div>
    </section>
  );
}

/* Quiet discipline marquee under the hero. Two copies of the track
   scroll seamlessly; paused when offscreen for perf. */
function DisciplineMarquee() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([en]) => {
      el.style.animationPlayState = en.isIntersecting ? "running" : "paused";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const items = ["painters", "sculptors", "photographers", "musicians", "printmakers", "collagists"];
  const Track = () => (
    <span className="dm-track" aria-hidden="true">
      {items.map((w, i) => (
        <span className="dm-item" key={i}>{w}<span className="dm-sep">·</span></span>
      ))}
    </span>
  );
  return (
    <div className="dm" role="presentation">
      <div className="dm-row" ref={ref}><Track /><Track /></div>
    </div>
  );
}

/* AL wax-seal divider — the recurring quiet monogram at section breaks */
function WaxDivider({ onDark = false }) {
  return (
    <div className={"wax-divider" + (onDark ? " on-dark" : "")} role="presentation" aria-hidden="true">
      <span className="wax-rule"></span>
      <span className="wax-seal">AL</span>
      <span className="wax-rule"></span>
    </div>
  );
}

function WallToWardrobe() {
  return (
    <section className="w2w">
      <Reveal className="w2w-head">
        <p className="label" style={{ textAlign: "center" }}>The process</p>
        <h2 className="w2w-title">From <em>wall</em> to wardrobe.</h2>
        <p className="w2w-cap">Shown with a studio study. Edition 01's artwork is revealed at the opening.</p>
      </Reveal>
      <div className="w2w-track">
        <Reveal className="w2w-step" delay={0}>
          <div className="w2w-stage"><FramedArt id="arc" plate={false} className="on-dark" /></div>
          <div className="w2w-num">Step 01</div>
          <div className="w2w-label">The artwork</div>
          <p className="w2w-desc">An original work by the edition's artist, selected for a wider audience, not a gallery wall.</p>
        </Reveal>
        <div className="w2w-arrow" aria-hidden="true">→</div>
        <Reveal className="w2w-step" delay={120}>
          <div className="w2w-stage w2w-tee-stage"><TeeMockup id="arc" color="#F5F2EC" /></div>
          <div className="w2w-num">Step 02</div>
          <div className="w2w-label">The wearable piece</div>
          <p className="w2w-desc">Hand screen-printed on GOTS-certified organic cotton. Water-based inks, a fixed numbered run, the artist's name on every label.</p>
        </Reveal>
        <div className="w2w-arrow" aria-hidden="true">→</div>
        <Reveal className="w2w-step" delay={240}>
          <div className="w2w-stage w2w-cert-stage">
            <div className="w2w-cert">
              <div className="w2w-cert-num">047 / 080</div>
              <div className="w2w-cert-rows">
                <div className="w2w-cert-row"><span>Edition</span><span>No. {AL.edition.no} · First edition</span></div>
                <div className="w2w-cert-row"><span>Artist</span><span>{AL.edition.artist}</span></div>
                <div className="w2w-cert-row"><span>Garment</span><span>Heavyweight Tee · 280gsm</span></div>
                <div className="w2w-cert-row"><span>Status</span><span>Specimen</span></div>
              </div>
              <div className="w2w-cert-seal" aria-hidden="true">AL</div>
            </div>
          </div>
          <div className="w2w-num">Step 03</div>
          <div className="w2w-label">Yours to keep.</div>
          <p className="w2w-desc">Each piece carries a certificate of edition bearing its number. Piece 047 of 080, permanently. The edition closes when the run is acquired.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Home({ go, joined, onJoin }) {
  return (
    <main>
      <Hero go={go} />
      <DisciplineMarquee />
      <UpcomingEditions go={go} />
      <Collection go={go} />
      <StudiesMosaic />
      <FirstArtist go={go} />
      <WallToWardrobe />
      <WaxDivider />
      <HowItWorks />
      <JournalForward go={go} />
      <PrivateView joined={joined} onJoin={onJoin} />
    </main>
  );
}

export { Home, Hero, WallToWardrobe, DisciplineMarquee, ScarcityLine };

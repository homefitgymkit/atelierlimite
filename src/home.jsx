/* ============================================================
   Atelier Limité, Home
   Desire-first, pre-launch: the cinematic hero morph captures the
   founding private view, then early studies, the first-artist
   conversation, the planned programme, the journal, and the
   private-view capture. The model itself is explained on About.
   ============================================================ */
import { useEffect, useRef } from "react";
import { FirstArtist, PrivateView, UpcomingEditions, StudiesMosaic } from "./home-sections.jsx";
import { JournalForward } from "./signature.jsx";
import { HeroMorph } from "./hero-morph.jsx";

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

function Home({ go, joined, onJoin }) {
  return (
    <main>
      <HeroMorph go={go} />
      <DisciplineMarquee />
      <StudiesMosaic />
      <FirstArtist go={go} />
      <UpcomingEditions go={go} />
      <WaxDivider />
      <JournalForward go={go} />
      <PrivateView joined={joined} onJoin={onJoin} />
    </main>
  );
}

export { Home, DisciplineMarquee, WaxDivider };

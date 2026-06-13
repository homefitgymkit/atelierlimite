/* ============================================================
   Atelier Limité · The wall (home)
   The entry experience: the frame gesture, the studies walked
   one per screen, then quiet paths onward and the list.
   The model itself lives in The practice.
   ============================================================ */
import { HeroMorph } from "./hero-morph.jsx";
import { StudyWall } from "./collection.jsx";
import { PrivateView } from "./home-sections.jsx";
import { Reveal } from "./motion.jsx";

/* AL wax-seal divider, the recurring quiet monogram at section breaks */
function WaxDivider({ onDark = false }) {
  return (
    <div className={"wax-divider" + (onDark ? " on-dark" : "")} role="presentation" aria-hidden="true">
      <span className="wax-rule"></span>
      <span className="wax-seal">AL</span>
      <span className="wax-rule"></span>
    </div>
  );
}

/* one quiet path onward, into the practice */
function PracticePath({ go }) {
  return (
    <section className="path">
      <Reveal className="path-inner">
        <p className="fh-eyebrow">The practice</p>
        <h2 className="path-h">One artist per edition. Half of every sale, to the artist.</h2>
        <p className="path-sub">No collections, no restocks, no manufactured scarcity. A numbered edition, the artist's name on every label, and full IP kept by the artist.</p>
        <button className="path-link" onClick={() => go("practice")}>Read the practice</button>
      </Reveal>
    </section>
  );
}

function Home({ go, joined, onJoin }) {
  return (
    <main>
      <HeroMorph go={go} />
      <StudyWall go={go} />
      <WaxDivider />
      <PracticePath go={go} />
      <PrivateView joined={joined} onJoin={onJoin} />
    </main>
  );
}

export { Home, WaxDivider };

/* ============================================================
   Atelier Limité · The practice
   The way of working. Opens with the 50/50 as a full-screen
   manifesto, then the model, what ships with each piece, the
   case to artists, an (honestly empty) artist module, and the
   invitation to work with us. Absorbs About + how it works.
   ============================================================ */
import { useState } from "react";
import { AL } from "./ui.jsx";
import { AL_ABOUT, AL_WORK, AL_FAQ } from "./content.jsx";
import { Reveal } from "./motion.jsx";

const HOW = [
  ["01", "One artist", "Each edition is built around a single artist, chosen for the work, not a following. Their name leads on every surface."],
  ["02", "A numbered edition", "A fixed run, screen-printed on organic cotton, each piece numbered. No collections, no restocks, no manufactured scarcity."],
  ["03", "Acquired, then closed", "Collectors acquire a numbered piece with a certificate of edition. When the run is taken, the edition is closed, permanently."],
  ["04", "The artist is paid", "Half of net profit goes to the artist, with a transparent statement. The artist keeps full IP; we licence one edition only."],
];

function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-row" data-open={open}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="faq-q-t">{q}</span>
        <span className="faq-plus" aria-hidden="true">+</span>
      </button>
      <div className="faq-a"><p>{a}</p></div>
    </div>
  );
}

export function Practice({ go }) {
  return (
    <main className="practice">
      {/* 1 · the manifesto, a warm light room */}
      <section className="manifesto manifesto--light">
        <Reveal className="manifesto-inner">
          <div className="manifesto-seal" aria-hidden="true">AL</div>
          <p className="fh-eyebrow">The practice</p>
          <h1 className="manifesto-h">Half of every sale, <em>to the artist.</em></h1>
          <div className="manifesto-stat" aria-hidden="true">50 / 50</div>
          <p className="manifesto-sub">Atelier Limité splits net profit fifty-fifty with the artist on every piece, paid with a transparent statement. The artist keeps full IP. We licence the artwork for one edition only. This is the moat, stated plainly.</p>
        </Reveal>
      </section>

      {/* 2 · principles */}
      <section className="about-principles">
        {AL_ABOUT.principles.map((p) => (
          <Reveal as="article" className="about-principle" key={p.n}>
            <div className="ap-n">{p.n}</div>
            <h3 className="ap-t">{p.t}</h3>
            <p className="ap-b">{p.b}</p>
          </Reveal>
        ))}
      </section>

      {/* 3 · how an edition works */}
      <section className="how-section">
        <div className="how-header"><p className="label">How an edition works</p><span className="how-header-line"></span></div>
        <div className="how-grid">
          {HOW.map(([n, t, b], i) => (
            <Reveal as="article" className="how-step" key={n} delay={i * 70}>
              <div className="how-num">{n}</div>
              <h3 className="how-title">{t}</h3>
              <p className="how-body">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 · what ships with each piece (intended) */}
      <section className="ships">
        <div className="ships-head">
          <p className="label">Intended to ship with every edition</p>
          <h2 className="ships-h">What a collector receives.</h2>
        </div>
        <div className="ships-grid">
          {AL.included.map((it) => (
            <Reveal className="ships-cell" key={it.n}>
              <div className="ships-n">{it.n}</div>
              <div className="ships-t">{it.t}</div>
              <div className="ships-b">{it.b}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4b · the forward programme (honest, no fixed dates) */}
      <section className="prog">
        <div className="prog-head">
          <p className="label">The programme</p>
          <h2 className="prog-title">A forward calendar.</h2>
          <p className="prog-note">The intended rhythm: one artist per edition. Dates are set with each artist as it is confirmed. Private view members hear first.</p>
        </div>
        <div className="prog-list" role="table" aria-label="Programme">
          <div className="prog-row prog-row--head" role="row">
            <span role="columnheader">Edition</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Artist</span>
          </div>
          {[["I", "In development", "To be announced", true], ["II", "Planned", "To be announced"], ["III", "Planned", "To be announced"], ["IV", "Planned", "To be announced"]].map(([no, status, artist, now]) => (
            <div key={no} className={"prog-row" + (now ? " is-now" : "")} role="row">
              <span className="prog-no" role="cell"><span className="prog-k">Edition</span>{no}{now && <span className="prog-pip" aria-hidden="true"></span>}</span>
              <span className="prog-status" role="cell"><span className="prog-k">Status</span>{status}</span>
              <span className="prog-artist" role="cell"><span className="prog-k">Artist</span>{artist}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · the case to artists */}
      <section className="for-artists">
        <Reveal className="for-artists-head">
          <p className="fh-eyebrow">For artists</p>
          <h2 className="for-artists-h">A fairer way for your work to leave the studio.</h2>
          <p className="for-artists-sub">{AL_WORK.lead}</p>
        </Reveal>
        <div className="work-grid">
          {AL_WORK.criteria.map((c) => (
            <Reveal as="article" className="work-crit" key={c.t}>
              <h3 className="wc-t">{c.t}</h3>
              <p className="wc-b">{c.b}</p>
            </Reveal>
          ))}
        </div>
        <ul className="work-promises-list">
          {AL_WORK.promises.map((p, i) => (
            <li key={i}><span className="wp-mark" aria-hidden="true">·</span>{p}</li>
          ))}
        </ul>
      </section>

      {/* 6 · artist module, honestly empty pre-launch */}
      <section className="artist-module">
        <div className="am-portrait" aria-hidden="true"><span className="am-slot">Studio portrait</span></div>
        <div className="am-body">
          <p className="fh-eyebrow">The first artist</p>
          <h2 className="am-h">To be announced.</h2>
          <p className="am-statement">The artist's statement, in their words, will sit here, with their signature beneath and a short studio film. We are in conversation now; private view members hear who first.</p>
          <div className="am-sign" aria-hidden="true"><span className="am-sign-line"></span><span className="am-sign-label">Signature</span></div>
          <div className="am-film" aria-hidden="true"><span className="am-slot">Studio film</span></div>
        </div>
      </section>

      {/* 7 · the invitation */}
      <section className="work-cta">
        <div className="work-cta-eyebrow"><span className="t">Work with us</span></div>
        <h2 className="work-cta-h">Show us the work.</h2>
        <p className="work-cta-sub">One artist opens the first edition. Every submission gets a genuine response within two weeks.</p>
        <a className="work-cta-mail" href="mailto:artists@atelierlimite.com">artists@atelierlimite.com</a>
      </section>

      {/* 8 · the record (FAQ) */}
      <section className="faq-page">
        <div className="faq-page-inner">
          <div className="faq-page-head"><span className="label">The record</span></div>
          {AL_FAQ.map((grp) => (
            <div className="faq-group" key={grp.group}>
              <div className="faq-group-head">
                <span className="faq-group-label">{grp.group}</span>
                <span className="faq-group-line"></span>
              </div>
              {grp.items.map((it) => <FaqRow key={it.q} q={it.q} a={it.a} />)}
            </div>
          ))}
        </div>
        <div className="practice-foot">
          <button className="btn-primary" onClick={() => go("list")}>Join the private view</button>
        </div>
      </section>
    </main>
  );
}

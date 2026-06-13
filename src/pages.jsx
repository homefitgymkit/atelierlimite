/* ============================================================
   Atelier Limité · The list (the private view list)
   What membership means, the 48-hour head start as the planned
   model, and the signup. Pre-launch and honest throughout.
   ============================================================ */
import React from "react";
import { usePrivateViewSignup } from "./ui.jsx";
import { Reveal } from "./motion.jsx";

const MEANS = [
  ["The studies", "Follow the early studies and garment tests as the first edition takes shape."],
  ["The artist", "Hear who the first artist is, and see the first work, before anyone else."],
  ["The head start", "When an edition opens, members are intended to get a 48-hour head start before the public."],
];

export function TheList({ joined, onJoin }) {
  const f = usePrivateViewSignup(onJoin);
  return (
    <main className="list-room">
      <section className="list-hero">
        <Reveal className="list-hero-inner">
          <p className="fh-eyebrow">The list</p>
          <h1 className="list-h">{joined ? "You are on the founding list." : "The private view list."}</h1>
          <p className="list-sub">
            {joined
              ? "Welcome. We will write as the studies, the artist conversations, and the first edition take shape."
              : "A founding list, before Edition 01 exists. Be first to follow the studies, the artist conversations, and the first edition."}
          </p>
          {!joined && (
            <form className="list-form" onSubmit={f.submit}>
              <input className="list-input" type="email" placeholder="your@email.com" value={f.email} onChange={f.onChange} required aria-label="Your email" />
              <button className="list-submit" type="submit" disabled={f.busy} aria-busy={f.busy}>{f.busy ? "Joining…" : "Join the private view"}</button>
            </form>
          )}
          {!joined && f.error && <p className="form-error-line" role="alert">{f.error}</p>}
          <p className="list-note">Private view members will be first to hear about future editions and early-access windows when editions are confirmed. No spam, no list-sharing.</p>
        </Reveal>
      </section>

      <section className="list-means">
        {MEANS.map(([t, b], i) => (
          <Reveal as="article" className="list-mean" key={t} delay={i * 80}>
            <span className="list-mean-no">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="list-mean-t">{t}</h2>
            <p className="list-mean-b">{b}</p>
          </Reveal>
        ))}
      </section>
    </main>
  );
}

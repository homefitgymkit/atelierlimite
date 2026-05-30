/* ============================================================
   Atelier Limité — Work with us + Private view (full pages)
   ============================================================ */

function WorkPage({ go }) {
  const w = AL_WORK;
  return (
    <main className="artist-detail">
      <section className="page-hero">
        <div className="page-hero-bigchar" aria-hidden="true">50</div>
        <div className="page-hero-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t">For artists</span></div>
          <h1 className="page-title">We split <em>everything,</em> fifty-fifty.</h1>
          <p className="page-lead">{w.lead}</p>
          <div style={{ marginTop: 40 }}>
            <button className="btn-primary" onClick={() => go("private")}>artists@atelierlimite.com</button>
          </div>
        </div>
      </section>

      {/* criteria */}
      <section className="work-criteria">
        <div className="work-criteria-head">
          <span className="faq-group-label">What we look for</span>
          <span className="faq-group-line"></span>
        </div>
        <div className="work-grid">
          {w.criteria.map((c) => (
            <article className="work-crit" key={c.t}>
              <h3 className="wc-t">{c.t}</h3>
              <p className="wc-b">{c.b}</p>
            </article>
          ))}
        </div>
      </section>

      {/* steps */}
      <section className="work-steps">
        <div className="work-steps-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t">How a collaboration works</span></div>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 40, color: "var(--ivory)", maxWidth: "18ch" }}>From a first email to a quarterly cheque.</h2>
          <div className="work-steps-grid">
            {w.steps.map((s) => (
              <article className="work-step" key={s.n}>
                <div className="ws-n">{s.n}</div>
                <h3 className="ws-t">{s.t}</h3>
                <p className="ws-b">{s.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* promises */}
      <section className="work-promises">
        <div>
          <div className="page-eyebrow"><span className="l" style={{ background: "var(--bronze)" }}></span><span className="t">Our commitments</span></div>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 34, color: "var(--ink)", lineHeight: 1.15, marginTop: 8 }}>The terms are the same for everyone — by design.</h2>
        </div>
        <div>
          {w.promises.map((p, i) => (
            <div className="work-promise-row" key={i}>
              <span className="wp-mark">—</span>
              <span className="wp-t">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="work-cta">
        <div className="page-eyebrow" style={{ justifyContent: "center" }}>
          <span className="l"></span><span className="t">Express interest</span><span className="l"></span>
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(30px,4vw,52px)", color: "var(--ivory)", lineHeight: 1.1, marginTop: 14 }}>Show us the work.</h2>
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17, color: "rgba(246,243,237,0.4)", marginTop: 14 }}>Every submission gets a genuine response within two weeks.</p>
        <div className="work-cta-mail">artists@atelierlimite.com</div>
      </section>
    </main>
  );
}

function PrivateViewPage({ go, joined, onJoin }) {
  const [email, setEmail] = useState("");
  const promises = [
    { num: "48h", t: "Early access before\nevery public opening" },
    { num: "4", t: "Emails a year —\none per edition" },
    { num: "0", t: "Newsletters, sales,\nor urgency mechanics" },
  ];
  return (
    <main className="pv-page" id="private">
      <section className="pv-hero">
        <div className="page-hero-bigchar" aria-hidden="true" style={{ right: "auto", left: "50%", transform: "translate(-50%,-50%)" }}>·</div>
        <div className="page-eyebrow" style={{ justifyContent: "center" }}>
          <span className="l"></span><span className="t">The private view list</span><span className="l"></span>
        </div>
        <h1 className="pv-title">{joined ? <>You're on <em>the list.</em></> : <>48 hours before <em>the public.</em></>}</h1>
        <p className="pv-lead">{joined
          ? "We'll write once per edition — gallery tone, never marketing. The next opening is yours to see first."
          : "An invitation-only preview of every edition, in the tradition of a gallery private view. Four emails a year. One per opening. Nothing else."}</p>

        {!joined ? (
          <form className="pv-form" onSubmit={(e) => { e.preventDefault(); if (email.trim()) onJoin(); }}>
            <input className="pv-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="pv-submit" type="submit">Request access</button>
          </form>
        ) : (
          <div style={{ marginTop: 48 }}>
            <button className="btn-primary" onClick={() => go("product")}>View the current edition</button>
          </div>
        )}

        <div className="pv-promises">
          {promises.map((p) => (
            <div className="pv-promise" key={p.num}>
              <div className="pv-promise-num">{p.num}</div>
              <div className="pv-promise-t">{p.t.split("\n").map((l, i) => <React.Fragment key={i}>{l}<br/></React.Fragment>)}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { WorkPage, PrivateViewPage });

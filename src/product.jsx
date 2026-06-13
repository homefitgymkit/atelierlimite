/* ============================================================
   Atelier Limité · Future edition preview (concept)
   Clearly conceptual: a framed study, the way an edition will be
   presented once the first artist is confirmed. No garment, no
   price, no confirmed numbers. Private view CTA.
   ============================================================ */
import { ART } from "./artwork.jsx";
import { usePrivateViewSignup } from "./ui.jsx";

const PREVIEW_ART = "figure";

export function Product({ go, joined, onJoin }) {
  const art = ART[PREVIEW_ART];
  const f = usePrivateViewSignup(onJoin);
  return (
    <main className="fep">
      <section className="fep-top">
        <div className="fep-stage">
          <div className="fh-wall" aria-hidden="true"></div>
          <figure className="fh-frame fep-frame">
            <div className="fh-mat">
              <div className="fh-window">
                <img src={art.src} alt="A studio study, shown as a concept preview" />
                <span className="fh-glass" aria-hidden="true"></span>
              </div>
            </div>
          </figure>
          <div className="fep-stamp" aria-hidden="true">Concept preview</div>
        </div>

        <div className="fep-detail">
          <p className="fh-eyebrow">Concept preview</p>
          <h1 className="fep-h">Future wearable edition</h1>
          <p className="fep-lead">A look at how an Atelier Limité edition will be presented, once the first artist collaboration is confirmed. Nothing here is for sale yet.</p>

          <dl className="fep-rows">
            <div><dt>Artist</dt><dd>To be announced</dd></div>
            <div><dt>Edition</dt><dd>Numbered, size to be confirmed</dd></div>
            <div><dt>Garment</dt><dd>Heavyweight organic cotton, planned</dd></div>
            <div><dt>Includes</dt><dd>Certificate of edition, intended</dd></div>
          </dl>

          {joined ? (
            <p className="fep-joined">You are on the founding list. We will write when the first edition is confirmed.</p>
          ) : (
            <form className="list-form fep-form" onSubmit={f.submit}>
              <input className="list-input" type="email" placeholder="your@email.com" value={f.email} onChange={f.onChange} required aria-label="Your email" />
              <button className="list-submit" type="submit" disabled={f.busy} aria-busy={f.busy}>{f.busy ? "Joining…" : "Join the private view"}</button>
            </form>
          )}
          {!joined && f.error && <p className="form-error-line ink" role="alert">{f.error}</p>}
          <p className="fep-note">Private view members will be first to hear when the first edition is confirmed.</p>
          <button className="path-link" onClick={() => go("practice")}>Read the practice</button>
        </div>
      </section>
    </main>
  );
}

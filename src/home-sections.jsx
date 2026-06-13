/* ============================================================
   Atelier Limité · The list capture (used on the wall + the list)
   ============================================================ */
import { usePrivateViewSignup } from "./ui.jsx";

function PrivateView({ joined, onJoin }) {
  const f = usePrivateViewSignup(onJoin);
  return (
    <section className="pvl-section" id="private">
      <div className="pvl-eyebrow"><span className="pvl-eyebrow-line"></span><span className="pvl-eyebrow-label">Private view list</span><span className="pvl-eyebrow-line"></span></div>
      <h2 className="pvl-title">{joined ? "You're on the founding list." : "Join the first private view."}</h2>
      <p className="pvl-sub">{joined ? "We'll write as the studies, the artist conversations, and the first edition take shape. Welcome to the founding list." : "Be first to follow the studies, the artist conversations, and the future wearable editions."}</p>
      {!joined && (
        <form className="pvl-form" onSubmit={f.submit}>
          <input className="pvl-input" type="email" placeholder="your@email.com" value={f.email} onChange={f.onChange} required aria-label="Your email" />
          <button className="pvl-btn" type="submit" disabled={f.busy} aria-busy={f.busy}>{f.busy ? "Joining…" : "Join"}</button>
        </form>
      )}
      {!joined && f.error && <p className="form-error-line" role="alert">{f.error}</p>}
      <p className="pvl-note">Private view members will be first to hear about future editions and early-access windows when editions are confirmed.</p>
    </section>
  );
}

export { PrivateView };

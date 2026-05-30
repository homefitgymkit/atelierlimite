/* ============================================================
   Atelier Limité — Storefront UI Kit · Journal article template
   ============================================================ */

function FaqItemJ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item-j" data-open={open}>
      <button className="faq-question-j" onClick={() => setOpen(!open)}>
        <span className="faq-q-text">{q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer-j">{a}</div>
    </div>
  );
}

const ANATOMY = [
  ["01", <span>A single <em>artist</em></span>, "Each edition is built around one artist's work. One artist, one body of work, one collaboration. The artist's name leads in every context."],
  ["02", <span>A <em>fixed</em> run</span>, "The edition size is set before production begins and cannot change once it opens. No held-back units, no restock, no reprint. Ever."],
  ["03", <span>A unique <em>number</em></span>, "Every piece receives a sequential number — 001/080 through 080/080 — on the neck label and the certificate. Numbers are assigned at order."],
  ["04", <span>A <em>certificate</em> of edition</span>, "Shipped with every piece: artist, work title, your number, and AL authentication. The garment's permanent provenance document."],
  ["05", <span>A permanent <em>closure</em></span>, "Once the last piece sells, the edition closes. The page moves to the archive. This is what makes every certificate meaningful."],
];

const ART_FAQ = [
  ["How many pieces are in an edition?", "Edition sizes grow as the collector base grows. Editions are sized to sell through completely at full price — that is the only criterion. Scarcity is real, never manufactured."],
  ["What does an edition number mean?", "047/080 means the forty-seventh piece in an edition of eighty. It appears on the neck label and the certificate. Numbers are assigned at order, so early collectors hold lower numbers."],
  ["Are editions ever restocked?", "Never. Once closed, an edition is closed permanently. Reprinting would invalidate every certificate already issued. The system only works if the closure is absolute."],
  ["How is an edition different from a drop?", "A drop manufactures urgency and is often restocked. An edition has a fixed, permanent number, credits the artist by name, includes a certificate, and shares 50% of net profit. Closer to a fine-art print than a fashion drop."],
];

function Article({ go }) {
  return (
    <main className="article">
      <div className="article-header-wrap">
        <nav className="breadcrumb">
          <button onClick={() => go("home")}>Home</button>
          <span className="sep">—</span>
          <button onClick={() => go("home")}>Journal</button>
          <span className="sep">—</span>
          <span className="current">What are Artist Editions?</span>
        </nav>
        <span className="article-tag">Editions · How it works</span>
        <h1 className="article-title">What are Artist <em>Editions</em> by Atelier Limité?</h1>
        <div className="article-meta">
          <span className="article-meta-item">Atelier Limité</span>
          <div className="article-meta-sep"></div>
          <span className="article-meta-item">Sydney, NSW · Australia</span>
          <div className="article-meta-sep"></div>
          <span className="article-meta-item">June 2026</span>
          <div className="article-meta-sep"></div>
          <span className="article-meta-item">10 min read</span>
        </div>
      </div>

      <div className="article-body">
        <article className="article-content">
          <p className="article-lead">An Atelier Limité Artist Edition is a fixed, numbered run of garments made in collaboration with a single artist. Every piece carries a unique number, the artist's name on the label, and a certificate of edition. When the run is closed, the number on every certificate is permanent.</p>
          <p>The word edition comes from fine-art printmaking — a tradition in which an artist produces a fixed number of impressions, numbers each one, and signs the last to mark the edition complete. Owning piece 047 of 080 means something specific and verifiable: that exactly 79 other people hold a piece from the same run, and that no more will ever be made.</p>
          <h2>The anatomy of an <em>edition</em></h2>
          <p>Every Atelier Limité edition has five defining components. Together, they distinguish it categorically from a conventional clothing release.</p>
        </article>
      </div>

      <div className="article-body">
        <div className="anatomy-block">
          <div className="anatomy-label">The five parts of an edition</div>
          <div className="anatomy-title">What makes an<br/><em>edition an edition.</em></div>
          {ANATOMY.map(([n, t, b]) => (
            <div className="anatomy-row" key={n}>
              <div className="anatomy-num">{n}</div>
              <div>
                <div className="anatomy-item-title">{t}</div>
                <div className="anatomy-item-body">{b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="article-body">
        <article className="article-content">
          <h2>Numbered, named, <em>permanent</em></h2>
          <p>The edition number is the most specific thing on the garment. It is not a batch code — it is the piece's identity within the edition, and its relationship to every other piece that will ever exist.</p>
          <div className="pull-quote"><p>The edition number is only meaningful if the total it references is real and final. That is the commitment every certificate represents.</p></div>
        </article>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">Limited</div><div className="stat-label">Pieces per edition</div></div>
          <div className="stat-cell"><div className="stat-num">4</div><div className="stat-label">Editions per year</div></div>
          <div className="stat-cell"><div className="stat-num">50%</div><div className="stat-label">Net profit to every artist</div></div>
        </div>
      </div>

      <section className="faq-section-j">
        <div className="faq-inner">
          <h2 className="faq-title-j">Common <em>questions</em></h2>
          {ART_FAQ.map(([q, a]) => <FaqItemJ key={q} q={q} a={a} />)}
        </div>
      </section>

      <section className="cta-block">
        <div className="cta-eyebrow">Edition {AL.edition.no} now open</div>
        <h2 className="cta-title">Acquire a piece of <em>{AL.edition.artist}.</em></h2>
        <p className="cta-sub">Numbered. Named. Worn.</p>
        <button className="btn-cta" onClick={() => go("product")}>View the edition</button>
      </section>
    </main>
  );
}

Object.assign(window, { Article, FaqItemJ });

/* ============================================================
   Atelier Limité, The Collection (gallery)
   A gallery wall of framed works. Tap a frame and the artwork
   "flicks" out of the frame onto the two garments it was
   printed on; tap again and it flicks back in.
   ============================================================ */

const COLLECTION_WORKS = [
  { id: "figure", edition: "03", title: "Untitled I",        medium: "Spray & stencil", artist: "Mia Torres" },
  { id: "strata", edition: "02", title: "Strata II",         medium: "Pigment & wax",   artist: "Aki Nomura" },
  { id: "coast",  edition: "02", title: "Coastline",         medium: "Sumi-e & digital", artist: "Aki Nomura" },
  { id: "grid",   edition: "01", title: "Lot 04",            medium: "Collage & ink",   artist: "Rosa Vidal" },
  { id: "bloom",  edition: "01", title: "Bloom (Nocturne)",  medium: "Ink on cotton",   artist: "Rosa Vidal" },
  { id: "arc",    edition: "Next", title: "Meridian",        medium: "Screenprint",     artist: "Jordan Pell" },
];

function CollectionWork({ work, index, go }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className="cg-item" delay={(index % 3) * 90} style={{}}>
      <div className={"cg-card" + (open ? " is-open" : "")}>
        <button className="cg-frame" onClick={() => setOpen((v) => !v)} aria-expanded={open}
          aria-label={open ? "Return the artwork to its frame" : "See the artwork worn"}>
          <span className="cg-tag">Ed. {work.edition}</span>
          <div className="cg-art-layer"><FramedArt id={work.id} plate={false} className="on-dark" /></div>
          <span className="cg-hint">{open ? "Tap to reframe" : "Tap to wear"}</span>
        </button>

        <div className="cg-plate">
          <div>
            <div className="cg-plate-title">{work.title}</div>
            <div className="cg-plate-sub">{work.artist} · {work.medium}</div>
          </div>
          <span className="cg-chevron" aria-hidden="true">{open ? "–" : "+"}</span>
        </div>

        <div className="cg-drop" data-open={open}>
          <div className="cg-drop-inner">
            <p className="cg-drop-label">Worn on two garments this edition</p>
            <div className="cg-garments">
              <div className="cg-garment">
                <div className="cg-garment-stage"><TeeMockup id={work.id} color="#1b1813" /></div>
                <span className="cg-garment-name">Heavyweight Tee</span>
              </div>
              <div className="cg-garment">
                <div className="cg-garment-stage"><HoodieMockup id={work.id} color="#1b1813" /></div>
                <span className="cg-garment-name">Heavyweight Hoodie</span>
              </div>
            </div>
            <button className="cg-view" onClick={() => go("product", "tee")}>View the pieces</button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CollectionGallery({ go }) {
  return (
    <main className="artist-detail">
      <section className="page-hero">
        <div className="page-hero-bigchar" aria-hidden="true">◈</div>
        <div className="page-hero-inner">
          <div className="page-eyebrow"><span className="l"></span><span className="t">The collection</span></div>
          <h1 className="page-title">Every <em>artwork,</em> and the pieces it became.</h1>
          <p className="page-lead">A gallery wall of the works we've released. Tap any frame and the artwork lifts out, onto the garments it was printed on.</p>
        </div>
      </section>

      <section className="cg-wall">
        <div className="cg-grid">
          {COLLECTION_WORKS.map((w, i) => <CollectionWork key={w.id} work={w} index={i} go={go} />)}
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

Object.assign(window, { CollectionGallery, CollectionWork });

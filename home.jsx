/* ============================================================
   Atelier Limité, Home: gallery hero + wall-to-wardrobe
   ============================================================ */

function Hero({ go }) {
  const e = AL.edition;
  const d1 = usePointerDrift(20), d2 = usePointerDrift(15), d3 = usePointerDrift(17), d4 = usePointerDrift(12);
  const teeRef = usePointerDrift(8);
  return (
    <section className="hero-gallery" data-drift-host>
      <div className="hg-copy">
        <span className="hg-eyebrow"><span className="pip"></span><span className="t">Edition {e.no} · {e.title} · Now open</span></span>
        <h1 className="hg-title">Artists turn their work into <em>limited editions</em> you can wear.</h1>
        <p className="hg-sub">One artist. A numbered run. A certificate in every box, and half of every sale paid back to the maker.</p>
        <div className="hg-actions">
          <Magnetic><button className="btn-primary" onClick={() => go("product")}>Acquire a piece</button></Magnetic>
          <Magnetic><button className="btn-ghost" onClick={() => go("artist", e.artist)}>Meet {e.artist.split(" ")[0]}</button></Magnetic>
        </div>
        <div className="hg-meta">
          <div className="hg-meta-item"><span className="hg-meta-k"><em>{e.size}</em></span><span className="hg-meta-l">Pieces, total</span></div>
          <span className="hg-meta-div"></span>
          <div className="hg-meta-item"><span className="hg-meta-k">50/50</span><span className="hg-meta-l">Split with the artist</span></div>
          <span className="hg-meta-div"></span>
          <div className="hg-meta-item"><span className="hg-meta-k">4</span><span className="hg-meta-l">Editions a year</span></div>
        </div>
      </div>

      <div className="hg-stage">
        <div className="hg-pedestal"></div>
        <div className="float-slot fs1"><div ref={d1} className="float-inner"><FramedArt id="strata" className="on-dark" /></div></div>
        <div className="float-slot fs2"><div ref={d2} className="float-inner"><FramedArt id="coast" className="on-dark" /></div></div>
        <div className="float-slot fs3"><div ref={d3} className="float-inner"><FramedArt id="grid" className="on-dark" /></div></div>
        <div className="float-slot fs4"><div ref={d4} className="float-inner"><FramedArt id="bloom" plate={false} className="on-dark" /></div></div>
        <div className="hg-tee">
          <span className="tee-spot"></span>
          <div ref={teeRef}><TeeMockup id="figure" color="#1A1A18" /></div>
        </div>
      </div>
    </section>
  );
}

function WallToWardrobe() {
  return (
    <section className="w2w">
      <Reveal className="w2w-head">
        <p className="label" style={{ textAlign: "center" }}>The process</p>
        <h2 className="w2w-title">From <em>wall</em> to wardrobe.</h2>
        <p className="w2w-cap">Untitled I &middot; Spray &amp; Stencil</p>
      </Reveal>
      <div className="w2w-track">
        <Reveal className="w2w-step" delay={0}>
          <div className="w2w-stage"><FramedArt id="figure" plate={false} className="on-dark" /></div>
          <div className="w2w-num">Step 01</div>
          <div className="w2w-label">The artwork</div>
          <p className="w2w-desc">An original work by the edition's artist, selected for a wider audience, not a gallery wall.</p>
        </Reveal>
        <div className="w2w-arrow" aria-hidden="true">→</div>
        <Reveal className="w2w-step" delay={120}>
          <div className="w2w-stage">
            <div className="w2w-print"><div className="pwin"><ArtComposition id="figure" /></div><span className="pmark">Ed. 03 · 047/080</span></div>
          </div>
          <div className="w2w-num">Step 02</div>
          <div className="w2w-label">The limited print</div>
          <p className="w2w-desc">Hand screen-printed in a fixed, numbered run on organic cotton, water-based inks, never plastisol.</p>
        </Reveal>
        <div className="w2w-arrow" aria-hidden="true">→</div>
        <Reveal className="w2w-step" delay={240}>
          <div className="w2w-stage"><TeeMockup id="figure" color="#1b1813" /></div>
          <div className="w2w-num">Step 03</div>
          <div className="w2w-label">The wearable piece</div>
          <p className="w2w-desc">A collectable garment, numbered, named, certified, and yours to wear out into the world.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Home({ go, joined, onJoin }) {
  return (
    <main>
      <Hero go={go} />
      <WallToWardrobe />
      <Collection go={go} />
      <ArtistFeature go={go} />
      <HowItWorks />
      <PrivateView joined={joined} onJoin={onJoin} />
    </main>
  );
}

Object.assign(window, { Home, Hero, WallToWardrobe });

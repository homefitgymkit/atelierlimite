/* ============================================================
   Atelier Limité, Home: full-bleed artwork hero + garment beat
   + wall-to-wardrobe
   ============================================================ */

function Hero({ go }) {
  const e = AL.edition;
  const art = ART.figure;
  return (
    <section className="hero-bleed">
      <div className="hero-bleed-art" aria-hidden="true">
        <img src={art.src} alt="" />
      </div>
      <div className="hero-bleed-scrim" aria-hidden="true"></div>
      <div className="hero-bleed-copy">
        <span className="hg-eyebrow"><span className="pip"></span><span className="t">Edition {e.no} · {e.opens}</span></span>
        <h1 className="hg-title">Artists turn their work into <em>limited editions</em> you can wear.</h1>
        <p className="hg-sub">One artist. A numbered run. A certificate in every box, and half of every sale paid back to the maker.</p>
        <div className="hg-actions">
          <button className="btn-primary" onClick={() => go("private")}>Join the private view</button>
        </div>
        <div className="hg-meta">
          <div className="hg-meta-item"><span className="hg-meta-k"><em>{e.no}</em></span><span className="hg-meta-l">First edition</span></div>
          <span className="hg-meta-div"></span>
          <div className="hg-meta-item"><span className="hg-meta-k">50/50</span><span className="hg-meta-l">Split with the artist</span></div>
          <span className="hg-meta-div"></span>
          <div className="hg-meta-item"><span className="hg-meta-k">4</span><span className="hg-meta-l">Editions a year</span></div>
        </div>
      </div>
      <div className="hero-bleed-caption">{art.title} · {art.note}</div>
    </section>
  );
}

/* The same work, on the garment — the beat right after the artwork */
function HeroGarment({ go }) {
  return (
    <section className="hero-garment">
      <Reveal className="hero-garment-stage">
        <TeeMockup id="figure" color="#E8E1D3" />
      </Reveal>
      <Reveal className="hero-garment-copy" delay={120}>
        <p className="label">The same work, worn</p>
        <h2 className="hero-garment-title">From the studio <em>to the street.</em></h2>
        <p className="hero-garment-desc">Hand screen-printed on GOTS-certified organic cotton, numbered piece by piece. The Heavyweight Tee opens with Edition 01 at {alPrice(AL.products[0].price)}.</p>
        <button className="section-see-all" onClick={() => go("product", "tee")}>View the piece</button>
      </Reveal>
    </section>
  );
}

function WallToWardrobe() {
  return (
    <section className="w2w">
      <Reveal className="w2w-head">
        <p className="label" style={{ textAlign: "center" }}>The process</p>
        <h2 className="w2w-title">From <em>wall</em> to wardrobe.</h2>
        <p className="w2w-cap">Shown with a studio study. Edition 01's artwork is revealed at the opening.</p>
      </Reveal>
      <div className="w2w-track">
        <Reveal className="w2w-step" delay={0}>
          <div className="w2w-stage"><FramedArt id="arc" plate={false} className="on-dark" /></div>
          <div className="w2w-num">Step 01</div>
          <div className="w2w-label">The artwork</div>
          <p className="w2w-desc">An original work by the edition's artist, selected for a wider audience, not a gallery wall.</p>
        </Reveal>
        <div className="w2w-arrow" aria-hidden="true">→</div>
        <Reveal className="w2w-step" delay={120}>
          <div className="w2w-stage w2w-tee-stage"><TeeMockup id="arc" color="#E7DFD0" /></div>
          <div className="w2w-num">Step 02</div>
          <div className="w2w-label">The wearable piece</div>
          <p className="w2w-desc">Hand screen-printed on GOTS-certified organic cotton. Water-based inks, a fixed numbered run, the artist's name on every label.</p>
        </Reveal>
        <div className="w2w-arrow" aria-hidden="true">→</div>
        <Reveal className="w2w-step" delay={240}>
          <div className="w2w-stage w2w-cert-stage">
            <div className="w2w-cert">
              <div className="w2w-cert-num">047 / 080</div>
              <div className="w2w-cert-rows">
                <div className="w2w-cert-row"><span>Edition</span><span>No. {AL.edition.no} · First edition</span></div>
                <div className="w2w-cert-row"><span>Artist</span><span>{AL.edition.artist}</span></div>
                <div className="w2w-cert-row"><span>Garment</span><span>Heavyweight Tee · 280gsm</span></div>
                <div className="w2w-cert-row"><span>Status</span><span>Specimen</span></div>
              </div>
              <div className="w2w-cert-seal">AL</div>
            </div>
          </div>
          <div className="w2w-num">Step 03</div>
          <div className="w2w-label">Yours to keep.</div>
          <p className="w2w-desc">Each piece carries a certificate of edition bearing its number. Piece 047 of 080, permanently. The edition closes when the run is acquired.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Home({ go, joined, onJoin }) {
  return (
    <main>
      <Hero go={go} />
      <HeroGarment go={go} />
      <Collection go={go} />
      <FirstArtist go={go} />
      <WallToWardrobe />
      <HowItWorks />
      <PrivateView joined={joined} onJoin={onJoin} />
    </main>
  );
}

Object.assign(window, { Home, Hero, HeroGarment, WallToWardrobe });

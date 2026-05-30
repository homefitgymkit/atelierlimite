/* ============================================================
   Atelier Limité — Storefront UI Kit · App root
   Routes: home · product · article · artists · archive
   ============================================================ */

function Placeholder({ title, note, go }) {
  return (
    <main style={{ background: "var(--surface)", minHeight: "70vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 40px", gap: 18 }}>
      <p className="label label--light">Atelier Limité</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", fontSize: 52, color: "var(--ivory)", lineHeight: 1.05 }}>{title}</h1>
      <p style={{ fontFamily: "var(--serif)", fontSize: 17, color: "rgba(246,243,237,0.4)", maxWidth: 420, lineHeight: 1.7 }}>{note}</p>
      <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => go("home")}>Back to the opening</button>
    </main>
  );
}

function App() {
  const [route, setRoute] = useState("home");
  const [productId, setProductId] = useState("tee");
  const [artistName, setArtistName] = useState(AL.edition.artist);
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  function go(r, arg) {
    if (r === "__openbag") { setBagOpen(true); return; }
    if (r === "product" && arg) setProductId(arg);
    if (r === "artist") setArtistName(arg || AL.edition.artist);
    setBagOpen(false);
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function addToBag(item) {
    const number = String(AL.edition.size - AL.edition.remaining + 1 + bag.length).padStart(3, "0");
    setBag((b) => [...b, { ...item, number }]);
  }
  function removeFromBag(i) { setBag((b) => b.filter((_, idx) => idx !== i)); }
  function checkout() { setBagOpen(false); setRoute("certificate"); }

  const showChrome = route !== "certificate";

  return (
    <div className="app-root grain">
      {showChrome && <Header route={route} go={go} bagCount={bag.length} openBag={() => setBagOpen(true)} />}
      {showChrome && route === "home" && <Ticker />}

      {route === "home" && <Home go={go} joined={joined} onJoin={() => setJoined(true)} />}
      {route === "product" && <Product go={go} productId={productId} onAdd={addToBag} />}
      {route === "article" && <Article go={go} />}
      {route === "about" && <AboutPage go={go} />}
      {route === "work" && <WorkPage go={go} />}
      {route === "private" && <PrivateViewPage go={go} joined={joined} onJoin={() => setJoined(true)} />}
      {route === "artists" && <ArtistsScreen go={go} />}
      {route === "artist" && <ArtistDetail go={go} artistName={artistName} />}
      {route === "archive" && <ArchiveScreen go={go} />}
      {route === "certificate" && <Certificate go={go} items={bag} />}

      {showChrome && <Footer go={go} />}

      <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} items={bag} onRemove={removeFromBag} onCheckout={checkout} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

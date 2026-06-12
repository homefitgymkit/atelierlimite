/* ============================================================
   Atelier Limité, Storefront UI Kit · App root
   Routes: home · product · article · collection · journal ·
           artists · archive · about · work · private
   ============================================================ */

function App() {
  const [route, setRoute] = useState("home");
  const [productId, setProductId] = useState("tee");
  const [articleSlug, setArticleSlug] = useState(AL_JOURNAL[0].slug);
  const [joined, setJoined] = useState(() => {
    try { return localStorage.getItem("al_private_view") === "1"; } catch (e) { return false; }
  });

  function onJoin() {
    setJoined(true);
    try { localStorage.setItem("al_private_view", "1"); } catch (e) {}
  }

  function go(r, arg) {
    if (r === "product" && arg) setProductId(arg);
    if (r === "journal-article") setArticleSlug(arg || AL_JOURNAL[0].slug);
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <div className="app-root grain">
      <Header route={route} go={go} />
      {route === "home" && <EditionLine />}

      {route === "home" && <Home go={go} joined={joined} onJoin={onJoin} />}
      {route === "product" && <Product go={go} productId={productId} joined={joined} onJoin={onJoin} />}
      {route === "article" && <Article go={go} />}
      {route === "about" && <AboutPage go={go} />}
      {route === "work" && <WorkPage go={go} />}
      {route === "journal" && <JournalIndex go={go} />}
      {route === "collection" && <CollectionGallery go={go} />}
      {route === "journal-article" && <JournalArticle go={go} slug={articleSlug} />}
      {route === "private" && <PrivateViewPage go={go} joined={joined} onJoin={onJoin} />}
      {route === "artists" && <ArtistsScreen go={go} />}
      {route === "archive" && <ArchiveScreen go={go} />}

      <Footer go={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

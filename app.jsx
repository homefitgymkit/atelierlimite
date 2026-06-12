/* ============================================================
   Atelier Limité, Storefront UI Kit · App root
   Hash routing — every page is shareable:
     #/  #/piece/tee  #/collection  #/artists  #/journal
     #/journal/:slug  #/editions  #/about  #/work  #/private
     #/archive
   ============================================================ */

function parseHash() {
  const parts = (location.hash || "#/").replace(/^#\/?/, "").split("/").filter(Boolean);
  if (!parts.length) return { route: "home", arg: null };
  switch (parts[0]) {
    case "piece":      return { route: "product", arg: parts[1] || "tee" };
    case "journal":    return parts[1] ? { route: "journal-article", arg: decodeURIComponent(parts[1]) } : { route: "journal", arg: null };
    case "editions":   return { route: "article", arg: null };
    case "collection": case "artists": case "archive":
    case "about": case "work": case "private":
      return { route: parts[0], arg: null };
    default:           return { route: "home", arg: null };
  }
}

function hashFor(route, arg) {
  switch (route) {
    case "home":            return "#/";
    case "product":         return "#/piece/" + (arg || "tee");
    case "journal-article": return "#/journal/" + encodeURIComponent(arg || AL_JOURNAL[0].slug);
    case "article":         return "#/editions";
    default:                return "#/" + route;
  }
}

function titleFor(loc) {
  const base = "Atelier Limité";
  switch (loc.route) {
    case "home":    return base + " · Numbered artist editions · Sydney";
    case "product": {
      const p = AL.products.find((x) => x.id === loc.arg) || AL.products[0];
      return `${p.name} · Edition ${AL.edition.no} · ${base}`;
    }
    case "journal-article": {
      const a = AL_JOURNAL.find((x) => x.slug === loc.arg) || AL_JOURNAL[0];
      return `${a.title} · ${base}`;
    }
    case "article":    return "What are Artist Editions? · " + base;
    case "journal":    return "Journal · " + base;
    case "collection": return "The collection · " + base;
    case "artists":    return "Artists · " + base;
    case "archive":    return "The archive · " + base;
    case "about":      return "About · " + base;
    case "work":       return "Work with us · " + base;
    case "private":    return "Private view list · " + base;
    default:           return base;
  }
}

function App() {
  const [loc, setLoc] = useState(parseHash);
  const [joined, setJoined] = useState(() => {
    try { return localStorage.getItem("al_private_view") === "1"; } catch (e) { return false; }
  });

  useEffect(() => {
    const onHash = () => { setLoc(parseHash()); window.scrollTo({ top: 0, behavior: "auto" }); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => { document.title = titleFor(loc); }, [loc]);

  function onJoin() {
    setJoined(true);
    try { localStorage.setItem("al_private_view", "1"); } catch (e) {}
  }

  function go(r, arg) {
    const h = hashFor(r, arg);
    if (location.hash === h) { window.scrollTo({ top: 0, behavior: "auto" }); return; }
    location.hash = h; /* hashchange listener updates state */
  }

  const route = loc.route;
  const productId = route === "product" ? (loc.arg || "tee") : "tee";
  const articleSlug = route === "journal-article" ? (loc.arg || AL_JOURNAL[0].slug) : AL_JOURNAL[0].slug;

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

/* ============================================================
   Atelier Limité, Storefront · App root
   Path routing (see routes.js); SSR-safe — main.jsx mounts in
   the browser, entry-server.jsx renders per-route for prerender.
   ============================================================ */
import { useState, useEffect } from "react";
import { parsePath, pathFor, titleFor } from "./routes.js";
import { Header, EditionLine, Footer } from "./ui.jsx";
import { AL_JOURNAL } from "./journal-data.jsx";
import { Home } from "./home.jsx";
import { Product } from "./product.jsx";
import { Article } from "./article.jsx";
import { AboutPage } from "./about.jsx";
import { WorkPage, PrivateViewPage } from "./pages.jsx";
import { JournalIndex, JournalArticle } from "./journal.jsx";
import { CollectionGallery } from "./collection.jsx";
import { ArtistsScreen, ArchiveScreen } from "./artists.jsx";

export function App({ ssrPath }) {
  const [loc, setLoc] = useState(() =>
    parsePath(typeof window !== "undefined" ? window.location.pathname : (ssrPath || "/")));
  const [joined, setJoined] = useState(false);

  /* localStorage is read after mount so server and client first paint match */
  useEffect(() => {
    try { if (localStorage.getItem("al_private_view") === "1") setJoined(true); } catch (e) {}
  }, []);

  useEffect(() => {
    const onPop = () => { setLoc(parsePath(location.pathname)); window.scrollTo({ top: 0, behavior: "auto" }); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => { document.title = titleFor(loc); }, [loc]);

  function onJoin() {
    setJoined(true);
    try { localStorage.setItem("al_private_view", "1"); } catch (e) {}
  }

  function go(r, arg) {
    const p = pathFor(r, arg);
    if (location.pathname === p) { window.scrollTo({ top: 0, behavior: "auto" }); return; }
    history.pushState(null, "", p);
    setLoc(parsePath(p));
    window.scrollTo({ top: 0, behavior: "auto" });
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

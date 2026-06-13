/* ============================================================
   Atelier Limité · App root
   Three rooms: the wall (home) · the practice · the list.
   Path routing (routes.js); legacy paths soft-redirect to their
   room. SSR-safe: main.jsx hydrates, entry-server prerenders.
   ============================================================ */
import { useState, useEffect } from "react";
import { parsePath, canonicalFor, titleFor } from "./routes.js";
import { Header, Footer } from "./ui.jsx";
import { AL_JOURNAL } from "./journal-data.jsx";
import { Home } from "./home.jsx";
import { Practice } from "./practice.jsx";
import { TheList } from "./pages.jsx";
import { Product } from "./product.jsx";
import { Article } from "./article.jsx";
import { JournalIndex, JournalArticle } from "./journal.jsx";
import { ArtistsScreen, ArchiveScreen } from "./artists.jsx";

/* a quiet, persistent way back to the list once you've scrolled past
   the hero (hidden on the list itself) */
function PrivateViewTab({ route, go }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.2);
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  if (route === "list") return null;
  return (
    <button className={"pv-tab" + (show ? " is-on" : "")} onClick={() => go("list")} tabIndex={show ? 0 : -1} aria-hidden={!show}>
      Private view
    </button>
  );
}

export function App({ ssrPath }) {
  const [loc, setLoc] = useState(() =>
    parsePath(typeof window !== "undefined" ? window.location.pathname : (ssrPath || "/")));
  const [joined, setJoined] = useState(false);

  /* localStorage is read after mount so server and client first paint match */
  useEffect(() => {
    try { if (localStorage.getItem("al_private_view") === "1") setJoined(true); } catch (e) {}
  }, []);

  /* legacy path → rewrite the URL to the room's canonical path (no reload) */
  useEffect(() => {
    if (loc.redirect) {
      const c = canonicalFor(loc);
      if (location.pathname !== c) history.replaceState(null, "", c);
    }
  }, [loc]);

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
    const p = canonicalFor({ route: r, arg });
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

      {route === "home" && <Home go={go} joined={joined} onJoin={onJoin} />}
      {route === "practice" && <Practice go={go} />}
      {route === "list" && <TheList go={go} joined={joined} onJoin={onJoin} />}
      {route === "product" && <Product go={go} joined={joined} onJoin={onJoin} />}
      {route === "article" && <Article go={go} />}
      {route === "journal" && <JournalIndex go={go} />}
      {route === "journal-article" && <JournalArticle go={go} slug={articleSlug} />}
      {route === "artists" && <ArtistsScreen go={go} />}
      {route === "archive" && <ArchiveScreen go={go} />}

      <Footer go={go} />
      <PrivateViewTab route={route} go={go} />
    </div>
  );
}

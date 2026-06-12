import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app.jsx";

/* Legacy Phase 2 links used hash routes (#/piece/tee); rewrite them
   to real paths so old shares keep working. */
let redirected = false;
if (location.hash && location.hash.startsWith("#/")) {
  let p = location.hash.slice(1);
  if (p !== "/" && !p.endsWith("/")) p += "/";
  history.replaceState(null, "", p);
  redirected = true;
}

const el = document.getElementById("root");
if (!redirected && el.firstElementChild) {
  hydrateRoot(el, <App />);
} else {
  createRoot(el).render(<App />);
}

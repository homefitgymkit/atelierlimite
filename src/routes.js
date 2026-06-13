/* ============================================================
   Atelier Limité · routing helpers (no JSX)
   Path-based routes so every page is a real, prerenderable URL:
     /  /piece/tee/  /collection/  /artists/  /journal/
     /journal/:slug/  /editions/  /about/  /work/  /private/
     /archive/
   ============================================================ */
import { AL } from "./ui.jsx";
import { AL_JOURNAL } from "./journal-data.jsx";

/* Three rooms: the wall (home), the practice, the list.
   Legacy paths still resolve (redirected to a room) so no link breaks:
     /about/ /work/ /artists/        → the practice
     /private/                       → the list
     /collection/                    → the wall (folded into home)
   Secondary destinations kept for the footer: journal, editions, archive,
   and the future-edition preview (piece). */
export function parsePath(pathname) {
  const parts = (pathname || "/").split("/").filter(Boolean).map(decodeURIComponent);
  if (!parts.length) return { route: "home", arg: null };
  switch (parts[0]) {
    case "piece":      return { route: "product", arg: parts[1] || "tee" };
    case "journal":    return parts[1] ? { route: "journal-article", arg: parts[1] } : { route: "journal", arg: null };
    case "editions":   return { route: "article", arg: null };
    case "practice":   return { route: "practice", arg: null };
    case "list":       return { route: "list", arg: null };
    /* legacy → room redirects */
    case "about": case "work": case "artists": return { route: "practice", arg: null, redirect: true };
    case "private":    return { route: "list", arg: null, redirect: true };
    case "collection": return { route: "home", arg: null, redirect: true };
    case "archive":    return { route: "archive", arg: null };
    default:           return { route: "home", arg: null };
  }
}

export function pathFor(route, arg) {
  switch (route) {
    case "home":            return "/";
    case "practice":        return "/practice/";
    case "list":            return "/list/";
    case "product":         return "/piece/" + (arg || "tee") + "/";
    case "journal-article": return "/journal/" + encodeURIComponent(arg || AL_JOURNAL[0].slug) + "/";
    case "article":         return "/editions/";
    default:                return "/" + route + "/";
  }
}

/* canonical URL path for a location (legacy paths point at their room) */
export function canonicalFor(loc) { return pathFor(loc.route, loc.arg); }

export function titleFor(loc) {
  const base = "Atelier Limité";
  switch (loc.route) {
    case "home":    return base + " · A pre-launch gallery for wearable art · Sydney";
    case "product": {
      const p = AL.products.find((x) => x.id === loc.arg) || AL.products[0];
      return `${p.name} · Future edition preview · ${base}`;
    }
    case "journal-article": {
      const a = AL_JOURNAL.find((x) => x.slug === loc.arg) || AL_JOURNAL[0];
      return `${a.title} · ${base}`;
    }
    case "article":    return "What are Artist Editions? · " + base;
    case "journal":    return "Journal · " + base;
    case "practice":   return "The practice · " + base;
    case "list":       return "The list · " + base;
    case "artists":    return "Artists · " + base;
    case "archive":    return "The archive · " + base;
    default:           return base;
  }
}

export function descFor(loc) {
  switch (loc.route) {
    case "product": {
      const p = AL.products.find((x) => x.id === loc.arg) || AL.products[0];
      return `A concept preview of a future Atelier Limité wearable edition (${p.name}). Artist, edition size and price to be confirmed. Join the private view to hear first.`;
    }
    case "journal-article": {
      const a = AL_JOURNAL.find((x) => x.slug === loc.arg) || AL_JOURNAL[0];
      return (a.lead || "").slice(0, 158);
    }
    case "article":    return "An Artist Edition is a fixed, numbered run of garments made with a single artist: a unique number, the artist's name on the label, and a certificate of edition.";
    case "journal":    return "How the editions work: the model, the numbering, the certificate, the way artists are chosen. No marketing, just the record.";
    case "practice":   return "The practice: half of net profit to the artist, full IP retained, numbered editions, permanent closure. The way Atelier Limité intends to work, and an invitation to artists.";
    case "list":       return "The private view list. Be first to follow the studies, the artist conversations, and the first edition, with a 48-hour head start the day it opens.";
    case "artists":    return "Atelier Limité works with one artist per edition: their name on every label, half of every sale, full IP retained.";
    case "archive":    return "Editions move here when they close, permanently. Nothing has closed yet; the first edition will be the first to hang here.";
    default:           return "A pre-launch Sydney gallery for artist-led wearable editions, building its first private audience before Edition 01 exists. One artist per edition, half of net profit to the artist. Join the private view.";
  }
}

/* Prerender the three rooms + secondary destinations. Legacy room paths
   (/about/ /work/ /private/ /collection/) are intentionally not prerendered;
   they soft-redirect to their room via the SPA fallback + app.jsx. */
export const PRERENDER_PATHS = [
  "/", "/practice/", "/list/",
  "/piece/tee/", "/artists/", "/archive/", "/editions/", "/journal/",
  ...AL_JOURNAL.map((a) => `/journal/${a.slug}/`),
];

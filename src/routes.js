/* ============================================================
   Atelier Limité · routing helpers (no JSX)
   Path-based routes so every page is a real, prerenderable URL:
     /  /piece/tee/  /collection/  /artists/  /journal/
     /journal/:slug/  /editions/  /about/  /work/  /private/
     /archive/
   ============================================================ */
import { AL } from "./ui.jsx";
import { AL_JOURNAL } from "./journal-data.jsx";

export function parsePath(pathname) {
  const parts = (pathname || "/").split("/").filter(Boolean).map(decodeURIComponent);
  if (!parts.length) return { route: "home", arg: null };
  switch (parts[0]) {
    case "piece":    return { route: "product", arg: parts[1] || "tee" };
    case "journal":  return parts[1] ? { route: "journal-article", arg: parts[1] } : { route: "journal", arg: null };
    case "editions": return { route: "article", arg: null };
    case "collection": case "artists": case "archive":
    case "about": case "work": case "private":
      return { route: parts[0], arg: null };
    default:         return { route: "home", arg: null };
  }
}

export function pathFor(route, arg) {
  switch (route) {
    case "home":            return "/";
    case "product":         return "/piece/" + (arg || "tee") + "/";
    case "journal-article": return "/journal/" + encodeURIComponent(arg || AL_JOURNAL[0].slug) + "/";
    case "article":         return "/editions/";
    default:                return "/" + route + "/";
  }
}

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
    case "collection": return "The collection · " + base;
    case "artists":    return "Artists · " + base;
    case "archive":    return "The archive · " + base;
    case "about":      return "About · " + base;
    case "work":       return "Work with us · " + base;
    case "private":    return "Private view list · " + base;
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
    case "journal":    return "How the editions actually work: the model, the numbering, the certificate, the way artists are chosen. No marketing, just the record.";
    case "collection": return "The study wall: early studies, garment tests, and visual references, before they become wearable editions. Atelier Limité is pre-launch.";
    case "artists":    return "The roster begins with Edition 01. One artist opens it: their work, their name on every label, and half of every sale.";
    case "archive":    return "Editions move here when they close, permanently. Nothing has closed yet; Edition 01 will be the first.";
    case "about":      return "A wearable gallery built around the artist: 50/50 net profit split, full IP retention, numbered editions, permanent closure. The full FAQ.";
    case "work":       return "For artists: we split net profit 50/50, you keep your IP, we handle production, fulfilment and the gallery. Every submission gets a genuine response.";
    case "private":    return "The founding private view list. Be first to follow the studies, artist conversations, and future wearable editions, before Edition 01 exists.";
    default:           return "A pre-launch Sydney gallery for artist-led wearable editions, building its first private audience before Edition 01 exists. One artist per edition, half of net profit to the artist. Join the private view.";
  }
}

export const PRERENDER_PATHS = [
  "/", "/piece/tee/", "/piece/hoodie/", "/collection/", "/artists/", "/archive/",
  "/about/", "/work/", "/private/", "/editions/", "/journal/",
  ...AL_JOURNAL.map((a) => `/journal/${a.slug}/`),
];

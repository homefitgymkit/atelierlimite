/* Prerender every route into docs/<path>/index.html with its own
   title, description, and canonical URL, plus sitemap.xml and a
   404.html SPA fallback. Run after `vite build` + the SSR build. */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { render, PRERENDER_PATHS, titleFor, descFor, parsePath } from "../dist-ssr/entry-server.js";

const ORIGIN = "https://www.atelierlimite.com";
const template = readFileSync("docs/index.html", "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const path of PRERENDER_PATHS) {
  const loc = parsePath(path);
  const appHtml = render(path);
  const title = titleFor(loc);
  const desc = descFor(loc);
  const canonical = ORIGIN + path;
  let out = template.replace("<!--app-html-->", appHtml);
  out = out.replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`);
  out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  out = out.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  out = out.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  const file = path === "/" ? "docs/index.html" : join("docs", path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
}

/* SPA fallback for unknown paths (GitHub Pages serves 404.html) */
writeFileSync("docs/404.html", template.replace("<!--app-html-->", ""));

/* sitemap + robots */
const urls = PRERENDER_PATHS.map((p) => `  <url><loc>${ORIGIN}${p}</loc></url>`).join("\n");
writeFileSync("docs/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync("docs/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);

console.log(`prerendered ${PRERENDER_PATHS.length} routes + 404 + sitemap`);

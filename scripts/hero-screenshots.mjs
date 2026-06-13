/* ============================================================
   QA: capture the artwork → tee hero at five scroll points,
   on desktop and mobile, into test-results/hero-scroll/.

   Usage:
     npm run dev              # in one terminal (serves :5173)
     npm run test:hero-screenshots
   Override the URL if your dev server is on another port:
     HERO_URL=http://localhost:5180/ npm run test:hero-screenshots

   Uses playwright-core driving your installed Google Chrome —
   no bundled-browser download. Non-destructive: only writes PNGs.
   ============================================================ */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const URL = process.env.HERO_URL || "http://localhost:5173/";
const OUT = "test-results/hero-scroll";
const STEPS = [0, 0.25, 0.5, 0.75, 1];
const HERO_SELECTOR = ".hm, .hero-stage, [data-hero]";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];

mkdirSync(OUT, { recursive: true });

async function launch() {
  try { return await chromium.launch({ channel: "chrome" }); }
  catch { return await chromium.launch(); } /* fall back to a bundled chromium if present */
}

const browser = await launch();
let n = 0;
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor || 1,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    } catch (e) {
      throw new Error(`Could not load ${URL}. Start the dev server first: npm run dev  (or set HERO_URL). ${e.message}`);
    }
    if (!(await page.$(HERO_SELECTOR))) {
      throw new Error(`Hero section not found (selector: ${HERO_SELECTOR}). Is this the home page?`);
    }
    await page.waitForTimeout(500);
    for (const p of STEPS) {
      await page.evaluate(({ p, sel }) => {
        const el = document.querySelector(sel);
        const top = el.getBoundingClientRect().top + window.scrollY;
        const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
        window.scrollTo(0, Math.round(top + p * scrollable));
      }, { p, sel: HERO_SELECTOR });
      await page.waitForTimeout(700); /* let scroll-driven rAF settle */
      const pct = String(Math.round(p * 100)).padStart(3, "0");
      await page.screenshot({ path: `${OUT}/${vp.name}-${pct}.png` });
      n++;
    }
    await ctx.close();
  }
  console.log(`✓ ${n} screenshots → ${OUT}/  (desktop|mobile × 0/25/50/75/100%)`);
} finally {
  await browser.close();
}

/* ============================================================
   Atelier Limité, Artwork library + garment mockups
   Studio-study artwork (assets/art-*.jpg) and, when supplied,
   transparent screen-print PNGs (assets/print-*.png) that sit
   directly on the fabric colour. Gallery frame + tee/hoodie
   mockups with a staged ground and contact shadow.
   Exposes: ART, ArtComposition, FramedArt, TeeMockup, HoodieMockup
   ============================================================ */

/* Transparent screen-print PNGs (print-01…07.png) are in public/assets.
   Interim: keyed from the on-disk studies (paper → transparent so the
   print sits on the fabric); regenerate from the clean supplied art to
   sharpen. The single AL.01 edition mark is drawn by the mockup. */
const PRINTS_READY = true;

/* Artwork registry, id → { title, note, src, print, bg }.
   bg is the painting's dominant ground, used to choose garment
   colour for contrast. Ids are stable; screens reference them. */
const ART = {
  figure: { title: "Study 01", note: "Artwork in preparation", n: "01", src: "/assets/art-01.jpg", print: "/assets/print-01.png", bg: "#DDD5C4" },
  strata: { title: "Study 02", note: "Artwork in preparation", n: "02", src: "/assets/art-02.jpg", print: "/assets/print-02.png", bg: "#171614" },
  coast:  { title: "Study 03", note: "Artwork in preparation", n: "03", src: "/assets/art-03.jpg", print: "/assets/print-03.png", bg: "#E8E2D4" },
  grid:   { title: "Study 04", note: "Artwork in preparation", n: "04", src: "/assets/art-04.jpg", print: "/assets/print-04.png", bg: "#1A1916" },
  bloom:  { title: "Study 05", note: "Artwork in preparation", n: "05", src: "/assets/art-05.jpg", print: "/assets/print-05.png", bg: "#D6CBB4" },
  arc:    { title: "Study 06", note: "Artwork in preparation", n: "06", src: "/assets/art-06.jpg", print: "/assets/print-06.png", bg: "#E5DECE" },
  field:  { title: "Study 07", note: "Artwork in preparation", n: "07", src: "/assets/art-07.jpg", print: "/assets/print-07.png", bg: "#DFD8C6" },
};

const printSrc = (art) => (PRINTS_READY ? art.print : art.src);

/* Raw artwork, fills its container (photo, object-fit cover) */
function ArtComposition({ id, style }) {
  const art = ART[id] || ART.figure;
  return (
    <img src={art.src} alt={art.title + " · studio study"} loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }} />
  );
}

/* Gallery-framed artwork: frame + mat + plate */
function FramedArt({ id, plate = true, className = "", style = {}, onClick }) {
  const art = ART[id] || ART.figure;
  return (
    <figure className={"framed-art " + className} style={style} onClick={onClick}>
      <div className="framed-art-frame">
        <div className="framed-art-mat">
          <div className="framed-art-window">
            <ArtComposition id={id} />
          </div>
        </div>
      </div>
      {plate && (
        <figcaption className="framed-art-plate">
          <span className="fa-title">{art.title}</span>
          <span className="fa-medium">{art.note}</span>
        </figcaption>
      )}
    </figure>
  );
}

function hexLuminance(hex) {
  const h = (hex || "#000").replace("#", "");
  if (h.length < 6) return 0;
  const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/* Shared defs: soft fold gradient, an inset shadow on the print
   (reads as printed ON the fabric), and a garment contact shadow. */
function GarmentDefs({ id, isDark }) {
  return (
    <defs>
      <linearGradient id={"fold-" + id} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity={isDark ? 0.18 : 0.1}/>
        <stop offset="0.5" stopColor="#000" stopOpacity="0"/>
        <stop offset="1" stopColor="#000" stopOpacity={isDark ? 0.18 : 0.1}/>
      </linearGradient>
      {/* inset shadow: art recedes slightly into the fabric */}
      <radialGradient id={"printInset-" + id} cx="0.5" cy="0.5" r="0.72">
        <stop offset="0.6" stopColor="#000" stopOpacity="0"/>
        <stop offset="1" stopColor="#000" stopOpacity="0.22"/>
      </radialGradient>
      <radialGradient id={"contact-" + id} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000" stopOpacity="0.34"/>
        <stop offset="1" stopColor="#000" stopOpacity="0"/>
      </radialGradient>
      <clipPath id={"print-" + id}>
        <rect x="0" y="0" width="100" height="100"/>
      </clipPath>
    </defs>
  );
}

/* The printed artwork zone: the transparent PNG (or JPG stand-in)
   sits directly on the fabric, with a faint inset shadow and the
   single AL.0n edition mark. No floating frame. */
function PrintZone({ id, art, color, isDark, x, y, w, h }) {
  const cx = x + w / 2, cy = y + h / 2;
  return (
    <g>
      <clipPath id={"pz-" + id}><rect x={x} y={y} width={w} height={h}/></clipPath>
      <g clipPath={`url(#pz-${id})`}>
        {/* transparent PNG: only the ink prints, paper reads as bare fabric.
           No overlay rects here, or they'd draw a box on the bare fabric. */}
        <image href={printSrc(art)} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid meet"/>
      </g>
      {PRINTS_READY && (
        <text x={x + w - 3} y={y + h - 3} textAnchor="end"
          fontFamily="Georgia, serif" fontStyle="italic" fontSize="6"
          fill={isDark ? "rgba(245,242,236,0.5)" : "rgba(26,26,24,0.45)"}>AL.01</text>
      )}
    </g>
  );
}

/* Optional staged ground: a Raw-canvas panel behind dark garments
   (so a black silhouette reads) + a garment contact shadow.
   stage: "auto" (canvas behind dark fabric, none behind light) |
   false (no ground, for compositing) */
function Stage({ id, isDark, stage }) {
  const show = stage === true || (stage === "auto" && isDark) || stage === "canvas";
  if (!show) return null;
  return (
    <g>
      <rect x="0" y="0" width="300" height="340" rx="3" fill="var(--canvas)" opacity={isDark ? 1 : 0}/>
      <ellipse cx="150" cy="322" rx="96" ry="15" fill={`url(#contact-${id})`}/>
    </g>
  );
}

/* Contact shadow only (for light fabric on its own ground) */
function ContactShadow({ id }) {
  return <ellipse cx="150" cy="322" rx="96" ry="14" fill={`url(#contact-${id})`}/>;
}

/* ---------------- TEE ---------------- */
function TeeMockup({ id, color = "#1A1A18", className = "", style = {}, printScale = 1, stage = "auto" }) {
  const art = ART[id] || ART.figure;
  const isDark = hexLuminance(color) < 0.5;
  const seam = isDark ? "rgba(245,242,236,0.07)" : "rgba(26,26,24,0.10)";
  const collar = isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.06)";
  const pw = 104 * printScale, ph = 125 * printScale, px = 150 - pw / 2, py = 110;
  return (
    <div className={"tee-mockup " + className} style={style}>
      <svg viewBox="0 0 300 340" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
        <GarmentDefs id={"tee-" + id} isDark={isDark} />
        <Stage id={"tee-" + id} isDark={isDark} stage={stage} />
        {!isDark && stage !== false && <ContactShadow id={"tee-" + id} />}
        {/* body */}
        <path d="M95 60 L60 78 L40 120 L66 138 L78 116 L78 300 Q78 312 90 312 L210 312 Q222 312 222 300 L222 116 L234 138 L260 120 L240 78 L205 60 Q190 84 150 84 Q110 84 95 60 Z"
          fill={color} stroke={seam} strokeWidth="1"/>
        {/* collar */}
        <path d="M95 60 Q150 92 205 60 Q188 70 150 70 Q112 70 95 60 Z" fill={collar}/>
        <path d="M112 66 Q150 84 188 66" fill="none" stroke={seam} strokeWidth="1.4"/>
        {/* fold shading down the body */}
        <rect x="78" y="84" width="144" height="228" fill={`url(#fold-tee-${id})`}/>
        <PrintZone id={"tee-" + id} art={art} color={color} isDark={isDark} x={px} y={py} w={pw} h={ph} />
      </svg>
    </div>
  );
}

/* ---------------- HOODIE ---------------- */
function HoodieMockup({ id, color = "#1A1A18", className = "", style = {}, printScale = 1, stage = "auto" }) {
  const art = ART[id] || ART.figure;
  const isDark = hexLuminance(color) < 0.5;
  const seam = isDark ? "rgba(245,242,236,0.08)" : "rgba(26,26,24,0.12)";
  const hollow = isDark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.16)";
  const rib = isDark ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0.08)";
  const pw = 92 * printScale, ph = 110 * printScale, px = 150 - pw / 2, py = 130;
  return (
    <div className={"tee-mockup hoodie-mockup " + className} style={style}>
      <svg viewBox="0 0 300 340" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
        <GarmentDefs id={"hood-" + id} isDark={isDark} />
        <Stage id={"hood-" + id} isDark={isDark} stage={stage} />
        {!isDark && stage !== false && <ContactShadow id={"hood-" + id} />}

        {/* hood (behind the body) */}
        <path d="M104 64 Q150 30 196 64 Q214 82 210 110 Q150 130 90 110 Q86 82 104 64 Z"
          fill={color} stroke={seam} strokeWidth="1"/>
        {/* hood opening (hollow) */}
        <path d="M114 78 Q150 58 186 78 Q196 96 188 112 Q150 126 112 112 Q104 96 114 78 Z" fill={hollow}/>

        {/* body with set-in sleeves + ribbed hem */}
        <path d="M96 96 L58 114 L38 158 L66 178 L84 152 L84 300 L216 300 L216 152 L234 178 L262 158 L242 114 L204 96 Q150 120 96 96 Z"
          fill={color} stroke={seam} strokeWidth="1"/>
        {/* raglan / shoulder seams */}
        <path d="M96 96 Q120 120 150 122 Q180 120 204 96" fill="none" stroke={seam} strokeWidth="1.2"/>

        {/* ribbed hem */}
        <rect x="84" y="300" width="132" height="14" fill={color} stroke={seam} strokeWidth="1"/>
        {[96,108,120,132,144,156,168,180,192,204].map((rx) => (
          <line key={rx} x1={rx} y1="301" x2={rx} y2="313" stroke={rib} strokeWidth="1"/>
        ))}
        {/* ribbed cuffs at the sleeve ends */}
        <g>
          <path d="M52 120 L38 158 L66 178 L78 150 Z" fill="none" stroke={rib} strokeWidth="0.8"/>
          <line x1="44" y1="150" x2="58" y2="166" stroke={rib} strokeWidth="1"/>
          <line x1="48" y1="142" x2="62" y2="158" stroke={rib} strokeWidth="1"/>
          <path d="M248 120 L262 158 L234 178 L222 150 Z" fill="none" stroke={rib} strokeWidth="0.8"/>
          <line x1="256" y1="150" x2="242" y2="166" stroke={rib} strokeWidth="1"/>
          <line x1="252" y1="142" x2="238" y2="158" stroke={rib} strokeWidth="1"/>
        </g>

        {/* drawstrings */}
        <line x1="138" y1="116" x2="136" y2="168" stroke={seam} strokeWidth="2" strokeLinecap="round"/>
        <line x1="162" y1="116" x2="164" y2="168" stroke={seam} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="136" cy="170" r="2.4" fill={isDark ? "rgba(245,242,236,0.5)" : "rgba(26,26,24,0.4)"}/>
        <circle cx="164" cy="170" r="2.4" fill={isDark ? "rgba(245,242,236,0.5)" : "rgba(26,26,24,0.4)"}/>

        {/* fold shading */}
        <rect x="84" y="120" width="132" height="180" fill={`url(#fold-hood-${id})`}/>

        {/* kangaroo pocket */}
        <path d="M104 238 Q104 234 108 234 L192 234 Q196 234 196 238 L202 286 Q202 292 196 292 L104 292 Q98 292 98 286 Z"
          fill="none" stroke={seam} strokeWidth="1.1"/>
        <line x1="120" y1="236" x2="112" y2="266" stroke={seam} strokeWidth="1"/>
        <line x1="180" y1="236" x2="188" y2="266" stroke={seam} strokeWidth="1"/>

        <PrintZone id={"hood-" + id} art={art} color={color} isDark={isDark} x={px} y={py} w={pw} h={ph} />
      </svg>
    </div>
  );
}

export { ART, ArtComposition, FramedArt, TeeMockup, HoodieMockup };

/* ============================================================
   Atelier Limité, Artwork library + garment mockups
   Photographic studio studies (assets/art-*.jpg, supplied
   11 June 2026), gallery frames, and printable tee/hoodie
   mockups. Real garment photography replaces the mockups in a
   later sprint; the print area already uses the real artwork.
   Exposes: ART, ArtComposition, FramedArt, TeeMockup,
            HoodieMockup → window
   ============================================================ */

/* Artwork registry, id → { title, note, src, bg }.
   bg is the painting's dominant ground, used to pick garment
   colour for contrast. Ids are stable; screens reference them. */
const ART = {
  figure: { title: "Study 01", note: "Artwork in preparation", src: "/assets/art-01.jpg", bg: "#DDD5C4" },
  strata: { title: "Study 02", note: "Artwork in preparation", src: "/assets/art-02.jpg", bg: "#171614" },
  coast:  { title: "Study 03", note: "Artwork in preparation", src: "/assets/art-03.jpg", bg: "#E8E2D4" },
  grid:   { title: "Study 04", note: "Artwork in preparation", src: "/assets/art-04.jpg", bg: "#1A1916" },
  bloom:  { title: "Study 05", note: "Artwork in preparation", src: "/assets/art-05.jpg", bg: "#D6CBB4" },
  arc:    { title: "Study 06", note: "Artwork in preparation", src: "/assets/art-06.jpg", bg: "#E5DECE" },
  field:  { title: "Study 07", note: "Artwork in preparation", src: "/assets/art-07.jpg", bg: "#DFD8C6" },
};

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

/* T-shirt mockup with the artwork printed on the chest */
function hexLuminance(hex) {
  const h = (hex || "#000").replace("#", "");
  if (h.length < 6) return 0;
  const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function TeeMockup({ id, color = "#1A1A18", className = "", style = {}, printScale = 1 }) {
  const art = ART[id] || ART.figure;
  const isDark = hexLuminance(color) < 0.5;
  const seam = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const shade = isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.06)";
  const pw = 104 * printScale, ph = 125 * printScale, px = 150 - pw / 2, py = 108;
  return (
    <div className={"tee-mockup " + className} style={style}>
      <svg viewBox="0 0 300 340" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
        <defs>
          <clipPath id={"tee-print-" + id}>
            <rect x={px} y={py} width={pw} height={ph} rx="2"/>
          </clipPath>
          <linearGradient id={"tee-fold-" + id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.12"/>
            <stop offset="0.5" stopColor="#000" stopOpacity="0"/>
            <stop offset="1" stopColor="#000" stopOpacity="0.12"/>
          </linearGradient>
        </defs>
        {/* body */}
        <path d="M95 60 L60 78 L40 120 L66 138 L78 116 L78 300 Q78 312 90 312 L210 312 Q222 312 222 300 L222 116 L234 138 L260 120 L240 78 L205 60 Q190 84 150 84 Q110 84 95 60 Z"
          fill={color} stroke={seam} strokeWidth="1"/>
        {/* collar */}
        <path d="M95 60 Q150 92 205 60 Q188 70 150 70 Q112 70 95 60 Z" fill={shade}/>
        <path d="M112 66 Q150 84 188 66" fill="none" stroke={seam} strokeWidth="1.4"/>
        {/* fold shading */}
        <rect x="78" y="84" width="144" height="228" fill={`url(#tee-fold-${id})`}/>
        {/* printed artwork photo */}
        <g clipPath={`url(#tee-print-${id})`}>
          <image href={art.src} x={px} y={py} width={pw} height={ph} preserveAspectRatio="xMidYMid slice"/>
          <rect x={px} y={py} width={pw} height={ph} fill={`url(#tee-fold-${id})`} opacity="0.6"/>
        </g>
        <rect x={px} y={py} width={pw} height={ph} rx="2"
          fill="none" stroke={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"} strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

/* Hoodie mockup with the artwork printed on the chest */
function HoodieMockup({ id, color = "#1A1A18", className = "", style = {}, printScale = 1 }) {
  const art = ART[id] || ART.figure;
  const isDark = hexLuminance(color) < 0.5;
  const seam = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
  const shade = isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)";
  const pw = 92 * printScale, ph = 110 * printScale, px = 150 - pw / 2, py = 120;
  return (
    <div className={"tee-mockup " + className} style={style}>
      <svg viewBox="0 0 300 340" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
        <defs>
          <clipPath id={"hood-print-" + id}>
            <rect x={px} y={py} width={pw} height={ph} rx="2"/>
          </clipPath>
          <linearGradient id={"hood-fold-" + id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.14"/>
            <stop offset="0.5" stopColor="#000" stopOpacity="0"/>
            <stop offset="1" stopColor="#000" stopOpacity="0.14"/>
          </linearGradient>
        </defs>
        <path d="M88 74 L54 92 L34 132 L62 152 L78 126 L78 300 Q78 314 92 314 L208 314 Q222 314 222 300 L222 126 L238 152 L266 132 L246 92 L212 74 Q204 96 188 100 L188 116 Q150 132 112 116 L112 100 Q96 96 88 74 Z"
          fill={color} stroke={seam} strokeWidth="1"/>
        <path d="M112 74 Q112 104 150 104 Q188 104 188 74 Q188 92 150 92 Q112 92 112 74 Z" fill={shade}/>
        <path d="M112 100 Q150 118 188 100" fill="none" stroke={seam} strokeWidth="1.4"/>
        <line x1="138" y1="108" x2="136" y2="150" stroke={seam} strokeWidth="1.6"/>
        <line x1="162" y1="108" x2="164" y2="150" stroke={seam} strokeWidth="1.6"/>
        <path d="M104 250 L196 250 L196 292 L104 292 Z" fill="none" stroke={seam} strokeWidth="1"/>
        <rect x="78" y="100" width="144" height="214" fill={`url(#hood-fold-${id})`}/>
        <g clipPath={`url(#hood-print-${id})`}>
          <image href={art.src} x={px} y={py} width={pw} height={ph} preserveAspectRatio="xMidYMid slice"/>
          <rect x={px} y={py} width={pw} height={ph} fill={`url(#hood-fold-${id})`} opacity="0.6"/>
        </g>
        <rect x={px} y={py} width={pw} height={ph} rx="2"
          fill="none" stroke={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"} strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

export { ART, ArtComposition, FramedArt, TeeMockup, HoodieMockup };

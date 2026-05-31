/* ============================================================
   Atelier Limité, Artwork library + T-shirt mockup
   Generative gallery-grade placeholder artworks (swap for real
   art later), gallery frames, and a printable tee mockup.
   Exposes: ART, ArtComposition, FramedArt, TeeMockup → window
   ============================================================ */
const { useState: useStateArt } = React;

/* Muted, gallery-grade accent palette (brighter than the chrome,
   still luxury). Used only inside artworks. */
const ART_PALETTE = {
  ink: "#171612", cream: "#F4EFE6", bone: "#E8E1D3",
  terracotta: "#B0573B", ochre: "#C39A4E", sage: "#76836A",
  slate: "#56697A", bronze: "#B5A28E", plum: "#6E4A52", clay: "#C77E5E",
};

/* Artwork registry, id → { title, medium, palette, render(p) } */
const ART = {
  figure: {
    title: "Untitled I",
    medium: "Spray & stencil",
    bg: "#E7DFD0",
    render: (p) => (
      <g>
        <rect width="100" height="120" fill="#E7DFD0"/>
        <rect x="8" y="8" width="84" height="104" fill="none" stroke="#171612" strokeWidth="0.4" opacity="0.25"/>
        <path d="M50 18 C58 18 62 26 60 34 C72 40 70 64 62 70 L66 104 L56 104 L52 78 L48 78 L44 104 L34 104 L38 70 C30 62 30 40 42 34 C39 26 42 18 50 18 Z" fill="#171612"/>
        <circle cx="50" cy="44" r="11" fill="#B0573B"/>
        <path d="M30 96 L70 96" stroke="#C39A4E" strokeWidth="1.4"/>
        <rect x="44" y="33" width="12" height="3" fill="#E7DFD0" opacity="0.9"/>
      </g>
    ),
  },
  strata: {
    title: "Strata II",
    medium: "Pigment & wax",
    bg: "#EFE7D8",
    render: (p) => (
      <g>
        <rect width="100" height="120" fill="#EFE7D8"/>
        <rect y="14" width="100" height="22" fill="#56697A"/>
        <rect y="36" width="100" height="14" fill="#C39A4E"/>
        <rect y="50" width="100" height="30" fill="#B0573B"/>
        <rect y="80" width="100" height="10" fill="#171612"/>
        <rect y="90" width="100" height="16" fill="#76836A"/>
        <rect x="0" y="0" width="100" height="120" fill="url(#grain-strata)" opacity="0.18"/>
      </g>
    ),
  },
  arc: {
    title: "Meridian",
    medium: "Screenprint",
    bg: "#1C1B17",
    render: (p) => (
      <g>
        <rect width="100" height="120" fill="#1C1B17"/>
        <circle cx="50" cy="58" r="34" fill="none" stroke="#C39A4E" strokeWidth="1.4"/>
        <path d="M16 58 A34 34 0 0 1 84 58" fill="none" stroke="#B0573B" strokeWidth="3"/>
        <circle cx="50" cy="58" r="13" fill="#F4EFE6"/>
        <circle cx="50" cy="58" r="13" fill="none" stroke="#B5A28E" strokeWidth="0.5"/>
        <line x1="50" y1="10" x2="50" y2="106" stroke="#B5A28E" strokeWidth="0.4" opacity="0.5"/>
      </g>
    ),
  },
  grid: {
    title: "Lot 04",
    medium: "Collage & ink",
    bg: "#EDE6D6",
    render: (p) => (
      <g>
        <rect width="100" height="120" fill="#EDE6D6"/>
        <rect x="12" y="16" width="34" height="44" fill="#56697A"/>
        <rect x="50" y="16" width="38" height="22" fill="#C39A4E"/>
        <rect x="50" y="42" width="38" height="18" fill="#171612"/>
        <rect x="12" y="64" width="20" height="40" fill="#B0573B"/>
        <rect x="36" y="64" width="52" height="40" fill="none" stroke="#171612" strokeWidth="0.8"/>
        <circle cx="62" cy="84" r="9" fill="#76836A"/>
      </g>
    ),
  },
  bloom: {
    title: "Bloom (Nocturne)",
    medium: "Ink on cotton",
    bg: "#17181A",
    render: (p) => (
      <g>
        <rect width="100" height="120" fill="#17181A"/>
        <path d="M50 30 C66 34 74 50 68 64 C80 70 78 92 62 92 C58 104 42 104 38 92 C22 92 20 70 32 64 C26 50 34 34 50 30 Z" fill="#6E4A52"/>
        <path d="M50 44 C60 46 64 58 58 68 C52 76 44 74 42 66 C38 56 42 46 50 44 Z" fill="#C77E5E"/>
        <circle cx="50" cy="60" r="5" fill="#F4EFE6"/>
      </g>
    ),
  },
  coast: {
    title: "Coastline",
    medium: "Sumi-e & digital",
    bg: "#F1EADB",
    render: (p) => (
      <g>
        <rect width="100" height="120" fill="#F1EADB"/>
        <path d="M8 40 Q34 28 52 44 T92 44" fill="none" stroke="#171612" strokeWidth="4" strokeLinecap="round"/>
        <path d="M10 64 Q36 54 56 66 T90 62" fill="none" stroke="#56697A" strokeWidth="2.4" strokeLinecap="round"/>
        <circle cx="72" cy="30" r="8" fill="#B0573B"/>
        <path d="M14 88 Q40 80 60 90 T88 86" fill="none" stroke="#171612" strokeWidth="1.2" opacity="0.5"/>
      </g>
    ),
  },
};

const ART_DEFS = (
  <defs>
    <filter id="art-soft"><feGaussianBlur stdDeviation="0.3"/></filter>
    <pattern id="grain-strata" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="none"/>
      <circle cx="1" cy="1" r="0.3" fill="#171612"/>
    </pattern>
  </defs>
);

/* Raw artwork composition, fills its container */
function ArtComposition({ id, style }) {
  const art = ART[id] || ART.figure;
  return (
    <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block", ...style }}>
      {ART_DEFS}
      {art.render(ART_PALETTE)}
    </svg>
  );
}

/* Same artwork as a NESTED <svg> node (no foreignObject), robust everywhere */
function ArtNode({ id, x, y, width, height }) {
  const art = ART[id] || ART.figure;
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice">
      {ART_DEFS}
      {art.render(ART_PALETTE)}
    </svg>
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
          <span className="fa-medium">{art.medium}</span>
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
  const isDark = hexLuminance(color) < 0.5;
  const seam = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const shade = isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.06)";
  return (
    <div className={"tee-mockup " + className} style={style}>
      <svg viewBox="0 0 300 340" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
        <defs>
          <clipPath id={"tee-print-" + id}>
            <rect x={150 - 52 * printScale} y={108} width={104 * printScale} height={125 * printScale} rx="2"/>
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
        {/* printed artwork, nested svg (robust, no foreignObject) */}
        <g clipPath={`url(#tee-print-${id})`}>
          <ArtNode id={id} x={150 - 52 * printScale} y={108} width={104 * printScale} height={125 * printScale} />
        </g>
        <rect x={150 - 52 * printScale} y={108} width={104 * printScale} height={125 * printScale} rx="2"
          fill="none" stroke={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"} strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

/* Hoodie mockup with the artwork printed on the chest */
function HoodieMockup({ id, color = "#1A1A18", className = "", style = {}, printScale = 1 }) {
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
          <ArtNode id={id} x={px} y={py} width={pw} height={ph} />
        </g>
        <rect x={px} y={py} width={pw} height={ph} rx="2"
          fill="none" stroke={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"} strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

Object.assign(window, { ART, ArtComposition, FramedArt, TeeMockup, HoodieMockup });

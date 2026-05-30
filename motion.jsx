/* ============================================================
   Atelier Limité — Motion toolkit
   Scroll reveals · parallax · cursor spotlight · magnetic buttons
   Quiet and eased — never bouncy. Respects reduced-motion.
   ============================================================ */
const { useEffect: useEffectM, useRef: useRefM, useState: useStateM } = React;

const REDUCED = typeof window !== "undefined" &&
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Reveal on scroll — adds .is-in when the element enters the viewport */
function Reveal({ children, delay = 0, y = 22, as = "div", className = "", style = {} }) {
  const ref = useRefM(null);
  const [seen, setSeen] = useStateM(false);
  useEffectM(() => {
    if (REDUCED) { setSeen(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    // safety: never let content stay invisible if the observer doesn't fire
    const t = setTimeout(() => setSeen(true), 1600);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={"reveal " + (seen ? "is-in " : "") + className}
      style={{ transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        opacity: seen ? 1 : 0, transform: seen ? "none" : `translateY(${y}px)`, ...style }}>
      {children}
    </Tag>
  );
}

/* Parallax — translateY proportional to scroll position relative to element center */
function useParallax(speed = 0.12) {
  const ref = useRefM(null);
  useEffectM(() => {
    if (REDUCED) return;
    const el = ref.current; if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [speed]);
  return ref;
}

/* Pointer drift — element floats slightly toward the cursor (for hero panels) */
function usePointerDrift(strength = 14) {
  const ref = useRefM(null);
  useEffectM(() => {
    if (REDUCED) return;
    const el = ref.current; if (!el) return;
    const host = el.closest("[data-drift-host]") || el.parentElement;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = px * strength; ty = py * strength;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      raf = 0;
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(loop);
    };
    host.addEventListener("mousemove", onMove);
    return () => host.removeEventListener("mousemove", onMove);
  }, [strength]);
  return ref;
}

/* Magnetic button — pulls toward the cursor, springs back */
function Magnetic({ children, strength = 0.32, className = "", style = {}, onClick, ...rest }) {
  const ref = useRefM(null);
  useEffectM(() => {
    if (REDUCED) return;
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };
    const reset = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", reset); };
  }, [strength]);
  return (
    <span ref={ref} className={"magnetic " + className} style={{ display: "inline-flex", transition: "transform .4s cubic-bezier(.16,1,.3,1)", ...style }} onClick={onClick} {...rest}>
      {children}
    </span>
  );
}

/* Cursor spotlight — a soft warm glow that follows the pointer. Mount once. */
function CursorSpotlight() {
  const ref = useRefM(null);
  useEffectM(() => {
    if (REDUCED) return;
    const el = ref.current; if (!el) return;
    let raf = 0, tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); };
    const loop = () => {
      raf = 0; cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (REDUCED) return null;
  return <div ref={ref} className="cursor-spotlight" aria-hidden="true"></div>;
}

Object.assign(window, { Reveal, useParallax, usePointerDrift, Magnetic, CursorSpotlight, REDUCED });

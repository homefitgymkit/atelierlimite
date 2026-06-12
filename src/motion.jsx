/* ============================================================
   Atelier Limité, Motion toolkit
   Scroll reveals · parallax · pointer drift
   Quiet and eased, never bouncy. Respects reduced-motion.
   ============================================================ */
import { useEffect as useEffectM, useRef as useRefM, useState as useStateM } from "react";

const REDUCED = typeof window !== "undefined" &&
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Reveal on scroll, adds .is-in when the element enters the viewport */
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

/* Parallax, translateY proportional to scroll position relative to element center */
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

/* Pointer drift, element floats slightly toward the cursor (for hero panels) */
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

export { Reveal, useParallax, usePointerDrift, REDUCED };

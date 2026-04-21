import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;
    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      ticking = false;
      rafId = 0;
    };
    const onScroll = () => {
      if (!ticking) { rafId = requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      // Cancella il rAF pendente: evita accesso a barRef dopo l'unmount
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div ref={barRef} className="h-full transition-none gpu"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #CC0000, #E53030, #C8860A)",
          boxShadow: "0 0 10px hsl(0 100% 40% / 0.7), 0 0 4px hsl(0 100% 40% / 0.4)",
        }} />
    </div>
  );
}

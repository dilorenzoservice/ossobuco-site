import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("[Ossobuco] 404 — path non trovato:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-osso-black flex flex-col items-center justify-center px-4 text-center grain-overlay">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(0 100% 40% / 0.06), transparent 60%)" }}
        aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center">
        <img src="/images/logo.webp" alt="Ossobuco" className="w-16 h-16 rounded-sm object-cover mb-8 opacity-60"
          style={{ border: "1.5px solid hsl(40 85% 41% / 0.2)" }} />

        <p className="text-osso-amber/80 text-xs uppercase tracking-[0.35em] font-body mb-4">
          Errore 404
        </p>

        <h1 className="font-display font-black text-osso-parchment mb-3"
          style={{ fontSize: "clamp(3rem, 10vw, 6rem)", lineHeight: 1 }}>
          Pagina<br />non trovata
        </h1>

        <div className="flex items-center gap-3 my-6" aria-hidden="true">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-osso-amber/30" />
          <svg width="16" height="16" viewBox="0 0 20 20" className="text-osso-amber/40">
            <path d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8Z" fill="currentColor" />
          </svg>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-osso-amber/30" />
        </div>

        <p className="text-osso-parchment/45 text-sm font-body mb-10 max-w-xs leading-relaxed">
          La pagina che cerchi non esiste o è stata spostata.
        </p>

        <a href="/"
          className="inline-flex items-center gap-3 bg-osso-red text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-red-700 transition-colors duration-300 active:scale-[0.97]"
          style={{ boxShadow: "0 4px 25px hsl(0 100% 40% / 0.3)" }}>
          ← Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

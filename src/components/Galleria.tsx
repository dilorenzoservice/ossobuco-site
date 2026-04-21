import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { WA_LINK } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";

type Category = "cibo" | "drink";
type GalleryItem = { src: string; caption_it: string; caption_en: string; category: Category; };

// Foto ridotte: escluse tomahawk, tiramisu, tartare, mr-bacon già usate nei Fantastici 4
// Rimangono solo foto originali non duplicate
const items: GalleryItem[] = [
  { src: "burger-flip.webp",      caption_it: "Il rituale: carne sulla griglia viva",          caption_en: "The ritual: meat on live grill",            category: "cibo" },
  { src: "burger-in-griglia.webp",caption_it: "Fuoco e brace — il cuore di Ossobuco",          caption_en: "Fire and embers — the heart of Ossobuco",    category: "cibo" },
  { src: "mini-burger.webp",       caption_it: "Sliders gourmet — piccoli ma intensi",           caption_en: "Gourmet sliders — small but intense",         category: "cibo" },
  { src: "magnum-pollo.webp",      caption_it: "Magnum croccante di pollo dorato",               caption_en: "Crispy golden chicken magnum",               category: "cibo" },
  { src: "pizza-ossobuco.webp",    caption_it: "Pizza Ossobuco con sfilacci di carne equina",    caption_en: "Ossobuco pizza with pulled horse meat",       category: "cibo" },
  { src: "pizza-prep.webp",        caption_it: "Preparazione artigianale delle nostre pizze",    caption_en: "Artisan pizza preparation",                   category: "cibo" },
  { src: "pizza-sauce.webp",       caption_it: "Spirale di salsa — un gesto d'arte",             caption_en: "Sauce spiral — a gesture of art",             category: "cibo" },
  { src: "carpaccio-vitello.webp", caption_it: "Carpaccio di vitello con scaglie di parmigiano", caption_en: "Veal carpaccio with parmesan shavings",       category: "cibo" },
  { src: "mise-en-place.webp",     caption_it: "Mise en place curata nei dettagli",               caption_en: "Carefully crafted table setting",             category: "cibo" },
  { src: "cocktail.webp",          caption_it: "Cocktail d'autore — mixology creativa",           caption_en: "Signature cocktails — creative mixology",     category: "drink" },
];

const filters = [
  { key: "tutti" as const, labels: { it: "Tutti", en: "All" } },
  { key: "cibo"  as const, labels: { it: "🥩 Cibo", en: "🥩 Food" } },
  { key: "drink" as const, labels: { it: "🍸 Drink", en: "🍸 Drinks" } },
];

export default function Galleria({ lang }: { lang: Lang }) {
  const t = translations[lang].galleria;
  const [activeFilter, setActiveFilter] = useState<"tutti" | Category>("tutti");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activatorRef = useRef<HTMLElement | null>(null);

  const filtered = activeFilter === "tutti" ? items : items.filter(i => i.category === activeFilter);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setLightbox(p => (p !== null && p > 0 ? p - 1 : p)); }, []);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setLightbox(p => (p !== null && p < filtered.length - 1 ? p + 1 : p)); }, [filtered.length]);

  const openLightbox = useCallback((i: number, trigger: HTMLElement) => {
    activatorRef.current = trigger;
    setLightbox(i);
  }, []);

  // Close lightbox when filter changes — prevents stale index on filtered array
  useEffect(() => { setLightbox(null); }, [activeFilter]);

  // Lock body scroll while lightbox is open (prevents background scroll on mobile)
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Auto-focus close button when lightbox opens; return focus when it closes
  useEffect(() => {
    if (lightbox !== null) {
      closeButtonRef.current?.focus();
    } else if (activatorRef.current) {
      activatorRef.current.focus();
      activatorRef.current = null;
    }
  }, [lightbox]);

  // Keyboard: Escape closes, arrows navigate, Tab is trapped inside dialog
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        setLightbox(p => (p !== null && p > 0 ? p - 1 : p));
      } else if (e.key === "ArrowRight") {
        setLightbox(p => (p !== null && p < filtered.length - 1 ? p + 1 : p));
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])")
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, filtered.length]);

  return (
    <section id="galleria" className="relative py-16 md:py-40 bg-slate grain-overlay overflow-hidden"
      aria-label="Galleria fotografica">

      {/* Decorative bg text */}
      <div className="absolute top-8 left-0 right-0 text-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black uppercase tracking-[0.15em]"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)", color: "hsl(0 0% 100% / 0.018)" }}>
          GALLERY
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <SectionHeader label={t.label} title={t.title} dividerClassName="mb-4" />
        <motion.p className="text-osso-parchment/60 text-center text-sm md:text-base mb-8 md:mb-12 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          {t.sub}
        </motion.p>

        {/* Filters */}
        <motion.div className="flex justify-center gap-2 mb-10 md:mb-14 flex-wrap"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {filters.map(f => (
            <button key={f.key} type="button" onClick={() => setActiveFilter(f.key)}
              aria-pressed={activeFilter === f.key}
              className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 ${
                activeFilter === f.key
                  ? "bg-osso-red text-white shadow-lg shadow-red-900/30"
                  : "text-osso-parchment/50 warm-border hover:text-osso-parchment hover:border-osso-amber/30"
              }`}>
              {f.labels[lang]}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {filtered.map((item, i) => (
              <motion.div key={item.src} layout
                className="break-inside-avoid group relative overflow-hidden rounded-sm cursor-pointer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => openLightbox(i, e.currentTarget as HTMLElement)}
                role="button" tabIndex={0}
                aria-label={lang === "it" ? item.caption_it : item.caption_en}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(i, e.currentTarget as HTMLElement);
                  }
                }}>
                <img src={`/images/${item.src}`}
                  alt={lang === "it" ? item.caption_it : item.caption_en}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy" decoding="async" />
                {/* Caption overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}>
                  <p className="text-osso-parchment text-xs font-medium px-4 pb-4 leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {lang === "it" ? item.caption_it : item.caption_en}
                  </p>
                </div>
                {/* Corner amber accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-osso-amber/0 group-hover:border-osso-amber/50 transition-[border-color] duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-osso-amber/0 group-hover:border-osso-amber/50 transition-[border-color] duration-500" />
                {/* Red vignette on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px hsl(0 100% 40% / 0.08)" }} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <motion.div className="relative z-10 text-center mt-14 md:mt-16"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.15 }}>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-osso-red text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-red-700 transition-colors duration-300 active:scale-[0.97]"
          style={{ boxShadow: "0 4px 25px hsl(0 100% 40% / 0.3)" }}>
          {t.cta}
        </a>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 cursor-pointer"
            style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog" aria-modal="true"
            aria-label={lang === "it" ? "Visualizzatore immagini" : "Image viewer"}>

            <motion.div ref={dialogRef}
              className="relative max-w-5xl w-full flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}>

              <img src={`/images/${filtered[lightbox].src}`}
                alt={lang === "it" ? filtered[lightbox].caption_it : filtered[lightbox].caption_en}
                className="w-full max-h-[80vh] object-contain rounded-sm"
                style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }} />
              <p className="text-osso-parchment/60 text-sm text-center mt-5 font-display italic px-4" aria-live="polite">
                {lang === "it" ? filtered[lightbox].caption_it : filtered[lightbox].caption_en}
              </p>

              <button ref={closeButtonRef} type="button"
                onClick={closeLightbox}
                aria-label={lang === "it" ? "Chiudi visualizzatore" : "Close viewer"}
                className="absolute -top-3 -right-3 w-10 h-10 bg-osso-charcoal text-osso-parchment rounded-full flex items-center justify-center hover:bg-osso-red transition-colors active:scale-95 shadow-xl">
                <X size={15} aria-hidden="true" />
              </button>

              {lightbox > 0 && (
                <button type="button" onClick={prev}
                  aria-label={lang === "it" ? "Foto precedente" : "Previous photo"}
                  className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-11 h-11 bg-osso-charcoal/80 text-osso-parchment rounded-full flex items-center justify-center hover:bg-osso-red transition-colors active:scale-95">
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
              )}
              {lightbox < filtered.length - 1 && (
                <button type="button" onClick={next}
                  aria-label={lang === "it" ? "Foto successiva" : "Next photo"}
                  className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-11 h-11 bg-osso-charcoal/80 text-osso-parchment rounded-full flex items-center justify-center hover:bg-osso-red transition-colors active:scale-95">
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              )}

              <p className="text-osso-parchment/45 text-xs mt-3 tracking-widest" aria-live="polite">
                {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

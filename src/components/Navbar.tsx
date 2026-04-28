import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { WA_LINK } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";

interface Props { lang: Lang; setLang: (l: Lang) => void; }

const FlagIT = () => (
  <svg viewBox="0 0 16 12" className="w-4 h-3 flex-shrink-0" aria-hidden="true">
    <rect width="16" height="12" fill="#CE2B37"/>
    <rect width="10.67" height="12" fill="#FFFFFF"/>
    <rect width="5.33" height="12" fill="#009246"/>
  </svg>
);

const FlagGB = () => (
  <svg viewBox="0 0 16 12" className="w-4 h-3 flex-shrink-0" aria-hidden="true">
    <rect width="16" height="12" fill="#012169"/>
    <path d="M0,0 L16,12 M16,0 L0,12" stroke="#FFFFFF" strokeWidth="2.4"/>
    <path d="M0,0 L16,12 M16,0 L0,12" stroke="#C8102E" strokeWidth="1.6"/>
    <path d="M8,0 V12 M0,6 H16" stroke="#FFFFFF" strokeWidth="4"/>
    <path d="M8,0 V12 M0,6 H16" stroke="#C8102E" strokeWidth="2.4"/>
  </svg>
);

function LangSwitcher({ lang, setLang, size = "md" }: { lang: Lang; setLang: (l: Lang) => void; size?: "sm" | "md" }) {
  const px = size === "sm" ? "px-1.5 py-1" : "px-2 py-1.5";
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";
  return (
    <div className="flex items-center gap-0.5 rounded-sm overflow-hidden" style={{ border: "1px solid hsl(40 85% 41% / 0.15)" }}>
      <button
        onClick={() => setLang("it")}
        aria-label="Italiano"
        aria-pressed={lang === "it"}
        className={`${px} font-bold transition-all duration-200 flex items-center gap-1.5 ${lang === "it" ? "bg-osso-red" : "hover:bg-white/5"}`}
      >
        <FlagIT />
        <span className={`${textSize} uppercase tracking-wider ${lang === "it" ? "text-white" : "text-osso-parchment/50"}`}>IT</span>
      </button>
      <button
        onClick={() => setLang("en")}
        aria-label="English"
        aria-pressed={lang === "en"}
        className={`${px} font-bold transition-all duration-200 flex items-center gap-1.5 ${lang === "en" ? "bg-osso-red" : "hover:bg-white/5"}`}
      >
        <FlagGB />
        <span className={`${textSize} uppercase tracking-wider ${lang === "en" ? "text-white" : "text-osso-parchment/50"}`}>EN</span>
      </button>
    </div>
  );
}

export default function Navbar({ lang, setLang }: Props) {
  const t = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (!el) return;
      try {
        el.scrollIntoView({ behavior: "smooth" });
      } catch {
        el.scrollIntoView();
      }
    }, 50);
  }, []);

  const NAV_ITEMS = [
    { label: t.chiSiamo, href: "#chi-siamo" },
    { label: t.fantastici, href: "#fantastici" },
    { label: t.menu, href: "#menu" },
    { label: t.galleria, href: "#galleria" },
    { label: t.recensioni, href: "#recensioni" },
    { label: t.contatti, href: "#contatti" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-osso-black/95 backdrop-blur-md py-3" : "bg-transparent py-5"}`}
      style={scrolled ? { boxShadow: "0 1px 0 hsl(40 85% 41% / 0.1)" } : {}}
      aria-label="Navigazione principale"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3" aria-label="Ossobuco — torna in cima">
          <img src="/images/logo.webp" alt="Ossobuco"
            className="w-9 h-9 rounded-sm object-cover"
            width={36} height={36}
            loading="eager" decoding="async"
            style={{ border: "1.5px solid hsl(40 85% 41% / 0.25)" }} />
          <span className="font-display text-osso-parchment text-sm font-bold tracking-wide hidden sm:block">OSSOBUCO</span>
        </a>

        {/* Desktop nav links — visibili solo da md in su */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}
                className="text-osso-parchment/60 hover:text-osso-parchment text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-osso-amber after:transition-all after:duration-300 hover:after:w-full">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right: lang + CTA — SEMPRE visibile su md+ */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} size="md" />
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="bg-osso-red text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-red-700 transition-colors duration-300 active:scale-[0.97]">
            {t.prenota}
          </a>
        </div>

        {/* Mobile right: lang + hamburger — SEMPRE visibile su mobile */}
        <div className="flex md:hidden items-center gap-2">
          <LangSwitcher lang={lang} setLang={setLang} size="sm" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="text-osso-parchment p-2 active:scale-95"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div id="mobile-menu" className="md:hidden bg-osso-black/98 backdrop-blur-md"
          style={{ borderTop: "1px solid hsl(40 85% 41% / 0.1)" }}>
          <ul className="flex flex-col items-center gap-6 list-none m-0 p-0 py-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-osso-parchment/80 text-sm font-semibold tracking-[0.15em] uppercase hover:text-osso-red transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="bg-osso-red text-white px-7 py-3 font-bold uppercase tracking-[0.15em] text-sm rounded-sm hover:bg-red-700 transition-colors mt-2 inline-block">
                {t.prenota}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

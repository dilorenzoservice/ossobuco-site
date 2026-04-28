import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { Lang } from "@/i18n";

const CONSENT_KEY = "ossobuco_cookie_consent";

const copy = {
  it: {
    title: "Questo sito utilizza cookie",
    body: "Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo consenso, cookie di terze parti (Google Maps). Puoi accettare tutti i cookie o scegliere di usare solo quelli necessari.",
    accept: "Accetta tutti",
    minimal: "Solo necessari",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
  },
  en: {
    title: "This site uses cookies",
    body: "We use technical cookies required for the site to work and, with your consent, third-party cookies (Google Maps). You can accept all cookies or choose to use only the necessary ones.",
    accept: "Accept all",
    minimal: "Necessary only",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
  },
} as const;

export default function CookieBanner({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleMinimal = () => {
    localStorage.setItem(CONSENT_KEY, "minimal");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label={t.title}
          className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 md:pb-6 pointer-events-none"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
        >
          <div
            className="pointer-events-auto mx-auto max-w-2xl rounded-sm px-5 py-5 md:px-7 md:py-5"
            style={{
              background: "hsl(0 0% 7% / 0.97)",
              border: "1px solid hsl(40 85% 41% / 0.18)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 -4px 40px rgba(0,0,0,0.6), 0 0 0 1px hsl(40 85% 41% / 0.06)",
            }}
          >
            {/* Top row: title + links */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
              <p className="font-display font-bold text-osso-parchment text-sm tracking-wide">
                {t.title}
              </p>
              <div className="flex items-center gap-3">
                <Link to="/privacy"
                  className="text-osso-amber/60 hover:text-osso-amber text-[10px] uppercase tracking-[0.15em] transition-colors underline underline-offset-2">
                  {t.privacy}
                </Link>
                <span className="text-osso-parchment/20 text-[10px]">·</span>
                <Link to="/cookie"
                  className="text-osso-amber/60 hover:text-osso-amber text-[10px] uppercase tracking-[0.15em] transition-colors underline underline-offset-2">
                  {t.cookie}
                </Link>
              </div>
            </div>

            {/* Body text */}
            <p className="text-osso-parchment/55 text-xs leading-relaxed font-body mb-4">
              {t.body}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 sm:flex-none bg-osso-red text-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-red-700 transition-colors duration-300 active:scale-[0.97]"
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={handleMinimal}
                className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-colors duration-300 active:scale-[0.97] text-osso-amber/80 hover:text-osso-amber hover:bg-osso-amber/5"
                style={{ border: "1px solid hsl(40 85% 41% / 0.25)" }}
              >
                {t.minimal}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

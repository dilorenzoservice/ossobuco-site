import { motion } from "framer-motion";
import RusticDivider from "./RusticDivider";
import { WA_LINK_BARE, INSTAGRAM, TIKTOK } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";

const CREDIT_URL = "https://www.ignisdilor.it";

export default function Footer({ lang }: { lang: Lang }) {
  const t = translations[lang].footer;
  return (
    <footer className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(0 0% 5%) 0%, hsl(0 0% 3%) 100%)" }}>

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(40 85% 41% / 0.25), transparent)" }} />

      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black uppercase"
          style={{ fontSize: "clamp(4rem, 18vw, 14rem)", color: "hsl(0 0% 100% / 0.012)", letterSpacing: "-0.02em" }}>
          OSSOBUCO
        </span>
      </div>

      <div className="grain-overlay">
        <div className="relative z-10 container mx-auto px-4 py-14 md:py-20 text-center">

          {/* Logo */}
          <motion.div className="inline-block mb-5 md:mb-6"
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-sm blur-xl opacity-20"
                style={{ background: "radial-gradient(circle, #CC0000, transparent 70%)", transform: "scale(1.3)" }} />
              <img src="/images/logo.webp" alt="Ossobuco Steakhouse & Restaurant"
                className="relative w-16 h-16 rounded-sm object-cover mx-auto"
                style={{ border: "1.5px solid hsl(40 85% 41% / 0.3)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                loading="lazy" />
            </div>
          </motion.div>

          <motion.p className="font-display text-osso-parchment/60 text-xl italic mb-2"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            {t.tagline}
          </motion.p>

          <motion.p className="text-osso-parchment/45 text-xs uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            Cerignola, Puglia · Italy
          </motion.p>

          <RusticDivider className="mb-10" />

          {/* Social icons */}
          <motion.nav aria-label="Social media" className="flex items-center justify-center gap-6 md:gap-8 mb-10"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {[
              { href: INSTAGRAM, label: "Instagram", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
              { href: TIKTOK, label: "TikTok", icon: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/> },
              { href: WA_LINK_BARE, label: "WhatsApp", icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/> },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="group text-osso-parchment/50 hover:text-osso-red transition-colors duration-300 active:scale-95">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-osso-red/10"
                  style={{ border: "1px solid hsl(40 85% 41% / 0.1)" }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">{icon}</svg>
                </div>
              </a>
            ))}
          </motion.nav>

          {/* Info */}
          <motion.div className="space-y-2 mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
            <address className="not-italic space-y-2">
              <p className="text-osso-parchment/45 text-xs tracking-wider">Viale Giuseppe Di Vittorio 31 — 71042 Cerignola (FG), Puglia</p>
              <p className="text-osso-parchment/45 text-xs tracking-wider">+39 348 435 1871 &nbsp;·&nbsp; 0885 325669</p>
            </address>
            <p className="text-osso-parchment/35 text-xs tracking-wider pt-3">{t.copy}</p>
          </motion.div>

          {/* Credit */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <a href={CREDIT_URL} target="_blank" rel="noopener noreferrer"
              className="text-osso-parchment/30 hover:text-osso-parchment/60 text-[11px] tracking-[0.12em] transition-colors duration-300 inline-flex items-center gap-1.5">
              <span className="w-4 h-px bg-current opacity-50" />
              {t.credit} <span className="underline underline-offset-2">www.ignisdilor.it</span>
              <span className="w-4 h-px bg-current opacity-50" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

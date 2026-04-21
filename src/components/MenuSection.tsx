import { motion } from "framer-motion";
import RusticDivider from "./RusticDivider";
import { translations, type Lang } from "@/i18n";

export default function MenuSection({ lang }: { lang: Lang }) {
  const t = translations[lang].menu;

  return (
    <section id="menu" className="relative py-16 md:py-44 overflow-hidden bg-ember grain-overlay"
      aria-label={lang === "it" ? "Il nostro menu" : "Our menu"}>

      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black uppercase text-[18vw] leading-none"
          style={{ color: "hsl(0 100% 40% / 0.03)", letterSpacing: "-0.02em" }}>
          MENU
        </span>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(40 85% 41%), transparent 70%)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #CC0000, transparent 70%)" }} />

      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">

        <motion.p className="text-osso-amber/90 text-sm uppercase tracking-[0.3em] font-medium mb-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t.label}
        </motion.p>

        <motion.h2 className="font-display font-black text-osso-parchment mb-4"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          {t.title}
        </motion.h2>

        <RusticDivider className="mb-8" />

        <motion.p className="text-osso-parchment/60 text-lg md:text-xl mb-10 md:mb-16 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {t.sub}
        </motion.p>

        {/* CTA button */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.35 }}>
          <a href="/menu.pdf" target="_blank" rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-8 py-4 md:px-12 md:py-5 text-sm font-bold uppercase tracking-[0.25em] rounded-sm active:scale-[0.97] overflow-hidden"
            style={{ border: "1.5px solid hsl(40 85% 41% / 0.45)", color: "#C8860A" }}>
            <span className="absolute inset-0 bg-osso-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-osso-black"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="relative z-10 group-hover:text-osso-black transition-colors duration-300">{t.cta}</span>
          </a>
          <p className="text-osso-parchment/35 text-xs font-body mt-4 tracking-wider">{t.ctaNote}</p>
        </motion.div>

      </div>
    </section>
  );
}

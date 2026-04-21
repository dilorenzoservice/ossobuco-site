import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RusticDivider from "./RusticDivider";
import { WA_LINK, MAPS_LINK, MAPS_EMBED } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";

export default function Contatti({ lang }: { lang: Lang }) {
  const t = translations[lang].contatti;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const info = [
    { icon: "📍", label: t.indirizzo, value: "Viale Giuseppe Di Vittorio 31, Cerignola (FG)", href: MAPS_LINK },
    { icon: "🕐", label: t.orari, value: t.orariVal },
    { icon: "📱", label: t.cell, value: "+39 348 435 1871", href: "tel:+393484351871" },
    { icon: "☎️", label: t.fisso, value: "0885 325669", href: "tel:0885325669" },
  ];

  return (
    <section ref={sectionRef} id="contatti" className="relative py-16 md:py-36 overflow-hidden" aria-label="Contatti e prenotazioni">
      <motion.div className="absolute inset-0" style={{ y: bgY }} aria-hidden="true">
        <img src="/images/burger-in-griglia.webp" alt="" className="w-full h-full object-cover scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />
      </motion.div>
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.p className="text-osso-amber/90 text-sm uppercase tracking-[0.3em] font-medium text-center mb-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{t.label}</motion.p>
        <motion.h2 className="font-display font-black text-osso-parchment text-center mb-3"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          {t.title}
        </motion.h2>
        <RusticDivider className="mb-14" />
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div className="space-y-5 md:space-y-7" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <dl className="space-y-5 md:space-y-7">
            {info.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-xl w-8 flex-shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                <div>
                  <dt className="text-osso-amber/90 text-xs uppercase tracking-[0.2em] font-medium mb-1">{item.label}</dt>
                  <dd className="text-osso-parchment/85 text-base leading-snug">
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-osso-red transition-colors">{item.value}</a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
            </dl>
            <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6 bg-osso-red text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-red-700 transition-all duration-300 active:scale-[0.97]"
              style={{ boxShadow: "0 4px 30px hsl(0 100% 40% / 0.3)" }}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
              <span className="text-lg" aria-hidden="true">💬</span>{t.cta}
            </motion.a>
            <motion.p
              className="text-osso-parchment/45 text-xs font-body mt-3 leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.45 }}>
              {t.ctaNote}
            </motion.p>
          </motion.div>
          <motion.div className="w-full h-[320px] md:h-[420px] rounded-sm overflow-hidden warm-border"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <iframe src={MAPS_EMBED} width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Ossobuco Steakhouse & Restaurant — Cerignola (FG)" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

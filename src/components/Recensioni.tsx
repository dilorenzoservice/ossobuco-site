import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { GOOGLE_REVIEWS, DELIVEROO_LINK } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";

const reviews = [
  { name: "Matteo Russo", initials: "MR", time: "7 mesi fa",
    text: "Se Cerignola cercasse un punto di riferimento per chi desidera gustare piatti raffinati, accoglienti e pieni di gusto, Ossobuco sarebbe quello perfetto. Oltre al personale e all'accoglienza, davvero impeccabile anche l'ambiente e il locale." },
  { name: "Rosaria Manduano", initials: "RM", time: "un anno fa",
    text: "Siamo rimasti davvero tutti soddisfatti. Il servizio è veloce e cortese. Gianni è un perfetto padrone di casa. La carne è di ottima qualità, vasta scelta tra carni locali, italiane ed estere. Rapporto qualità prezzo imbattibile." },
  { name: "Francesca Ferraro", initials: "FF", time: "8 mesi fa",
    text: "Servizio impeccabile e cibo buonissimo: dagli antipasti, alla carne, pizza e panini, ingredienti di altissima qualità. Anche i dolci erano tutti buonissimi. Non vediamo l'ora di ritornarci." },
  { name: "Giosef Cannone", initials: "GC", time: "1 mese fa",
    text: "Un'esperienza fantastica. Cibo ottimo e variegato. Buonissimo il magnum alla carne. Carne di prima scelta buonissima e tenerissima. Servizio ottimo, ambiente spaziosissimo. Consiglio a tutti vivamente." },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Recensioni({ lang }: { lang: Lang }) {
  const t = translations[lang].recensioni;

  return (
    <section id="recensioni" className="relative py-16 md:py-40 overflow-hidden bg-burn grain-overlay"
      aria-label="Recensioni clienti">

      {/* Decorative bg */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-display font-black"
          style={{ fontSize: "clamp(5rem, 20vw, 16rem)", color: "hsl(0 0% 100% / 0.018)", writingMode: "vertical-rl" }}>
          ★★★★★
        </span>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #CC0000, transparent 70%)" }} />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <SectionHeader label={t.label} title={t.title} dividerClassName="mb-8" />

        {/* Aggregate rating */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <div className="flex gap-0.5" role="img" aria-label="4.8 stelle su 5">
            {Array(5).fill(0).map((_, j) => <Star key={j} size={16} aria-hidden="true" className="text-osso-amber fill-osso-amber" />)}
          </div>
          <p className="font-display text-2xl font-bold text-osso-parchment leading-none">4.8</p>
          <p className="text-osso-parchment/60 text-sm font-body">· 200+ {t.aggregateLabel}</p>
        </motion.div>

        {/* Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto list-none m-0 p-0">
          {reviews.map((r, i) => (
            <li key={i}>
            <motion.article
              className="relative rounded-sm p-5 md:p-7 overflow-hidden group card-lift"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 10%) 0%, hsl(0 3% 8%) 100%)",
                border: "1px solid hsl(40 85% 41% / 0.1)",
                borderTop: "2px solid #CC0000",
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}>

              {/* Large decorative quote */}
              <span className="absolute -top-2 right-4 font-display select-none pointer-events-none"
                style={{ fontSize: "5rem", lineHeight: 1, color: "hsl(0 100% 40% / 0.07)" }} aria-hidden="true">
                "
              </span>

              {/* Stars + time */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5" role="img" aria-label="5 stelle su 5">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={13} aria-hidden="true" className="text-osso-amber fill-osso-amber" />)}
                </div>
                <span className="text-osso-parchment/45 text-xs font-body tracking-wide">{r.time}</span>
              </div>

              <p className="text-osso-parchment/65 text-sm leading-relaxed mb-6 font-body italic">"{r.text}"</p>

              <div className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid hsl(40 85% 41% / 0.07)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: "hsl(0 100% 40% / 0.12)", border: "1px solid hsl(0 100% 40% / 0.2)", color: "#CC0000" }}>
                  {r.initials}
                </div>
                <div>
                  <span className="text-osso-parchment font-semibold text-sm block">{r.name}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <GoogleIcon />
                    <span className="text-osso-parchment/30 text-xs">Google · 5/5</span>
                  </div>
                </div>
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, transparent, hsl(40 85% 41% / 0.35), transparent)" }} />
            </motion.article>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <motion.div className="text-center mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-osso-amber px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-osso-amber/10 transition-all active:scale-[0.97] card-lift"
            style={{ border: "1.5px solid hsl(40 85% 41% / 0.5)" }}>
            <GoogleIcon />
            {t.cta}
          </a>
          <a href={DELIVEROO_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm text-sm font-semibold transition-all hover:bg-[#00CCBC]/10 active:scale-[0.97] card-lift"
            style={{ border: "1.5px solid #00CCBC", color: "#00CCBC" }}>
            🛵 {t.deliveroo}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

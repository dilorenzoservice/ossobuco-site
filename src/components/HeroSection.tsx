import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RusticDivider from "./RusticDivider";
import { WA_LINK } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";

const HEADLINE_LINE1 = "LOVE AT";
const HEADLINE_LINE2 = "FIRST CUT";

export default function HeroSection({ lang, ready = false }: { lang: Lang; ready?: boolean }) {
  const t = translations[lang].hero;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Le animazioni partono solo quando ready=true (intro completata).
  // Senza questo, l'Hero anima mentre è visibility:hidden — l'utente
  // non vede mai le entrance animation e trova tutto già nel posto finale.
  const animState = ready ? "visible" : "hidden";

  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.8, delay: 0.1 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section ref={sectionRef} id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Ossobuco Steakhouse & Restaurant">

      {/* Parallax background */}
      <motion.div className="absolute inset-0 gpu" style={{ y: bgY }} aria-hidden="true">
        <img src="/images/interior-01.webp"
          alt="Sala del ristorante Ossobuco con insegna Love at First Cut"
          className="w-full h-full object-cover scale-110"
          fetchPriority="high" decoding="sync" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.75) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      </motion.div>

      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto" style={{ y: textY, opacity }}>

        {/* Logo */}
        <motion.div className="relative inline-block mb-5 md:mb-7"
          initial="hidden" animate={animState}
          variants={{
            hidden: { opacity: 0, scale: 0.7, filter: "blur(12px)" },
            visible: { opacity: 1, scale: 1, filter: "blur(0px)",
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}>
          <div className="absolute inset-0 rounded-sm blur-2xl opacity-40"
            style={{ background: "radial-gradient(circle, #CC0000, transparent 70%)", transform: "scale(1.5)" }} />
          <img src="/images/logo.webp" alt="Logo Ossobuco Steakhouse"
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-sm object-cover"
            style={{ boxShadow: "0 0 40px hsl(0 100% 40% / 0.4), 0 0 80px hsl(0 100% 40% / 0.15)", border: "1.5px solid hsl(40 85% 41% / 0.35)" }} />
        </motion.div>

        <motion.div
          initial="hidden" animate={animState}
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1,
              transition: { duration: 0.8, delay: 0.15 } },
          }}>
          <RusticDivider className="mb-6" />
        </motion.div>

        {/* Headline — two lines, never wraps */}
        <h1 className="font-display font-black text-osso-parchment tracking-tight leading-[0.9]"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
          aria-label="Love at First Cut">

          {/* Line 1 */}
          <motion.span className="block whitespace-nowrap"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)" }}
            custom={0} variants={lineVariants} initial="hidden" animate={animState}>
            {HEADLINE_LINE1}
          </motion.span>

          {/* Line 2 */}
          <motion.span className="block whitespace-nowrap"
            style={{ fontSize: "clamp(2.8rem, 10vw, 7rem)" }}
            custom={1} variants={lineVariants} initial="hidden" animate={animState}>
            {HEADLINE_LINE2}
          </motion.span>
        </h1>

        <motion.p className="font-display italic text-lg md:text-2xl mt-4 md:mt-6 tracking-wide shimmer-text"
          initial="hidden" animate={animState}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0,
              transition: { duration: 0.7, delay: 0.46 } },
          }}>
          {t.sub}
        </motion.p>

        <motion.p className="font-body text-osso-parchment/45 text-xs md:text-sm uppercase tracking-[0.35em] mt-2"
          initial="hidden" animate={animState}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1,
              transition: { duration: 0.7, delay: 0.6 } },
          }}>
          {t.location}
        </motion.p>

        <motion.div
          initial="hidden" animate={animState}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0,
              transition: { duration: 0.7, delay: 0.75 } },
          }}
          className="mt-8 md:mt-12">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-osso-red text-white px-9 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-red-700 active:scale-[0.97]"
            style={{ boxShadow: "0 4px 25px hsl(0 100% 40% / 0.35)" }}>
            <span className="text-lg group-hover:scale-110 transition-transform duration-200" aria-hidden="true">🥩</span>
            {t.cta}
          </a>
          <p className="text-osso-parchment/55 text-[11px] uppercase tracking-[0.22em] mt-4 font-body">
            {t.socialProof}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute -bottom-28 left-1/2 -translate-x-1/2"
          initial="hidden" animate={animState}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1,
              transition: { delay: 1.4, duration: 0.8 } },
          }}>
          <div className="animate-pulse-arrow flex flex-col items-center gap-1">
            <span className="text-osso-parchment/40 text-[10px] uppercase tracking-[0.3em] font-body">
              {lang === "it" ? "Scopri" : "Explore"}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(30 20% 94% / 0.4)" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-osso-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}

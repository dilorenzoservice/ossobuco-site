import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RusticDivider from "./RusticDivider";
import { translations, type Lang } from "@/i18n";

interface Props { lang: Lang; }

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let start = 0;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCounter({ value, label, active }: { value: string; label: string; active: boolean }) {
  const num = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const count = useCountUp(num, active);
  return (
    <motion.div className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <p className="font-display text-4xl md:text-5xl font-bold text-osso-red tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-osso-parchment/50 text-xs uppercase tracking-[0.2em] mt-2 max-w-[120px] mx-auto leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}

export default function ChiSiamo({ lang }: Props) {
  const t = translations[lang].chiSiamo;
  const [activeTab, setActiveTab] = useState<"fondatori" | "premi" | "filosofia">("fondatori");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Reset stats when switching away and back
  useEffect(() => {
    if (activeTab !== "filosofia") { setStatsVisible(false); return; }
    const timer = setTimeout(() => setStatsVisible(true), 400);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Also trigger via IntersectionObserver
  useEffect(() => {
    if (activeTab !== "filosofia" || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [activeTab]);

  const tabs = [
    { key: "fondatori" as const, label: t.tab1 },
    { key: "premi" as const, label: t.tab2 },
    { key: "filosofia" as const, label: t.tab3 },
  ];

  const handleTabKeyDown = (e: React.KeyboardEvent, currentKey: typeof activeTab) => {
    const idx = tabs.findIndex(t => t.key === currentKey);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next !== -1) {
      e.preventDefault();
      setActiveTab(tabs[next].key);
      document.getElementById(`tab-${tabs[next].key}`)?.focus();
    }
  };

  return (
    <section id="chi-siamo" className="relative bg-osso-black py-16 md:py-36 grain-overlay overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.025] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 100% 40%), transparent 70%)" }} aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.p className="text-osso-amber/90 text-sm uppercase tracking-[0.3em] font-medium text-center mb-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t.label}
        </motion.p>
        <motion.h2 className="font-display font-black text-osso-parchment text-center mb-3"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          {lang === "it" ? "Chi Siamo" : "About Us"}
        </motion.h2>
        <RusticDivider className="mb-10" />

        {/* Tab bar */}
        <motion.div className="flex justify-center mb-10 md:mb-14 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="flex bg-osso-charcoal/50 rounded-sm p-1 gap-1 flex-shrink-0"
            role="tablist" aria-label={lang === "it" ? "Sezioni Chi Siamo" : "About Us sections"}>
            {tabs.map((tab) => (
              <button key={tab.key} type="button"
                onClick={() => setActiveTab(tab.key)}
                onKeyDown={e => handleTabKeyDown(e, tab.key)}
                role="tab"
                id={`tab-${tab.key}`}
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                tabIndex={activeTab === tab.key ? 0 : -1}
                className={`whitespace-nowrap px-3 py-2 md:px-5 md:py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.06em] md:tracking-[0.12em] rounded-sm transition-all duration-300 ${
                  activeTab === tab.key ? "bg-osso-red text-white shadow-lg" : "text-osso-parchment/50 hover:text-osso-parchment"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* TAB 1 — FONDATORI */}
          {activeTab === "fondatori" && (
            <motion.div key="fondatori"
              role="tabpanel" id="panel-fondatori" aria-labelledby="tab-fondatori"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}>
              <div className="text-center mb-12">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-osso-parchment mb-2">{t.founders.title}</h3>
                <p className="text-osso-amber/90 text-sm uppercase tracking-[0.2em]">{t.founders.subtitle}</p>
              </div>
              <div className="relative max-w-2xl mx-auto mb-16">
                <div className="relative overflow-hidden rounded-sm">
                  <img src="/images/fondatori-emanuele-francesca.webp" alt="Emanuele e Francesca"
                    className="w-full h-[260px] sm:h-[360px] md:h-[460px] object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-osso-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="font-display text-xl text-osso-parchment font-bold">Emanuele & Francesca</p>
                    <p className="text-osso-amber/90 text-xs uppercase tracking-[0.2em] mt-1">
                      {lang === "it" ? "Fondatori di Ossobuco" : "Founders of Ossobuco"}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-osso-amber/10 rounded-sm -z-10" />
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div className="bg-osso-charcoal/30 rounded-sm p-5 md:p-8 warm-border relative overflow-hidden"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-osso-red" />
                  <p className="text-osso-amber/90 text-xs uppercase tracking-[0.2em] mb-1">{t.founders.emanuele.role}</p>
                  <h4 className="font-display text-2xl font-bold text-osso-parchment mb-4">Emanuele</h4>
                  <p className="text-osso-parchment/65 text-sm leading-relaxed mb-6">{t.founders.emanuele.bio}</p>
                  <p className="font-display italic text-osso-red/80 text-sm leading-relaxed">{t.founders.emanuele.quote}</p>
                </motion.div>
                <motion.div className="bg-osso-charcoal/30 rounded-sm p-5 md:p-8 warm-border relative overflow-hidden"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-osso-amber" />
                  <p className="text-osso-amber/90 text-xs uppercase tracking-[0.2em] mb-1">{t.founders.francesca.role}</p>
                  <h4 className="font-display text-2xl font-bold text-osso-parchment mb-4">Francesca</h4>
                  <p className="text-osso-parchment/65 text-sm leading-relaxed mb-6">{t.founders.francesca.bio}</p>
                  <p className="font-display italic text-osso-amber/90 text-sm leading-relaxed">{t.founders.francesca.quote}</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 2 — PREMI */}
          {activeTab === "premi" && (
            <motion.div key="premi"
              role="tabpanel" id="panel-premi" aria-labelledby="tab-premi"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}>
              <div className="text-center mb-12">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-osso-parchment mb-2">{t.premi.title}</h3>
                <p className="text-osso-amber/90 text-sm uppercase tracking-[0.2em]">{t.premi.subtitle}</p>
              </div>
              {t.premi.list.map((premio, i) => (
                <motion.div key={i} className="max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <div className="bg-osso-charcoal/30 rounded-sm warm-border overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className="grid grid-cols-2 gap-0">
                        <img src="/images/crunchy-competition.webp" alt="Crunchy Competition 2026"
                          className="w-full h-48 md:h-64 object-cover" loading="lazy" />
                        <img src="/images/black-dragon.webp" alt="Black Dragon"
                          className="w-full h-48 md:h-64 object-cover" loading="lazy" />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">🏆</span>
                          <span className="bg-osso-amber/20 text-osso-amber text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">{premio.anno}</span>
                        </div>
                        <h4 className="font-display text-2xl font-bold text-osso-parchment mb-1">{premio.nome}</h4>
                        <p className="text-osso-red font-bold text-lg mb-1">{premio.posizione}</p>
                        <p className="text-osso-amber/80 text-sm uppercase tracking-[0.15em] mb-4">
                          {lang === "it" ? "Panino" : "Sandwich"}: {premio.piatto}
                        </p>
                        <p className="text-osso-parchment/60 text-sm leading-relaxed">{premio.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 3 — FILOSOFIA */}
          {activeTab === "filosofia" && (
            <motion.div key="filosofia"
              role="tabpanel" id="panel-filosofia" aria-labelledby="tab-filosofia"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}>

              {/* Marquee decorativo */}
              <div className="overflow-hidden mb-14 py-4 border-y border-osso-amber/10" aria-hidden="true">
                <motion.div className="flex gap-12 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="font-display text-2xl md:text-3xl font-bold text-osso-parchment/8 uppercase tracking-[0.3em] flex-shrink-0">
                      {t.filosofia.manifesto} &nbsp;·&nbsp;
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
                <motion.div className="relative"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <div className="relative overflow-hidden rounded-sm">
                    <img src="/images/tbone-superior.webp" alt="T-bone superior"
                      className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover" loading="lazy" />
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-osso-amber/30" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-osso-amber/30" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-full h-full border border-osso-amber/10 rounded-sm -z-10" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <p className="text-osso-amber/90 text-sm uppercase tracking-[0.25em] mb-3">{t.filosofia.label}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-osso-parchment mb-2">{t.filosofia.title}</h3>
                  <RusticDivider className="justify-start !gap-3 py-4" />
                  <p className="text-osso-parchment/65 text-base leading-relaxed mt-2">{t.filosofia.body}</p>
                </motion.div>
              </div>

              {/* Counters */}
              <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 md:mt-20 max-w-2xl mx-auto">
                {t.filosofia.stats.map((s, i) => (
                  <StatCounter key={`${activeTab}-${i}`} value={s.value} label={s.label} active={statsVisible} />
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}

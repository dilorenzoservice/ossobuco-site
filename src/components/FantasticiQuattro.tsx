import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import RusticDivider from "./RusticDivider";
import { WA_LINK } from "@/lib/constants";
import { translations, type Lang } from "@/i18n";
import { onImgError } from "@/lib/imgUtils";

const images = [
  "/images/tomahawk.webp",
  "/images/tiramisu-homemade.webp",
  "/images/tartare.webp",
  "/images/mr-bacon-burger.webp",
];

const tagStyles = [
  { bg: "#CC0000", text: "#fff", num: "#F5F0EB" },
  { bg: "#C8860A", text: "#0D0D0D", num: "#C8860A" },
  { bg: "rgba(255,255,255,0.08)", text: "#F5F0EB", num: "#F5F0EB" },
  { bg: "#CC0000", text: "#fff", num: "#F5F0EB" },
];

function TiltCard({ item, index, image }: {
  item: { tag: string; name: string; desc: string };
  index: number;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });
  const glowO = useMotionValue(0);
  const springGlow = useSpring(glowO, { stiffness: 80, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
    glowO.set(1);
  };
  const onLeave = () => { x.set(0); y.set(0); glowO.set(0); };

  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", border: "1px solid hsl(40 85% 41% / 0.1)" }}
      className="group relative rounded-sm overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}>

      {/* Number */}
      <div className="absolute top-4 left-4 z-20 w-9 h-9 rounded-sm flex items-center justify-center font-display font-bold text-xs tracking-wider"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid hsl(40 85% 41% / 0.2)", color: tagStyles[index].num }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Tag */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-sm"
          style={{ background: tagStyles[index].bg, color: tagStyles[index].text, backdropFilter: "blur(8px)" }}>
          {item.tag}
        </span>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden h-56 sm:h-64 md:h-72 xl:h-80">
        {/* Placeholder */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-osso-charcoal animate-pulse z-10" />
        )}
        <img
          src={image} alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          width={600} height={400}
          loading="eager" decoding="async"
          data-src={image}
          onLoad={() => setImgLoaded(true)}
          onError={onImgError}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.5) 45%, transparent 100%)" }} />
        {/* Red glow on hover */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ opacity: springGlow, background: "radial-gradient(ellipse at 50% 60%, hsl(0 100% 40% / 0.12), transparent 70%)" }} />
      </div>

      {/* Content */}
      <div className="p-6 pt-5 relative"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 9%), hsl(0 0% 7%))", borderTop: "1px solid hsl(40 85% 41% / 0.08)" }}>
        <h3 className="font-display text-xl md:text-2xl font-bold text-osso-parchment mb-2 leading-tight">{item.name}</h3>
        <p className="text-osso-parchment/60 text-sm leading-relaxed">{item.desc}</p>
      </div>

      {/* Bottom amber line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: "linear-gradient(90deg, transparent, #C8860A, transparent)" }} />

      {/* Outer glow */}
      <motion.div className="absolute -inset-px rounded-sm pointer-events-none"
        style={{ opacity: springGlow, boxShadow: "0 0 35px hsl(0 100% 40% / 0.1)" }} />
    </motion.div>
  );
}

export default function FantasticiQuattro({ lang }: { lang: Lang }) {
  const t = translations[lang].fantastici;

  return (
    <section id="fantastici" className="relative py-16 md:py-40 overflow-hidden bg-burn grain-overlay">
      {/* Decorative large number */}
      <div className="absolute top-12 right-8 font-display font-black text-[160px] md:text-[220px] leading-none select-none pointer-events-none"
        style={{ color: "hsl(0 0% 100% / 0.015)", zIndex: 0 }} aria-hidden="true">4</div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.p className="text-osso-amber/90 text-sm uppercase tracking-[0.3em] font-medium text-center mb-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t.label}
        </motion.p>

        {/* Title */}
        <h2 className="text-center mb-3 overflow-hidden" aria-label={t.title}>
          {t.title.split(" ").map((word, wi, arr) => (
            <motion.span key={wi}
              className={`font-display font-black inline-block mr-3 md:mr-5 ${wi === arr.length - 1 ? "text-osso-red" : "text-osso-parchment"}`}
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: wi * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              {word}
            </motion.span>
          ))}
        </h2>

        <RusticDivider className="mb-5" />
        <motion.p className="text-osso-parchment/60 text-center text-sm md:text-base mb-10 md:mb-16 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
          {t.subtitle}
        </motion.p>

        {/* 2x2 grid on large, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6" style={{ perspective: "1400px" }}>
          {t.items.map((item, i) => (
            <TiltCard key={i} item={item} index={i} image={images[i]} />
          ))}
        </div>

        <motion.div className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-osso-amber hover:text-osso-black active:scale-[0.97]"
            style={{ border: "1.5px solid hsl(40 85% 41% / 0.5)", color: "#C8860A" }}>
            {t.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

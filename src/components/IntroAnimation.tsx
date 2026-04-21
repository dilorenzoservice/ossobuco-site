import { useState, useEffect, useCallback, useRef } from "react";

const EMBER_COUNT = 35;

function Ember({ delay, left, size, duration }: { delay: number; left: number; size: number; duration: number }) {
  return (
    <div className="absolute rounded-full animate-ember"
      style={{
        bottom: -10, left: `${left}%`, width: size, height: size,
        background: `radial-gradient(circle, hsl(25 100% 55%), hsl(0 100% 40%), transparent)`,
        animationDelay: `${delay}s`, animationDuration: `${duration}s`,
        filter: `blur(${size > 6 ? 2 : 1}px)`,
      }} />
  );
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"dark" | "logo" | "tagline" | "ready">("dark");
  const [exiting, setExiting] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const hasTriggered = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playSizzle = useCallback(() => {
    if (!soundOn || audioRef.current) return;
    try {
      const audio = new Audio("/sounds/sizzle.mp3");
      audio.volume = 0.15;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } catch {}
  }, [soundOn]);

  const toggleSound = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSoundOn(prev => {
      if (!prev && !audioRef.current) {
        try {
          const audio = new Audio("/sounds/sizzle.mp3");
          audio.volume = 0.15;
          audio.play().catch(() => {});
          audioRef.current = audio;
        } catch {}
      } else if (prev && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 600);
    const t2 = setTimeout(() => setPhase("tagline"), 1800);
    const t3 = setTimeout(() => { setPhase("ready"); setShowSoundHint(true); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleExit = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    playSizzle();
    setExiting(true);
    if (audioRef.current) {
      const audio = audioRef.current;
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.03) {
          audio.volume = Math.max(0, audio.volume - 0.03);
        } else {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
          audio.pause();
        }
      }, 80);
    }
    exitTimerRef.current = setTimeout(onComplete, 900);
  }, [onComplete, playSizzle]);

  // Cleanup su unmount: cancella timer e audio pendenti
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "dark") return;
    handleExit();
  }, [phase, handleExit]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 0) handleExit(); };
    const onKey = (e: KeyboardEvent) => { if (["ArrowDown","Enter"," ","Escape"].includes(e.key)) handleExit(); };
    const onTouch = (() => {
      let startY = 0;
      return {
        start: (e: TouchEvent) => { if (e.touches.length > 0) startY = e.touches[0].clientY; },
        end: (e: TouchEvent) => { if (e.changedTouches.length > 0 && startY - e.changedTouches[0].clientY > 30) handleExit(); },
      };
    })();
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouch.start, { passive: true });
    window.addEventListener("touchend", onTouch.end, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouch.start);
      window.removeEventListener("touchend", onTouch.end);
    };
  }, [handleExit]);

  const embers = useRef(
    Array.from({ length: EMBER_COUNT }, () => ({
      delay: Math.random() * 2.5,
      left: Math.random() * 100,
      size: 3 + Math.random() * 8,
      duration: 3 + Math.random() * 4,
    }))
  ).current;

  const showLogo = phase !== "dark";
  const showTagline = phase === "tagline" || phase === "ready";
  const showArrow = phase === "ready";

  if (exiting) {
    return (
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-osso-black animate-curtain-left" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-osso-black animate-curtain-right" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-osso-black flex items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={handleClick}>

      {/* Ambient glow */}
      <div className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: showLogo ? 0.15 : 0, background: "radial-gradient(circle at 50% 45%, hsl(0 100% 30%), transparent 60%)" }} />

      {/* Embers */}
      {embers.map((e, i) => <Ember key={i} {...e} />)}

      {/* Logo + text */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="transition-all duration-[1200ms] ease-out"
          style={{
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? "scale(1) translateY(0)" : "scale(0.6) translateY(20px)",
            filter: showLogo ? "blur(0px)" : "blur(8px)",
          }}>
          <img src="/images/logo.webp" alt="Ossobuco" className="w-40 h-40 md:w-52 md:h-52 rounded-sm object-cover"
            style={{ boxShadow: "0 0 60px hsl(0 100% 40% / 0.5), 0 0 120px hsl(0 100% 40% / 0.2)", border: "2px solid hsl(40 85% 41% / 0.25)" }} />
        </div>

        <div className="mt-8 text-center transition-all duration-[800ms] ease-out"
          style={{ opacity: showTagline ? 1 : 0, transform: showTagline ? "translateY(0)" : "translateY(12px)" }}>
          <p className="font-display text-osso-parchment/80 text-lg md:text-xl tracking-[0.15em] uppercase">
            Love at First Cut
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-osso-amber/40" />
            <span className="text-osso-amber/50 text-xs tracking-[0.3em] uppercase font-body">Steakhouse</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-osso-amber/40" />
          </div>
        </div>
      </div>

      {/* Sound toggle — in alto a destra, non sovrapposto alla freccia */}
      <div
        className="absolute top-6 right-6 z-20"
        style={{ opacity: showSoundHint ? 1 : 0, transition: "opacity 0.5s ease" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-2 rounded-sm transition-all duration-300 active:scale-95"
          style={{
            border: "1px solid hsl(40 85% 41% / 0.25)",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
          }}
          aria-label={soundOn ? "Disattiva suono" : "Attiva suono"}
        >
          {soundOn ? (
            <>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-osso-amber flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span className="text-osso-amber text-[10px] uppercase tracking-[0.2em] font-body">🔥 Brace viva</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-osso-parchment/35 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
              <span className="text-osso-parchment/35 text-[10px] uppercase tracking-[0.2em] font-body">Silenzio</span>
            </>
          )}
        </button>
      </div>

      {/* Scroll arrow — bottom center, libero */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500" style={{ opacity: showArrow ? 1 : 0 }}>
        <div className="animate-pulse-arrow flex flex-col items-center gap-2">
          <span className="text-osso-parchment/60 text-[10px] uppercase tracking-[0.3em] font-body">Scopri</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(30 20% 94% / 0.5)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

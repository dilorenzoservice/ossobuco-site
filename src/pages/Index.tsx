import { useState, useEffect, lazy, Suspense } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import type { Lang } from "@/i18n";

// Sezioni sotto la fold: lazy-loaded durante i ~2.8s dell'intro animation
const ChiSiamo       = lazy(() => import("@/components/ChiSiamo"));
const FantasticiQuattro = lazy(() => import("@/components/FantasticiQuattro"));
const MenuSection    = lazy(() => import("@/components/MenuSection"));
const Galleria       = lazy(() => import("@/components/Galleria"));
const Recensioni     = lazy(() => import("@/components/Recensioni"));
const Contatti       = lazy(() => import("@/components/Contatti"));
const Footer         = lazy(() => import("@/components/Footer"));

export default function Index() {
  const [introDone, setIntroDone] = useState(false);
  const [lang, setLang] = useState<Lang>("it");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}

      {/*
        visibility:hidden mantiene layout e carica risorse (immagini, lazy chunks)
        durante l'intro — ma le animazioni Hero devono partire solo su introDone,
        altrimenti l'utente non le vede mai.
        opacity 0→1 su introDone: la reveal si fonde col nero del body (background:#0D0D0D)
        invece di fare uno snap cut brusco.
      */}
      <div style={{
        visibility: introDone ? "visible" : "hidden",
        opacity: introDone ? 1 : 0,
        transition: introDone ? "opacity 0.55s ease" : "none",
      }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-osso-red focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-bold"
        >
          {lang === "it" ? "Vai al contenuto" : "Skip to content"}
        </a>
        <ScrollProgress />
        <Navbar lang={lang} setLang={setLang} />
        <main id="main-content">
          {/* HeroSection riceve introDone: le sue animazioni partono solo quando visible */}
          <HeroSection lang={lang} ready={introDone} />
          <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
            <div className="section-divider" />
            <ChiSiamo lang={lang} />
            <div className="section-divider" />
            <FantasticiQuattro lang={lang} />
            <div className="section-divider" />
            <MenuSection lang={lang} />
            <div className="section-divider" />
            <Galleria lang={lang} />
            <div className="section-divider" />
            <Recensioni lang={lang} />
            <div className="section-divider" />
            <Contatti lang={lang} />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer lang={lang} />
        </Suspense>
        <WhatsAppSticky />
      </div>
    </>
  );
}

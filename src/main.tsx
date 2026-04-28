import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("[Ossobuco] Elemento #root non trovato nel DOM — impossibile avviare l'app.");
} else {
  createRoot(rootEl).render(<App />);
}

// Lazy image fade-in observer
if (typeof IntersectionObserver !== "undefined") {
  const markLoaded = (img: HTMLImageElement) => img.classList.add('loaded');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        // addEventListener invece di .onload= per non sovrascrivere handler esistenti
        img.addEventListener('load', () => markLoaded(img), { once: true });
        // img.complete è true anche per immagini rotte; naturalWidth === 0 le esclude
        if (img.complete && img.naturalWidth > 0) markLoaded(img);
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  const observeLazyImages = () => {
    document.querySelectorAll('img[loading="lazy"]:not(.loaded)').forEach(img => {
      imageObserver.observe(img);
    });
  };

  if (typeof MutationObserver !== "undefined") {
    // Debounce: evita querySelectorAll su ogni singola mutazione React
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const mutObserver = new MutationObserver(() => {
      if (debounceTimer) return;
      debounceTimer = setTimeout(() => {
        observeLazyImages();
        debounceTimer = null;
      }, 80);
    });

    mutObserver.observe(document.body, { childList: true, subtree: true });

    // Disconnetti dopo 12s: tutte le sezioni lazy sono sicuramente montate
    setTimeout(() => {
      mutObserver.disconnect();
      if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null; }
    }, 12_000);
  }
}

import type React from "react";

/**
 * onError handler per img tag: se il browser non riesce a caricare
 * l'immagine, resetta src e riprova dopo 150ms usando data-src come
 * sorgente originale. Previene loop infiniti con il flag dataset.retried.
 */
export const onImgError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  const img = e.currentTarget;
  if (img.dataset.retried) return;
  img.dataset.retried = "true";
  const src = img.dataset.src ?? "";
  if (!src) return;
  img.src = "";
  setTimeout(() => {
    if (src) img.src = src;
  }, 150);
};

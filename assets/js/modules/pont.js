/* Pont entre les modules de la bibliothèque (qui appellent pret([...]) de leur propre socle)
   et le socle de ce projet : même GSAP, même ScrollTrigger, même mode calme, même rafraîchissement regroupé.
   Les modules ne chargent rien eux-mêmes : GSAP, ScrollTrigger et SplitText sont déjà dans la page. */
import { rafraichir, boucle as boucleSocle } from '../socle/index.js?v=1';

const html = document.documentElement;
const mqReduit = matchMedia('(prefers-reduced-motion: reduce)');

export const socle = {
  get gsap() { return window.gsap || null; },
  get ScrollTrigger() { return window.ScrollTrigger || null; },
  get SplitText() { return window.SplitText || null; },
  Flip: null,
  OGL: null,
  lenis: null,
  get calme() { return mqReduit.matches || html.classList.contains('calme'); },
  get souris() { return matchMedia('(hover: hover) and (pointer: fine)').matches; },
  get telephone() { return innerWidth < 700; },
  webgl() {
    if (/[?&]sanswebgl\b/.test(location.search)) return false;
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
  },
  rafraichir,
  mesurer: rafraichir,
  /* La bibliothèque appelle fn(t, dt), le socle du projet fn(dt, t). */
  boucle(el, fn) { const b = boucleSocle(el, (dt, t) => fn(t * 1000, dt * 1000)); return { arreter() { b && b.arreter && b.arreter(); } }; },
};

export async function pret() {
  const g = window.gsap;
  if (g && window.ScrollTrigger) g.registerPlugin(window.ScrollTrigger);
  if (g && window.SplitText) g.registerPlugin(window.SplitText);
  return socle;
}

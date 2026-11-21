/**
 * Apparition en douceur des éléments marqués [data-reveal] quand ils entrent à l'écran (GSAP ScrollTrigger).
 * Initialisé dans src/layouts/Base.astro à chaque changement de page.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Anime l'apparition des éléments [data-reveal] au scroll.
 * Les éléments d'un même parent apparaissent en cascade.
 */
export function initReveal() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (reduce) {
    gsap.set(items, { opacity: 1 });
    return;
  }
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'steps(6)', stagger: 0.08 },
      ),
  });
}

/** À appeler avant chaque changement de page (View Transitions). */
export function killReveal() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

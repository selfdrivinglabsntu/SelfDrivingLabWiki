/** Orchestrated hero load sequence: wordmark rise + staggered copy reveal. */
export function initHero() {
  const { gsap } = window;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.wordmark span', { yPercent: 120, opacity: 0, duration: 1, stagger: 0.07, ease: 'power4.out' }, 0.1)
    .from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.7 }, 0.2)
    .from('.hero-tag',     { y: 24, opacity: 0, duration: 0.8 }, 0.5)
    .from('.hero-sub',     { y: 20, opacity: 0, duration: 0.8 }, 0.65)
    .from('.hero-cta',     { y: 20, opacity: 0, duration: 0.8 }, 0.8)
    .from('.hero-meta > div', { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.9);
}

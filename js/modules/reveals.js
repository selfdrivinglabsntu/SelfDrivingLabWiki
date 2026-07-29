/** Page chrome driven by scroll: sticky-nav state, ambient parallax, reveals. */
export function initReveals() {
  const { gsap, ScrollTrigger } = window;

  // nav gains a border/background once scrolled
  ScrollTrigger.create({
    start: 30, end: 99999,
    onUpdate: (self) =>
      document.querySelector('.nav').classList.toggle('scrolled', self.scroll() > 30)
  });

  // nav hides while the machine/3D-object section fills the screen, so it
  // doesn't sit on top of the model, then reappears past it
  if (document.getElementById('product')) {
    ScrollTrigger.create({
      trigger: '#product', start: 'top top', end: 'bottom bottom',
      onToggle: (self) => document.querySelector('.nav').classList.toggle('nav-hidden', self.isActive)
    });
  }

  // ambient grid parallax
  gsap.to('[data-parallax]', {
    yPercent: 12, ease: 'none',
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 }
  });

  // generic scroll-in reveals
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 34, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
}

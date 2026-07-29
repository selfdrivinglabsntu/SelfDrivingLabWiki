/** Count-up stats + a crosshair that walks between wells on the plate. */

/** Static fallback used when GSAP is unavailable or motion is reduced. */
export function staticCounts() {
  document.querySelectorAll('[data-count]').forEach((host) => {
    const target = host.getAttribute('data-count');
    const valEl = host.querySelector('[data-val]') || host;
    if (target) valEl.textContent = target;
  });
}

export function initPrecision() {
  const { gsap } = window;

  // count-up numbers
  gsap.utils.toArray('[data-count]').forEach((host) => {
    const target = parseFloat(host.getAttribute('data-count'));
    const valEl = host.querySelector('[data-val]') || host;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: host, start: 'top 88%' },
      onUpdate: () => { valEl.textContent = Math.round(obj.v); }
    });
  });

  // crosshair walk across a handful of wells
  const chx = document.getElementById('chx');
  const chy = document.getElementById('chy');
  if (!chx || !chy) return;

  const ox = 24, oy = 22, dx = 39, dy = 39;
  const seq = [[0, 0], [3, 1], [6, 4], [9, 2], [11, 7], [5, 5]];
  const wells = document.querySelectorAll('.well');
  const fills = document.querySelectorAll('.well-fill');

  const walk = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.1 });
  seq.forEach(([c, r]) => {
    const cx = ox + c * dx, cy = oy + r * dy;
    walk.to(chy, { attr: { x1: cx, x2: cx }, duration: 0.5, ease: 'power2.inOut' })
        .to(chx, { attr: { y1: cy, y2: cy }, duration: 0.5, ease: 'power2.inOut' }, '<')
        .call(() => {
          wells.forEach((w) => w.classList.remove('lit'));
          const lit = [...wells].find((w) => +w.dataset.c === c && +w.dataset.r === r);
          if (lit) lit.classList.add('lit');
          const fill = [...fills].find((w) => +w.dataset.c === c && +w.dataset.r === r);
          if (fill) gsap.fromTo(fill, { opacity: 0 }, { opacity: 0.9, duration: 0.25, yoyo: true, repeat: 1 });
        })
        .to({}, { duration: 0.35 });
  });

  window.ScrollTrigger.create({
    trigger: '#precision', start: 'top 70%',
    onEnter: () => walk.play(),
    onLeaveBack: () => walk.pause()
  });
}

/** Signature element: a droplet forms at the pipette tip, falls, and ripples. */
export function initDispense() {
  const { gsap } = window;
  const droplet = document.getElementById('droplet');
  const ripple  = document.getElementById('ripple');
  const pool    = document.getElementById('pool');
  const volEl   = document.getElementById('volReadout');
  const posEl   = document.getElementById('posReadout');
  if (!droplet) return;

  const vols = [2.50, 5.00, 1.25, 10.0, 7.50, 0.50];
  let vi = 0;

  const randomPos = () => {
    const x = (90 + Math.random() * 40).toFixed(1);
    const y = (30 + Math.random() * 30).toFixed(1);
    return `X ${x} · Y ${y} · Z 6.0`;
  };

  gsap.timeline({ repeat: -1, repeatDelay: 0.35 })
    .set(droplet, { attr: { cy: 150, r: 0 } })
    .set(ripple,  { attr: { rx: 8, ry: 2.4 }, opacity: 0 })
    .call(() => {
      volEl.textContent = vols[vi].toFixed(2) + ' µL';
      posEl.textContent = randomPos();
      vi = (vi + 1) % vols.length;
    })
    .to(droplet, { attr: { r: 8 },        duration: 0.5,  ease: 'power1.out' })
    .to(droplet, { attr: { cy: 158 },     duration: 0.18, ease: 'power1.in' })
    .to(droplet, { attr: { cy: 280, r: 5 }, duration: 0.32, ease: 'power2.in' })
    .set(droplet, { attr: { r: 0 } })
    .to(pool,   { attr: { rx: 34, ry: 9 }, opacity: 0.22, duration: 0.25, ease: 'power2.out' }, '<')
    .fromTo(ripple,
      { attr: { rx: 8, ry: 2.4 }, opacity: 0.7 },
      { attr: { rx: 46, ry: 12 }, opacity: 0, duration: 0.7, ease: 'power2.out' }, '<')
    .to(pool, { opacity: 0.14, attr: { rx: 30, ry: 8 }, duration: 0.5 }, '>-.1');
}

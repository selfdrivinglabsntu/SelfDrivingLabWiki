/**
 * Closed-loop diagram: five steps arranged around a ring. Each node explains one
 * stage of HEIMDALL's vision-guided volume correction. Hovering (or focusing) a
 * node reveals its description in the centre; when idle it auto-cycles through the
 * steps so the loop explains itself. Built to work with or without GSAP/motion.
 */
export function initLoop(animate = true) {
  const nodesG = document.getElementById('loopNodes');
  const center = document.getElementById('loopCenter');
  if (!nodesG || !center) return;

  const { gsap } = window;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const STEPS = [
    { n: '01', title: 'Set target',     desc: 'Set the target volume you want your pipette to dispense the solution at.' },
    { n: '02', title: 'Read the current volume',  desc: 'A camera photographs the volume dial and Gemini — a vision-language model (VLM) — reads the current volume.' },
    { n: '03', title: 'Calculate steps',      desc: 'The gap between current volume and your target volume is used to calculate the number of steps to roatate the pipette’s volume adjustment knob.' },
    { n: '04', title: 'Gear driven system',    desc: 'The stepper motor rotates the dial using a gear system based on the calculated number of steps.' },
    { n: '05', title: 'Creep to align', desc: 'If the digits don’t match up once the target value has reached, the motor creeps until they line up exactly.' },
  ];

  const R = 120, C = 180, ARC = 360 / STEPS.length;
  const lcNum = center.querySelector('.lc-num');
  const lcTitle = center.querySelector('.lc-title');
  const lcDesc = center.querySelector('.lc-desc');
  const nodeEls = [];
  let active = -1;
  let autoTimer = null;

  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function startAuto() {
    if (!animate) return;
    stopAuto();
    autoTimer = setInterval(() => setActive((active + 1) % STEPS.length), 10000);
  }

  function setActive(i) {
    if (i === active) return;
    active = i;
    nodeEls.forEach((el, j) => el.classList.toggle('is-active', j === i));
    const s = STEPS[i];
    lcNum.textContent = s.n;
    lcTitle.textContent = s.title;
    lcDesc.textContent = s.desc;
    // brief fade so the swap reads as a change
    center.classList.remove('swap');
    void center.offsetWidth; // restart the animation
    center.classList.add('swap');
  }

  STEPS.forEach((s, i) => {
    const a = (-90 + i * ARC) * Math.PI / 180;
    const x = +(C + R * Math.cos(a)).toFixed(1);
    const y = +(C + R * Math.sin(a)).toFixed(1);

    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'lnode');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `Step ${s.n}: ${s.title}. ${s.desc}`);
    g.innerHTML =
      `<circle class="lnode-hit" cx="${x}" cy="${y}" r="27" fill="transparent"/>` +
      `<circle class="lnode-dot" cx="${x}" cy="${y}" r="17"/>` +
      `<text class="lnode-num" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">${s.n}</text>`;

    const pick = () => { stopAuto(); setActive(i); };
    g.addEventListener('mouseenter', pick);
    g.addEventListener('focus', pick);
    g.addEventListener('mouseleave', startAuto);
    g.addEventListener('blur', startAuto);

    nodesG.appendChild(g);
    nodeEls.push(g);
  });

  setActive(0);
  startAuto();

  // ring draws itself in on scroll (motion only)
  const loopPath = document.getElementById('loopPath');
  if (animate && gsap && loopPath) {
    const len = 2 * Math.PI * R;
    gsap.set(loopPath, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(loopPath, {
      strokeDashoffset: 0, duration: 50, ease: 'power2.inOut',
      scrollTrigger: { trigger: '#loop', start: 'top 60%' },
    });
  }
}

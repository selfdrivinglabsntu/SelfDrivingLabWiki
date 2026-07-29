/**
 * HEIMDALL build guide — "Pip" the pipette mascot.
 *
 * Self-injecting: call initMascot() and it appends the mascot + speech bubble to
 * <body> and returns a say(text, mood) function. Used by the hub and step pages.
 *
 * SWAP THE ART: replace the inline <svg class="mascot-figure">…</svg> below with
 *   <img class="mascot-figure" src="/assets/mascot.png" alt="Pip">
 * (use a root-absolute /assets path so it resolves from build.html and steps/*).
 */
const FIGURE_SVG = `
  <svg class="mascot-figure" viewBox="0 0 120 214" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pip the pipette mascot">
    <defs>
      <linearGradient id="mbody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--accent-2)"/>
        <stop offset="1" stop-color="var(--accent)"/>
      </linearGradient>
    </defs>
    <path class="m-arm" d="M38 98 Q20 94 17 108" stroke="var(--accent)" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path class="m-arm" d="M82 98 Q100 94 103 108" stroke="var(--accent)" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="53" y="6" width="14" height="26" rx="7" fill="var(--accent)"/>
    <rect x="45" y="30" width="30" height="10" rx="5" fill="var(--accent-2)"/>
    <rect x="38" y="38" width="44" height="104" rx="22" fill="url(#mbody)"/>
    <path d="M46 138 L74 138 L64 198 Q60 206 56 198 Z" fill="url(#mbody)"/>
    <circle cx="60" cy="208" r="4.5" fill="var(--accent)"/>
    <circle class="m-eye" cx="52" cy="88" r="5"/>
    <circle class="m-eye" cx="70" cy="88" r="5"/>
    <path class="m-mouth" d="M49 104 Q61 114 73 104"/>
  </svg>`;

const IDLE = [
  "Need a hand? Pick a step and dive in.",
  "I'm Pip. I'm basically a pipette with opinions.",
  "Looking good. Keep building!",
];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function initMascot() {
  const el = document.createElement('div');
  el.className = 'mascot bob';
  el.setAttribute('aria-live', 'polite');
  el.innerHTML = FIGURE_SVG +
    '<div class="mascot-bubble"><span class="m-name">Pip</span>' +
    '<span class="mascot-bubble-text">Hi!</span></div>';
  document.body.appendChild(el);

  const bubble = el.querySelector('.mascot-bubble-text');
  const figure = el.querySelector('.mascot-figure');
  let hideTimer, reactTimer;

  function say(text, mood = 'happy') {
    bubble.textContent = text;
    el.classList.add('speaking', 'react');
    el.classList.remove('happy', 'wow');
    if (mood) el.classList.add(mood);
    clearTimeout(reactTimer);
    reactTimer = setTimeout(() => el.classList.remove('react'), 650);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => el.classList.remove('speaking'), 6000);
  }

  figure.addEventListener('click', () => say(pick(IDLE), 'happy'));
  return { say, el };
}

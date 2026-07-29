/**
 * HEIMDALL build guide — hub controller.
 *
 * Renders the level cards and enforces strict sequential access: a locked card
 * cannot be opened — the user must complete the previous step (done on that
 * step's own page) to unlock the next one. The "Unlock all levels" button is a
 * toggle: it opens every level, then re-locks back to the start (clearing all
 * progress) on the next click.
 */
import { LEVELS, load, persist, isOpen } from './build-core.js';
import { initMascot } from './mascot.js';

const state = load();
const mascot = initMascot();

const LINES = {
  greet: [
    "Hi! I'm Pip. Start with the Bill of Materials — finish a step to unlock the next.",
    "Welcome to the build! Complete each step in order to open the one after it.",
  ],
  locked: [
    "That one's locked — finish the step before it first.",
    "Patience! Complete the previous step to unlock this one.",
    "Locked. Work through the steps in order and it'll open up.",
  ],
  unlockAll: [
    "Everything's open! Speedrun mode engaged. 🏁",
    "All levels unlocked — the whole build is yours.",
  ],
  lockAll: [
    "Locked it back down — fresh start. Begin at step one.",
    "All levels re-locked and progress reset to the top.",
  ],
};
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const LOCK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
  '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0"/></svg>';

// ---- build the cards from LEVELS ----
const listEl = document.querySelector('.levels');
const cardEls = new Map();

LEVELS.forEach((lv) => {
  const li = document.createElement('li');
  li.className = 'level';
  li.dataset.id = lv.id;
  li.innerHTML =
    '<a class="level-head" href="steps/' + lv.file + '">' +
      '<span class="level-num">' + lv.num + '</span>' +
      '<div class="level-titles"><h2>' + lv.title + '</h2>' +
        '<p class="level-sub">' + lv.sub + '</p></div>' +
      '<div class="level-status"><span class="lock-pill">' + LOCK_SVG +
        '<span class="lock-pill-text">Locked</span></span>' +
        '<span class="go-arrow" aria-hidden="true">→</span></div>' +
    '</a>' +
    '<div class="level-lockmsg">' + LOCK_SVG +
      '<p>Complete the previous step to unlock this level.</p></div>';

  const head = li.querySelector('.level-head');
  head.addEventListener('click', (e) => {
    // Locked cards never navigate — you must complete the previous step.
    if (!isOpen(state, lv.id)) { e.preventDefault(); mascot.say(pick(LINES.locked), 'happy'); }
  });

  listEl.appendChild(li);
  cardEls.set(lv.id, li);
});

// ---- rendering ----
const fill = document.querySelector('.progress-fill');
const doneLabel = document.querySelector('[data-progress-done]');
const totalLabel = document.querySelector('[data-progress-total]');
if (totalLabel) totalLabel.textContent = String(LEVELS.length);

function render() {
  LEVELS.forEach((lv) => {
    const li = cardEls.get(lv.id);
    const open = isOpen(state, lv.id);
    const complete = state.completed.has(lv.id);
    li.classList.toggle('is-unlocked', open && !complete);
    li.classList.toggle('is-locked', !open);
    li.classList.toggle('is-complete', complete);

    li.querySelector('.lock-pill-text').textContent =
      complete ? 'Complete' : open ? 'Open' : 'Locked';

    const head = li.querySelector('.level-head');
    head.setAttribute('aria-disabled', String(!open));
  });

  const done = state.completed.size;
  if (fill) fill.style.width = (done / LEVELS.length) * 100 + '%';
  if (doneLabel) doneLabel.textContent = String(done);

  updateToggleButtons();
}

// ---- unlock/lock-all toggle ----
// The two "Unlock all levels" buttons (header + controls) act as one toggle.
const toggleBtns = document.querySelectorAll('.unlock-all');

/** True when every level is currently accessible. */
function allUnlocked() {
  return LEVELS.every((lv) => isOpen(state, lv.id));
}

/** Keep both toggle buttons' label + pressed state in sync with the current state. */
function updateToggleButtons() {
  const on = allUnlocked();
  toggleBtns.forEach((btn) => {
    btn.textContent = on ? 'Lock all levels' : 'Unlock all levels';
    btn.setAttribute('aria-pressed', String(on));
  });
}

/** Unlock everything, or (if already all open) re-lock back to the start. */
function toggleAll() {
  if (allUnlocked()) {
    // Lock all: reset to the initial state (only level 1 open, progress cleared).
    state.all = false;
    state.completed = new Set();
    persist(state);
    render();
    mascot.say(pick(LINES.lockAll), 'happy');
  } else {
    state.all = true;
    persist(state);
    render();
    mascot.say(pick(LINES.unlockAll), 'wow');
  }
}

toggleBtns.forEach((btn) => btn.addEventListener('click', toggleAll));

// ---- boot ----
render();
if (state.completed.size < LEVELS.length) {
  setTimeout(() => mascot.say(pick(LINES.greet), 'happy'), 900);
}

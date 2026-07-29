/**
 * HEIMDALL build guide — step page controller.
 *
 * Drives one step page, identified by <body data-step="…">. Handles:
 *  - a strict lock gate: if the previous step isn't complete (and global unlock
 *    is off), the content is blocked so the level can't be reached out of order,
 *  - reversible completion (Mark complete ⇄ Undo) — undoing re-locks later steps,
 *  - prev / next / back navigation, generated from the level order.
 */
import { LEVELS, load, persist, indexOf, isOpen } from './build-core.js';
import { initMascot } from './mascot.js';

const id = document.body.dataset.step;
const i = indexOf(id);
const lv = LEVELS[i];
const state = load();
const mascot = initMascot();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const DONE_LINES = [
  "Step complete — the next one's unlocked. Onward!",
  "Checked off. Your HEIMDALL is one step closer.",
  "That's progress. Nice work.",
];

const main = document.querySelector('.step-main');
const contentEl = document.querySelector('.step-content');
const actionsEl = document.querySelector('.step-actions');
const statusText = document.querySelector('.step-status-text');

// ---- lock gate ----
const locked = lv ? !isOpen(state, id) : false;

if (locked) {
  // Block access: hide the content + completion, show a locked notice.
  if (contentEl) contentEl.hidden = true;
  if (actionsEl) actionsEl.hidden = true;
  if (statusText) statusText.textContent = 'Locked';
  document.body.classList.add('is-step-locked');

  const prev = LEVELS[i - 1];
  const panel = document.createElement('div');
  panel.className = 'step-locked';
  panel.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
    '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0"/></svg>' +
    '<h3>This step is locked</h3>' +
    '<p>' + (prev
      ? 'Complete <strong>' + prev.title + '</strong> first to unlock this level.'
      : 'This level isn’t available yet.') + '</p>' +
    '<div class="step-locked-actions">' +
      (prev ? '<a class="btn btn-solid" href="' + prev.file + '">← Go to ' + prev.title + '</a>' : '') +
      '<a class="btn" href="../build.html">Build hub</a>' +
    '</div>';
  if (main) main.insertBefore(panel, main.querySelector('.step-nav'));

  setTimeout(() => mascot.say('This one’s locked — finish the previous step first.', 'happy'), 700);
} else {
  // ---- completion toggle (reversible) ----
  const btn = document.querySelector('.complete-btn');

  function renderStatus() {
    const done = state.completed.has(id);
    document.body.classList.toggle('is-step-complete', done);
    if (btn) {
      btn.textContent = done ? '✓ Completed — undo' : 'Mark step complete';
      btn.classList.toggle('is-complete', done);
    }
    if (statusText) statusText.textContent = done ? 'Complete' : 'In progress';
  }

  if (btn) {
    btn.addEventListener('click', () => {
      if (state.completed.has(id)) {
        // reversible: undoing re-locks later levels (they depend on this being complete)
        state.completed.delete(id);
        persist(state);
        renderStatus();
        mascot.say('Undone — the next step is locked again until you finish this one.', 'happy');
      } else {
        state.completed.add(id);
        persist(state);
        renderStatus();
        mascot.say(pick(DONE_LINES), 'wow');
      }
    });
  }

  renderStatus();
  if (lv) setTimeout(() => mascot.say('Step ' + lv.num + ': ' + lv.title + '. You’ve got this.', 'happy'), 800);
}

// ---- prev / next / back navigation ----
const nav = document.querySelector('.step-nav');
if (nav) {
  const prev = LEVELS[i - 1];
  const next = LEVELS[i + 1];
  const parts = [];
  parts.push(prev
    ? '<a class="btn step-prev" href="' + prev.file + '">← ' + prev.title + '</a>'
    : '<a class="btn step-prev" href="../build.html">← All steps</a>');
  parts.push('<a class="back step-hub" href="../build.html">Build hub</a>');
  parts.push(next
    ? '<a class="btn btn-solid step-next" href="' + next.file + '">' + next.title + ' →</a>'
    : '<a class="btn btn-solid step-next" href="../build.html">Finish ✓</a>');
  nav.innerHTML = parts.join('');
}

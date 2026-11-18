/**
 * HEIMDALL build guide — shared core.
 *
 * Single source of truth for the level list and the persisted progress state.
 * Imported by both the hub (build.js) and each step page (build-step.js).
 *
 * Access rule (strict, sequential): a level is accessible ONLY if
 *   - the global "unlock all" override is on, or
 *   - it is the first level, or
 *   - the immediately previous level has been completed.
 * There is no free-reveal / skip-ahead. State persists in localStorage.
 *
 * To add / reorder levels: edit the LEVELS array (order = unlock order) and add a
 * matching steps/<file> page. `file` is the step page's filename.
 */
export const STORAGE_KEY = 'heimdall-build-v1';

export const LEVELS = [
  { id: 'bom',              num: '01', title: 'Bill of Materials',   sub: "Every part, board and consumable you'll need to source.",  file: 'bom.html' },
  { id: 'printer-firmware', num: '02', title: '3D Printer Firmware', sub: "Flash the modified Marlin firmware onto the printer's mainboard.", file: 'printer-firmware.html' },
  { id: 'assembly',         num: '03', title: 'Assembly',            sub: 'Mechanical build — frame, motion axes and the pipette mount.', file: 'assembly.html' },
  { id: 'electronics',      num: '04', title: 'Electronics',        sub: 'Solder the control board, wire the motor and 12V supply, flash the ESP32.', file: 'electronics.html' },
  { id: 'software',         num: '05', title: 'Software',            sub: 'Install the control GUI and connect to your HEIMDALL.',     file: 'software.html' },
  // HIDDEN FOR NOW — Calibration is not ready to show. To bring it back: uncomment
  // the line below and set Tutorial Videos' num back to '07', then restore the
  // Calibration link in build.html's <noscript> list.
  // { id: 'calibration',      num: '06', title: 'Calibration',         sub: 'Tune volumes and coordinates so every draw is accurate.',   file: 'calibration.html' },
  // `open: true` — reference material rather than a build step. Other pages link
  // into individual clips (e.g. Assembly → z-limit switch links to videos 1-6),
  // and those links have to work wherever the reader is in the sequence.
  { id: 'tutorial-videos',  num: '06', title: 'Tutorial Videos',     sub: "Follow along on video &mdash; the build steps in the order you'll do them.", file: 'tutorial-videos.html', open: true },
];

export function indexOf(id) {
  return LEVELS.findIndex((l) => l.id === id);
}

/** Read persisted state: which levels are completed + the global unlock flag. */
export function load() {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) { /* malformed */ }
  const completed = new Set(data && Array.isArray(data.completed) ? data.completed : []);
  const all = !!(data && data.all);
  return { completed, all };
}

export function persist(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    completed: [...state.completed],
    all: !!state.all,
  }));
}

/** Strict sequential access: previous level must be complete (or global unlock
 *  on), except for levels flagged `open` — reference pages other steps link into. */
export function isOpen(state, id) {
  if (state.all) return true;
  const i = indexOf(id);
  if (i <= 0) return true;
  if (LEVELS[i] && LEVELS[i].open) return true;
  const prev = LEVELS[i - 1];
  return prev ? state.completed.has(prev.id) : true;
}

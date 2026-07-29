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
  { id: 'bom',         num: '01', title: 'Bill of Materials', sub: "Every part, board and consumable you'll need to source.",  file: 'bom.html' },
  { id: 'assembly',    num: '02', title: 'Assembly',          sub: 'Mechanical build — frame, motion axes and the pipette mount.', file: 'assembly.html' },
  { id: 'firmware',    num: '03', title: 'Firmware',          sub: 'Flash the controller and bring the motors to life.',        file: 'firmware.html' },
  { id: 'software',    num: '04', title: 'Software',          sub: 'Install the control GUI and connect to your HEIMDALL.',     file: 'software.html' },
  { id: 'calibration', num: '05', title: 'Calibration',       sub: 'Tune volumes and coordinates so every draw is accurate.',   file: 'calibration.html' },
  { id: 'first-run',   num: '06', title: 'First Run',         sub: 'Load a protocol and run your first automated dispense.',    file: 'first-run.html' },
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

/** Strict sequential access: previous level must be complete (or global unlock on). */
export function isOpen(state, id) {
  if (state.all) return true;
  const i = indexOf(id);
  if (i <= 0) return true;
  const prev = LEVELS[i - 1];
  return prev ? state.completed.has(prev.id) : true;
}

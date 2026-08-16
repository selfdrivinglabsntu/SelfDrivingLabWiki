/** Chip-version note field. A single persisted value (not per-page) — drop an
 *  <input id="chipVersionInput"> on any page that needs to read or set it,
 *  e.g. the Assembly step where it's recorded, and later Firmware where it's
 *  needed again to compile the right Marlin build. */
(function () {
  const KEY = 'heimdall-chip-version';
  const input = document.getElementById('chipVersionInput');
  if (!input) return;

  const saved = localStorage.getItem(KEY);
  if (saved) input.value = saved;

  input.addEventListener('input', () => {
    localStorage.setItem(KEY, input.value);
  });
})();

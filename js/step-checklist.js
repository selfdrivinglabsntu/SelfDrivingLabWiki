/** Sub-step pages — tick off each tool, fastener and part in the panels at
 *  the top of the page as you gather it, persisted in localStorage. Each
 *  .need-item needs a data-need id that is unique within its page.
 *
 *  Kept separate from js/parts-checklist.js on purpose: that one tracks the
 *  one-off "have I printed/bought this" inventory on the parts-list page,
 *  while these are per-step and include tools and fasteners that never
 *  appear in that inventory. Ticking a part here must not mark it gathered
 *  there, so the two use different storage. State here is keyed by page, so
 *  each sub-step keeps its own ticks. */
(function () {
  const KEY = 'heimdall-step-checklist';
  const items = document.querySelectorAll('.need-item[data-need]');
  if (!items.length) return;

  const page = location.pathname.replace(/^.*\/steps\//, '');

  let store;
  try { store = JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch (_) { store = {}; }
  if (typeof store !== 'object' || store === null) store = {};

  const checked = new Set(Array.isArray(store[page]) ? store[page] : []);

  function persist() {
    store[page] = [...checked];
    try { localStorage.setItem(KEY, JSON.stringify(store)); }
    catch (_) { /* private mode / quota — ticks still work for this visit */ }
  }

  function render(item) {
    const on = checked.has(item.dataset.need);
    item.classList.toggle('is-checked', on);
    item.querySelector('.need-check').setAttribute('aria-checked', String(on));
  }

  function toggle(item) {
    const id = item.dataset.need;
    if (checked.has(id)) checked.delete(id); else checked.add(id);
    persist();
    render(item);
  }

  items.forEach((item) => {
    const box = item.querySelector('.need-check');
    if (!box) return;
    // the name/label doubles as the accessible name for the box
    const label = item.querySelector('.part-name, .need-label');
    box.removeAttribute('aria-hidden');
    box.setAttribute('role', 'checkbox');
    box.setAttribute('tabindex', '0');
    // innerText, not textContent: labels break the count onto a second line
    // with a <br> ("M5 x 10mm<br>x 2"), which textContent would run together
    box.setAttribute('aria-label', 'Gathered: ' + (label
      ? (label.innerText || label.textContent).replace(/\s+/g, ' ').trim()
      : item.dataset.need));
    render(item);

    // stopPropagation so ticking a part doesn't also open its image
    // in the lightbox (js/lightbox.js)
    box.addEventListener('click', (e) => { e.stopPropagation(); toggle(item); });
    box.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); e.stopPropagation(); toggle(item);
      }
    });
  });
})();

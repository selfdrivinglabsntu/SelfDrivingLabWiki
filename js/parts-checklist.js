/** Parts-list checklist page — tick/untick which parts you've gathered,
 *  persisted in localStorage. Each .part-card needs a unique data-part id.
 *  The .part-check box in the card's corner is the checkbox (role="checkbox");
 *  the rest of the card opens the part's image larger (js/lightbox.js). */
(function () {
  const KEY = 'heimdall-parts-checklist';
  const cards = document.querySelectorAll('.part-card[data-part]');
  if (!cards.length) return;

  let checked;
  try { checked = new Set(JSON.parse(localStorage.getItem(KEY)) || []); }
  catch (_) { checked = new Set(); }

  const doneLabel = document.querySelector('[data-parts-done]');
  const totalLabel = document.querySelector('[data-parts-total]');
  if (totalLabel) totalLabel.textContent = String(cards.length);

  function persist() { localStorage.setItem(KEY, JSON.stringify([...checked])); }

  function updateSummary() {
    if (doneLabel) doneLabel.textContent = String(checked.size);
  }

  function render(card) {
    const on = checked.has(card.dataset.part);
    card.classList.toggle('is-checked', on);
    const box = card.querySelector('.part-check');
    if (box) box.setAttribute('aria-checked', String(on));
  }

  function toggle(card) {
    const id = card.dataset.part;
    if (checked.has(id)) checked.delete(id); else checked.add(id);
    persist();
    render(card);
    updateSummary();
  }

  // Only the check box ticks/unticks — clicking the rest of the card opens
  // the larger image (js/lightbox.js).
  cards.forEach((card) => {
    const box = card.querySelector('.part-check');
    if (!box) return;
    const name = card.querySelector('.part-name');
    box.removeAttribute('aria-hidden');
    box.setAttribute('role', 'checkbox');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', 'Gathered: ' + (name ? name.textContent : card.dataset.part));
    render(card);

    box.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(card);
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); toggle(card); }
    });
  });
  updateSummary();

  // ---- "more options" expandable variant panels ----
  document.querySelectorAll('.part-more').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = btn.nextElementSibling;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? 'more options' : 'less options';
      if (panel) panel.hidden = open;
    });
  });
})();

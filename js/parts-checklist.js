/** Parts-list checklist page — tick/untick which parts you've gathered,
 *  persisted in localStorage. Each .part-card needs a unique data-part id.
 *  Cards are div-based (role="checkbox"), same custom-interactive-card
 *  pattern as the build hub's .level cards (js/build.js), not native
 *  <input type="checkbox">, so the whole card is one big click target. */
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
    card.setAttribute('aria-checked', String(on));
  }

  function toggle(card) {
    const id = card.dataset.part;
    if (checked.has(id)) checked.delete(id); else checked.add(id);
    persist();
    render(card);
    updateSummary();
  }

  cards.forEach((card) => {
    card.setAttribute('role', 'checkbox');
    card.setAttribute('tabindex', '0');
    render(card);

    card.addEventListener('click', (e) => {
      // "more options" (e.g. Tip Holder's second CAD variant) shouldn't also
      // tick/untick the card it lives inside.
      if (e.target.closest('[data-no-toggle]')) return;
      toggle(card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.target.closest('[data-no-toggle]')) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(card); }
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

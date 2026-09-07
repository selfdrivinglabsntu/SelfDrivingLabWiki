/** Click any in-step reference photo (.step-figure img) to view it larger
 *  in a full-screen overlay. Generic — works on every matching image
 *  already on the page, no per-image markup needed beyond the existing
 *  .step-figure/figcaption structure. One shared overlay element, built
 *  once and reused for whichever image was clicked. */
(function () {
  const images = document.querySelectorAll('.step-figure img');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
    '</button>' +
    '<img alt="">' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  let lastFocused = null;

  function open(src, alt, caption) {
    lastFocused = document.activeElement;
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = caption || '';
    captionEl.hidden = !caption;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.src = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  images.forEach((img) => {
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    if (!img.hasAttribute('aria-label')) {
      img.setAttribute('aria-label', 'View larger: ' + (img.alt || 'image'));
    }

    const openThis = () => {
      const figcaption = img.closest('figure') && img.closest('figure').querySelector('figcaption');
      open(img.currentSrc || img.src, img.alt, figcaption ? figcaption.textContent : '');
    };
    img.addEventListener('click', openThis);
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openThis(); }
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
})();

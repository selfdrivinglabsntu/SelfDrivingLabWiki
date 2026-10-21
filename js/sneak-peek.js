/** HEIMDALL — showcase sneak peek (TEMPORARY)
 *
 *  css/sneak-peek.css shows a [data-peek] region down to --peek-cut and frosts
 *  everything below it. All this script does is put --peek-cut about a third of
 *  the way down (SHARE), snapped to the nearest block boundary so the cut never
 *  slices through a line of text, and make the frosted part inert — not
 *  clickable, not tabbable, not read out — since it isn't meant to be read yet.
 *
 *  A page that wants to hold back one particular thing rather than "the rest"
 *  puts data-peek-from on that block and the cut pins there instead — or on the
 *  region itself, which frosts it end to end (the placeholder steps do this).
 *
 *  Heights are re-measured once the fonts and images have settled, and again on
 *  resize, because a third of a page that hasn't loaded its figures yet is the
 *  wrong third.
 *
 *  TO GO LIVE: see the header of css/sneak-peek.css.
 */
(function () {
  if (!document.body.classList.contains('showcase-peek')) return;
  const regions = document.querySelectorAll('[data-peek]');
  if (!regions.length) return;

  const SHARE = 0.3;    // how much of the content stays readable
  const FLOOR = 240;    // px — never cut so high there's nothing to read
  const MIN = 520;      // px — a region shorter than this is a stub, show it whole
  const DEPTH = 3;      // how far to descend for a tidier cut (ol → li → …)
  const SNAP = 240;     // px — how far the cut may move to land on a boundary

  const inerted = [];
  let settled = false;  // images/fonts in; heights can be trusted

  /* The boundary nearest `target`: every child's top and bottom edge is a
     candidate, and the one block the mark lands inside is opened up so a long
     list gets cut between items rather than before or after the whole thing. */
  function boundary(region, target, base) {
    let best = 0;
    (function walk(parent, depth) {
      for (const kid of parent.children) {
        const r = kid.getBoundingClientRect();
        if (!r.height) continue;
        const top = r.top - base;
        const bottom = r.bottom - base;
        if (Math.abs(top - target) < Math.abs(best - target)) best = top;
        if (Math.abs(bottom - target) < Math.abs(best - target)) best = bottom;
        if (depth < DEPTH && top < target && bottom > target && kid.children.length) {
          walk(kid, depth + 1);
        }
      }
    })(region, 0);
    return best;
  }

  function freeze(region, cut, base) {
    (function walk(parent) {
      for (const kid of parent.children) {
        const r = kid.getBoundingClientRect();
        if (!r.height) continue;
        if (r.top - base >= cut - 1) {
          kid.setAttribute('inert', '');
          inerted.push(kid);
        } else if (r.bottom - base > cut && kid.children.length) {
          walk(kid);   // straddles the cut — only its own children can be frozen
        }
      }
    })(region);
  }

  /* "On this page" links pointing into the frosted half go nowhere, so they
     fold away with it (reversibly — a re-measure can bring them back). */
  function trimContents() {
    document.querySelectorAll('.guide-toc a[href^="#"]').forEach((link) => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      const item = link.closest('li');
      if (item) item.hidden = !!(target && target.closest('[inert]'));
    });
  }

  function apply() {
    while (inerted.length) inerted.pop().removeAttribute('inert');

    regions.forEach((region) => {
      // scrollHeight is the full content height even though the region is
      // capped and clipped, so measuring never has to lift the cap.
      const natural = region.scrollHeight;
      const base = region.getBoundingClientRect().top;

      // A page can pin the cut to one block with data-peek-from — "frost from
      // here down" — instead of taking a share. Used where what's held back is
      // a specific thing rather than "the rest of it": steps/tutorial-videos.html
      // keeps the last video back, and the placeholder steps put it on the region
      // itself to frost the lot. A pinned region is never measured or skipped.
      const pin = region.matches('[data-peek-from]') ? region
                : region.querySelector('[data-peek-from]');
      let at;

      if (pin) {
        at = pin.getBoundingClientRect().top - base;
      } else {
        // Before load, a figure-heavy region measures short — keep the CSS
        // fallback cut rather than briefly revealing the whole draft.
        if (natural < MIN) {
          if (!settled) return;
          region.classList.remove('is-peeking');
          region.classList.add('is-peek-off');
          region.style.removeProperty('--peek-cut');
          return;
        }

        const target = natural * SHARE;
        at = boundary(region, target, base);
        // nothing tidy within reach — usually a tall figure sitting across the
        // mark. Cut on the mark instead and let the blur ramp fade it out, rather
        // than giving away far less of the page than intended.
        if (Math.abs(at - target) > SNAP) at = target;
        at = Math.max(at, FLOOR);
      }

      at = Math.round(Math.min(Math.max(at, 0), natural));
      region.classList.remove('is-peek-off');
      region.style.setProperty('--peek-cut', at + 'px');
      region.classList.add('is-peeking');
      // a pinned cut hides one specific block, so the frost has to bite at the
      // edge rather than ease in the way it does mid-paragraph
      region.classList.toggle('is-peek-pinned', !!pin);
      freeze(region, at, base);
    });

    trimContents();
  }

  // a timer, not requestAnimationFrame: a page opened in a background tab
  // never gets a frame, and the cut shouldn't wait on one
  let timer = 0;
  function schedule(wait) {
    clearTimeout(timer);
    timer = setTimeout(apply, wait || 0);
  }

  apply();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => schedule());
  window.addEventListener('load', () => { settled = true; schedule(); });
  window.addEventListener('resize', () => schedule(150));

  // Content can also arrive long after load — steps/bom.html pulls its four
  // tables from a published sheet — and that moves the mark. Attributes are
  // left unobserved on purpose: inert/hidden/--peek-cut are ours to set.
  if (window.MutationObserver) {
    const watcher = new MutationObserver(() => schedule(120));
    regions.forEach((region) => {
      watcher.observe(region, { childList: true, subtree: true, characterData: true });
    });
  }
})();

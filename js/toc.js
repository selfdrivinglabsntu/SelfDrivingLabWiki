/** "On this page" contents for long guide pages (.guide). Builds the link
 *  list from each .guide-section's h2 and its h3 sub-headings, then
 *  highlights whichever heading the reader has most recently scrolled past.
 *  Only the active section's sub-headings are expanded, so the sticky
 *  sidebar stays short enough to fit on screen. */
(function () {
  const toc = document.querySelector('.guide-toc');
  const list = toc && toc.querySelector('.guide-toc-list');
  const sections = document.querySelectorAll('.guide .guide-section');
  if (!list || !sections.length) return;

  // reading line — just below the fixed .build-nav
  const OFFSET = 140;
  const slug = (text) => text.toLowerCase().replace(/^[\d.\s]+/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const entries = [];   // { heading, link, item } in document order

  function ensureId(el) {
    if (!el.id) {
      let id = slug(el.textContent) || 'section';
      while (document.getElementById(id)) id += '-2';
      el.id = id;
    }
    return el.id;
  }

  function makeLink(heading, sectionItem) {
    const a = document.createElement('a');
    a.href = '#' + ensureId(heading);
    a.textContent = heading.textContent.trim();
    entries.push({ heading, link: a, item: sectionItem });
    return a;
  }

  sections.forEach((section) => {
    const h2 = section.querySelector('h2');
    if (!h2) return;
    const item = document.createElement('li');
    item.appendChild(makeLink(h2, item));

    const subs = section.querySelectorAll('h3');
    if (subs.length) {
      const subList = document.createElement('ol');
      subs.forEach((h3) => {
        const li = document.createElement('li');
        // "2.2.1." style headings sit one level deeper than "2.2."
        if ((h3.textContent.match(/^\s*([\d.]+)/) || ['', ''])[1].split('.').filter(Boolean).length > 2) {
          li.className = 'is-deep';
        }
        li.appendChild(makeLink(h3, item));
        subList.appendChild(li);
      });
      item.appendChild(subList);
    }
    list.appendChild(item);
  });

  let current = null;
  function update() {
    let active = entries[0];
    for (const entry of entries) {
      if (entry.heading.getBoundingClientRect().top - OFFSET <= 0) active = entry;
      else break;
    }
    // at the very bottom the last headings may never reach the reading line
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = entries[entries.length - 1];
    }
    if (active === current) return;

    if (current) {
      current.link.classList.remove('is-active');
      current.link.removeAttribute('aria-current');
      current.item.classList.remove('is-open');
    }
    active.link.classList.add('is-active');
    active.link.setAttribute('aria-current', 'location');
    active.item.classList.add('is-open');
    current = active;

    // keep the highlighted link visible when the sidebar itself scrolls
    const linkBox = active.link.getBoundingClientRect();
    const tocBox = toc.getBoundingClientRect();
    if (toc.scrollHeight > toc.clientHeight && (linkBox.top < tocBox.top || linkBox.bottom > tocBox.bottom)) {
      toc.scrollTop += linkBox.top - tocBox.top - toc.clientHeight / 2;
    }
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

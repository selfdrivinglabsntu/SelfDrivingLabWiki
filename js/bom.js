/** Bill of Materials — each category's rows are pulled live from a
 *  published Google Sheets CSV export (Item, Link, Need columns); a
 *  checkbox per row is persisted to localStorage so gathered-state survives
 *  a reload. One shared loader drives all four tables (the original page
 *  had this near-duplicated four times — same logic, just a different
 *  sheet gid, tbody id and storage prefix each time). */
(function () {
  const CSV_BASE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-TwlT31GEgkXPduyDL73LmU-yBtenwhAyGXJrb6wXF8_biwNA0957p6VpCppg4n3GPIFQAodvInfr/pub';

  const TABLES = [
    { gid: '1714966897', tbody: 'key-items-body',   storage: 'bom-key-items' },
    { gid: '488062266',  tbody: 'electronics-body',  storage: 'bom-electronics' },
    { gid: '0',          tbody: 'hardware-body',     storage: 'bom-hardware' },
    { gid: '375458509',  tbody: 'tools-body',        storage: 'bom-tools' },
  ];

  function parseCsv(text) {
    return text.split('\n')
      .map((row) => row.split(','))
      .filter((row) => row.length > 1 && row[0].trim() !== '');
  }

  function buildRow(cells, rowIndex, storagePrefix) {
    const tr = document.createElement('tr');

    const tdCheck = document.createElement('td');
    tdCheck.className = 'bom-check-cell';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const key = storagePrefix + '-row-' + rowIndex;
    checkbox.checked = localStorage.getItem(key) === 'true';
    checkbox.addEventListener('change', (e) => localStorage.setItem(key, e.target.checked));
    tdCheck.appendChild(checkbox);
    tr.appendChild(tdCheck);

    for (let j = 0; j < Math.min(3, cells.length); j++) {
      const td = document.createElement('td');
      const value = cells[j].replace(/^"|"$/g, '').trim();
      // Column index 1 is "Link" — turn it into an actual link if it's a URL.
      if (j === 1 && /^https?:\/\//.test(value)) {
        const link = document.createElement('a');
        link.href = value;
        link.className = 'bom-link';
        link.textContent = 'link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        td.appendChild(link);
      } else {
        td.textContent = value;
      }
      tr.appendChild(td);
    }
    return tr;
  }

  async function loadTable({ gid, tbody: tbodyId, storage }) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    const url = CSV_BASE + '?gid=' + gid + '&single=true&output=csv';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const rows = parseCsv(await res.text());

      tbody.innerHTML = '';
      for (let i = 1; i < rows.length; i++) {
        tbody.appendChild(buildRow(rows[i], i, storage));
      }
      if (rows.length <= 1) {
        tbody.innerHTML = '<tr><td colspan="4" class="bom-empty">Nothing in this sheet yet.</td></tr>';
      }
    } catch (err) {
      console.error('BOM: failed to load sheet gid=' + gid, err);
      tbody.innerHTML = '<tr><td colspan="4" class="bom-error">Couldn’t load this table — check the sheet link and try again.</td></tr>';
    }
  }

  TABLES.forEach(loadTable);
})();

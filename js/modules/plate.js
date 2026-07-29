/**
 * Builds the 96-well plate (12 x 8) and crosshair as inline SVG.
 * Runs regardless of motion preference — the plate is static content.
 */
export function buildPlate() {
  const svg = document.getElementById('plateSvg');
  if (!svg) return;

  const cols = 12, rows = 8, ox = 24, oy = 22, dx = 39, dy = 39, r = 13;
  let out = '';

  for (let c = 0; c < cols; c++) {
    for (let rr = 0; rr < rows; rr++) {
      const cx = ox + c * dx, cy = oy + rr * dy;
      out += `<circle class="well" data-c="${c}" data-r="${rr}" cx="${cx}" cy="${cy}" r="${r}"/>`;
      out += `<circle class="well-fill" data-c="${c}" data-r="${rr}" cx="${cx}" cy="${cy}" r="${r - 3}"/>`;
    }
  }
  out += `<line id="chx" class="crosshair" x1="0" y1="22" x2="480" y2="22"/>`;
  out += `<line id="chy" class="crosshair" x1="24" y1="0" x2="24" y2="320"/>`;
  svg.innerHTML = out;
}

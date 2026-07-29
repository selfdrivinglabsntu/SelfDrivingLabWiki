/** Light/dark theme toggle. The [data-theme] attribute is already set before
 *  first paint by the inline script in <head> — this just wires the button. */
(function () {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  function label(theme) {
    toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  }
  label(document.documentElement.dataset.theme);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('piper-theme', next);
    label(next);
  });
})();

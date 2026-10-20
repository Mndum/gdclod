// Pointer-following light for .lg-interactive / .lg-btn (SwiftUI: .interactive()).
// Also toggles [data-open] on .lg-morph when its [data-toggle] child is clicked (glassEffectID morph).
document.addEventListener('pointermove', e => {
  const el = e.target.closest?.('.lg-interactive, .lg-btn');
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
});
document.addEventListener('click', e => {
  const t = e.target.closest?.('[data-toggle]');
  const m = t && t.closest('.lg-morph');
  if (m) m.dataset.open = m.dataset.open === 'true' ? 'false' : 'true';
});

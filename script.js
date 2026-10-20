// Game area: the original embeds a hosted game build here. Swap this for your own
// <iframe src="..."> or canvas once you have a build to show.
// Optional footer icons: if img/<name>.png exists, use it in place of the placeholder SVG.
['game1', 'game2', 'twitter', 'facebook', 'discord', 'reddit', 'twitch'].forEach((name, i) => {
  const a = document.querySelectorAll('.icons a')[i];
  const img = new Image();
  img.onload = () => { a.innerHTML = ''; a.appendChild(img); };
  img.src = `img/${name}.png`;
});

// Liquid-glass card: let the highlight follow the pointer.
document.querySelectorAll('.app-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// Smooth-scroll to in-page anchors (Buy Game) instead of jumping.
document.querySelectorAll('a[href^="#"]').forEach(a => {
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  a.addEventListener('click', e => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    document.querySelector('.mobile')?.classList.remove('open');
    history.replaceState(null, '', '#' + id);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });
});

// Game canvas: 1138x640 internal resolution, scaled by CSS to fit the #game box
// while keeping the aspect ratio (same sizing approach as the original).
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = document.getElementById('game');

function fit() {
  const bw = box.clientWidth, bh = box.clientHeight;
  const s = Math.min(bw / canvas.width, bh / canvas.height);
  const w = canvas.width * s, h = canvas.height * s;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.style.marginLeft = (bw - w) / 2 + 'px';
  canvas.style.marginTop = (bh - h) / 2 + 'px';
}
new ResizeObserver(fit).observe(box);
fit();

// Placeholder loading screen; replace draw() with your game's render loop.
let p = 0;
function draw() {
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  const bw = W * 0.31, bx = (W - bw) / 2, by = H / 2;
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(bx, by, bw * p / 100, 5);
  if (p >= 100) {
    ctx.fillStyle = '#88aaaa';
    ctx.font = '600 16px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game build not included. Draw your game on this canvas.', W / 2, by + 36);
  }
}
const t = setInterval(() => {
  p = Math.min(100, p + Math.random() * 6);
  draw();
  if (p >= 100) clearInterval(t);
}, 120);
draw();

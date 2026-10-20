# GDclod

A static site with a Geometry Dash–style layout: header, a 16:9 game canvas and a tiled ground footer.

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8123
```

then visit <http://localhost:8123>.

## Files

| File | What it does |
|---|---|
| `index.html` | Page markup |
| `style.css` | Layout and styling |
| `script.js` | Canvas sizing and loading screen, smooth scroll, footer icon loader |
| `gdclod.html` | Standalone single-file version (CSS, script and images embedded); open it on its own |
| `img/` | Images used by the page |

## Game canvas

The canvas is 1138×640 and scales to fit its box. `draw()` in `script.js` only renders a placeholder loading bar; replace it with your own render loop.

## Disclaimer

All Geometry Dash assets, names and trademarks are owned by RobTop Games.

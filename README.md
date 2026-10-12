# For Madam jii ♡ — Sadiya's Birthday Experience

A static, mobile-first birthday website for Sadiya, signed **Aseer**. Built with plain HTML, CSS and JavaScript: no framework, backend, build step or paid service required.

## Run locally

Open `index.html` in a modern browser, or serve the folder with VS Code Live Server. For the most reliable testing, use a local server rather than opening the file directly.

## Included scenes

1. **Secret Door** — a quiet opening, teddy illustration and optional ambient tones.
2. **Birthday World** — tap the star, flower and balloon to reveal little wishes.
3. **Birthday Companion** — a teddy with changing reactions.
4. **Wishes & Blessings** — five approved two-line blessing shayaris.
5. **Memory Album** — scrapbook frames reserved for real photos and memories.
6. **19 Little Gifts** — each box opens a different surprise; the nineteenth leads to the final wish.
7. **If I Could Give You Something** — a romantic poem and heartfelt wishes.
8. **A Little Promise** — a gentle, bilingual promise.
9. **Interactive Cake** — 19 candles to light and blow out.
10. **Sadiya's Constellation** — connect the stars to reveal her name.
11. **Final Celebration** — the long birthday ghazal, Aseer's signature and confetti.

## Personal content still reserved for you

The memory scrapbook deliberately uses illustrative placeholders rather than inventing personal memories. Before sharing the site, replace those cards with real photos/captions if you want them included. The longer poem, promise and final ghazal are included as the current creative draft; read them once before the birthday reveal and adjust anything that doesn't sound like you.

## Deploy for free

### Netlify
1. Extract the ZIP.
2. Open Netlify and create a new site using manual deploy / deploy without Git.
3. Drag the extracted `Madam_Jii_Birthday_Project` folder (or its contents, including `index.html`, `styles.css`, `script.js` and `assets/`) into the deploy area.
4. Open the generated URL on your phone and test the gifts, cake, audio toggle and scroll.

### GitHub Pages
1. Create a repository and upload the contents of this folder to its root.
2. In **Settings → Pages**, choose deployment from the main branch and the root folder.
3. Open the published URL and test on mobile.

No API keys, environment variables or server-side secrets are used. The Google Fonts import is optional; system fallbacks are defined in CSS.

## Final checks

Run the offline structural checks from this folder:

```bash
python tests/validate_project.py
node --check script.js
```

The structural audit checks duplicate IDs, JavaScript ID references, the 19 gifts, 19 candles, all expected scenes, local assets, reduced-motion support and gift-dialog labels. Visual testing in a real mobile browser is still recommended after deployment; this environment's headless Chromium did not finish a screenshot run.

## Project files

- `index.html` — all scenes and page copy
- `styles.css` — visual system, animations and responsive layouts
- `script.js` — gift modal, teddy reactions, blessing cards, audio, cake, constellation and confetti
- `assets/favicon.svg` — matching icon
- `assets/share-cover.svg` — social share artwork
- `tests/validate_project.py` — offline structural validation


## Restored interactive 3D teddy
The birthday companion now attempts to load Three.js from jsDelivr and renders a custom-built 3D teddy with a party hat, balloon, tiny cake, blinking eyes, pointer-following head, waving, dancing, happy hops, surprise reactions, and sleepy idle state. If the CDN/WebGL is unavailable, the illustrated CSS teddy remains as a fallback. The 3D version needs an internet connection on first load to fetch Three.js.

### Teddy controls
- Tap/click the teddy to cycle through playful reactions.
- **hi bolo** makes him wave.
- **nachao** starts his dance.
- **surprise** triggers the surprised reaction.
- Reduced-motion preference lowers movement intensity.

Note: structural validation and JavaScript syntax checks pass. Real browser/device visual QA is still required before claiming the whole site is production-tested.


## Personal memory photos
The scrapbook now includes four supplied photos, optimized and stored locally in `assets/`:
- `moment-worth-remembering.webp` — lake scene
- `favourite-little-moment.webp` — necklace moment at a celebration
- `our-little-chapter.webp` — couple photo
- `a-memory-to-keep.webp` — handmade paper rose

These are local assets; the scrapbook does not rely on third-party image URLs. Captions and tap-to-reveal notes are in the `#memories` section of `index.html`.


## Cute ambient gestures
Every major scene includes gentle floating balloons, blooming flowers, a tiny teddy/toy cameo, and heart/sparkle tap reactions. These are decorative, touch-friendly, and respect `prefers-reduced-motion`. The gestures are generated locally by `script.js`; no extra image assets or services are required.


### Responsive gesture placement
Ambient decorations are intentionally sparse and offset from the corners. Desktop scenes use two or three varied placements; mobile scenes use two small side decorations at staggered heights to avoid competing with headings, cards, and controls.


### Dimensional balloons and blooming flowers
Ambient balloons and flowers are built from layered CSS shapes rather than emoji glyphs. Balloons float upward with a shaded glossy surface, knot and string; flowers open from a bud into layered petals when tapped and gently sway on their stems. Mobile sizing and reduced-motion behavior are included.

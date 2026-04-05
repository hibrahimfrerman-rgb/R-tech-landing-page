# Building a Website 101


Open `index.html` in your browser.

## Replace assets (easy transfer)

- Put your real files into `assets/inbox/`
- For instant swap, replace these files (same names):
  - `assets/images/hero-product.jpg`
  - `assets/images/section-band.jpg`
  - `assets/images/center-product.jpg`
  - `assets/images/video-preview.jpg`
  - `assets/icons/*.svg`

## Recommended sizes (to keep it clean)

Images (JPG/PNG/WebP):
- Current product photos you gave me are **1200×1200** (square).
- The layout crops wide sections to **3:2** using CSS `object-fit: cover`.

Icons:
- Best: **SVG** at **24×24** viewBox (scales perfectly).
- If PNG: **24×24** (standard), **32×32** (logo/favicon), **48×48** (bigger touch targets).

## WhatsApp setup

Edit `main.js`:
- `config.whatsappPhone` (international format, no `+`, no spaces)
- `config.defaultMessage`

WhatsApp entry points:
- Header button (`WhatsApp us`)
- Contact section card + footer link
- Quote form button (`Send via WhatsApp`)

## UI box (saved variants)

When we remove/change a working UI piece, we save it here for reuse later:

- `assets/box/` (see `assets/box/README.md`)

# Footprints (what changed)

Date: 2026-04-04

## UI tweaks + fixes

- `index.html`
  - Header “Get a quote” now uses a minimal style (`.btn--quote`) instead of the blue capsule.
  - WhatsApp entry points now open in a new tab (`target="_blank"`).

- `styles.css`
  - Add `[id]{ scroll-margin-top: 96px; }` so anchor links don’t hide under the sticky header.
  - Add focus-visible outlines for buttons/links.
  - Add `.btn--quote` (minimal quote CTA style).

- `main.js`
  - `Send via WhatsApp` now validates required fields (`form.reportValidity()`).
  - Adds popup-blocker fallback (if `window.open` is blocked, navigates the current tab).

## Saved variants (UI box)

- `assets/box/README.md` — what the box is + how to use it.
- `assets/box/header-cta-quote-pill.md` — restore instructions for the old blue header quote button.


# Header CTA: blue quote pill (previous variant)

## What this is

The original **top-right header** “Get a quote” button used the filled blue capsule style (`.btn--primary`).

## Restore it

In `index.html`, replace the header CTA quote button classes:

```html
<!-- current -->
<a class="btn btn--sm btn--quote" id="getQuoteTop" href="#quote">Get a quote</a>

<!-- restore (blue capsule) -->
<a class="btn btn--sm btn--primary" id="getQuoteTop" href="#quote">Get a quote</a>
```

No CSS changes needed (the `.btn--primary` style is still in `styles.css`).


# momo Merchant Card Showroom

Take-home implementation for the momo frontend evaluation, focused on product-card analysis, reusable architecture, and delivery tradeoffs.

Live demo:

- [https://momo-test-10a9a.web.app](https://momo-test-10a9a.web.app)

## What is implemented

The current showroom focuses on three real-world card patterns observed from momo home-page style layouts:

1. `Compact Vertical Card`
2. `Horizontal Promo Card`
3. `Flash Sale Card`

Each card type is implemented as its own standalone Angular component, while shared interaction behavior is extracted where it makes sense.

Implemented interactions:

- Image carousel with dot navigation
- Drag/swipe media switching
- Video entry point on card media
- Reusable dialog system for video lightbox playback
- Responsive showroom layout

## Tech choices

- Angular standalone components
- Signals for local UI state
- Zoneless-style lean component state management
- SCSS with shared design tokens
- Firebase Hosting for delivery

## Run locally

```bash
npm install
npm start
```

Open:

- `/` for the main showroom
- `/sample-product-card.html` for the sample embedding page

## Build

```bash
npm run build
```

## Project structure

```text
src/app
├── app.component.html
├── app.component.ts
├── app.routes.ts
├── pages
│   └── card-showroom
│       ├── card-showroom.data.ts
│       ├── card-showroom.page.html
│       ├── card-showroom.page.scss
│       └── card-showroom.page.ts
└── shared
    ├── components
    │   ├── compact-vertical-card
    │   ├── dialog-host
    │   ├── flash-sale-card
    │   ├── horizontal-promo-card
    │   ├── media-lightbox
    │   ├── momo-card-types
    │   ├── product-card
    │   └── product-card-cluster
    ├── directives
    │   └── drag-carousel.directive.ts
    └── services
        ├── dialog.service.ts
        └── local-storage.service.ts
```

## Architecture notes

### 1. Card layout stays separated

The three momo card types are visually different enough that I kept them as separate components instead of forcing a single all-purpose product-card renderer.

This keeps:

- Templates easier to read
- Variant-specific styling easier to evolve
- Future changes more localized

### 2. Shared behavior is extracted, not over-abstracted

Instead of merging all cards into one component, I extracted only the reusable interaction pieces:

- `carousel-state.ts`
  shared active-index and drag-offset state
- `drag-carousel.directive.ts`
  shared pointer drag behavior
- `dialog.service.ts` + `dialog-host`
  shared modal infrastructure for video playback

This gives reuse without introducing a large configuration-heavy mega component.

### 3. Dialog system instead of per-card modal logic

Video playback uses a small reusable dialog system:

- `DialogService`
- `DialogRef`
- `DIALOG_DATA`
- `DialogHostComponent`

This keeps card components focused on media intent, not overlay orchestration.

## Tradeoffs

### What I prioritized

- Real momo card-type analysis over generic card styling
- Reusable interaction infrastructure
- Clean standalone Angular structure
- Demo-ready delivery via Firebase Hosting

### What I intentionally did not overbuild

- No backend or CMS schema
- No external state library
- No generalized plugin system yet
- No forced single-card abstraction for all layouts

## Future extensions

- Add autoplay, snapping, and momentum tuning to carousel interactions
- Promote card content into a schema-driven fixture format
- Add analytics hooks for media open, swipe, and CTA interactions
- Turn selected card types into embeddable custom elements if cross-site reuse becomes important

## Validation

Verified during development with:

- `tsc --noEmit`
- Angular production build
- Firebase Hosting deployment

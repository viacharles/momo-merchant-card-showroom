# momo Merchant Card Showroom

Angular 20+ style implementation using standalone components, signals, and zoneless change detection.

## Run

```bash
npm install
npm start
```

Open:

- `/` for the showroom page
- `/sample-product-card.html` for the standalone sample HTML

## Structure

```text
src/app
├── app.component.html
├── app.component.scss
├── app.component.ts
├── app.config.ts
├── app.routes.ts
├── pages
│   └── card-showroom
│       ├── card-showroom.page.html
│       ├── card-showroom.page.scss
│       └── card-showroom.page.ts
└── shared
    ├── product-card
    │   ├── product-card.component.html
    │   ├── product-card.component.scss
    │   ├── product-card.component.ts
    │   ├── product-card.mapper.ts
    │   └── product-card.model.ts
    └── services
        └── local-storage.service.ts
```

## Notes

- One primary product card is implemented now, with `CardVariant` prepared for `Recommendation`, `SearchResult`, and `FlashSale`.
- Mock data comes from `public/mock/momo-products.json`.
- UI settings and the selected card are persisted in `localStorage`.

## Tradeoffs

- I implemented one reusable product card first, then used `CardVariant` plus UI settings to prove the component can evolve into multiple card types without splitting too early.
- Mock data is served from `public/mock/momo-products.json` to keep the demo simple and browser-friendly within the take-home timebox.
- `localStorage` persistence is intentionally lightweight and browser-only. It is enough to demonstrate state continuity without introducing a larger state library.

## Future Extensions

- Split variant-specific layout rules into dedicated render configs or sub-templates once `SearchResult` and `FlashSale` diverge structurally.
- Promote showroom state into a dedicated facade/store if more editing panels, schema-driven controls, or plugin hooks are added.
- Export the card as a custom element or package entry so `sample-product-card.html` can consume the exact same runtime component instead of a parallel HTML mock.

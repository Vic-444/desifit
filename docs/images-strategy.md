# Images strategy (DesiFit)

## Decision (MVP)
- Each **shoppable item** stores a merchant `imageUrl` (CDN / product photo).
- Each **look card** uses the first item’s image as the hero visual.
- Jewelry looks use the first Salty product image.
- No fake Unsplash “fashion” fillers for product cards.

## Sources
- **Salty:** reliable `og:image` from Shopify CDN (easy to capture).
- **BlissClub:** `og:image` when available.
- **Bewakoof:** bot-protected; when `og:image` fails, use a branded SVG placeholder until we download assets manually.

## Later upgrades
1. Download approved product images into `public/images/products/` for stability.
2. Optional composite look boards (2–3 item collage).
3. Re-check image ToS / Admitad creative guidelines before heavy local hosting.

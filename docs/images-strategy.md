# Images strategy (DesiFit)

## Brand surfaces (homepage / social)
- Homepage hero and share/OG imagery use **owned brand assets** under `public/images/brand/` — not merchant product photos.
- Current hero: `public/images/brand/hero.jpg` (group lifestyle scene; Q4 2026).
- Social banner crops for YT / Pin / IG / Facebook live in the agent artifacts folder when generated; re-export from the master if needed.
- Merchant look swaps must **not** change the homepage hero.

## Decision (MVP look cards)
- Each **shoppable item** stores a merchant `imageUrl` (CDN / product photo).
- Each **look card** uses the first item’s image as the hero visual.
- Jewelry looks use the first Salty product image.
- No fake Unsplash “fashion” fillers for product cards.

## Sources
- **Salty:** reliable `og:image` from Shopify CDN (easy to capture).
- **BlissClub:** `og:image` when available.
- **Bewakoof:** bot-protected; when `og:image` fails, use a branded SVG placeholder until we download assets manually.
- **Uniqlo:** remote product images from Uniqlo India CDN where used in swaps.

## Later upgrades
1. Download approved product images into `public/images/products/` for stability.
2. Optional composite look boards (2–3 item collage).
3. Re-check image ToS / Admitad creative guidelines before heavy local hosting.
4. Revisit bridal/festive hero only after that category exists on-site.

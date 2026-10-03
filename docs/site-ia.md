# DesiFit site information architecture

## Goal
Mobile-first lifestyle site for India traffic. Visitors browse curated women’s/men’s lookbooks (Admitad deep links) or use the Fitness studio tools.

## Studios
| Studio | Purpose |
|--------|---------|
| Women | Full lookbooks — Indo-Western, Desi Casual, Jewelry & Accessories (90 looks) |
| Men | Thin-start Bewakoof lookbooks — Tees & Denim, Oversized & Street, Ethnic Casual (30 looks) |
| Fitness | BMI calculator + Desi Food Calorie Index (no merchant / no supplements) |

## Routes
| Path | Purpose |
|------|---------|
| `/` | Brand hero + three studio doors + women’s worlds + featured looks |
| `/categories` | All fashion lookbooks (women + men) |
| `/categories/[category]` | Category overview + subcategory cards |
| `/categories/[category]/[subcategory]` | 10-look lookbook grid |
| `/looks/[id]` | Look detail with shoppable item deep links |
| `/fitness` | Fitness studio (BMI + calorie index) |
| `/disclosure` | Affiliate disclosure |
| `/privacy` | Privacy policy |
| `/contact` | Contact |

## Data
- Fashion: `src/data/looks.json` (women + men; `studio` field tags `women` / `men`)
- Women rebuild: `npm run catalog`
- Men merge / refresh: `npm run catalog:mens`
- Fitness foods are inline in `src/pages/fitness.astro`

## Merchants (live)
- Bewakoof, BlissClub, Salty via Admitad deep links

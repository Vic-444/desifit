# DesiFit

Curated women’s and men’s lookbooks plus a lean fitness studio for [desifit.com](https://desifit.com).

## Stack

- Astro + Tailwind CSS v4
- Static deploy via Cloudflare Pages (GitHub)
- Admitad affiliate deep links (Bewakoof, BlissClub, Salty)

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run catalog` | Rebuild women’s `src/data/looks.json` from curated catalog script |
| `npm run catalog:mens` | Merge / refresh Men’s Studio (30 Bewakoof looks) into `looks.json` |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `./dist` |
| `npm run preview` | Preview production build |

## Content

- Fashion data: `src/data/looks.json` (women + men)
- Fitness tools: `src/pages/fitness.astro`
- Strategy notes: `/docs`

export type BlogVideo = {
  id: string;
  label: string;
  lookId: string;
  lookTitle: string;
  /** Editorial body for this look (~150 words) */
  body: string[];
};

export type BlogCategory = "Weekly looks" | "Fashion" | "Fitness";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  /** ISO 8601 with offset — post is public only at/after this instant */
  publishAt: string;
  intro: string[];
  videos: BlogVideo[];
  outro: string[];
};

/**
 * DesiFit Blog — all longform articles (weekly edits, later features).
 * publishAt uses IST (+05:30) to match the social schedule.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "week-of-oct-13-fusion-street-desi",
    title: "3 looks this week: Fusion, Street & Desi Casual",
    description:
      "This week’s DesiFit edit: Indo-Western fusion, oversized street, and everyday desi casual — what works, when to wear it, and where to shop each piece.",
    category: "Weekly looks",
    // Sat Oct 17, 2026 · 9:40 PM IST (10 min after Desi Short at 9:30 so the embed is public)
    publishAt: "2026-10-17T21:40:00+05:30",
    intro: [
      "October shopping in India rarely asks you to pick one aesthetic and stick with it. Mid-week might need something that reads polished without feeling costume-y; Friday wants volume and print; the weekend often wants soft cotton and zero drama. This week’s DesiFit edit follows that rhythm — three looks, three moods, each already live on the site with piece-by-piece links.",
      "Think of these less as runway statements and more as wearable uniforms: Indo-Western fusion when you want desi colour with denim ease, oversized street when the print does the talking, and desi casual when comfort has to look intentional. Watch the short, then shop the exact outfit breakdown.",
    ],
    videos: [
      {
        id: "kVjGlCDYbwk",
        label: "Fusion",
        lookId: "skd-02",
        lookTitle: "Maroon Kurti × Flared Denim",
        body: [
          "Indo-Western works best when neither half of the mix apologises for the other. Here a maroon printed high-low kurti brings the colour and movement you expect from desi dressing, while blue flared denim keeps the silhouette modern and street-readable. The high-low hem is doing quiet work — it shows the flare of the jeans instead of hiding them under a straight kurta line.",
          "Silver hoops are enough jewellery; you do not need a full oxidised stack for this to land. Wear it for daytime plans, college, or a casual office that allows personality. If your wardrobe already leans western on the bottom half, this is the easiest on-ramp into fusion without buying a full festive set.",
        ],
      },
      {
        id: "aJbNlSnK1BQ",
        label: "Street",
        lookId: "bs-01",
        lookTitle: "Oversized Print × Flare Pants",
        body: [
          "Street looks fall apart when every piece shouts. This one lets the oversized all-over-print top carry the graphic energy, then grounds it with clean black flare pants so the outfit still photographs as a set, not a random tee day. The volume on top plus the long line of the flare is a classic proportion trick — it reads current without needing heavy layering.",
          "Keep shoes simple (sneakers or flats) and let the print be the conversation. This is Friday-evening and weekend energy: coffee runs, errands that somehow become plans, anything where you want to look put-together in under a minute. If you already own black flares, you are halfway there — the top is the update.",
        ],
      },
      {
        id: "Ab8Eqdp_beg",
        label: "Desi Casual",
        lookId: "dck-01",
        lookTitle: "Printed Kurta × Cotton Straight",
        body: [
          "Everyday desi dressing should feel like something you can live in, not something you save for a photograph. A brown printed short kurta with cotton straight pants is that uniform: soft fabric, familiar silhouette, enough print to look considered. It is the opposite of stiff festive wear — closer to how people actually move through a Sunday.",
          "Pair it with flat footwear and small silver hoops; skip the heavy dupatta unless you want one. This look earns its place because it bridges house-to-outside without a costume change. If Indo-Western is your mid-week experiment and street is your night-out volume, desi casual is the reset — still shoppable, still intentional, still very much DesiFit.",
        ],
      },
    ],
    outro: [
      "All three outfits are on DesiFit with verified item links — tap through from the buttons below each video, or browse the full women’s lookbooks when you want more options in the same lane. Same edit ships on our Shorts; this page is the longer read for when you want the why, not only the scroll.",
    ],
  },
];

/** Set SHOW_SCHEDULED_POSTS=true at build time to preview future posts (PR/local only). */
const showScheduled = import.meta.env.SHOW_SCHEDULED_POSTS === "true";

export function isPostLive(post: BlogPost, now = new Date()): boolean {
  if (showScheduled) return true;
  return new Date(post.publishAt).getTime() <= now.getTime();
}

export function getLivePosts(now = new Date()): BlogPost[] {
  return blogPosts
    .filter((p) => isPostLive(p, now))
    .sort((a, b) => +new Date(b.publishAt) - +new Date(a.publishAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

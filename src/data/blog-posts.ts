export type BlogVideo = {
  id: string;
  label: string;
  lookId: string;
  lookTitle: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO 8601 with offset — post is public only at/after this instant */
  publishAt: string;
  videos: BlogVideo[];
};

/**
 * Weekly lookbook posts. Keep copy short and mobile-scannable.
 * publishAt uses IST (+05:30) to match the social schedule.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "week-of-oct-13-fusion-street-desi",
    title: "3 looks this week: Fusion, Street & Desi Casual",
    description:
      "Three short lookbook videos — Indo-Western fusion, oversized street, and everyday desi — with shoppable links on DesiFit.",
    // Sat Oct 17, 2026 · 9:30 PM IST (= same window as the Desi YouTube Short)
    publishAt: "2026-10-17T21:30:00+05:30",
    videos: [
      {
        id: "kVjGlCDYbwk",
        label: "Fusion",
        lookId: "skd-02",
        lookTitle: "Maroon Kurti × Flared Denim",
      },
      {
        id: "aJbNlSnK1BQ",
        label: "Street",
        lookId: "bs-01",
        lookTitle: "Oversized Print × Flare Pants",
      },
      {
        id: "Ab8Eqdp_beg",
        label: "Desi Casual",
        lookId: "dck-01",
        lookTitle: "Printed Kurta × Cotton Straight",
      },
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

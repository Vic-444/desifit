import wallData from "./wall-looks.json";

export type WallItem = {
  name: string;
  brand: string;
  price: string;
  /** Optional MRP / list price for strikethrough display */
  mrp?: string;
  affiliateUrl: string;
  imageUrl: string;
};

export type WallLook = {
  id: string;
  title: string;
  description: string;
  image: string;
  items: WallItem[];
};

export const wallLooks = wallData.looks as WallLook[];

/**
 * Midweek freshness without new curation:
 * Wed–Sat (Asia/Kolkata) → move bottom 10 looks to the top.
 * Sun–Tue → keep JSON order.
 */
export function getDisplayWallLooks(
  looks: WallLook[] = wallLooks,
  now = new Date()
): WallLook[] {
  const ordered = [...looks];
  if (ordered.length < 10) return ordered;

  // 0=Sun … 6=Sat in IST
  const day = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  ).getDay();

  const midweek = day >= 3 && day <= 6; // Wed–Sat
  if (!midweek) return ordered;

  const n = 10;
  return [...ordered.slice(-n), ...ordered.slice(0, -n)];
}

/** Enforce unique wall images (launch / weekly refresh guard). */
export function assertUniqueWallImages(looks: WallLook[] = wallLooks): void {
  const seen = new Set<string>();
  for (const look of looks) {
    if (seen.has(look.image)) {
      throw new Error(`Duplicate wall image for look ${look.id}: ${look.image}`);
    }
    seen.add(look.image);
  }
}

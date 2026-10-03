#!/usr/bin/env node
/**
 * Merges a thin Men's studio (3×10 Bewakoof looks) into existing looks.json
 * without regenerating women's catalog / images.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const looksPath = join(root, "src/data/looks.json");

const BASE = "https://tjzuh.com/g/el5arbwari0be660c0628f3bde6dea/";

function wrap(productUrl, subid) {
  return `${BASE}?ulp=${encodeURIComponent(productUrl)}&subid=${subid}`;
}

function item(name, price, productUrl, role, lookId) {
  const subid = `${lookId.replace(/-/g, "")}-${role}`;
  return {
    name,
    brand: "Bewakoof",
    price,
    productUrl,
    affiliateUrl: wrap(productUrl, subid),
    imageUrl: "",
    role,
  };
}

function look(id, title, items) {
  return {
    id,
    title,
    image: `/images/looks/${id}.svg`,
    items,
  };
}

const T = {
  blackTee: ["Men's Black Oversized T-shirt", "₹699", "https://www.bewakoof.com/p/men-black-plain-plain-t-shirt"],
  greenTee: ["Men's Sun-Kissed Green T-shirt", "₹499", "https://www.bewakoof.com/p/plain-half-sleeves-t-shirt-men-green-78"],
  whiteTee: ["Men's White Oversized T-shirt", "₹499", "https://www.bewakoof.com/p/white-half-sleeve-relaxed-fit-t-shirt"],
  arcticGreen: ["Men's Green Oversized T-shirt", "₹509", "https://www.bewakoof.com/p/mens-arctic-solid-t-shirt"],
  moanaBlue: ["Men's Skipper Blue Moana Oversized Acid Wash T-shirt", "₹649", "https://www.bewakoof.com/p/mens-skipper-blue-moana-graphic-printed-oversized-plus-size-acid-wash-t-shirt-skipper-blue"],
  mostWanted: ["Men's Brown Most Wanted Graphic Oversized T-shirt", "₹799", "https://www.bewakoof.com/p/mens-brown-most-wanted-graphic-printed-oversized-t-shirt"],
  fakinit: ["Men's Brown Fakinit Graphic Oversized T-shirt", "₹499", "https://www.bewakoof.com/p/mens-brown-fakinit-graphic-printed-oversized-t-shirt"],
  sonu: ["Men's Brown Sonu Graphic Oversized T-shirt", "₹499", "https://www.bewakoof.com/p/men-printed-oversized-t-shirt-70"],
  greyCargoShirt: ["Men's Grey Oversized Cargo Shirt", "₹1,299", "https://www.bewakoof.com/p/mens-grey-oversized-cargo-shirt"],
  blackCargoShirt: ["Men's Jet Black Oversized Cargo Shirt", "₹1,299", "https://www.bewakoof.com/p/mens-jet-black-badge-printed-oversized-shirt-men"],
  greenShirt: ["Men's Green Textured Oversized Shirt", "₹1,019", "https://www.bewakoof.com/p/mens-green-textured-oversized-shirt"],
  creamShirt: ["Men's Cream Typography Oversized Shirt", "₹1,399", "https://www.bewakoof.com/p/mens-cream-printed-oversized-shirt-cream"],
  garaShirt: ["Men's Brown Gara Graphic Oversized Shirt", "₹710", "https://www.bewakoof.com/p/mens-gara-shirt-brown-graphic-printed-oversized-shirt"],
  whiteKurta: ["Men's White Relaxed Fit Short Kurta", "₹799", "https://www.bewakoof.com/p/white-basic-solid-kurta"],
  tealKurta: ["Men's Crystal Teal Relaxed Fit Short Kurta", "₹899", "https://www.bewakoof.com/p/mens-plus-size-crystal-teal-solid-short-kurta"],
};

const Btm = {
  blackTaper: ["Men's Jet Black Tapered Fit Cargo Pants", "₹1,039", "https://www.bewakoof.com/p/mens-jet-black-oversized-cargo-pants-jet-black"],
  blackNylon: ["Men's Jet Black Nylon Cargo Parachute Pants", "₹1,299", "https://www.bewakoof.com/p/mens-jet-black-cargo-pants-jet-black"],
  blackBaggy: ["Men's Jet Black Baggy Oversized Cargo Pants", "₹1,429", "https://www.bewakoof.com/p/mens-jet-black-oversized-plus-size-cargo-pants-jet-black"],
  blueCargo: ["Men's Blue Baggy Oversized Cargo Pants", "₹1,299", "https://www.bewakoof.com/p/mens-blue-oversized-cargo-pants"],
  greyJeans: ["Men's Ash Grey Baggy Fit Washed Cargo Jeans", "₹1,699", "https://www.bewakoof.com/p/mens-grey-washed-straight-fit-cargo-jeans-grey"],
  beigeJeans: ["Men's Beige Baggy Fit Cargo Carpenter Jeans", "₹1,499", "https://www.bewakoof.com/p/mens-beige-straight-fit-jeans-beigee"],
  indigoJeans: ["Men's Dark Blue Baggy Fit Washed Cargo Jeans", "₹889", "https://www.bewakoof.com/p/mens-indigo-blue-washed-straight-fit-cargo-jeans-indigo-12"],
  navyShorts: ["Men's Navy Blue Oversized Cargo Shorts", "₹799", "https://www.bewakoof.com/p/mens-blue-oversized-cargo-shorts"],
};

function pair(lookId, title, topKey, bottomKey) {
  const [tn, tp, tu] = T[topKey];
  const [bn, bp, bu] = Btm[bottomKey];
  return look(lookId, title, [
    item(tn, tp, tu, "top", lookId),
    item(bn, bp, bu, "bottom", lookId),
  ]);
}

const mensCategory = {
  id: "mens",
  title: "Men's Studio",
  description:
    "Lean men's lookbooks — casual tees, oversized street layers, and short kurtas paired with real Bewakoof bottoms.",
  studio: "men",
  subcategories: [
    {
      id: "tees-denim",
      title: "Tees & Denim",
      description: "Everyday graphic and plain tees with baggy denim and cargo jeans.",
      looks: [
        pair("mtd-01", "Black Oversized Tee × Ash Grey Cargo Jeans", "blackTee", "greyJeans"),
        pair("mtd-02", "Sun-Kissed Green Tee × Dark Blue Cargo Jeans", "greenTee", "indigoJeans"),
        pair("mtd-03", "White Oversized Tee × Beige Carpenter Jeans", "whiteTee", "beigeJeans"),
        pair("mtd-04", "Arctic Green Tee × Blue Baggy Cargo", "arcticGreen", "blueCargo"),
        pair("mtd-05", "Most Wanted Brown Tee × Ash Grey Cargo Jeans", "mostWanted", "greyJeans"),
        pair("mtd-06", "Fakinit Brown Tee × Dark Blue Cargo Jeans", "fakinit", "indigoJeans"),
        pair("mtd-07", "Sonu Brown Tee × Beige Carpenter Jeans", "sonu", "beigeJeans"),
        pair("mtd-08", "Black Oversized Tee × Blue Baggy Cargo", "blackTee", "blueCargo"),
        pair("mtd-09", "White Oversized Tee × Ash Grey Cargo Jeans", "whiteTee", "greyJeans"),
        pair("mtd-10", "Sun-Kissed Green Tee × Beige Carpenter Jeans", "greenTee", "beigeJeans"),
      ],
    },
    {
      id: "oversized-street",
      title: "Oversized & Street",
      description: "Cargo shirts, acid-wash graphics, and parachute / baggy cargos.",
      looks: [
        pair("mos-01", "Jet Black Cargo Shirt × Black Tapered Cargo", "blackCargoShirt", "blackTaper"),
        pair("mos-02", "Grey Cargo Shirt × Black Nylon Parachute", "greyCargoShirt", "blackNylon"),
        pair("mos-03", "Green Textured Shirt × Black Baggy Cargo", "greenShirt", "blackBaggy"),
        pair("mos-04", "Cream Typography Shirt × Blue Baggy Cargo", "creamShirt", "blueCargo"),
        pair("mos-05", "Gara Brown Shirt × Ash Grey Cargo Jeans", "garaShirt", "greyJeans"),
        pair("mos-06", "Moana Skipper Blue Tee × Navy Cargo Shorts", "moanaBlue", "navyShorts"),
        pair("mos-07", "Jet Black Cargo Shirt × Black Nylon Parachute", "blackCargoShirt", "blackNylon"),
        pair("mos-08", "Grey Cargo Shirt × Black Baggy Cargo", "greyCargoShirt", "blackBaggy"),
        pair("mos-09", "Green Textured Shirt × Navy Cargo Shorts", "greenShirt", "navyShorts"),
        pair("mos-10", "Cream Typography Shirt × Black Tapered Cargo", "creamShirt", "blackTaper"),
      ],
    },
    {
      id: "ethnic-casual",
      title: "Ethnic Casual",
      description: "Short kurtas and calm layers for desi-casual days.",
      looks: [
        pair("mec-01", "White Short Kurta × Ash Grey Cargo Jeans", "whiteKurta", "greyJeans"),
        pair("mec-02", "Crystal Teal Short Kurta × Dark Blue Cargo Jeans", "tealKurta", "indigoJeans"),
        pair("mec-03", "White Short Kurta × Beige Carpenter Jeans", "whiteKurta", "beigeJeans"),
        pair("mec-04", "Crystal Teal Short Kurta × Blue Baggy Cargo", "tealKurta", "blueCargo"),
        pair("mec-05", "White Short Kurta × Navy Cargo Shorts", "whiteKurta", "navyShorts"),
        pair("mec-06", "Crystal Teal Short Kurta × Ash Grey Cargo Jeans", "tealKurta", "greyJeans"),
        pair("mec-07", "White Short Kurta × Dark Blue Cargo Jeans", "whiteKurta", "indigoJeans"),
        pair("mec-08", "Crystal Teal Short Kurta × Beige Carpenter Jeans", "tealKurta", "beigeJeans"),
        pair("mec-09", "White Short Kurta × Blue Baggy Cargo", "whiteKurta", "blueCargo"),
        pair("mec-10", "Crystal Teal Short Kurta × Navy Cargo Shorts", "tealKurta", "navyShorts"),
      ],
    },
  ],
};

function placeholderSvg(lk) {
  const title = lk.title.replace(/[<>&]/g, "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171411"/>
      <stop offset="55%" stop-color="#2c2620"/>
      <stop offset="100%" stop-color="#e63946"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <circle cx="640" cy="180" r="160" fill="#f6f3ef" fill-opacity="0.08"/>
  <circle cx="120" cy="820" r="220" fill="#c4a484" fill-opacity="0.16"/>
  <text x="48" y="120" fill="#f6f3ef" font-family="Georgia, serif" font-size="42" font-weight="700">DesiFit</text>
  <text x="48" y="180" fill="#c4a484" font-family="system-ui,sans-serif" font-size="18" letter-spacing="3">MEN'S STUDIO</text>
  <foreignObject x="48" y="420" width="700" height="280">
    <div xmlns="http://www.w3.org/1999/xhtml" style="color:#f6f3ef;font-family:Georgia,serif;font-size:34px;line-height:1.25;font-weight:600;">${title}</div>
  </foreignObject>
  <text x="48" y="920" fill="#c4a484" font-family="system-ui,sans-serif" font-size="18">Bewakoof</text>
</svg>`;
}

/**
 * Bewakoof blocks plain HTTP scrapes (403). Use a real Chromium session via
 * playwright-core when available; fall back to SVG placeholders otherwise.
 */
async function fetchOgImageWithBrowser(urls) {
  const cache = new Map();
  let chromium;
  try {
    ({ chromium } = await import("playwright-core"));
  } catch {
    console.warn("playwright-core not installed — men's images will be placeholders.");
    console.warn("Install with: npm i -D playwright-core  (Chrome system binary is fine)");
    for (const url of urls) cache.set(url, "");
    return cache;
  }

  const { existsSync } = await import("node:fs");
  const chrome =
    process.env.CHROME_PATH ||
    ["/usr/bin/google-chrome-stable", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) =>
      existsSync(p)
    );

  const browser = await chromium.launch({
    headless: true,
    executablePath: chrome,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  let i = 0;
  for (const url of urls) {
    i++;
    process.stdout.write(`\r  ${i}/${urls.size}`);
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(1500);
      let og = await page.locator('meta[property="og:image"]').getAttribute("content");
      if (!og) {
        const imgs = await page.$$eval("img", (els) =>
          els
            .map((e) => e.src)
            .filter((s) => s.includes("images.bewakoof.com"))
        );
        og = (imgs.find((s) => s.includes("/original/")) || imgs[0] || "").replace(
          "/t96/",
          "/original/"
        );
      }
      cache.set(url, og ? og.replace(/^http:\/\//, "https://") : "");
    } catch {
      cache.set(url, "");
    }
  }
  console.log("");
  await browser.close();
  return cache;
}

async function enrichMens(category) {
  const urls = new Set();
  for (const sub of category.subcategories) {
    for (const lk of sub.looks) {
      for (const it of lk.items) urls.add(it.productUrl);
    }
  }
  console.log(`Enriching men's images for ${urls.size} product URLs (browser)...`);
  const cache = await fetchOgImageWithBrowser(urls);
  console.log(`Got ${[...cache.values()].filter(Boolean).length}/${urls.size} merchant images.`);

  mkdirSync(join(root, "public/images/looks"), { recursive: true });

  for (const sub of category.subcategories) {
    for (const lk of sub.looks) {
      for (const it of lk.items) {
        it.imageUrl = cache.get(it.productUrl) || "";
      }
      const top = lk.items.find((it) => it.role === "top" && it.imageUrl);
      const first = top || lk.items.find((it) => it.imageUrl);
      if (first) {
        lk.image = first.imageUrl;
        lk.imageSource = "merchant";
      } else {
        lk.imageSource = "placeholder";
        const svgPath = join(root, "public/images/looks", `${lk.id}.svg`);
        writeFileSync(svgPath, placeholderSvg(lk));
        lk.image = `/images/looks/${lk.id}.svg`;
      }
    }
  }
}

const data = JSON.parse(readFileSync(looksPath, "utf8"));

// Tag existing women's categories for studio filtering
for (const cat of data.categories) {
  if (!cat.studio) cat.studio = "women";
}

data.categories = data.categories.filter((c) => c.id !== "mens");
await enrichMens(mensCategory);
data.categories.push(mensCategory);
data.generatedAt = new Date().toISOString().slice(0, 10);

writeFileSync(looksPath, JSON.stringify(data, null, 2));

let looks = 0;
for (const cat of data.categories) {
  for (const sub of cat.subcategories) looks += sub.looks.length;
}
console.log(`Wrote ${looksPath}`);
console.log(`Categories: ${data.categories.length} | Looks: ${looks}`);
console.log(`Men's looks: 30`);

#!/usr/bin/env node
/**
 * Builds src/data/looks.json from curated DesiFit shortlists.
 * Wraps merchant PDPs with Admitad deep links. Optionally enriches images.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const BASES = {
  Bewakoof: "https://tjzuh.com/g/el5arbwari0be660c0628f3bde6dea/",
  BlissClub: "https://tjzuh.com/g/f7dkjuc7zj0be660c062519b939af8/",
  Salty: "https://tjzuh.com/g/9idoi1gyuy0be660c0620c509bedc5/",
};

function wrap(brand, productUrl, subid) {
  return `${BASES[brand]}?ulp=${encodeURIComponent(productUrl)}&subid=${subid}`;
}

function item(name, brand, price, productUrl, role, lookId) {
  const subid = `${lookId.replace(/-/g, "")}-${role}`;
  return {
    name,
    brand,
    price,
    productUrl,
    affiliateUrl: wrap(brand, productUrl, subid),
    imageUrl: "",
    role,
  };
}

function look(id, title, items) {
  return {
    id,
    title,
    image: `/images/looks/${id}.svg`,
    items: items.map((it, i) => ({
      ...it,
      role: it.role || (i === 0 ? "top" : i === 1 ? "bottom" : "acc"),
    })),
  };
}

// Product URL helpers (verified live 27 Sep 2026)
const B = {
  brownKurta: "https://www.bewakoof.com/p/aop-v-notch-mandarin-neck-3-4th-sleeve-kurtas",
  printedKurta: "https://www.bewakoof.com/p/aop-v-notch-mandarins-neck-3-4th-sleeve-kurta",
  maroonKurti: "https://www.bewakoof.com/p/womens-mid-printed-kurta",
  navyKurti: "https://www.bewakoof.com/p/womens-long-aop-kurta-dress-women",
  swissDot: "https://www.bewakoof.com/p/brooklyn-blue-swiss-dot-sleevless-long-kurta",
  greenKurti: "https://www.bewakoof.com/p/olive-solid-3-4th-sleeve-ethnic-flared-dress",
  jetBlackTop: "https://www.bewakoof.com/p/womens-jet-black-slim-fit-acid-wash-short-top",
  whiteTop: "https://www.bewakoof.com/p/women-white-plain-crop-t-shirt",
  blossomTop: "https://www.bewakoof.com/p/womens-skipper-blue-blossom-graphic-printed-top",
  parachuteTop: "https://www.bewakoof.com/p/womens-black-short-top-women-black-plain",
  aopOversize: "https://www.bewakoof.com/p/women-aop-oversize-t-shirt-3",
  noodles: "https://www.bewakoof.com/p/womens-jet-black-powered-by-noodles-graphic-printed-oversized-short-top",
  whatsDoc: "https://www.bewakoof.com/p/womens-black-whats-doc-graphic-printed-oversized-t-shirt",
  blueAopShirt: "https://www.bewakoof.com/p/womens-blue-all-over-printed-oversized-crop-shirt",
  rickMonty: "https://www.bewakoof.com/p/womens-black-rick-n-monty-chats-graphic-printed-oversized-short-top",
  mickeyShirt: "https://www.bewakoof.com/p/women-oversized-printed-shirt-3",
  leadShirt: "https://www.bewakoof.com/p/womens-white-lead-printed-oversized-crop-shirt",
  snoopy: "https://www.bewakoof.com/p/womens-green-thrill-seeker-snoopy-graphic-printed-oversized-short-top",
  blackCropShirt: "https://www.bewakoof.com/p/women-oversized-solid-shirt-1-women-black",
  blackSlimTee: "https://www.bewakoof.com/p/jet-black-half-sleeve-plain-t-shirt-for-women",
  blackCropShirt2: "https://www.bewakoof.com/p/women-oversized-shirt-8",
  greyCargo: "https://www.bewakoof.com/p/womens-dark-grey-wide-leg-cargo-jeans",
  blackCargo: "https://www.bewakoof.com/p/womens-black-wide-leg-cargo-jeans-women",
  lightCargo: "https://www.bewakoof.com/p/womens-light-blue-wide-leg-cargo-jeans-women",
  darkBlueCargo: "https://www.bewakoof.com/p/womens-dark-blue-wide-leg-cargo-jeans-women",
  blueStraight: "https://www.bewakoof.com/p/womens-blue-straight-fit-high-rise-jeans-bleach",
  blackBootcut: "https://www.bewakoof.com/p/womens-jet-black-bootcut-jeans",
  blueFlare: "https://www.bewakoof.com/p/womens-blue-flared-jeans-blue-denim-83-women",
  blackFlare: "https://www.bewakoof.com/p/womens-jet-black-flared-jeans-black-01",
  blackBaggy: "https://www.bewakoof.com/p/womens-black-straight-fit-high-rise-jeans-jet-black",
};

const C = {
  ultimateFlare: "https://blissclub.com/products/the-ultimate-flare-pants",
  ultimateStraight: "https://blissclub.com/products/straight-pants-with-2-zipper-pockets",
  flareLite: "https://blissclub.com/products/ultimate-flare-pants-lite",
  flareLiteAlt: "https://blissclub.com/products/yoga-flare-pants-with-polyester-fabric-and-hidden-back-pocket",
  straightLite: "https://blissclub.com/products/ultimate-straight-pants-lite",
  airmeltFlare: "https://blissclub.com/products/airmelt-flare-pants-lite",
  werkIt: "https://blissclub.com/products/werk-it-flare-pants",
  palazzo: "https://blissclub.com/products/ultimate-palazzo-pants",
  cloudKorean: "https://blissclub.com/products/cloud-korean-pants",
  sculptWide: "https://blissclub.com/products/ultimate-sculpt-wide-legged-pants",
  workWineFlare: "https://blissclub.com/products/work-to-wine-twill-wide-leg-flare-pants",
  workWineStraight: "https://blissclub.com/products/work-to-wine-twill-straight-pants",
  ampmStraight: "https://blissclub.com/products/all-day-cotton-straight-pants",
  ampmFlare: "https://blissclub.com/products/am-pm-cotton-flare-pants",
  grooveLeggings: "https://blissclub.com/products/high-waisted-cotton-ankle-length-leggings-with-2-pockets",
  grooveFlare: "https://blissclub.com/products/high-waisted-cotton-flare-pants-with-4-pockets",
  ultimateLeggings: "https://blissclub.com/products/ultimate-leggings",
  zenims: "https://blissclub.com/products/wide-leg-zenims",
  cigarette: "https://blissclub.com/products/ultimate-cigarette-pants",
  barebutter: "https://blissclub.com/products/barebutter-straight-pants",
  boxPleat: "https://blissclub.com/products/cloud-box-pleated-korean-pant",
};

const S = {
  cascadeGleam: "https://salty.co.in/products/cascade-gleam-drop-earrings",
  gleamHalo: "https://salty.co.in/products/gleam-halo-hoops-earrings-silver",
  lustreHalo: "https://salty.co.in/products/lustre-halo-statement-drop-earrings-silver",
  haloCushion: "https://salty.co.in/products/halo-cushion-drop-earrings-silver",
  deepSea: "https://salty.co.in/products/deep-sea-spark-earrings",
  icyArc: "https://salty.co.in/products/icy-arc-drop-earrings",
  rendezvous: "https://salty.co.in/products/rendezvous-silver-chain",
  silverElegance: "https://salty.co.in/products/silver-elegance-necklace",
  classicBeauty: "https://salty.co.in/products/classic-beauty-silver-necklace",
  loveKnot: "https://salty.co.in/products/linked-by-love-knot-bracelet-silver",
  fallingLove: "https://salty.co.in/products/falling-in-love-silver-necklace",
  crystalDew: "https://salty.co.in/products/crystal-dew-drop-earrings",
  zenith: "https://salty.co.in/products/zenith-cascade-drop-earrings",
  silverDroplet: "https://salty.co.in/products/silver-droplet-earrings",
  cascadeCrystal: "https://salty.co.in/products/cascade-crystal-drop-earrings",
  azure: "https://salty.co.in/products/azure-royale-drop-earrings",
  glimmer: "https://salty.co.in/products/glimmer-tear-drop-earrings-silver",
  iceLoop: "https://salty.co.in/products/ice-loop-spark-earrings",
  boldHoops: "https://salty.co.in/products/bold-silver-hoop-earrings",
  dBold: "https://salty.co.in/products/d-bold-chain",
  mariposa: "https://salty.co.in/products/mariposa-black-chain",
  evilEye: "https://salty.co.in/products/traditional-evil-eye-bangle",
  hades: "https://salty.co.in/products/hades-classic-black-thick-bracelet",
  goldHeart: "https://salty.co.in/products/luxe-gold-heart-pendant-necklace",
  goldHoopsSet: "https://salty.co.in/products/set-of-3-minimal-golden-hoop-earrings",
  tennis: "https://salty.co.in/products/radiance-tennis-bracelet-silver",
  infinityRing: "https://salty.co.in/products/boundless-infinity-white-loop-ring",
  pearlHoops: "https://salty.co.in/products/pure-pearls-hoops",
  classicChicGold: "https://salty.co.in/products/classic-chic-golden-necklace",
  geometricGold: "https://salty.co.in/products/geometric-chain-gold-necklace",
  florentia: "https://salty.co.in/products/florentia-luxe-minimal-bracelet",
  molten: "https://salty.co.in/products/molten-gold-necklace",
  celeste: "https://salty.co.in/products/celeste-etoile-crystal-studs-earrings",
  lumiere: "https://salty.co.in/products/lumiere-oval-halo-studs-earrings",
  bloomRing: "https://salty.co.in/products/adjustable-bloom-link-ring",
  stmtSunglasses: "https://salty.co.in/products/statement-rectangular-black-uv-protection-sunglasses",
  ebonPin: "https://salty.co.in/products/ebon-hair-pin",
  blackout: "https://salty.co.in/products/blackout-retro-sunglasses",
  bohoScarf: "https://salty.co.in/products/boho-feather-scarf",
  mocha: "https://salty.co.in/products/mocha-curve-luxury-sunglasses",
  watchRing: "https://salty.co.in/products/girl-boss-salty-watch-ring-gold",
  jadeWink: "https://salty.co.in/products/jade-wink-brown-rectangular-sunglasses",
  lilacPin: "https://salty.co.in/products/lilac-hair-pin",
  wayfarer: "https://salty.co.in/products/essential-wayfarer-shades-black",
  silverWatch: "https://salty.co.in/products/white-dial-silver-quartz-watch-for-women",
  frostHue: "https://salty.co.in/products/frost-hue-sunglasses",
  frostScarf: "https://salty.co.in/products/frost-aura-fashion-scarf",
  hexagon: "https://salty.co.in/products/retro-hexagon-uv400-protection-sunglasses-brown",
  cocoaScarf: "https://salty.co.in/products/cocoa-chic-satin-scarf",
  veraVolt: "https://salty.co.in/products/vera-volt-sunglasses",
  gardaScarf: "https://salty.co.in/products/garda-provence-satin-scarf",
};

const catalog = {
  generatedAt: "2026-09-27",
  merchants: BASES,
  categories: [
    {
      id: "indo-western",
      title: "Indo-Western Fusion",
      description: "Desi prints and silhouettes mixed with modern cuts — curated outfits you can shop piece by piece.",
      subcategories: [
        {
          id: "short-kurtis-denim",
          title: "Short Kurtis & Denim",
          description: "Short kurtis and tops paired with real denim bottoms.",
          looks: [
            look("skd-01", "Brown Printed Short Kurta × Wide Leg Cargo", [
              item("Women's Brown Printed Short Kurta", "Bewakoof", "₹549", B.brownKurta, "top", "skd-01"),
              item("Women's Dark Grey Washed Wide Leg Cargo Jeans", "Bewakoof", "₹799", B.greyCargo, "bottom", "skd-01"),
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "acc", "skd-01"),
            ]),
            look("skd-02", "Maroon High-Low Kurti × Blue Flared Denim", [
              item("Women's Maroon Printed High Low Kurti", "Bewakoof", "₹354", B.maroonKurti, "top", "skd-02"),
              item("Women's Blue Flared Washed Korean Jeans", "Bewakoof", "₹819", B.blueFlare, "bottom", "skd-02"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹446", S.gleamHalo, "acc", "skd-02"),
            ]),
            look("skd-03", "Printed Short Kurta × Light Blue Cargo", [
              item("Women's Printed Short Kurta", "Bewakoof", "₹299", B.printedKurta, "top", "skd-03"),
              item("Women's Light Blue Washed Wide Leg Cargo Jeans", "Bewakoof", "₹809", B.lightCargo, "bottom", "skd-03"),
              item("Lustre Halo Statement Drop Earrings - Silver", "Salty", "₹399", S.lustreHalo, "acc", "skd-03"),
            ]),
            look("skd-04", "Navy Sleeveless Kurti × Dark Blue Wide Leg", [
              item("Women's Navy Printed Sleeveless Kurti Dress", "Bewakoof", "₹549", B.navyKurti, "top", "skd-04"),
              item("Women's Dark Blue Washed Wide Leg Cargo Jeans", "Bewakoof", "₹1,079", B.darkBlueCargo, "bottom", "skd-04"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "acc", "skd-04"),
            ]),
            look("skd-05", "Swiss Dot Blue Kurta × Straight Blue Jeans", [
              item("Women's Cotton Swiss Dot Dobby Sleeveless Classic Blue Kurta", "Bewakoof", "₹399", B.swissDot, "top", "skd-05"),
              item("Women's Blue Washed Straight Fit Jeans", "Bewakoof", "₹1,599", B.blueStraight, "bottom", "skd-05"),
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "acc", "skd-05"),
            ]),
            look("skd-06", "Jet Black Embroidered Top × Black Bootcut", [
              item("Women's Jet Black Embroidered Slim Fit Acid Wash Short Top", "Bewakoof", "₹599", B.jetBlackTop, "top", "skd-06"),
              item("Women's Jet Black Bootcut Jeans", "Bewakoof", "₹769", B.blackBootcut, "bottom", "skd-06"),
              item("Deep Sea Spark Earrings", "Salty", "₹579", S.deepSea, "acc", "skd-06"),
            ]),
            look("skd-07", "White Oversized Short Top × Black Wide Leg Cargo", [
              item("Women's White Oversized Short Top", "Bewakoof", "₹287", B.whiteTop, "top", "skd-07"),
              item("Women's Black Wide Leg Cargo Jeans", "Bewakoof", "₹809", B.blackCargo, "bottom", "skd-07"),
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "acc", "skd-07"),
            ]),
            look("skd-08", "Skipper Blue Blossom × Jet Black Flared", [
              item("Women's Skipper Blue Blossom Graphic Printed Short Top", "Bewakoof", "₹321", B.blossomTop, "top", "skd-08"),
              item("Women's Jet Black Washed Flared Korean Jeans", "Bewakoof", "₹1,399", B.blackFlare, "bottom", "skd-08"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "acc", "skd-08"),
            ]),
            look("skd-09", "Black Parachute Short Top × Baggy Straight Denim", [
              item("Women's Black Parachute Short Top", "Bewakoof", "₹349", B.parachuteTop, "top", "skd-09"),
              item("Women's Black Baggy Straight Fit Jeans", "Bewakoof", "₹1,299", B.blackBaggy, "bottom", "skd-09"),
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "acc", "skd-09"),
            ]),
            look("skd-10", "Brown Printed Short Kurta × Blue Flared Denim", [
              item("Women's Brown Printed Short Kurta", "Bewakoof", "₹549", B.brownKurta, "top", "skd-10"),
              item("Women's Blue Flared Washed Korean Jeans", "Bewakoof", "₹819", B.blueFlare, "bottom", "skd-10"),
              item("Icy Arc Drop Earrings", "Salty", "₹689", S.icyArc, "acc", "skd-10"),
            ]),
          ],
        },
        {
          id: "fusion-layering",
          title: "Fusion Sets & Layering",
          description: "Kurtis and tops layered over BlissClub stretch bottoms.",
          looks: [
            look("fl-01", "Brown Printed Short Kurta × Ultimate Flare", [
              item("Women's Brown Printed Short Kurta", "Bewakoof", "₹549", B.brownKurta, "top", "fl-01"),
              item("Ultimate Flare Pants", "BlissClub", "₹1,499", C.ultimateFlare, "bottom", "fl-01"),
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "acc", "fl-01"),
            ]),
            look("fl-02", "Maroon High-Low Kurti × Ultimate Straight", [
              item("Women's Maroon Printed High Low Kurti", "Bewakoof", "₹354", B.maroonKurti, "top", "fl-02"),
              item("Ultimate Straight Pants", "BlissClub", "₹1,599", C.ultimateStraight, "bottom", "fl-02"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹446", S.gleamHalo, "acc", "fl-02"),
            ]),
            look("fl-03", "Navy Sleeveless Kurti × Ultimate Flare Lite", [
              item("Women's Navy Printed Sleeveless Kurti Dress", "Bewakoof", "₹549", B.navyKurti, "top", "fl-03"),
              item("Ultimate Flare Pants - Lite", "BlissClub", "₹999", C.flareLiteAlt, "bottom", "fl-03"),
              item("Lustre Halo Statement Drop Earrings - Silver", "Salty", "₹399", S.lustreHalo, "acc", "fl-03"),
            ]),
            look("fl-04", "Swiss Dot Blue Kurta × Ultimate Straight Lite", [
              item("Women's Cotton Swiss Dot Dobby Sleeveless Classic Blue Kurta", "Bewakoof", "₹399", B.swissDot, "top", "fl-04"),
              item("Ultimate Straight Pants - Lite", "BlissClub", "₹999", C.straightLite, "bottom", "fl-04"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "acc", "fl-04"),
            ]),
            look("fl-05", "Green Ethnic Kurti × AirMelt Flare Lite", [
              item("Women's Green Sleeveless Ethnic Kurti", "Bewakoof", "₹649", B.greenKurti, "top", "fl-05"),
              item("AirMelt™ Flare Pants - Lite", "BlissClub", "₹1,199", C.airmeltFlare, "bottom", "fl-05"),
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "acc", "fl-05"),
            ]),
            look("fl-06", "Printed Short Kurta × Werk-It Flare", [
              item("Women's Printed Short Kurta", "Bewakoof", "₹299", B.printedKurta, "top", "fl-06"),
              item("Werk-It Flare Pants", "BlissClub", "₹1,499", C.werkIt, "bottom", "fl-06"),
              item("Deep Sea Spark Earrings", "Salty", "₹579", S.deepSea, "acc", "fl-06"),
            ]),
            look("fl-07", "Jet Black Embroidered Top × Ultimate Palazzo", [
              item("Women's Jet Black Embroidered Slim Fit Acid Wash Short Top", "Bewakoof", "₹599", B.jetBlackTop, "top", "fl-07"),
              item("Ultimate Palazzo Pants", "BlissClub", "₹1,499", C.palazzo, "bottom", "fl-07"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "acc", "fl-07"),
            ]),
            look("fl-08", "Skipper Blue Blossom × Work-To-Wine Twill Flare", [
              item("Women's Skipper Blue Blossom Graphic Printed Short Top", "Bewakoof", "₹321", B.blossomTop, "top", "fl-08"),
              item("Work-To-Wine Twill Wide Leg Flare Pants", "BlissClub", "₹1,599", C.workWineFlare, "bottom", "fl-08"),
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "acc", "fl-08"),
            ]),
            look("fl-09", "White Oversized Short Top × Cloud Korean Pants", [
              item("Women's White Oversized Short Top", "Bewakoof", "₹287", B.whiteTop, "top", "fl-09"),
              item("Cloud Korean Pants", "BlissClub", "₹1,999", C.cloudKorean, "bottom", "fl-09"),
              item("Classic Beauty Silver Necklace", "Salty", "₹329", S.classicBeauty, "acc", "fl-09"),
            ]),
            look("fl-10", "Black Parachute Short Top × Ultimate Sculpt Wide-Leg", [
              item("Women's Black Parachute Short Top", "Bewakoof", "₹349", B.parachuteTop, "top", "fl-10"),
              item("Ultimate Sculpt Wide-Legged Pants", "BlissClub", "₹1,499", C.sculptWide, "bottom", "fl-10"),
              item("Icy Arc Drop Earrings", "Salty", "₹689", S.icyArc, "acc", "fl-10"),
            ]),
          ],
        },
        {
          id: "boho-streetwear",
          title: "Boho Streetwear",
          description: "Graphic and oversized tops with street denim or stretch bottoms.",
          looks: [
            look("bs-01", "Black AOP Oversized Top × Ultimate Flare", [
              item("Women's Black All Over Printed Oversized Short Top", "Bewakoof", "₹449", B.aopOversize, "top", "bs-01"),
              item("Ultimate Flare Pants", "BlissClub", "₹1,499", C.ultimateFlare, "bottom", "bs-01"),
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "acc", "bs-01"),
            ]),
            look("bs-02", "Powered By Noodles Crop × Dark Grey Cargo", [
              item("Women's Black Powered By Noodles Graphic Printed Oversized Crop T-shirt", "Bewakoof", "₹339", B.noodles, "top", "bs-02"),
              item("Women's Dark Grey Washed Wide Leg Cargo Jeans", "Bewakoof", "₹799", B.greyCargo, "bottom", "bs-02"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹446", S.gleamHalo, "acc", "bs-02"),
            ]),
            look("bs-03", "Whats Doc Crop × Ultimate Straight Lite", [
              item("Women's Black Whats Doc Graphic Printed Oversized Crop T-shirt", "Bewakoof", "₹399", B.whatsDoc, "top", "bs-03"),
              item("Ultimate Straight Pants - Lite", "BlissClub", "₹999", C.straightLite, "bottom", "bs-03"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "acc", "bs-03"),
            ]),
            look("bs-04", "Blue AOP Crop Shirt × Light Blue Cargo", [
              item("Women's Blue & White All Over Printed Oversized Crop Shirt", "Bewakoof", "₹429", B.blueAopShirt, "top", "bs-04"),
              item("Women's Light Blue Washed Wide Leg Cargo Jeans", "Bewakoof", "₹809", B.lightCargo, "bottom", "bs-04"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "acc", "bs-04"),
            ]),
            look("bs-05", "Rick N Monty Crop × Ultimate Flare Lite", [
              item("Women's Black Rick N Monty Chats Graphic Printed Oversized Short Top", "Bewakoof", "₹383", B.rickMonty, "top", "bs-05"),
              item("Ultimate Flare Pants - Lite", "BlissClub", "₹999", C.flareLiteAlt, "bottom", "bs-05"),
              item("Lustre Halo Statement Drop Earrings - Silver", "Salty", "₹399", S.lustreHalo, "acc", "bs-05"),
            ]),
            look("bs-06", "Mickey Oversized Crop Shirt × Wide Leg Zenims", [
              item("Women's Brown Mickey Graphic Printed Oversized Crop Shirt", "Bewakoof", "₹899", B.mickeyShirt, "top", "bs-06"),
              item("Wide Leg Zenims™", "BlissClub", "₹3,499", C.zenims, "bottom", "bs-06"),
              item("Deep Sea Spark Earrings", "Salty", "₹579", S.deepSea, "acc", "bs-06"),
            ]),
            look("bs-07", "White Lead Crop Shirt × Black Wide Leg Cargo", [
              item("Women's White Lead Typography Oversized Crop Shirt", "Bewakoof", "₹1,001", B.leadShirt, "top", "bs-07"),
              item("Women's Black Wide Leg Cargo Jeans", "Bewakoof", "₹809", B.blackCargo, "bottom", "bs-07"),
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "acc", "bs-07"),
            ]),
            look("bs-08", "Snoopy Green Crop × AirMelt Flare Lite", [
              item("Women's Green Thrill Seeker Snoopy Graphic Printed Oversized Short Top", "Bewakoof", "₹383", B.snoopy, "top", "bs-08"),
              item("AirMelt™ Flare Pants - Lite", "BlissClub", "₹1,199", C.airmeltFlare, "bottom", "bs-08"),
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "acc", "bs-08"),
            ]),
            look("bs-09", "Skipper Blue Blossom × Blue Flared Korean", [
              item("Women's Skipper Blue Blossom Graphic Printed Short Top", "Bewakoof", "₹321", B.blossomTop, "top", "bs-09"),
              item("Women's Blue Flared Washed Korean Jeans", "Bewakoof", "₹819", B.blueFlare, "bottom", "bs-09"),
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "acc", "bs-09"),
            ]),
            look("bs-10", "Jet Black Embroidered Top × Ultimate Sculpt Wide-Leg", [
              item("Women's Jet Black Embroidered Slim Fit Acid Wash Short Top", "Bewakoof", "₹599", B.jetBlackTop, "top", "bs-10"),
              item("Ultimate Sculpt Wide-Legged Pants", "BlissClub", "₹1,499", C.sculptWide, "bottom", "bs-10"),
              item("Icy Arc Drop Earrings", "Salty", "₹689", S.icyArc, "acc", "bs-10"),
            ]),
          ],
        },
      ],
    },
    {
      id: "desi-casual",
      title: "Desi Casual & Everyday",
      description: "Everyday ethnic-leaning outfits with comfort bottoms you can actually live in.",
      subcategories: [
        {
          id: "daily-cotton-kurtas",
          title: "Daily Cotton Kurtas",
          description: "Soft kurtas and daily tops with breathable BlissClub bottoms.",
          looks: [
            look("dck-01", "Brown Printed Short Kurta × AM:PM Cotton Straight", [
              item("Women's Brown Printed Short Kurta", "Bewakoof", "₹549", B.brownKurta, "top", "dck-01"),
              item("AM:PM Cotton Straight Pants", "BlissClub", "₹1,699", C.ampmStraight, "bottom", "dck-01"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹446", S.gleamHalo, "acc", "dck-01"),
            ]),
            look("dck-02", "Maroon High-Low Kurti × Groove-In Cotton Leggings", [
              item("Women's Maroon Printed High Low Kurti", "Bewakoof", "₹354", B.maroonKurti, "top", "dck-02"),
              item("Groove-In Cotton Leggings", "BlissClub", "₹1,299", C.grooveLeggings, "bottom", "dck-02"),
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "acc", "dck-02"),
            ]),
            look("dck-03", "Printed Short Kurta × Ultimate Flare Lite", [
              item("Women's Printed Short Kurta", "Bewakoof", "₹299", B.printedKurta, "top", "dck-03"),
              item("Ultimate Flare Pants - Lite", "BlissClub", "₹999", C.flareLite, "bottom", "dck-03"),
              item("Classic Beauty Silver Necklace", "Salty", "₹329", S.classicBeauty, "acc", "dck-03"),
            ]),
            look("dck-04", "Swiss Dot Blue Kurta × Ultimate Straight Lite", [
              item("Women's Cotton Swiss Dot Dobby Sleeveless Classic Blue Kurta", "Bewakoof", "₹399", B.swissDot, "top", "dck-04"),
              item("Ultimate Straight Pants - Lite", "BlissClub", "₹999", C.straightLite, "bottom", "dck-04"),
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "acc", "dck-04"),
            ]),
            look("dck-05", "Navy Sleeveless Kurti × AM:PM Cotton Flare", [
              item("Women's Navy Printed Sleeveless Kurti Dress", "Bewakoof", "₹549", B.navyKurti, "top", "dck-05"),
              item("AM:PM Cotton Flare Pants", "BlissClub", "₹1,599", C.ampmFlare, "bottom", "dck-05"),
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "acc", "dck-05"),
            ]),
            look("dck-06", "Green Ethnic Kurti × Ultimate Leggings", [
              item("Women's Green Sleeveless Ethnic Kurti", "Bewakoof", "₹649", B.greenKurti, "top", "dck-06"),
              item("Ultimate Leggings", "BlissClub", "₹1,399", C.ultimateLeggings, "bottom", "dck-06"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "acc", "dck-06"),
            ]),
            look("dck-07", "White Oversized Short Top × Groove-In Cotton Flare", [
              item("Women's White Oversized Short Top", "Bewakoof", "₹287", B.whiteTop, "top", "dck-07"),
              item("The Groove-In Cotton Flare Pants", "BlissClub", "₹1,899", C.grooveFlare, "bottom", "dck-07"),
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "acc", "dck-07"),
            ]),
            look("dck-08", "Jet Black Embroidered Top × Ultimate Straight", [
              item("Women's Jet Black Embroidered Slim Fit Acid Wash Short Top", "Bewakoof", "₹599", B.jetBlackTop, "top", "dck-08"),
              item("Ultimate Straight Pants", "BlissClub", "₹1,599", C.ultimateStraight, "bottom", "dck-08"),
              item("Lustre Halo Statement Drop Earrings - Silver", "Salty", "₹399", S.lustreHalo, "acc", "dck-08"),
            ]),
            look("dck-09", "Skipper Blue Blossom × AirMelt Flare Lite", [
              item("Women's Skipper Blue Blossom Graphic Printed Short Top", "Bewakoof", "₹321", B.blossomTop, "top", "dck-09"),
              item("AirMelt™ Flare Pants - Lite", "BlissClub", "₹1,199", C.airmeltFlare, "bottom", "dck-09"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "acc", "dck-09"),
            ]),
            look("dck-10", "Black Parachute Short Top × Ultimate Palazzo", [
              item("Women's Black Parachute Short Top", "Bewakoof", "₹349", B.parachuteTop, "top", "dck-10"),
              item("Ultimate Palazzo Pants", "BlissClub", "₹1,499", C.palazzo, "bottom", "dck-10"),
              item("Crystal Dew Drop Earrings", "Salty", "₹579", S.crystalDew, "acc", "dck-10"),
            ]),
          ],
        },
        {
          id: "kurti-comfort-bottoms",
          title: "Kurti & Comfort Bottoms",
          description: "Short kurtis and tops styled with all-day comfort bottoms.",
          looks: [
            look("kcb-01", "Printed Short Kurta × Ultimate Flare", [
              item("Women's Printed Short Kurta", "Bewakoof", "₹299", B.printedKurta, "top", "kcb-01"),
              item("Ultimate Flare Pants", "BlissClub", "₹1,499", C.ultimateFlare, "bottom", "kcb-01"),
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "acc", "kcb-01"),
            ]),
            look("kcb-02", "Brown Printed Short Kurta × Groove-In Cotton Leggings", [
              item("Women's Brown Printed Short Kurta", "Bewakoof", "₹549", B.brownKurta, "top", "kcb-02"),
              item("Groove-In Cotton Leggings", "BlissClub", "₹1,299", C.grooveLeggings, "bottom", "kcb-02"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹446", S.gleamHalo, "acc", "kcb-02"),
            ]),
            look("kcb-03", "Maroon High-Low Kurti × Ultimate Flare Lite", [
              item("Women's Maroon Printed High Low Kurti", "Bewakoof", "₹354", B.maroonKurti, "top", "kcb-03"),
              item("Ultimate Flare Pants - Lite", "BlissClub", "₹999", C.flareLite, "bottom", "kcb-03"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "acc", "kcb-03"),
            ]),
            look("kcb-04", "Green Ethnic Kurti × Ultimate Straight Lite", [
              item("Women's Green Sleeveless Ethnic Kurti", "Bewakoof", "₹649", B.greenKurti, "top", "kcb-04"),
              item("Ultimate Straight Pants - Lite", "BlissClub", "₹999", C.straightLite, "bottom", "kcb-04"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "acc", "kcb-04"),
            ]),
            look("kcb-05", "Swiss Dot Blue Kurta × Ultimate Leggings", [
              item("Women's Cotton Swiss Dot Dobby Sleeveless Classic Blue Kurta", "Bewakoof", "₹399", B.swissDot, "top", "kcb-05"),
              item("Ultimate Leggings", "BlissClub", "₹1,399", C.ultimateLeggings, "bottom", "kcb-05"),
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "acc", "kcb-05"),
            ]),
            look("kcb-06", "Navy Sleeveless Kurti × Werk-It Flare", [
              item("Women's Navy Printed Sleeveless Kurti Dress", "Bewakoof", "₹549", B.navyKurti, "top", "kcb-06"),
              item("Werk-It Flare Pants", "BlissClub", "₹1,499", C.werkIt, "bottom", "kcb-06"),
              item("Deep Sea Spark Earrings", "Salty", "₹579", S.deepSea, "acc", "kcb-06"),
            ]),
            look("kcb-07", "Jet Black Embroidered Top × Groove-In Cotton Flare", [
              item("Women's Jet Black Embroidered Slim Fit Acid Wash Short Top", "Bewakoof", "₹599", B.jetBlackTop, "top", "kcb-07"),
              item("The Groove-In Cotton Flare Pants", "BlissClub", "₹1,899", C.grooveFlare, "bottom", "kcb-07"),
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "acc", "kcb-07"),
            ]),
            look("kcb-08", "Black Parachute Short Top × AM:PM Cotton Straight", [
              item("Women's Black Parachute Short Top", "Bewakoof", "₹349", B.parachuteTop, "top", "kcb-08"),
              item("AM:PM Cotton Straight Pants", "BlissClub", "₹1,699", C.ampmStraight, "bottom", "kcb-08"),
              item("Classic Beauty Silver Necklace", "Salty", "₹329", S.classicBeauty, "acc", "kcb-08"),
            ]),
            look("kcb-09", "White Oversized Short Top × AirMelt Flare Lite", [
              item("Women's White Oversized Short Top", "Bewakoof", "₹287", B.whiteTop, "top", "kcb-09"),
              item("AirMelt™ Flare Pants - Lite", "BlissClub", "₹1,199", C.airmeltFlare, "bottom", "kcb-09"),
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "acc", "kcb-09"),
            ]),
            look("kcb-10", "Skipper Blue Blossom × Ultimate Sculpt Wide-Leg", [
              item("Women's Skipper Blue Blossom Graphic Printed Short Top", "Bewakoof", "₹321", B.blossomTop, "top", "kcb-10"),
              item("Ultimate Sculpt Wide-Legged Pants", "BlissClub", "₹1,499", C.sculptWide, "bottom", "kcb-10"),
              item("Icy Arc Drop Earrings", "Salty", "₹689", S.icyArc, "acc", "kcb-10"),
            ]),
          ],
        },
        {
          id: "minimalist-workwear",
          title: "Minimalist Workwear",
          description: "Cleaner tops with polished, work-ready bottoms.",
          looks: [
            look("mw-01", "Black Oversized Cropped Shirt × Work-To-Wine Straight", [
              item("Women's Black Oversized Cropped Shirt", "Bewakoof", "₹629", B.blackCropShirt, "top", "mw-01"),
              item("Work-To-Wine Twill Straight Pants", "BlissClub", "₹1,599", C.workWineStraight, "bottom", "mw-01"),
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "acc", "mw-01"),
            ]),
            look("mw-02", "Black Slim Fit Tee × Ultimate Cigarette Pants", [
              item("Women's Black Slim Fit T-shirt", "Bewakoof", "₹429", B.blackSlimTee, "top", "mw-02"),
              item("Ultimate Cigarette Pants", "BlissClub", "₹1,499", C.cigarette, "bottom", "mw-02"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹446", S.gleamHalo, "acc", "mw-02"),
            ]),
            look("mw-03", "White Oversized Short Top × Work-To-Wine Twill Flare", [
              item("Women's White Oversized Short Top", "Bewakoof", "₹287", B.whiteTop, "top", "mw-03"),
              item("Work-To-Wine Twill Wide Leg Flare Pants", "BlissClub", "₹1,599", C.workWineFlare, "bottom", "mw-03"),
              item("Classic Beauty Silver Necklace", "Salty", "₹329", S.classicBeauty, "acc", "mw-03"),
            ]),
            look("mw-04", "Black Oversized Crop Shirt × Cloud Korean Pants", [
              item("Women's Black Oversized Crop Shirt", "Bewakoof", "₹899", B.blackCropShirt2, "top", "mw-04"),
              item("Cloud Korean Pants", "BlissClub", "₹1,999", C.cloudKorean, "bottom", "mw-04"),
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "acc", "mw-04"),
            ]),
            look("mw-05", "Swiss Dot Blue Kurta × BareButter Straight", [
              item("Women's Cotton Swiss Dot Dobby Sleeveless Classic Blue Kurta", "Bewakoof", "₹399", B.swissDot, "top", "mw-05"),
              item("BareButter™ Straight Pants", "BlissClub", "₹2,499", C.barebutter, "bottom", "mw-05"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "acc", "mw-05"),
            ]),
            look("mw-06", "Black Parachute Short Top × Cloud Box Pleated Korean", [
              item("Women's Black Parachute Short Top", "Bewakoof", "₹349", B.parachuteTop, "top", "mw-06"),
              item("Cloud Box Pleated Korean Pant", "BlissClub", "₹1,999", C.boxPleat, "bottom", "mw-06"),
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "acc", "mw-06"),
            ]),
            look("mw-07", "Green Ethnic Kurti × Ultimate Straight Pants", [
              item("Women's Green Sleeveless Ethnic Kurti", "Bewakoof", "₹649", B.greenKurti, "top", "mw-07"),
              item("Ultimate Straight Pants", "BlissClub", "₹1,599", C.ultimateStraight, "bottom", "mw-07"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "acc", "mw-07"),
            ]),
            look("mw-08", "Jet Black Embroidered Top × AM:PM Cotton Straight", [
              item("Women's Jet Black Embroidered Slim Fit Acid Wash Short Top", "Bewakoof", "₹599", B.jetBlackTop, "top", "mw-08"),
              item("AM:PM Cotton Straight Pants", "BlissClub", "₹1,699", C.ampmStraight, "bottom", "mw-08"),
              item("Lustre Halo Statement Drop Earrings - Silver", "Salty", "₹399", S.lustreHalo, "acc", "mw-08"),
            ]),
            look("mw-09", "White Lead Crop Shirt × Ultimate Straight Lite", [
              item("Women's White Lead Typography Oversized Crop Shirt", "Bewakoof", "₹1,001", B.leadShirt, "top", "mw-09"),
              item("Ultimate Straight Pants - Lite", "BlissClub", "₹999", C.straightLite, "bottom", "mw-09"),
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "acc", "mw-09"),
            ]),
            look("mw-10", "Brown Printed Short Kurta × Work-To-Wine Straight", [
              item("Women's Brown Printed Short Kurta", "Bewakoof", "₹549", B.brownKurta, "top", "mw-10"),
              item("Work-To-Wine Twill Straight Pants", "BlissClub", "₹1,599", C.workWineStraight, "bottom", "mw-10"),
              item("Crystal Dew Drop Earrings", "Salty", "₹579", S.crystalDew, "acc", "mw-10"),
            ]),
          ],
        },
      ],
    },
    {
      id: "jewelry-accessories",
      title: "Jewelry & Accessories",
      description: "Statement silver, minimal gold, sunglasses, and finishing pieces from Salty.",
      subcategories: [
        {
          id: "oxidized-statement",
          title: "Oxidized & Statement Jewelry",
          description: "Bold drops, chains, and bracelets with a silver statement edge.",
          looks: [
            look("osj-01", "Cascade Gleam Suite", [
              item("Cascade Gleam Drop Earrings", "Salty", "₹399", S.cascadeGleam, "item1", "osj-01"),
              item("Rendezvous Silver Chain", "Salty", "₹502", S.rendezvous, "item2", "osj-01"),
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "item3", "osj-01"),
            ]),
            look("osj-02", "Lustre Halo & Bold Chain", [
              item("Lustre Halo Statement Drop Earrings - Silver", "Salty", "₹399", S.lustreHalo, "item1", "osj-02"),
              item("D Bold Chain", "Salty", "₹697", S.dBold, "item2", "osj-02"),
            ]),
            look("osj-03", "Zenith Cascade & Mariposa", [
              item("Zenith Cascade Drop Earrings", "Salty", "₹689", S.zenith, "item1", "osj-03"),
              item("Mariposa Black Chain", "Salty", "₹1,190", S.mariposa, "item2", "osj-03"),
            ]),
            look("osj-04", "Deep Sea & Evil Eye Bangle", [
              item("Deep Sea Spark Earrings", "Salty", "₹579", S.deepSea, "item1", "osj-04"),
              item("Traditional Evil Eye Bangle", "Salty", "₹339", S.evilEye, "item2", "osj-04"),
            ]),
            look("osj-05", "Icy Arc & Hades Bracelet", [
              item("Icy Arc Drop Earrings", "Salty", "₹689", S.icyArc, "item1", "osj-05"),
              item("Hades Classic Black Thick Bracelet", "Salty", "₹799", S.hades, "item2", "osj-05"),
            ]),
            look("osj-06", "Silver Droplet & Bold Hoops", [
              item("Silver Droplet Earrings", "Salty", "₹799", S.silverDroplet, "item1", "osj-06"),
              item("Bold Silver Hoop Earrings", "Salty", "₹299", S.boldHoops, "item2", "osj-06"),
            ]),
            look("osj-07", "Cascade Crystal & Ice Loop", [
              item("Cascade Crystal Drop Earrings", "Salty", "₹689", S.cascadeCrystal, "item1", "osj-07"),
              item("Ice Loop Spark Earrings", "Salty", "₹799", S.iceLoop, "item2", "osj-07"),
            ]),
            look("osj-08", "Azure Royale & Bloom Ring", [
              item("Azure Royale Drop Earrings", "Salty", "₹689", S.azure, "item1", "osj-08"),
              item("Adjustable Bloom Link Ring", "Salty", "₹429", S.bloomRing, "item2", "osj-08"),
            ]),
            look("osj-09", "Glimmer Tear & Infinity Ring", [
              item("Glimmer Tear Drop Earrings - Silver", "Salty", "₹689", S.glimmer, "item1", "osj-09"),
              item("Boundless Infinity White Loop Ring", "Salty", "₹399", S.infinityRing, "item2", "osj-09"),
            ]),
            look("osj-10", "Halo Cushion & Crystal Dew", [
              item("Halo Cushion Drop Earrings - Silver", "Salty", "₹459", S.haloCushion, "item1", "osj-10"),
              item("Crystal Dew Drop Earrings", "Salty", "₹579", S.crystalDew, "item2", "osj-10"),
            ]),
          ],
        },
        {
          id: "contemporary-minimal",
          title: "Contemporary & Minimal",
          description: "Clean gold and silver pieces for everyday polish.",
          looks: [
            look("cm-01", "Gold Heart & Minimal Hoops Set", [
              item("Luxe Gold Heart Pendant Necklace", "Salty", "₹289", S.goldHeart, "item1", "cm-01"),
              item("Set of 3 Minimal Golden Hoop Earrings", "Salty", "₹799", S.goldHoopsSet, "item2", "cm-01"),
            ]),
            look("cm-02", "Tennis Bracelet & Infinity Ring", [
              item("Radiance Tennis Bracelet - Silver", "Salty", "₹498", S.tennis, "item1", "cm-02"),
              item("Boundless Infinity White Loop Ring", "Salty", "₹399", S.infinityRing, "item2", "cm-02"),
            ]),
            look("cm-03", "Gleam Halo Hoops & Silver Elegance", [
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹459", S.gleamHalo, "item1", "cm-03"),
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "item2", "cm-03"),
            ]),
            look("cm-04", "Pearl Hoops & Classic Chic Gold", [
              item("Pure Pearls Hoops", "Salty", "₹339", S.pearlHoops, "item1", "cm-04"),
              item("Classic Chic Golden Necklace", "Salty", "₹355", S.classicChicGold, "item2", "cm-04"),
            ]),
            look("cm-05", "Geometric Gold & Florentia Bracelet", [
              item("Geometric Chain Gold Necklace", "Salty", "₹428", S.geometricGold, "item1", "cm-05"),
              item("Florentia Luxe Minimal Bracelet", "Salty", "₹469", S.florentia, "item2", "cm-05"),
            ]),
            look("cm-06", "Molten Gold & Celeste Studs", [
              item("Molten Gold Necklace", "Salty", "₹384", S.molten, "item1", "cm-06"),
              item("Celeste Etoile Crystal Studs Earrings", "Salty", "₹579", S.celeste, "item2", "cm-06"),
            ]),
            look("cm-07", "Classic Beauty & Lumiere Studs", [
              item("Classic Beauty Silver Necklace", "Salty", "₹329", S.classicBeauty, "item1", "cm-07"),
              item("Lumiere Oval Halo Studs Earrings", "Salty", "₹689", S.lumiere, "item2", "cm-07"),
            ]),
            look("cm-08", "Falling In Love & Bloom Ring", [
              item("Falling In Love Silver Necklace", "Salty", "₹364", S.fallingLove, "item1", "cm-08"),
              item("Adjustable Bloom Link Ring", "Salty", "₹429", S.bloomRing, "item2", "cm-08"),
            ]),
            look("cm-09", "Love Knot Bracelet & Pearl Hoops", [
              item("Linked by Love Knot Bracelet - Silver", "Salty", "₹349", S.loveKnot, "item1", "cm-09"),
              item("Pure Pearls Hoops", "Salty", "₹339", S.pearlHoops, "item2", "cm-09"),
            ]),
            look("cm-10", "Silver Elegance Trio", [
              item("Silver Elegance Necklace", "Salty", "₹269", S.silverElegance, "item1", "cm-10"),
              item("Gleam Halo Hoops Earrings - Silver", "Salty", "₹459", S.gleamHalo, "item2", "cm-10"),
              item("Adjustable Bloom Link Ring", "Salty", "₹429", S.bloomRing, "item3", "cm-10"),
            ]),
          ],
        },
        {
          id: "finishing-touches",
          title: "Finishing Touches",
          description: "Sunglasses, scarves, hair pins, and watches to complete the look.",
          looks: [
            look("ft-01", "Statement Rectangular Shades & Ebon Pin", [
              item("Statement Rectangular Black UV Protection Sunglasses", "Salty", "₹599", S.stmtSunglasses, "item1", "ft-01"),
              item("Ebon Hair pin", "Salty", "₹452", S.ebonPin, "item2", "ft-01"),
            ]),
            look("ft-02", "Blackout Retro & Boho Feather Scarf", [
              item("Blackout Retro Sunglasses", "Salty", "₹699", S.blackout, "item1", "ft-02"),
              item("Boho Feather Scarf", "Salty", "₹499", S.bohoScarf, "item2", "ft-02"),
            ]),
            look("ft-03", "Mocha Curve & Girl Boss Watch Ring", [
              item("Mocha Curve Luxury Sunglasses", "Salty", "₹799", S.mocha, "item1", "ft-03"),
              item("Girl Boss Salty Watch Ring - Gold", "Salty", "₹749", S.watchRing, "item2", "ft-03"),
            ]),
            look("ft-04", "Jade Wink & Lilac Hair Pin", [
              item("Jade Wink Brown Rectangular Sunglasses", "Salty", "₹699", S.jadeWink, "item1", "ft-04"),
              item("Lilac Hair Pin", "Salty", "₹349", S.lilacPin, "item2", "ft-04"),
            ]),
            look("ft-05", "Wayfarer & White Dial Silver Watch", [
              item("Essential Wayfarer Shades – Black", "Salty", "₹699", S.wayfarer, "item1", "ft-05"),
              item("White Dial Silver Quartz Watch for Women", "Salty", "₹1,249", S.silverWatch, "item2", "ft-05"),
            ]),
            look("ft-06", "Frost Hue & Frost Aura Scarf", [
              item("Frost Hue Sunglasses", "Salty", "₹699", S.frostHue, "item1", "ft-06"),
              item("Frost Aura Fashion Scarf", "Salty", "₹499", S.frostScarf, "item2", "ft-06"),
            ]),
            look("ft-07", "Retro Hexagon & Cocoa Chic Scarf", [
              item("Retro Hexagon UV400 Protection Sunglasses - Brown", "Salty", "₹949", S.hexagon, "item1", "ft-07"),
              item("Cocoa Chic Satin Scarf", "Salty", "₹499", S.cocoaScarf, "item2", "ft-07"),
            ]),
            look("ft-08", "Vera Volt & Silver Watch", [
              item("Vera Volt Sunglasses", "Salty", "₹999", S.veraVolt, "item1", "ft-08"),
              item("White Dial Silver Quartz Watch for Women", "Salty", "₹1,249", S.silverWatch, "item2", "ft-08"),
            ]),
            look("ft-09", "Statement Rectangles & Gårda Provence Scarf", [
              item("Statement Rectangular Black UV Protection Sunglasses", "Salty", "₹599", S.stmtSunglasses, "item1", "ft-09"),
              item("Gårda Provence Satin Scarf", "Salty", "₹499", S.gardaScarf, "item2", "ft-09"),
            ]),
            look("ft-10", "Mocha Curve & Lilac Pin", [
              item("Mocha Curve Luxury Sunglasses", "Salty", "₹799", S.mocha, "item1", "ft-10"),
              item("Lilac Hair Pin", "Salty", "₹349", S.lilacPin, "item2", "ft-10"),
            ]),
          ],
        },
      ],
    },
  ],
};

async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DesiFitBot/1.0)" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const m = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i)
      || html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);
    return m ? m[1].replace(/^http:\/\//, "https://") : "";
  } catch {
    return "";
  }
}

function placeholderSvg(look) {
  const title = look.title.replace(/[<>&]/g, "");
  const brands = [...new Set(look.items.map((i) => i.brand))].join(" · ");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f1a17"/>
      <stop offset="55%" stop-color="#3d2a24"/>
      <stop offset="100%" stop-color="#c45c26"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <circle cx="640" cy="180" r="160" fill="#e8c9a8" fill-opacity="0.12"/>
  <circle cx="120" cy="820" r="220" fill="#e63946" fill-opacity="0.18"/>
  <text x="48" y="120" fill="#f7f1ea" font-family="Georgia, serif" font-size="42" font-weight="700">DesiFit</text>
  <text x="48" y="180" fill="#e8c9a8" font-family="system-ui,sans-serif" font-size="18" letter-spacing="3">LOOKBOOK</text>
  <foreignObject x="48" y="420" width="700" height="280">
    <div xmlns="http://www.w3.org/1999/xhtml" style="color:#f7f1ea;font-family:Georgia,serif;font-size:36px;line-height:1.25;font-weight:600;">${title}</div>
  </foreignObject>
  <text x="48" y="920" fill="#e8c9a8" font-family="system-ui,sans-serif" font-size="18">${brands}</text>
</svg>`;
}

async function enrichImages(catalogData) {
  const cache = new Map();
  const urls = new Set();
  for (const cat of catalogData.categories) {
    for (const sub of cat.subcategories) {
      for (const lk of sub.looks) {
        for (const it of lk.items) urls.add(it.productUrl);
      }
    }
  }
  console.log(`Enriching images for ${urls.size} product URLs...`);
  let i = 0;
  for (const url of urls) {
    i++;
    process.stdout.write(`\r  ${i}/${urls.size}`);
    cache.set(url, await fetchOgImage(url));
  }
  console.log("\nDone fetching og:images.");

  for (const cat of catalogData.categories) {
    for (const sub of cat.subcategories) {
      for (const lk of sub.looks) {
        for (const it of lk.items) {
          it.imageUrl = cache.get(it.productUrl) || "";
        }
        const firstWithImage = lk.items.find((it) => it.imageUrl);
        if (firstWithImage) {
          // Hero / detail image stays the primary product shot
          lk.image = firstWithImage.imageUrl;
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

  assignUniqueCardImages(catalogData);
}

/**
 * Give every look a unique grid/card image when possible.
 * Prefers each look's own item photos (top → bottom → acc).
 * Looks that can't get a free single image get a 2-up card pair
 * so they still read as distinct in lookbook grids.
 */
function assignUniqueCardImages(catalogData) {
  const looks = [];
  for (const cat of catalogData.categories) {
    for (const sub of cat.subcategories) {
      for (const lk of sub.looks) {
        const candidates = lk.items.map((it) => it.imageUrl).filter(Boolean);
        looks.push({ lk, candidates: [...new Set(candidates)] });
      }
    }
  }

  const pairImg = new Map(); // image -> look index
  const pairLook = new Map(); // look index -> image

  function dfs(u, seen) {
    for (const img of looks[u].candidates) {
      if (seen.has(img)) continue;
      seen.add(img);
      const takenBy = pairImg.get(img);
      if (takenBy === undefined || dfs(takenBy, seen)) {
        pairImg.set(img, u);
        pairLook.set(u, img);
        return true;
      }
    }
    return false;
  }

  const order = looks
    .map((_, i) => i)
    .sort((a, b) => looks[a].candidates.length - looks[b].candidates.length || a - b);

  for (const u of order) {
    if (!pairLook.has(u)) dfs(u, new Set());
  }

  let splitCount = 0;
  for (let i = 0; i < looks.length; i++) {
    const { lk, candidates } = looks[i];
    delete lk.cardImageSecondary;

    if (pairLook.has(i)) {
      lk.cardImage = pairLook.get(i);
      continue;
    }

    // No exclusive single image left — use a 2-up card so the grid
    // tile still looks different from neighboring look cards.
    const primary = candidates[0] || lk.image;
    const secondary = candidates.find((img) => img && img !== primary) || "";
    lk.cardImage = primary;
    if (secondary) {
      lk.cardImageSecondary = secondary;
      splitCount++;
    }
  }

  console.log(
    `Card images: ${pairLook.size}/${looks.length} unique singles` +
      (splitCount ? `, ${splitCount} split cards` : "")
  );
}

const outDir = join(root, "src/data");
mkdirSync(outDir, { recursive: true });
mkdirSync(join(root, "public/images/looks"), { recursive: true });

await enrichImages(catalog);

const outPath = join(outDir, "looks.json");
writeFileSync(outPath, JSON.stringify(catalog, null, 2));

let lookCount = 0;
let itemCount = 0;
for (const cat of catalog.categories) {
  for (const sub of cat.subcategories) {
    lookCount += sub.looks.length;
    for (const lk of sub.looks) itemCount += lk.items.length;
  }
}
console.log(`Wrote ${outPath}`);
console.log(`Categories: ${catalog.categories.length} | Looks: ${lookCount} | Items: ${itemCount}`);

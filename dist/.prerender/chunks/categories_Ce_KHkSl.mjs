import { n as createComponent, r as __exportAll, t as $$Layout } from "./Layout_B4xhxLmU.mjs";
import { a as renderComponent, d as renderTemplate, f as maybeRenderHead, m as addAttribute } from "./server_CK6TpkW3.mjs";
//#region src/pages/categories.astro
var categories_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Categories,
	file: () => $$file,
	url: () => $$url
});
var $$Categories = createComponent(($$result, $$props, $$slots) => {
	const taxonomy = [
		{
			id: "indo-western",
			title: "Indo-Western Fusion",
			description: "Traditional Indian prints & silhouettes blended with modern western cuts.",
			heroMerchant: "Bewakoof + BlissClub + Salty",
			subcategories: [
				{
					id: "short-kurtis-denim",
					name: "Short Kurtis & Denim",
					count: 10
				},
				{
					id: "fusion-layering",
					name: "Fusion Sets & Layering",
					count: 10
				},
				{
					id: "boho-streetwear",
					name: "Boho Streetwear",
					count: 10
				}
			]
		},
		{
			id: "desi-casual",
			title: "Desi Casual & Everyday",
			description: "High-comfort daily office, college, and casual ethnic wear.",
			heroMerchant: "Bewakoof + BlissClub",
			subcategories: [
				{
					id: "daily-cotton-kurtas",
					name: "Daily Cotton Kurtas",
					count: 10
				},
				{
					id: "kurti-comfort-bottoms",
					name: "Kurti & Comfort Bottoms",
					count: 10
				},
				{
					id: "minimalist-workwear",
					name: "Minimalist Workwear",
					count: 10
				}
			]
		},
		{
			id: "jewelry-accessories",
			title: "Jewelry & Accessories",
			description: "High-impulse traditional statement jewelry, watches & styling essentials.",
			heroMerchant: "Salty",
			subcategories: [
				{
					id: "oxidized-statement",
					name: "Oxidized & Statement Jewelry",
					count: 10
				},
				{
					id: "contemporary-minimal",
					name: "Contemporary & Minimal",
					count: 10
				},
				{
					id: "finishing-touches",
					name: "Finishing Touches & Frames",
					count: 10
				}
			]
		}
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Categories | DesiFit" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-7xl mx-auto px-4 py-8 font-sans"><h1 class="text-3xl font-bold text-gray-900 mb-2">Explore Desi Lookbooks</h1><p class="text-gray-600 mb-8">Curated Indian aesthetic fits with instant affiliate shop links.</p><div class="space-y-12">${taxonomy.map((cat) => renderTemplate`<section class="border border-gray-200 rounded-xl p-6 bg-white shadow-sm"><div class="flex justify-between items-start mb-4"><div><h2 class="text-2xl font-semibold text-gray-800">${cat.title}</h2><p class="text-sm text-gray-500 mt-1">${cat.description}</p></div><span class="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">${cat.heroMerchant}</span></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">${cat.subcategories.map((sub) => renderTemplate`<a${addAttribute(`/categories/${cat.id}`, "href")} class="group block p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200"><div class="flex justify-between items-center"><span class="font-medium text-gray-700 group-hover:text-indigo-900">${sub.name}</span><span class="text-xs text-gray-400 group-hover:text-indigo-600">${sub.count} Fits &rarr;</span></div></a>`)}</div></section>`)}</div></main>` })}`;
}, "/workspaces/desifit/src/pages/categories.astro", void 0);
var $$file = "/workspaces/desifit/src/pages/categories.astro";
var $$url = "/categories";
//#endregion
//#region \0virtual:astro:page:src/pages/categories@_@astro
var page = () => categories_exports;
//#endregion
export { page };

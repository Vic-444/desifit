import { n as createComponent, r as __exportAll, t as $$Layout } from "./Layout_B4xhxLmU.mjs";
import { S as createAstro, a as renderComponent, d as renderTemplate, f as maybeRenderHead, m as addAttribute } from "./server_CK6TpkW3.mjs";
import { t as products_default } from "./products_BFTvqnYy.mjs";
//#region src/pages/categories/[category].astro
var _category__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Category,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://astro.build");
async function getStaticPaths() {
	return [
		{
			id: "indo-western",
			title: "Indo-Western Fusion",
			description: "Traditional Indian prints & silhouettes blended with modern western cuts."
		},
		{
			id: "desi-casual",
			title: "Desi Casual & Everyday",
			description: "High-comfort daily office, college, and casual ethnic wear."
		},
		{
			id: "jewelry-accessories",
			title: "Jewelry & Accessories",
			description: "High-impulse traditional statement jewelry, watches & styling essentials."
		}
	].map((cat) => {
		const matchingProducts = products_default.filter((item) => item.category?.toLowerCase() === cat.id.toLowerCase());
		return {
			params: { category: cat.id },
			props: {
				categoryData: cat,
				products: matchingProducts
			}
		};
	});
}
var $$Category = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Category;
	const { categoryData, products: categoryProducts } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${categoryData.title} | DesiFit` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-7xl mx-auto px-4 py-8 font-sans"><h1 class="text-3xl font-bold text-gray-900 mb-2">${categoryData.title}</h1><p class="text-gray-600 mb-8">${categoryData.description}</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${categoryProducts && categoryProducts.length > 0 ? categoryProducts.map((item) => renderTemplate`<div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between"><div>${item.image && renderTemplate`<img${addAttribute(item.image, "src")}${addAttribute(item.name || item.title, "alt")} class="w-full h-64 object-cover rounded-lg mb-4">`}<h2 class="font-semibold text-lg text-gray-800">${item.name || item.title}</h2>${item.brand && renderTemplate`<p class="text-xs text-indigo-600 font-medium mt-1">${item.brand}</p>`}${item.price && renderTemplate`<p class="text-gray-700 font-bold mt-2">₹${item.price}</p>`}</div>${item.affiliateUrl && renderTemplate`<a${addAttribute(item.affiliateUrl, "href")} target="_blank" rel="noopener noreferrer" class="mt-4 block text-center bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition">Shop Fit &rarr;</a>`}</div>`) : renderTemplate`<p class="text-gray-500 col-span-3">No products found for this category yet.</p>`}</div></main>` })}`;
}, "/workspaces/desifit/src/pages/categories/[category].astro", void 0);
var $$file = "/workspaces/desifit/src/pages/categories/[category].astro";
var $$url = "/categories/[category]";
//#endregion
//#region \0virtual:astro:page:src/pages/categories/[category]@_@astro
var page = () => _category__exports;
//#endregion
export { page };

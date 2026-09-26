import { n as createComponent, r as __exportAll, t as $$Layout } from "./Layout_B4xhxLmU.mjs";
import { a as renderComponent, b as unescapeHTML, d as renderTemplate } from "./server_CK6TpkW3.mjs";
//#region src/pages/disclosure.md
var disclosure_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h1 id=\"affiliate-disclosure\">Affiliate Disclosure</h1>\n<p><strong>Last updated:</strong> September 19, 2026</p>\n<p>DesiFit (<code>desifit.com</code>) is a curated fashion discovery platform dedicated to showcasing traditional, fusion, and activewear styles.</p>\n<h3 id=\"affiliate-links--commissions\">Affiliate Links &amp; Commissions</h3>\n<p>Some of the links on this website are affiliate links. This means that if you click on a product link and make a purchase on the merchant’s website (such as Amazon, Myntra, or other retail partners), DesiFit may earn a small commission at no extra cost to you.</p>\n<h3 id=\"product-selection--honesty\">Product Selection &amp; Honesty</h3>\n<p>Our recommendations are curated independently. Commission rates do not influence our item selection or styling recommendations. We only highlight products that align with our quality standards and aesthetic guidelines.</p>\n<h3 id=\"contact-us\">Contact Us</h3>\n<p>If you have any questions regarding our affiliate relationships, please reach out via our <a href=\"/contact\">Contact Page</a> or email us directly at <code>hello@desifit.com</code>.</p>\n";
var frontmatter = {
	"layout": "../layouts/Layout.astro",
	"title": "Affiliate Disclosure"
};
var file = "/workspaces/desifit/src/pages/disclosure.md";
var url = "/disclosure";
function rawContent() {
	return "   \n                               \n                             \n   \n\n# Affiliate Disclosure\n\n**Last updated:** September 19, 2026\n\nDesiFit (`desifit.com`) is a curated fashion discovery platform dedicated to showcasing traditional, fusion, and activewear styles. \n\n### Affiliate Links & Commissions\nSome of the links on this website are affiliate links. This means that if you click on a product link and make a purchase on the merchant’s website (such as Amazon, Myntra, or other retail partners), DesiFit may earn a small commission at no extra cost to you.\n\n### Product Selection & Honesty\nOur recommendations are curated independently. Commission rates do not influence our item selection or styling recommendations. We only highlight products that align with our quality standards and aesthetic guidelines.\n\n### Contact Us\nIf you have any questions regarding our affiliate relationships, please reach out via our [Contact Page](/contact) or email us directly at `hello@desifit.com`.\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [
		{
			"depth": 1,
			"slug": "affiliate-disclosure",
			"text": "Affiliate Disclosure"
		},
		{
			"depth": 3,
			"slug": "affiliate-links--commissions",
			"text": "Affiliate Links & Commissions"
		},
		{
			"depth": 3,
			"slug": "product-selection--honesty",
			"text": "Product Selection & Honesty"
		},
		{
			"depth": 3,
			"slug": "contact-us",
			"text": "Contact Us"
		}
	];
}
var Content = createComponent((result, _props, slots) => {
	const { layout, ...content } = frontmatter;
	content.file = file;
	content.url = url;
	return renderTemplate`${renderComponent(result, "Layout", $$Layout, {
		file,
		url,
		content,
		frontmatter: content,
		headings: getHeadings(),
		rawContent,
		compiledContent,
		"server:root": true
	}, { "default": () => renderTemplate`${unescapeHTML(html())}` })}`;
});
//#endregion
//#region \0virtual:astro:page:src/pages/disclosure@_@md
var page = () => disclosure_exports;
//#endregion
export { page };

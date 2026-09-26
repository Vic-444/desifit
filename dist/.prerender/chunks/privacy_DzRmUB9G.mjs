import { n as createComponent, r as __exportAll, t as $$Layout } from "./Layout_B4xhxLmU.mjs";
import { a as renderComponent, b as unescapeHTML, d as renderTemplate } from "./server_CK6TpkW3.mjs";
//#region src/pages/privacy.md
var privacy_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h1 id=\"privacy-policy\">Privacy Policy</h1>\n<p><strong>Last updated:</strong> September 19, 2026</p>\n<p>At DesiFit (<code>desifit.com</code>), we respect your privacy and are committed to protecting any information collected while operating our website.</p>\n<h3 id=\"information-we-collect\">Information We Collect</h3>\n<ul>\n<li><strong>Log Data:</strong> Like most website operators, Cloudflare and DesiFit collect non-personally-identifying information of the sort that web browsers and servers typically make available (such as browser type, language preference, referring site, and the date/time of each visitor request).</li>\n<li><strong>Cookies &amp; Tracking:</strong> We do not track users across third-party websites or sell personal data. When you click an affiliate link on DesiFit, the destination merchant may place a temporary tracking cookie on your device to attribute any resulting purchase to our referral.</li>\n</ul>\n<h3 id=\"external-links\">External Links</h3>\n<p>Our website contains links to third-party merchant sites. Once you leave <code>desifit.com</code>, we are not responsible for the privacy practices or content of external sites. We encourage you to review the privacy policy of every platform you visit.</p>\n<h3 id=\"contact-information\">Contact Information</h3>\n<p>For privacy concerns or inquiries, contact us at <code>hello@desifit.com</code>.</p>\n";
var frontmatter = {
	"layout": "../layouts/Layout.astro",
	"title": "Privacy Policy"
};
var file = "/workspaces/desifit/src/pages/privacy.md";
var url = "/privacy";
function rawContent() {
	return "   \n                               \n                       \n   \n\n# Privacy Policy\n\n**Last updated:** September 19, 2026\n\nAt DesiFit (`desifit.com`), we respect your privacy and are committed to protecting any information collected while operating our website.\n\n### Information We Collect\n* **Log Data:** Like most website operators, Cloudflare and DesiFit collect non-personally-identifying information of the sort that web browsers and servers typically make available (such as browser type, language preference, referring site, and the date/time of each visitor request).\n* **Cookies & Tracking:** We do not track users across third-party websites or sell personal data. When you click an affiliate link on DesiFit, the destination merchant may place a temporary tracking cookie on your device to attribute any resulting purchase to our referral.\n\n### External Links\nOur website contains links to third-party merchant sites. Once you leave `desifit.com`, we are not responsible for the privacy practices or content of external sites. We encourage you to review the privacy policy of every platform you visit.\n\n### Contact Information\nFor privacy concerns or inquiries, contact us at `hello@desifit.com`.\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [
		{
			"depth": 1,
			"slug": "privacy-policy",
			"text": "Privacy Policy"
		},
		{
			"depth": 3,
			"slug": "information-we-collect",
			"text": "Information We Collect"
		},
		{
			"depth": 3,
			"slug": "external-links",
			"text": "External Links"
		},
		{
			"depth": 3,
			"slug": "contact-information",
			"text": "Contact Information"
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
//#region \0virtual:astro:page:src/pages/privacy@_@md
var page = () => privacy_exports;
//#endregion
export { page };

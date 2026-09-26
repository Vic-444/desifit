import { n as createComponent, r as __exportAll, t as $$Layout } from "./Layout_B4xhxLmU.mjs";
import { a as renderComponent, b as unescapeHTML, d as renderTemplate } from "./server_CK6TpkW3.mjs";
//#region src/pages/contact.md
var contact_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h1 id=\"contact-us\">Contact Us</h1>\n<p>Have a question, feedback, or a partnership inquiry? We’d love to hear from you.</p>\n<h3 id=\"get-in-touch\">Get in Touch</h3>\n<ul>\n<li><strong>Email:</strong> <code>hello@desifit.com</code></li>\n<li><strong>Website:</strong> <a href=\"https://desifit.com\">desifit.com</a></li>\n</ul>\n<p>We aim to respond to all inquiries within 24–48 business hours.</p>\n";
var frontmatter = {
	"layout": "../layouts/Layout.astro",
	"title": "Contact Us"
};
var file = "/workspaces/desifit/src/pages/contact.md";
var url = "/contact";
function rawContent() {
	return "   \n                               \n                   \n   \n\n# Contact Us\n\nHave a question, feedback, or a partnership inquiry? We'd love to hear from you.\n\n### Get in Touch\n* **Email:** `hello@desifit.com`\n* **Website:** [desifit.com](https://desifit.com)\n\nWe aim to respond to all inquiries within 24–48 business hours.\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [{
		"depth": 1,
		"slug": "contact-us",
		"text": "Contact Us"
	}, {
		"depth": 3,
		"slug": "get-in-touch",
		"text": "Get in Touch"
	}];
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
//#region \0virtual:astro:page:src/pages/contact@_@md
var page = () => contact_exports;
//#endregion
export { page };

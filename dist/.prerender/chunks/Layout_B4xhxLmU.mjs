import { M as InvalidComponentArgs, S as createAstro, Y as AstroError, c as renderSlot, d as renderTemplate, m as addAttribute, p as renderHead } from "./server_CK6TpkW3.mjs";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/astro/dist/runtime/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	return renderTemplate`<html lang="en" data-astro-cid-ju4pidww><head><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-GB549ENN8E"><\/script><script>
  		 window.dataLayer = window.dataLayer || [];
 		 function gtag(){dataLayer.push(arguments);}
 		 gtag('js', new Date());

  		 gtag('config', 'G-GB549ENN8E');
		<\/script><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><!-- Primary Meta Tags --><title>DesiFit | Modern South Asian Fashion & Activewear</title><!-- Impact Verification Tag --><meta name="impact-site-verification" value="8a09de15-26bb-452e-9a91-77688b390138"><meta name="title" content="DesiFit | Modern South Asian Fashion &amp; Activewear"><meta name="description" content="Curated South Asian ethnic wear, fusion silhouettes, and activewear tailored for modern lifestyle &amp; fitness."><meta name="mitgo-verification" content="e6f56535-e820-4ae2-a0ee-3a1688da48da"><!-- Open Graph / Facebook / WhatsApp --><meta property="og:type" content="website"><meta property="og:url" content="https://desifit.com/"><meta property="og:title" content="DesiFit | Modern South Asian Fashion &amp; Activewear"><meta property="og:description" content="Curated South Asian ethnic wear, fusion silhouettes, and activewear tailored for modern lifestyle &amp; fitness."><meta property="og:image" content="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://desifit.com/"><meta property="twitter:title" content="DesiFit | Modern South Asian Fashion &amp; Activewear"><meta property="twitter:description" content="Curated South Asian ethnic wear, fusion silhouettes, and activewear tailored for modern lifestyle &amp; fitness."><meta property="twitter:image" content="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80">${renderHead($$result)}</head><body data-astro-cid-ju4pidww><!-- Global Top Navigation Header --><header style="border-bottom: 1px solid #eee; background: #fff; position: sticky; top: 0; z-index: 100;" data-astro-cid-ju4pidww><div style="max-width: 1000px; margin: 0 auto; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;" data-astro-cid-ju4pidww><a href="/" style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px; color: #111; text-decoration: none;" data-astro-cid-ju4pidww>DesiFit<span style="color: #e63946;" data-astro-cid-ju4pidww>.</span></a><nav style="display: flex; gap: 1.5rem; font-weight: 600; font-size: 0.95rem;" data-astro-cid-ju4pidww><a href="/ethnic" style="color: #333; text-decoration: none;" data-astro-cid-ju4pidww>Ethnic</a><a href="/fusion" style="color: #333; text-decoration: none;" data-astro-cid-ju4pidww>Fusion</a><a href="/active" style="color: #333; text-decoration: none;" data-astro-cid-ju4pidww>Activewear</a></nav></div></header><!-- Centered Main Content Wrapper --><main style="max-width: 1000px; margin: 0 auto; padding: 2rem 1.5rem; min-height: 70vh;" data-astro-cid-ju4pidww>${renderSlot($$result, $$slots["default"])}</main><!-- Global Footer --><footer style="text-align: center; padding: 2rem 1rem; margin-top: 3rem; border-top: 1px solid #eee; font-family: system-ui, sans-serif;" data-astro-cid-ju4pidww><p style="margin-bottom: 0.5rem; color: #666;" data-astro-cid-ju4pidww>&copy; 2026 DesiFit. All rights reserved.</p><nav data-astro-cid-ju4pidww><a href="/disclosure" style="margin: 0 10px; color: #111; text-decoration: none;" data-astro-cid-ju4pidww>Affiliate Disclosure</a> |<a href="/privacy" style="margin: 0 10px; color: #111; text-decoration: none;" data-astro-cid-ju4pidww>Privacy Policy</a> |<a href="/contact" style="margin: 0 10px; color: #111; text-decoration: none;" data-astro-cid-ju4pidww>Contact Us</a></nav></footer></body></html>`;
}, "/workspaces/desifit/src/layouts/Layout.astro", void 0);
//#endregion
export { createComponent as n, __exportAll as r, $$Layout as t };

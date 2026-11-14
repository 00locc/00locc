// Builds overlays/lower-third.html: one self-contained file (fonts and
// libraries inlined) so it works on the church Mac even without internet.
//
// Usage (from the repo root):
//   npm install --prefix overlays/src html-to-image@1.11.11 jszip@3.10.1 @fontsource/montserrat@5
//   node overlays/src/build.js
const fs = require("fs");
const path = require("path");

const here = __dirname;
const mods = path.join(here, "node_modules");
const read = (p) => fs.readFileSync(p, "utf8");

const faces = [300, 400, 500, 600, 700, 800, 900].map((w) => [w, "normal"])
  .concat([400, 600, 700, 800].map((w) => [w, "italic"]));
const fonts = faces.map(([w, style]) => {
  const file = path.join(mods, "@fontsource/montserrat/files", `montserrat-latin-${w}-${style}.woff2`);
  const b64 = fs.readFileSync(file).toString("base64");
  return `@font-face{font-family:"Montserrat";font-style:${style};font-weight:${w};font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2");}`;
}).join("\n");

const libs = [
  read(path.join(mods, "html-to-image/dist/html-to-image.js")),
  read(path.join(mods, "jszip/dist/jszip.min.js")),
].join("\n;\n").replace(/<\/script/gi, "<\\/script");

const out = read(path.join(here, "lower-third.src.html"))
  .replace("/*__FONTS__*/", () => fonts)
  .replace("/*__LIBS__*/", () => libs);

const dest = path.join(here, "..", "lower-third.html");
fs.writeFileSync(dest, out);
console.log(`Wrote ${dest} (${(out.length / 1024).toFixed(0)} KB)`);

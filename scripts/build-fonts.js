// Copia las fuentes locales (woff2) y genera www/css/fonts.css
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const outFonts = path.join(root, 'www', 'fonts');
const outCss = path.join(root, 'www', 'css');
fs.mkdirSync(outFonts, { recursive: true });
fs.mkdirSync(outCss, { recursive: true });

const familias = [
  ['fredoka', 'Fredoka', [500, 600, 700]],
  ['nunito', 'Nunito', [700, 800, 900]]
];
let css = '';
for (const [id, nombre, pesos] of familias) {
  for (const w of pesos) {
    const f = `${id}-latin-${w}-normal.woff2`;
    fs.copyFileSync(path.join(root, 'node_modules', '@fontsource', id, 'files', f), path.join(outFonts, f));
    css += `@font-face{font-family:'${nombre}';font-style:normal;font-weight:${w};font-display:swap;src:url(../fonts/${f}) format('woff2');}\n`;
  }
}
fs.writeFileSync(path.join(outCss, 'fonts.css'), css);
console.log('Fuentes listas');

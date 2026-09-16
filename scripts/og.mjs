import { copyFileSync, existsSync } from "node:fs";

/**
 * next/og genera la imagen sin extension ("out/opengraph-image"), y GitHub
 * Pages la sirve entonces como application/octet-stream, que ninguna red
 * social acepta. Se copia con extension .png, que es la ruta a la que apunta
 * la metadata.
 */
const COPIES = [
  ["out/opengraph-image", "out/og.png"],
  ["out/en/opengraph-image", "out/en/og.png"],
];

let copied = 0;

for (const [from, to] of COPIES) {
  if (!existsSync(from)) {
    console.error(`postbuild: falta ${from}`);
    process.exit(1);
  }
  copyFileSync(from, to);
  copied += 1;
}

console.log(`postbuild: ${copied} imagenes de Open Graph con extension .png`);

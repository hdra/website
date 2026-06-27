import sharp from 'sharp';
import { glob } from 'glob';
import { statSync, unlinkSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const files = await glob('src/content/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}');

if (files.length === 0) {
  console.log('No images found.');
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = statSync(file).size;
  const input = await readFile(file);
  const outPath = file.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif');

  const output = await sharp(input)
    .avif({ quality: 90 })
    .toBuffer();

  await writeFile(outPath, output);
  unlinkSync(file);

  const saved = ((before - output.length) / before * 100).toFixed(1);
  console.log(`${file} → ${path.basename(outPath)}: ${kb(before)} → ${kb(output.length)} (-${saved}%)`);

  totalBefore += before;
  totalAfter += output.length;
}

const totalSaved = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
console.log(`\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)} (-${totalSaved}%)`);

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)}kB`;
}

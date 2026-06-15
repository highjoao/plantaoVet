/**
 * generate-icons.cjs
 * Gera os ícones PWA/iPhone do PlantãoVet a partir de dog-pixel.png.
 *
 * Uso: node scripts/generate-icons.cjs
 *
 * Design:
 *  - Fundo rosa sólido #FDD5E7
 *  - Círculo menta #C7EBDD centrado (raio 40% do canvas)
 *  - Dog centrado, ~62% da altura do canvas, pixel-art preservado
 *  - Sem borda tocando as bordas (padding ~19%)
 */

const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'personal', 'app_icon');
const DOG_SRC = path.join(ROOT, 'public', 'assets', 'personal', 'dog-pixel.png');

// Cores (RGBA 32-bit int para Jimp)
const PINK_BG    = 0xFDD5E7FF;
const MINT_BADGE = 0xC7EBDDFF;

const SIZES = [
  { name: 'plantaoVet-app-icon-1024.png', size: 1024 },
  { name: 'icon-512.png',                 size: 512  },
  { name: 'apple-touch-icon.png',         size: 180  },
  { name: 'icon-192.png',                 size: 192  },
  { name: 'favicon.png',                  size: 64   },
];

/** Desenha um círculo sólido usando scan. */
function drawCircle(img, cx, cy, r, rVal, gVal, bVal) {
  const rSq = r * r;
  img.scan(
    Math.max(0, Math.floor(cx - r)),
    Math.max(0, Math.floor(cy - r)),
    Math.min(img.bitmap.width,  Math.ceil(r * 2 + 1)),
    Math.min(img.bitmap.height, Math.ceil(r * 2 + 1)),
    function (x, y, idx) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= rSq) {
        this.bitmap.data[idx]     = rVal;
        this.bitmap.data[idx + 1] = gVal;
        this.bitmap.data[idx + 2] = bVal;
        this.bitmap.data[idx + 3] = 255;
      }
    }
  );
}

async function generateIcons() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const dogSrc = await Jimp.read(DOG_SRC);
  console.log(`Fonte: dog-pixel.png  ${dogSrc.bitmap.width}×${dogSrc.bitmap.height}`);

  for (const { name, size } of SIZES) {
    // 1. Canvas rosa
    const canvas = new Jimp(size, size, PINK_BG);

    // 2. Círculo menta centralizado (raio = 40% do canvas)
    const cx = size / 2;
    const cy = size / 2;
    const circleR = Math.round(size * 0.40);
    drawCircle(canvas, cx, cy, circleR, 0xC7, 0xEB, 0xDD);

    // 3. Dog redimensionado para ~62% da altura do canvas
    const targetH = Math.round(size * 0.62);
    const dog = dogSrc.clone();

    // Redimensiona mantendo proporção, usando nearest-neighbor para manter pixel-art
    dog.resize(Jimp.AUTO, targetH, Jimp.RESIZE_NEAREST_NEIGHBOR);

    const dw = dog.bitmap.width;
    const dh = dog.bitmap.height;

    // 4. Centraliza o dog no canvas
    const dogX = Math.round((size - dw) / 2);
    const dogY = Math.round((size - dh) / 2);

    canvas.composite(dog, dogX, dogY);

    // 5. Salva
    const outPath = path.join(OUT_DIR, name);
    await canvas.writeAsync(outPath);
    console.log(`✓  ${name.padEnd(38)} ${size}×${size}  →  ${outPath}`);
  }

  // favicon.ico: copia favicon.png (browsers aceitam PNG como .ico)
  fs.copyFileSync(
    path.join(OUT_DIR, 'favicon.png'),
    path.join(OUT_DIR, 'favicon.ico')
  );
  console.log('✓  favicon.ico (cópia de favicon.png)');

  console.log('\n✅  Todos os ícones gerados em:', OUT_DIR);
}

generateIcons().catch(err => {
  console.error('Erro ao gerar ícones:', err);
  process.exit(1);
});

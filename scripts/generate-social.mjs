import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const font = await readFile(
  new URL('../public/fonts/manrope-latin.woff2', import.meta.url),
);
const project = await readFile(
  new URL('../public/images/fyzen1-640.webp', import.meta.url),
);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="pt-BR"><head><style>
    @font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font.toString('base64')}); font-weight: 400 800; }
    * { box-sizing: border-box; margin: 0; }
    body { font-family: Manrope, sans-serif; background: #f8f9fc; color: #202b40; padding: 56px 64px; }
    header { display: flex; justify-content: space-between; align-items: center; font-size: 20px; }
    header b { color: #304dcc; font-size: 42px; letter-spacing: -5px; }
    h1 { font-size: 112px; line-height: 1.1; letter-spacing: -8px; font-weight: 600; margin-top: 30px; }
    h1 span { color: #304dcc; }
    main { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; margin-top: 24px; }
    h2 { font-size: 36px; line-height: 1.3; letter-spacing: -1.5px; font-weight: 500; }
    p { margin-top: 24px; font-size: 18px; color: #5c6578; }
    figure { padding: 20px; background: #d6e4df; border-radius: 16px; }
    img { width: 100%; display: block; border-radius: 6px; }
  </style></head><body><header><b>cr.</b><span>Front-end & UI/UX</span></header>
  <h1>Caio Rissa<span>.</span></h1><main><div><h2>Desenvolvimento front‑end com olhar de designer.</h2><p>caiorissa.vercel.app</p></div>
  <figure><img alt="Painel do Fyzen" src="data:image/webp;base64,${project.toString('base64')}" /></figure></main></body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
  });
  await page.screenshot({
    path: fileURLToPath(
      new URL('../public/images/social-preview.png', import.meta.url),
    ),
  });
} finally {
  await browser.close();
}

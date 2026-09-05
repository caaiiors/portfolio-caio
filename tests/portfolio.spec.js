import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [1440, 1280, 1024, 768, 430, 390];
const sectionIds = [
  'home',
  'skills',
  'projects',
  'mockups',
  'studio',
  'about',
  'contact',
];

async function loadImages(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Full-page inspection also needs images below the lazy-loading threshold.
    for (const image of document.images) image.loading = 'eager';
    await Promise.all([...document.images].map((image) => image.decode()));
  });
}

for (const width of widths) {
  for (const theme of ['light', 'dark']) {
    for (const lang of ['pt', 'en']) {
      test(`${width}px / ${theme} / ${lang}: layout, assets, console, accessibility`, async ({
        page,
      }, testInfo) => {
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('console', (message) => {
          if (['error', 'warning'].includes(message.type()))
            errors.push(message.text());
        });
        page.on('response', (response) => {
          if (response.status() >= 400)
            errors.push(`${response.status()} ${response.url()}`);
        });
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.addInitScript(
          ({ theme, lang }) => {
            localStorage.setItem('theme', theme);
            localStorage.setItem('lang', lang);
          },
          { theme, lang },
        );
        await page.goto('/');
        await expect(page.locator('h1')).toHaveText('Caio Rissa.');
        await expect(page.locator('html')).toHaveAttribute(
          'lang',
          lang === 'pt' ? 'pt-BR' : 'en',
        );
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await loadImages(page);
        const geometry = await page.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflow: [...document.querySelectorAll('main *')]
            .filter((element) => {
              const box = element.getBoundingClientRect();
              return (
                box.width > 0 && (box.left < -1 || box.right > innerWidth + 1)
              );
            })
            .map((element) => element.className),
          images: [...document.images].every(
            (image) => image.complete && image.naturalWidth > 0,
          ),
        }));
        expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.width);
        expect(geometry.overflow).toEqual([]);
        expect(geometry.images).toBe(true);
        const axe = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(axe.violations).toEqual([]);
        expect(errors).toEqual([]);
        await page.screenshot({
          path: testInfo.outputPath('full-page.png'),
          fullPage: true,
        });
      });
    }
  }
}

test('theme and language persist; the preview switches real projects', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/Front-end development/);
  for (const [name, url] of [
    ['Riegel Films', 'https://riegelfilms.com'],
    ['Ventlize', 'https://ventlize-site.vercel.app'],
    ['Fyzen', 'https://fyzen.app'],
  ]) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(
      page.getByRole('button', { name, exact: true }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#hero-preview')).toHaveAttribute('href', url);
    await expect(page.locator('.preview-caption')).toContainText(name);
  }
});

test('mobile menu supports keyboard, Escape, outside click, and anchor navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Abrir menu' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();
  await page.locator('.preview-toolbar > span').click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Trabalhos' })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  const top = await page
    .locator('#projects')
    .evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(72);
  await menu.click();
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Trabalhos' }),
  ).toHaveAttribute('aria-current', 'location');
  await page.keyboard.press('Escape');
  await menu.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('skip link, anchor targets, contact, and all project destinations remain usable', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Pular para o conteúdo' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const id of sectionIds)
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  for (const anchor of await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
    await expect(page.locator(anchor)).toHaveCount(1);
  }
  const urls = [
    'https://fyzen.app',
    'https://riegelfilms.com',
    'https://ventlize-site.vercel.app',
    'https://mockup-barbearia.vercel.app/',
    'https://mockup-academia.vercel.app/',
    'https://mockup-imobiliaria.vercel.app/',
    'https://loomeeai.com',
    'https://github.com/caiorissa/mockup-barbearia',
    'https://github.com/caiorissa/mockup-academia',
    'https://github.com/caiorissa/mockup-imobiliaria',
    'https://instagram.com/caaiio.dev',
    'https://x.com/caiorissa',
    'https://github.com/caiorissa',
    'https://www.linkedin.com/in/caio-rissa-b4706527a/',
  ];
  for (const url of urls) {
    const link = page.locator(`a[href="${url}"]`).first();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
  const whatsapp = new URL(
    await page.locator('a[href^="https://wa.me"]').getAttribute('href'),
  );
  expect(whatsapp.pathname).toBe('/5551994210879');
  expect(whatsapp.searchParams.get('text')).toContain('Olá, Caio!');
  await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute(
    'href',
    /^mailto:caiorissa@gmail.com\?subject=/,
  );
  const link = page.locator('.project-image-link').first();
  await page.context().route('https://fyzen.app/', (route) =>
    route.fulfill({
      status: 200,
      body: 'Navigation reached the correct destination.',
    }),
  );
  const popupPromise = page.waitForEvent('popup');
  await link.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL('https://fyzen.app/');
  await popup.close();
});

test('invalid or blocked storage does not crash the portfolio', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('lang', 'invalid');
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage unavailable', 'SecurityError');
      },
    });
  });
  await page.reload();
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('reduced motion stops entrance animation; standard mode retains it', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page
      .locator('.hero-heading')
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
  expect(
    await page
      .locator('html')
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe('auto');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  expect(
    await page
      .locator('.hero-heading')
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('arrive');
});

test('download aliases and query strings work; unavailable assets never download HTML', async ({
  page,
}) => {
  await page.goto('/download/');
  await expect(
    page.getByRole('heading', { name: 'Setup pós-formatação' }),
  ).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /macOS/ }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('setup-mac.sh');
  await expect(page.getByRole('status')).toContainText('Download iniciado');
  const windowsDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: /Windows/ }).click();
  expect((await windowsDownload).suggestedFilename()).toBe('setup-windows.zip');
  await expect(page.getByRole('status')).toContainText('Download iniciado');
  await page.route('**/downloads/setup-windows.zip', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<html>Fallback page</html>',
    }),
  );
  let falseDownload = false;
  page.on('download', () => {
    falseDownload = true;
  });
  await page.getByRole('button', { name: /Windows/ }).click();
  await expect(page.getByRole('status')).toContainText('Arquivo indisponível');
  expect(falseDownload).toBe(false);
  const automaticDownload = page.waitForEvent('download');
  await page.goto('/download?os=mac');
  expect((await automaticDownload).suggestedFilename()).toBe('setup-mac.sh');
});

test('search and sharing metadata reference valid local assets', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://caiorissa.vercel.app/',
  );
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('User-agent: *');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain(
    '<loc>https://caiorissa.vercel.app/</loc>',
  );
  const image = await request.get('/images/social-preview.png');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://caiorissa.vercel.app/images/social-preview.png',
  );
  expect(
    (await request.get('/favicon.svg')).headers()['content-type'],
  ).toContain('image/svg+xml');
});

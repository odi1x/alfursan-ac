const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });

  await page.goto(`file://${process.cwd()}/public/test-ui-hero.html`);
  // wait a bit for fonts/images to load
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/hero-typography-check.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved to public/hero-typography-check.png');
})();

// Uso: node tools/test-avancados-browser.js (PLAYWRIGHT_MODULE, EDGE_PATH e SIMULATOR_URL opcionais).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const originais = require('../banco/simulados-base.json');
const url = process.env.SIMULATOR_URL || pathToFileURL(path.join(__dirname, '../index.html')).href;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(url);
    await page.waitForSelector('#simulados');
    const base = await page.evaluate(() => window.SIMULADOS.slice(0, 6));
    assert.deepEqual(base, originais, 'S1–S6 mantêm nomes, IDs e questões');
    assert.equal(await page.locator('#simulados .chip').count(), 3);
    assert.equal(await page.locator('#simulados tbody tr').count(), 10);
    for (const n of [7, 8, 9]) {
      const sid = 'S' + n;
      await page.locator(`[data-acao="iniciar"][data-sid="${sid}"]`).click();
      await page.waitForURL(u => u.hash === '#/q/' + sid);
      await page.waitForSelector('#enun');
      assert.equal(await page.locator('.cel').count(), 65);
      assert.equal(await page.locator('a', { hasText: 'Consultar documentação da AWS' }).count(), 0);
      const s = await page.evaluate(id => JSON.parse(localStorage.getItem('clfc02.v1')).sessoes[id], sid);
      assert.equal(s.deadline - s.inicio, 90 * 60 * 1000);
      const expected = await page.evaluate(id => window.SIMULADOS.find(x => x.id === id).questoes, sid);
      assert.deepEqual(new Set(s.ids), new Set(expected));
      await page.locator('.alt[data-alt]').first().click();
      await page.reload();
      await page.waitForSelector('#enun');
      assert.equal(await page.locator('.alt.sel').count(), 1);
      if (n !== 9) {
        await page.locator('[data-acao="sair"]').click();
        await page.waitForSelector('#simulados');
      }
    }
    await page.locator('[data-acao="revisar"]').click();
    await page.locator('[data-acao="enviar"]').click();
    await page.locator('dialog [value="sim"]').click();
    await page.waitForSelector('.score-grande');
    const primeiro = page.locator('.gab details').first();
    await primeiro.locator('summary').click();
    const link = primeiro.getByRole('link', { name: 'Consultar documentação da AWS' });
    await link.waitFor();
    assert.match(await link.getAttribute('href'), /^https:\/\/(docs\.aws\.amazon\.com|aws\.amazon\.com|repost\.aws)\//);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url + '#/');
    const chips = page.locator('#simulados .chip');
    await chips.first().waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    if (process.env.SIMULATOR_PREVIEW) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await chips.first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: process.env.SIMULATOR_PREVIEW });
    }
    assert.deepEqual(errors, []);
    console.log('OK: S1–S6 intactos; S7–S9 abrem 65 questões em 90 min, persistem, e só mostram as referências após o envio.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

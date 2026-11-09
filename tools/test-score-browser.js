// Requer playwright-core já instalado. Opcionalmente defina PLAYWRIGHT_MODULE e EDGE_PATH.
// Uso: node tools/test-score-browser.js
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const ROOT = path.join(__dirname, '..');
const url = pathToFileURL(path.join(ROOT, 'index.html')).href;
const out = path.join(ROOT, '.impeccable', 'review');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const errors = [];
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));

    async function runExam(acertos, timeout = false) {
      await page.goto(url + '#/');
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await page.click('[data-acao="iniciar"][data-sid="S1"]');
      await page.waitForSelector('#enun');
      const totals = await page.evaluate(({ acertos, timeout }) => {
        const state = JSON.parse(localStorage.getItem('clfc02.v1'));
        const s = state.sessoes.S1;
        const bank = Object.fromEntries(window.BANCO.map(q => [q.id, q]));
        s.ids.forEach((id, i) => {
          const q = bank[id];
          const correct = q.alternativas.map((a, n) => a.correta ? n : -1).filter(n => n >= 0);
          if (i < acertos) s.resp[id] = correct;
          // O restante fica em branco, incluindo questões múltiplas: sem pontos.
        });
        if (timeout) s.deadline = Date.now() - 1000;
        localStorage.setItem('clfc02.v1', JSON.stringify(state));
        return s.ids.length;
      }, { acertos, timeout });
      await page.reload();
      if (timeout) {
        await page.goto(url + '#/');
        await page.click('#historico a');
      } else {
        await page.waitForSelector('#enun');
        await page.click('[data-acao="revisar"]');
        await page.click('[data-acao="enviar"]');
        await page.click('dialog [value="sim"]');
      }
      await page.waitForSelector('.score-grande');
      const expected = Math.round(100 + 900 * acertos / totals);
      assert.ok((await page.textContent('.score-grande')).startsWith(String(expected)));
      const hist = await page.evaluate(() => JSON.parse(localStorage.getItem('clfc02.v1')).historico[0]);
      assert.equal(hist.acertos, acertos);
      assert.equal(hist.score.valor, expected);
      assert.equal(hist.score.metodo, 'linear-v1');
      assert.ok((await page.textContent('.score-legenda')).includes('estimado'));
      assert.ok((await page.textContent('.score-resumo')).includes('não uma nota oficial'));
      assert.ok((await page.textContent('.veredito .linha')).includes(expected >= 700 ? 'Atingiu 700' : 'Não atingiu 700'));
      await page.click('.score-metodo summary');
      assert.ok((await page.textContent('.score-metodo')).includes('100 + 900'));
      console.log(`OK: ${acertos}/65 = ${expected} (timeout=${timeout})`);
      return hist;
    }

    for (const n of [0, 43, 44, 52, 65]) {
      await runExam(n);
      if (n === 52) {
        await page.screenshot({ path: path.join(out, 'score-desktop.png') });
        await page.setViewportSize({ width: 390, height: 844 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        assert.ok(await page.locator('.score-grande').isVisible());
        await page.screenshot({ path: path.join(out, 'score-mobile.png') });
        await page.setViewportSize({ width: 1440, height: 900 });
      }
    }
    const legacy = await runExam(52, true);
    delete legacy.score;
    // Histórico anterior à implementação: calcular sem apagar ou migrar o localStorage.
    await page.evaluate(h => {
      const state = JSON.parse(localStorage.getItem('clfc02.v1'));
      state.historico = [h];
      localStorage.setItem('clfc02.v1', JSON.stringify(state));
    }, legacy);
    await page.reload();
    await page.waitForSelector('.score-grande');
    assert.ok((await page.textContent('.score-grande')).startsWith('820'));
    await page.goto(url + '#/');
    assert.ok((await page.textContent('#historico')).includes('820/1.000'));
    assert.ok((await page.textContent('#simulados')).includes('820/1.000'));
    console.log('OK: tentativa antiga preservada; score no resultado, histórico e lista de simulados');

    // Estudo permanece em percentual, sem simular uma nota oficial para exercícios curtos.
    await page.selectOption('#f-qtd', '10');
    await page.click('#f-ir');
    await page.waitForSelector('#enun');
    const first = await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('clfc02.v1'));
      const s = state.sessoes.ES;
      const q = window.BANCO.find(q => q.id === s.ids[0]);
      return q.alternativas.map((a, i) => a.correta ? i : -1).filter(i => i >= 0);
    });
    for (const orig of first) await page.click(`[data-alt="${orig}"]`);
    await page.click('[data-acao="responder"]');
    await page.click('[data-acao="encerrar"]');
    await page.click('dialog [value="sim"]');
    await page.waitForSelector('.pct-grande');
    assert.equal(await page.locator('.score-grande').count(), 0);
    assert.ok((await page.textContent('.pct-grande')).includes('100%'));
    assert.deepEqual(errors, []);
    console.log('OK: modo estudo preservado; nenhum erro JavaScript');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

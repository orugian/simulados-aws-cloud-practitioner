// node tools/test-riscar-browser.js
// Requer playwright-core (PLAYWRIGHT_MODULE opcional); SIMULATOR_URL permite testar a publicação.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const ROOT = path.join(__dirname, '..');
const BASE = process.env.SIMULATOR_URL || pathToFileURL(path.join(ROOT, 'index.html')).href;
const OUT = path.join(ROOT, '.impeccable', 'review');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const session = sid => page.evaluate(sid => JSON.parse(localStorage.getItem('clfc02.v1')).sessoes[sid], sid);
    const current = s => s.ids[s.idx];
    const risk = orig => page.locator(`[data-riscar="${orig}"]`);
    const option = orig => page.locator(`[data-alt="${orig}"]`);
    const isStruck = async orig => (await risk(orig).getAttribute('class')).includes('riscada');

    await page.goto(BASE + '#/');
    await page.click('[data-acao="iniciar"][data-sid="S1"]');
    await page.waitForSelector('#enun');
    // Simula uma sessão antiga sem o novo campo e escolhe uma questão de resposta única.
    await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('clfc02.v1'));
      const s = state.sessoes.S1;
      s.idx = s.ids.findIndex(id => window.BANCO.find(q => q.id === id).tipo === 'unica');
      delete s.riscadas;
      localStorage.setItem('clfc02.v1', JSON.stringify(state));
    });
    await page.reload(); await page.waitForSelector('#enun');
    let s = await session('S1');
    const id = current(s), idx = s.idx;
    const q = await page.evaluate(id => window.BANCO.find(q => q.id === id), id);
    const right = q.alternativas.findIndex(a => a.correta);
    const wrong = q.alternativas.findIndex(a => !a.correta);
    const before = JSON.stringify(s.resp);
    await risk(right).click({ button: 'right' });
    assert.equal(await isStruck(right), true);
    assert.ok((await risk(right).getAttribute('aria-describedby')).includes(`risco-${id}-${right}`));
    assert.ok((await risk(right).getAttribute('title')).includes(`restaurar alternativa ${'ABCDEF'[s.ordem[id].indexOf(right)]}`));
    assert.equal(await page.locator('.riscar-alt').count(), 0);
    assert.ok(await page.evaluate(() => {
      const ev = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      return document.querySelector('#enun').dispatchEvent(ev);
    }), 'menu do navegador continua permitido fora das alternativas');
    assert.equal(await risk(right).evaluate(el => {
      const ev = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      el.querySelector('.txt').dispatchEvent(ev);
      return ev.defaultPrevented;
    }), true, 'menu nativo bloqueado somente sobre a alternativa');
    assert.equal(await isStruck(right), false, 'botão direito sobre o texto também restaura');
    await risk(right).locator('.letra').click({ button: 'right' });
    assert.equal(JSON.stringify((await session('S1')).resp), before);
    assert.equal(await page.locator('.feedback, .c-ok, .c-falta, .c-err').count(), 0);
    console.log('OK: sessão antiga aceita riscos; correta pode ser riscada sem revelar gabarito ou responder');

    await option(right).click();
    assert.deepEqual((await session('S1')).resp[id], [right]);
    assert.equal(await isStruck(right), true);
    await risk(wrong).click({ button: 'right' });
    assert.deepEqual((await session('S1')).resp[id], [right]);
    await page.locator('.cel').nth((idx + 1) % 65).click();
    await page.locator('.cel').nth(idx).click();
    assert.equal(await isStruck(right), true);
    assert.equal(await isStruck(wrong), true);
    await page.reload(); await page.waitForSelector('#enun');
    assert.equal(await isStruck(right), true);
    assert.deepEqual((await session('S1')).resp[id], [right]);
    console.log('OK: selecionar alternativa riscada funciona; trocar questão/recarregar preserva riscos e resposta');

    // Alternar não pode desmarcar uma resposta escolhida.
    await risk(right).click({ button: 'right' });
    assert.equal(await isStruck(right), false);
    assert.deepEqual((await session('S1')).resp[id], [right]);
    const letter = 'ABCDEF'[s.ordem[id].indexOf(right)];
    await page.keyboard.press('Shift+' + letter);
    assert.equal(await isStruck(right), true);
    assert.deepEqual((await session('S1')).resp[id], [right]);
    await risk(right).focus(); await page.keyboard.press('Shift+F10');
    assert.equal(await isStruck(right), false);
    await risk(right).focus(); await page.keyboard.press('ContextMenu');
    assert.equal(await isStruck(right), true);
    assert.ok(await risk(right).evaluate(el => el === document.activeElement));
    await page.keyboard.press('Space');
    assert.equal(await isStruck(right), true, 'Space seleciona, não risca');
    await page.keyboard.press('Enter');
    assert.equal(await isStruck(right), true, 'Enter na alternativa não alterna o risco');
    assert.deepEqual((await session('S1')).resp[id], [right]);
    console.log('OK: botão direito, Shift+letra, Shift+F10 e ContextMenu alternam; esquerdo/Space/Enter só selecionam');

    // Todas as alternativas podem ser riscadas, incluindo a selecionada.
    for (let i = 0; i < q.alternativas.length; i++) if (!(await isStruck(i))) await risk(i).click({ button: 'right' });
    assert.equal(await page.locator('.alt.riscada').count(), q.alternativas.length);
    assert.deepEqual((await session('S1')).resp[id], [right]);
    await page.screenshot({ path: path.join(OUT, 'riscar-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const rect = await risk(right).boundingBox();
    assert.ok(rect.width >= 44 && rect.height >= 44);
    const estiloRisco = await risk(right).locator('.txt').evaluate(el => ({ line: getComputedStyle(el).textDecorationLine, color: getComputedStyle(el).textDecorationColor, thickness: getComputedStyle(el).textDecorationThickness }));
    assert.equal(estiloRisco.line, 'line-through');
    assert.equal(estiloRisco.color, 'rgb(0, 0, 242)');
    assert.equal(estiloRisco.thickness, '1px');
    await page.screenshot({ path: path.join(OUT, 'riscar-mobile.png') });
    await risk(right).click({ button: 'right' }); assert.equal(await isStruck(right), false);
    await risk(right).click({ button: 'right' }); assert.equal(await isStruck(right), true);
    await page.setViewportSize({ width: 1440, height: 900 });
    console.log('OK: linhas completas sem botões extras; sem overflow e risco azul de 1px no padrão NOUS');

    // Prova 100% correta apesar dos riscos, persistidos também no resultado.
    await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('clfc02.v1'));
      const s = state.sessoes.S1;
      s.ids.forEach(id => {
        const q = window.BANCO.find(q => q.id === id);
        s.resp[id] = q.alternativas.map((a, i) => a.correta ? i : -1).filter(i => i >= 0);
      });
      localStorage.setItem('clfc02.v1', JSON.stringify(state));
    });
    await page.reload(); await page.waitForSelector('#enun');
    await page.click('[data-acao="revisar"]');
    await page.click('[data-acao="enviar"]');
    await page.click('dialog [value="sim"]');
    await page.waitForSelector('.score-grande');
    const hist = await page.evaluate(() => JSON.parse(localStorage.getItem('clfc02.v1')).historico[0]);
    assert.equal(hist.acertos, 65); assert.equal(hist.score.valor, 1000);
    assert.ok(hist.riscadas[id].includes(right));
    await page.locator(`details[data-gab="${id}"] summary`).click();
    await page.waitForSelector(`details[data-gab="${id}"] .c-ok.riscada`);
    assert.equal(await page.locator('.gab [data-riscar]').count(), 0);
    console.log('OK: riscos não alteram correção ou score (65/65 ->1000); anotação preservada no gabarito');

    // Exporta/importa uma sessão de estudo com risco; depois corrige mantendo-a selecionável.
    await page.goto(BASE + '#/');
    await page.selectOption('#f-dom', '1');
    await page.selectOption('#f-task', '1.3');
    await page.selectOption('#f-qtd', '0');
    await page.click('#f-ir'); await page.waitForSelector('#enun');
    // Encontra pela própria interface uma questão com seis opções e TRÊS respostas.
    const indexSix = await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('clfc02.v1')).sessoes.ES;
      return s.ids.findIndex(id => {
        const q = window.BANCO.find(q => q.id === id);
        return q.tipo === 'multipla' && q.selecionar === 3 && q.alternativas.length === 6;
      });
    });
    assert.ok(indexSix >= 0);
    await page.locator('.cel').nth(indexSix).click();
    const originalF = (await session('ES')).ordem[current(await session('ES'))][5];
    await page.keyboard.press('Shift+F');
    assert.equal(await isStruck(originalF), true);
    assert.deepEqual((await session('ES')).resp, {});
    console.log('OK: Shift+F risca sexta alternativa sem responder em questão de selecionar TRÊS');
    const study = await session('ES'), studyId = current(study);
    const qStudy = await page.evaluate(id => window.BANCO.find(q => q.id === id), studyId);
    const correct = qStudy.alternativas.map((a, i) => a.correta ? i : -1).filter(i => i >= 0);
    if (!(await isStruck(correct[0]))) await risk(correct[0]).click({ button: 'right' });
    await page.click('[data-acao="sair"]');
    const downloadEvent = page.waitForEvent('download');
    await page.click('[data-acao="exportar"]');
    const download = await downloadEvent;
    const exported = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
    assert.ok(exported.sessoes.ES.riscadas[studyId].includes(correct[0]));
    await page.locator('#arq').setInputFiles({ name: 'progresso.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(exported)) });
    await page.locator('dialog [value="sim"]').click();
    await page.click('[data-acao="continuar"][data-sid="ES"]');
    await page.waitForSelector('#enun');
    assert.equal(await isStruck(correct[0]), true);
    for (const orig of correct) await option(orig).click();
    await page.click('[data-acao="responder"]');
    await page.waitForSelector('.feedback');
    assert.ok((await page.textContent('.feedback .res')).includes('Acertou'));
    const snapshot = await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('clfc02.v1'));
      return JSON.stringify({ resp: state.sessoes.ES.resp, trav: state.sessoes.ES.trav, caderno: state.caderno });
    });
    // aria-disabled bloqueia seleção depois da correção, não eventos de contexto reais.
    await risk(correct[0]).click({ button: 'right', force: true });
    assert.equal(await isStruck(correct[0]), false);
    assert.equal(await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('clfc02.v1'));
      return JSON.stringify({ resp: state.sessoes.ES.resp, trav: state.sessoes.ES.trav, caderno: state.caderno });
    }), snapshot);
    console.log('OK: exportação/importação preservam riscos; modo estudo permite anotar depois da correção sem alterar resultado');
    assert.deepEqual(errors, []);
    console.log('PASS: riscar/restaurar em qualquer alternativa, independente do gabarito; nenhum erro JS.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

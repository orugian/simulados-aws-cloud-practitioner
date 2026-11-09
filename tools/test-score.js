// Uso: node --test tools/test-score.js
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const SCORE = require('../assets/score');

test('escala completa: zero acertos = 100 e todos os acertos = 1.000', () => {
  assert.equal(SCORE.calcular(0, 65).valor, 100);
  assert.equal(SCORE.calcular(65, 65).valor, 1000);
});

test('corte de referência inclusive em 700', () => {
  assert.equal(SCORE.calcular(2, 3).valor, 700);
  assert.equal(SCORE.calcular(2, 3).atingiuCorte, true);
  assert.equal(SCORE.calcular(43, 65).valor, 695);
  assert.equal(SCORE.calcular(43, 65).atingiuCorte, false);
  assert.equal(SCORE.calcular(44, 65).valor, 709);
  assert.equal(SCORE.calcular(44, 65).atingiuCorte, true);
});

test('usa acertos exatos, sem arredondar previamente o percentual', () => {
  assert.equal(SCORE.calcular(45, 65).valor, 723);
  assert.equal(SCORE.calcular(52, 65).valor, 820);
  assert.equal(SCORE.calcular(1, 65).valor, 114);
});

test('todas as 66 notas possíveis em uma prova de 65 são crescentes e limitadas', () => {
  let anterior = 99;
  for (let acertos = 0; acertos <= 65; acertos++) {
    const r = SCORE.calcular(acertos, 65);
    assert.ok(Number.isInteger(r.valor) && r.valor >= 100 && r.valor <= 1000);
    assert.ok(r.valor > anterior);
    assert.equal(r.atingiuCorte, r.valor >= 700);
    assert.equal(r.metodo, 'linear-v1');
    anterior = r.valor;
  }
});

test('rejeita total inválido e acertos fora do intervalo', () => {
  for (const [a, t] of [[0, 0], [-1, 65], [66, 65], [1.5, 65], [1, 2.5], [NaN, 65], [1, Infinity], ['52', 65]]) {
    assert.throws(() => SCORE.calcular(a, t), RangeError);
  }
});

test('também funciona como script no navegador, sem servidor ou bundler', () => {
  const context = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/score.js'), 'utf8'), context);
  assert.equal(context.CLF_SCORE.calcular(52, 65).valor, 820);
});

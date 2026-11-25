#!/usr/bin/env node
// Compila as rodadas publicadas sem redistribuir questões nem alterar IDs antigos.
// Uso: node tools/gerar-simulados.js [--check]
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ESC = require('./escopo');
const ROOT = path.join(__dirname, '..');
const destino = path.join(ROOT, 'banco', 'simulados.js');

const { window } = vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'banco', 'questoes.js'), 'utf8') + '\n;({window})', { window: {} });
const banco = window.BANCO;
const porId = new Map(banco.map(q => [q.id, q]));
const base = require('../banco/simulados-base.json');
const rodadas = [7, 8, 9];
const quotasAvancadas = {
  '1.1': 4, '1.2': 4, '1.3': 4, '1.4': 4,
  '2.1': 4, '2.2': 5, '2.3': 5, '2.4': 5,
  '3.1': 2, '3.2': 2, '3.3': 2, '3.4': 2, '3.5': 4, '3.6': 4, '3.7': 3, '3.8': 3,
  '4.1': 3, '4.2': 3, '4.3': 2,
};

assert.equal(base.length, 6, 'As seis provas originais precisam permanecer disponíveis');
assert.ok(banco.every(q => q.rodada === undefined || rodadas.includes(q.rodada)), 'Rodada não reconhecida no banco');
const simulados = base.concat(rodadas.map(n => ({
  id: `S${n}`, nome: `Simulado ${n}`, nivel: 'avancado', questoes: banco.filter(q => q.rodada === n).map(q => q.id),
})));
const usados = new Set();
for (const [i, s] of simulados.entries()) {
  assert.equal(s.id, `S${i + 1}`);
  assert.equal(s.questoes.length, 65, `${s.id}: esperado 65 questões`);
  const qs = s.questoes.map(id => {
    assert.ok(porId.has(id), `${s.id}: questão não encontrada: ${id}`);
    assert.ok(!usados.has(id), `${s.id}: questão repetida: ${id}`);
    usados.add(id);
    return porId.get(id);
  });
  for (const [d, quota] of Object.entries(ESC.porProva)) {
    assert.equal(qs.filter(q => q.dominio === Number(d)).length, quota, `${s.id}: cota do domínio ${d}`);
  }
  const multi = qs.filter(q => q.tipo === 'multipla').length;
  const dif = [1, 2, 3].map(n => qs.filter(q => q.dificuldade === n).length);
  if (s.nivel === 'avancado') {
    assert.ok(dif[0] === 0 && dif[2] >= 49, `${s.id}: esperado no mínimo 49 difíceis e nenhuma introdutória`);
    assert.equal(multi, 15, `${s.id}: esperadas 15 de múltipla resposta`);
    for (const [task, quota] of Object.entries(quotasAvancadas)) {
      assert.equal(qs.filter(q => q.task === task).length, quota, `${s.id}: cota do tópico ${task}`);
    }
    for (const q of qs) {
      assert.equal(q.fonte, 'autoral', `${q.id}: fonte deve ser autoral`);
      assert.match(q.ref, /^https:\/\/(docs\.aws\.amazon\.com|aws\.amazon\.com|repost\.aws)\/[\w./%#?&=+~'-]+$/i, `${q.id}: referência oficial ausente ou inválida`);
      assert.ok(q.alternativas.length <= 6, `${q.id}: a interface comporta até seis alternativas`);
    }
  }
  console.log(`${s.id}${s.nivel ? ' avançado' : ''}: ${qs.length} questões · ${multi} múltiplas · dificuldade 1/2/3: ${dif.join('/')}`);
}
const out = '/* Simulados fixos — gerado por tools/gerar-simulados.js. NÃO EDITE À MÃO. */\n' +
  'window.SIMULADOS = [\n' + simulados.map(s => '  ' + JSON.stringify(s)).join(',\n') + '\n];\n';
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(destino, 'utf8').replace(/\r\n/g, '\n'), out, 'Manifesto publicado não corresponde ao banco');
} else {
  fs.writeFileSync(destino, out);
}
console.log(`${usados.size} questões únicas em ${simulados.length} provas fixas; ${banco.length} no banco.`);

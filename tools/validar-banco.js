#!/usr/bin/env node
// Valida o banco de questões CLF-C02.
// Uso:
//   node tools/validar-banco.js                 → valida banco/partes/*.json e gera banco/questoes.js
//   node tools/validar-banco.js arquivo.json    → valida só um arquivo (não gera nada)
//   flags: --quiet (só resumo)  --no-build
const fs = require('fs');
const path = require('path');
const ESC = require('./escopo');

const ROOT = path.join(__dirname, '..');
const PARTES = path.join(ROOT, 'banco', 'partes');
const args = process.argv.slice(2);
const quiet = args.includes('--quiet');
const files = args.filter(a => !a.startsWith('--'));
const single = files.length > 0;
const alvo = single ? files.map(f => path.resolve(f)) :
  fs.readdirSync(PARTES).filter(f => f.endsWith('.json')).sort().map(f => path.join(PARTES, f));

const erros = [], avisos = [];
const E = (id, m) => erros.push(`${id}: ${m}`);
const W = (id, m) => avisos.push(`${id}: ${m}`);
const PALAVRA = { 2: 'DUAS', 3: 'TRÊS' };

let banco = [];
for (const f of alvo) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '')); }
  catch (e) { E(path.basename(f), 'JSON inválido: ' + e.message); continue; }
  if (!Array.isArray(arr)) { E(path.basename(f), 'raiz precisa ser um array'); continue; }
  arr.forEach(q => (q._arquivo = path.basename(f)));
  banco.push(...arr);
}

const ids = new Map();
for (const q of banco) {
  const id = q.id || `(sem id em ${q._arquivo})`;
  if (!q.id) E(id, 'id ausente');
  else if (!/^D[1-4]-[a-z0-9]+-\d{3}$/.test(q.id)) E(id, 'id fora do padrão D<n>-<parte>-<nnn>');
  if (ids.has(q.id)) E(id, `id duplicado (também em ${ids.get(q.id)})`); else ids.set(q.id, q._arquivo);

  if (![1, 2, 3, 4].includes(q.dominio)) E(id, 'dominio inválido');
  else {
    if (!ESC.tasks[q.dominio].includes(q.task)) E(id, `task ${q.task} não pertence ao domínio ${q.dominio}`);
    if (q.id && !q.id.startsWith(`D${q.dominio}-`)) E(id, 'prefixo do id não bate com o domínio');
  }
  if (!['unica', 'multipla'].includes(q.tipo)) E(id, 'tipo deve ser "unica" ou "multipla"');
  if (typeof q.enunciado !== 'string' || q.enunciado.trim().length < 25) E(id, 'enunciado ausente/curto');
  if (!Array.isArray(q.alternativas)) { E(id, 'alternativas ausentes'); continue; }

  const n = q.alternativas.length;
  const corretas = q.alternativas.filter(a => a.correta === true);
  if (q.tipo === 'unica') {
    if (n !== 4) E(id, `escolha única precisa de 4 alternativas (tem ${n})`);
    if (corretas.length !== 1) E(id, `escolha única precisa de 1 correta (tem ${corretas.length})`);
    if (q.selecionar !== undefined && q.selecionar !== 1) E(id, 'selecionar deve ser 1 ou omitido em "unica"');
  } else {
    if (n < 5) E(id, `múltipla resposta precisa de 5+ alternativas (tem ${n})`);
    if (![2, 3].includes(q.selecionar)) E(id, 'selecionar deve ser 2 ou 3');
    if (corretas.length !== q.selecionar) E(id, `selecionar=${q.selecionar} mas há ${corretas.length} corretas`);
    const w = PALAVRA[q.selecionar];
    if (w && !new RegExp(`\\(Selecione ${w}\\.\\)\\s*$`).test(q.enunciado || '')) E(id, `enunciado deve terminar com "(Selecione ${w}.)"`);
  }
  if (q.tipo === 'unica' && /\(Selecione/i.test(q.enunciado || '')) E(id, '"Selecione" em questão de escolha única');

  const textos = new Set();
  q.alternativas.forEach((a, i) => {
    const L = 'ABCDEF'[i];
    if (typeof a.texto !== 'string' || !a.texto.trim()) E(id, `alternativa ${L} sem texto`);
    if (typeof a.porque !== 'string' || a.porque.trim().length < 15) E(id, `alternativa ${L} sem justificativa ("porque")`);
    if (typeof a.correta !== 'boolean') E(id, `alternativa ${L}: "correta" precisa ser booleano`);
    const k = (a.texto || '').toLowerCase().trim();
    if (textos.has(k)) E(id, `alternativa ${L} repetida`); textos.add(k);
    if (/todas as (alternativas|anteriores)|nenhuma das (alternativas|anteriores)/i.test(a.texto || '')) E(id, `alternativa ${L} usa "todas/nenhuma das anteriores" (não existe na prova)`);
    if (a.correta) for (const re of ESC.foraDoEscopo) if (re.test(a.texto)) E(id, `alternativa correta ${L} cita serviço FORA DO ESCOPO (${re})`);
    for (const [re, dica] of ESC.desatualizados) {
      if (re.test(a.texto || '')) (a.correta ? E : W)(id, `alternativa ${a.correta ? 'CORRETA ' : ''}${L} cita termo desatualizado ${re} → ${dica}`);
    }
  });
  for (const [re, dica] of ESC.desatualizados) if (re.test(q.enunciado || '')) W(id, `enunciado cita termo desatualizado ${re} → ${dica}`);
  if (typeof q.explicacao !== 'string' || q.explicacao.trim().length < 20) E(id, 'explicacao ausente/curta');
  if (!Array.isArray(q.servicos)) E(id, 'servicos deve ser array');
  if (![1, 2, 3].includes(q.dificuldade)) E(id, 'dificuldade deve ser 1, 2 ou 3');
  if (typeof q.fonte !== 'string' || !q.fonte) E(id, 'fonte ausente');
  if ((q.enunciado || '').length > 600) W(id, `enunciado longo (${q.enunciado.length} chars) — a prova é concisa`);
  // Pista de resposta: alternativa correta muito mais longa que as demais
  if (q.tipo === 'unica' && corretas.length === 1) {
    const lc = corretas[0].texto.length, outras = q.alternativas.filter(a => !a.correta).map(a => a.texto.length);
    if (lc > 1.9 * Math.max(...outras) && lc > 60) W(id, 'alternativa correta muito mais longa que os distratores (dá pista)');
  }
}

// Quase-duplicatas (Jaccard sobre enunciado + alternativa(s) correta(s))
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' ');
const STOP = new Set('a o as os de da do das dos e em um uma para por com que qual quais na no nas nos ao aos se sua seu mais menos aws amazon selecione duas tres empresa'.split(' '));
const tk = s => new Set(norm(s).split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)));
const sig = banco.map(q => ({ id: q.id, t: tk((q.enunciado || '') + ' ' + (q.alternativas || []).filter(a => a.correta).map(a => a.texto).join(' ')) }));
const dups = [];
for (let i = 0; i < sig.length; i++) for (let j = i + 1; j < sig.length; j++) {
  const a = sig[i].t, b = sig[j].t; let x = 0; for (const w of a) if (b.has(w)) x++;
  const jac = x / (a.size + b.size - x);
  if (jac >= 0.6) dups.push(`${sig[i].id} ~ ${sig[j].id} (${jac.toFixed(2)})`);
}
dups.forEach(d => W('DUP', 'quase-duplicata ' + d));

// Resumo de cobertura
const porDom = { 1: 0, 2: 0, 3: 0, 4: 0 }, porTask = {}, multi = { 1: 0, 2: 0, 3: 0, 4: 0 }, posCorreta = [0, 0, 0, 0];
for (const q of banco) {
  porDom[q.dominio] = (porDom[q.dominio] || 0) + 1; porTask[q.task] = (porTask[q.task] || 0) + 1;
  if (q.tipo === 'multipla') multi[q.dominio]++;
  if (q.tipo === 'unica') { const i = (q.alternativas || []).findIndex(a => a.correta); if (i >= 0 && i < 4) posCorreta[i]++; }
}
const total = banco.length;
const provas = Math.min(...[1, 2, 3, 4].map(d => Math.floor(porDom[d] / ESC.porProva[d])));

if (!quiet) {
  if (erros.length) { console.log(`\n✖ ERROS (${erros.length})`); erros.forEach(e => console.log('  ' + e)); }
  if (avisos.length) { console.log(`\n⚠ AVISOS (${avisos.length})`); avisos.forEach(e => console.log('  ' + e)); }
}
console.log(`\nQuestões: ${total} · erros: ${erros.length} · avisos: ${avisos.length} · quase-duplicatas: ${dups.length}`);
for (const d of [1, 2, 3, 4]) console.log(`  D${d}: ${porDom[d]} (${total ? (100 * porDom[d] / total).toFixed(1) : 0}% · oficial ${ESC.pesos[d] * 100}%) · múltipla ${multi[d]} · ${Math.floor(porDom[d] / ESC.porProva[d])} provas`);
console.log('  Tasks: ' + Object.keys(porTask).sort((a, b) => parseFloat(a) - parseFloat(b)).map(t => `${t}=${porTask[t]}`).join(' '));
console.log(`  Posição da correta (única) A/B/C/D: ${posCorreta.join('/')}`);
console.log(`  Provas completas sem repetição: ${provas}`);

if (!single && !args.includes('--no-build')) {
  if (erros.length) { console.log('\nBuild NÃO gerado: corrija os erros.'); process.exit(1); }
  const limpo = banco.map(({ _arquivo, ...q }) => q).sort((a, b) => a.id.localeCompare(b.id));
  const out = '/* Banco CLF-C02 — gerado por tools/validar-banco.js a partir de banco/partes/*.json. NÃO EDITE À MÃO. */\n' +
    `window.BANCO_META = ${JSON.stringify({ gerado: new Date().toISOString(), total: limpo.length, porDominio: porDom, guia: 'CLF-C02 v1.3 (29/10/2026)' })};\n` +
    `window.BANCO = ${JSON.stringify(limpo)};\n`;
  fs.writeFileSync(path.join(ROOT, 'banco', 'questoes.js'), out);
  console.log(`\n✔ banco/questoes.js gerado (${limpo.length} questões, ${(out.length / 1024).toFixed(0)} KB)`);
}
process.exit(erros.length ? 1 : 0);

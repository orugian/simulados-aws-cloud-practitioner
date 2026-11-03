#!/usr/bin/env node
// Gera N simulados fixos de 65 questões (16/19/22/8) sem repetir questões entre eles.
// Equilibra, dentro de cada domínio, task statements, dificuldade e tipo (múltipla).
// Uso: node tools/gerar-simulados.js [--n 6] [--seed 2611]
// Saída: banco/simulados.js  (window.SIMULADOS = [{id, nome, questoes:[ids]}])
const fs = require('fs');
const path = require('path');
const ESC = require('./escopo');
const ROOT = path.join(__dirname, '..');

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? +process.argv[i + 1] : d; };
const N = arg('--n', 6);
let seed = arg('--seed', 2611);
const rnd = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const src = fs.readFileSync(path.join(ROOT, 'banco', 'questoes.js'), 'utf8');
const window = {}; new Function('window', src)(window);
const BANCO = window.BANCO;

const simulados = Array.from({ length: N }, (_, i) => ({ id: `S${i + 1}`, nome: `Simulado ${i + 1}`, questoes: [] }));
for (const d of [1, 2, 3, 4]) {
  const quota = ESC.porProva[d];
  const doDom = BANCO.filter(q => q.dominio === d);
  if (doDom.length < quota * N) throw new Error(`D${d}: ${doDom.length} questões, precisa de ${quota * N}`);
  // Alocação gulosa balanceada: os grupos mais raros (dificuldade 3, múltipla) são alocados primeiro;
  // cada questão vai ao simulado com menos questões da mesma task / dificuldade / tipo
  // que ainda tenha cota no domínio. Sobras (bank > cota*N) ficam só para o modo aleatório.
  const cont = simulados.map(() => ({ n: 0, task: {}, dif: {}, multi: 0 }));
  const raridade = q => (q.dificuldade === 3 ? 0 : q.dificuldade === 1 ? 1 : 2) + (q.tipo === 'multipla' ? -0.5 : 0);
  const fila = shuffle(doDom.slice()).sort((a, b) => raridade(a) - raridade(b));
  // Garante que as sobras não sejam sempre do mesmo tipo: limita por grupo (task×dificuldade) ao teto proporcional.
  for (const q of fila) {
    let best = -1, bestScore = Infinity;
    for (let i = 0; i < N; i++) {
      const c = cont[i];
      if (c.n >= quota) continue;
      const score = (c.task[q.task] || 0) * 3 + (c.dif[q.dificuldade] || 0) * 2 + (q.tipo === 'multipla' ? c.multi * 2 : 0) + c.n * 0.01 + rnd() * 0.001;
      if (score < bestScore) { bestScore = score; best = i; }
    }
    if (best < 0) continue; // todos cheios: sobra
    const c = cont[best];
    c.n++; c.task[q.task] = (c.task[q.task] || 0) + 1; c.dif[q.dificuldade] = (c.dif[q.dificuldade] || 0) + 1; if (q.tipo === 'multipla') c.multi++;
    simulados[best].questoes.push(q.id);
  }
}
for (const s of simulados) shuffle(s.questoes);

// Relatório
const byId = Object.fromEntries(BANCO.map(q => [q.id, q]));
for (const s of simulados) {
  const qs = s.questoes.map(id => byId[id]);
  const dom = [1, 2, 3, 4].map(d => qs.filter(q => q.dominio === d).length).join('/');
  const multi = qs.filter(q => q.tipo === 'multipla').length;
  const dif = [1, 2, 3].map(n => qs.filter(q => q.dificuldade === n).length).join('/');
  console.log(`${s.id}: ${qs.length} questões · D ${dom} · múltipla ${multi} · dificuldade ${dif}`);
}
const usados = new Set(simulados.flatMap(s => s.questoes));
console.log(`Questões usadas: ${usados.size} de ${BANCO.length} (sobram ${BANCO.length - usados.size} só no modo aleatório/estudo)`);
fs.writeFileSync(path.join(ROOT, 'banco', 'simulados.js'),
  '/* Simulados fixos — gerado por tools/gerar-simulados.js. NÃO EDITE À MÃO. */\n' +
  `window.SIMULADOS = ${JSON.stringify(simulados)};\n`);
console.log('✔ banco/simulados.js gerado');

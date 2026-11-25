#!/usr/bin/env node
// Triagem editorial: sinaliza pistas potenciais; não substitui uma leitura sem o gabarito.
const fs = require('node:fs');
const path = require('node:path');
const pasta = path.join(__dirname, '..', 'banco', 'partes');
const banco = fs.readdirSync(pasta).filter(n => n.endsWith('.json'))
  .flatMap(n => JSON.parse(fs.readFileSync(path.join(pasta, n), 'utf8').replace(/^\uFEFF/, '')));
const avancadas = banco.filter(q => q.rodada);
const norm = s => s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, ' ').trim();
const ignorar = new Set('aws amazon para na nas no nos sem pelo pela mais menos onde qual quais selecione duas tres caso sobre deve pode podem apenas durante cliente equipe empresa servico recurso seus suas entre quais opcao melhor atende possibilita exige'.split(' '));
const palavras = s => new Set(norm(s).split(' ').filter(w => w.length > 3 && !ignorar.has(w)));
const avisos = [];
for (const q of avancadas) {
  const opts = q.alternativas;
  const lens = opts.map(a => a.texto.length).sort((a, b) => a - b);
  const mediana = (lens[Math.floor((lens.length - 1) / 2)] + lens[Math.ceil((lens.length - 1) / 2)]) / 2;
  const stem = palavras(q.enunciado);
  const echoes = opts.map(a => [...palavras(a.texto)].filter(x => stem.has(x)));
  for (const [i, a] of opts.entries()) {
    if (a.correta && a.texto.length > mediana * 1.5 && a.texto.length - mediana > 22) avisos.push(`${q.id} · ${i + 1}: correta mais longa (${a.texto.length} vs mediana ${mediana})`);
    if (!a.correta && /\b(sempre|nunca|exclusivamente|qualquer|independentemente)\b/i.test(a.texto)) avisos.push(`${q.id} · ${i + 1}: distrator com absoluto; confirmar que é necessário`);
    if (a.correta && echoes[i].length >= 2 && echoes.every((w, j) => j === i || w.length === 0)) avisos.push(`${q.id} · ${i + 1}: eco exclusivo: ${echoes[i].join(', ')}`);
  }
}
console.log(`${avancadas.length} questões avançadas; ${avisos.length} pontos de triagem.`);
avisos.forEach(linha => console.log(linha));

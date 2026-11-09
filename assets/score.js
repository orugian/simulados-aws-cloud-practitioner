/* Conversão didática do simulado. NÃO reproduz a equação psicométrica da AWS. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CLF_SCORE = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const MINIMO = 100;
  const MAXIMO = 1000;
  const CORTE = 700;

  function calcular(acertos, total) {
    if (!Number.isInteger(total) || total < 1 || !Number.isInteger(acertos) || acertos < 0 || acertos > total) {
      throw new RangeError('Score requer total positivo e acertos inteiros entre zero e o total.');
    }
    // Usa a razão exata, sem arredondar antes o percentual. Todas as questões contam;
    // não tentamos adivinhar quais seriam as 15 não pontuadas do exame oficial.
    const valor = Math.round(MINIMO + (MAXIMO - MINIMO) * acertos / total);
    return { valor, minimo: MINIMO, maximo: MAXIMO, corte: CORTE, atingiuCorte: valor >= CORTE, metodo: 'linear-v1' };
  }

  return Object.freeze({ calcular, MINIMO, MAXIMO, CORTE });
});

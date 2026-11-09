/* Simulador AWS Certified Cloud Practitioner (CLF-C02). Sem dependências; dados em banco/questoes.js e banco/simulados.js. */
(() => {
  'use strict';

  // ---------------- Dados e constantes ----------------
  const BANCO = window.BANCO || [];
  const SIMS = window.SIMULADOS || [];
  const META = window.BANCO_META || {};
  const QB = Object.fromEntries(BANCO.map(q => [q.id, q]));
  const DOM = { 1: 'Conceitos de nuvem', 2: 'Segurança e conformidade', 3: 'Tecnologia e serviços', 4: 'Cobrança, preços e suporte' };
  const DOM_EN = { 1: 'Cloud Concepts', 2: 'Security and Compliance', 3: 'Cloud Technology and Services', 4: 'Billing, Pricing, and Support' };
  const PESO = { 1: 24, 2: 30, 3: 34, 4: 12 };
  const COTA = { 1: 16, 2: 19, 3: 22, 4: 8 };
  const TASK = {
    '1.1': 'Benefícios da AWS Cloud', '1.2': 'Well-Architected e princípios de design', '1.3': 'Migração e AWS CAF', '1.4': 'Economia da nuvem',
    '2.1': 'Responsabilidade compartilhada', '2.2': 'Segurança, governança e conformidade', '2.3': 'Gestão de acesso', '2.4': 'Recursos de segurança',
    '3.1': 'Implantação e operação', '3.2': 'Infraestrutura global', '3.3': 'Computação', '3.4': 'Bancos de dados', '3.5': 'Rede',
    '3.6': 'Armazenamento', '3.7': 'IA/ML e analytics', '3.8': 'Integração, dev tools, EUC e IoT',
    '4.1': 'Modelos de preço', '4.2': 'Billing, orçamento e custos', '4.3': 'Suporte e recursos técnicos',
  };
  const META_TREINO = 80;
  const SCORE = window.CLF_SCORE;
  // Calculado também para tentativas antigas: nenhuma migração ou perda de progresso.
  const scoreHistorico = h => h.modo === 'prova' ? SCORE.calcular(h.acertos, h.total) : null;
  const DURACAO = 90 * 60 * 1000;
  const DATA_PROVA = new Date(2026, 10, 26);
  const KEY = 'clfc02.v1';
  const L = 'ABCDEF';
  const NUM = { 2: 'DUAS', 3: 'TRÊS' };

  // ---------------- Ícones (traço único, 16px) ----------------
  const I = {
    check: '<path d="M3 8.5l3.2 3L13 4.5"/>',
    x: '<path d="M4 4l8 8M12 4l-8 8"/>',
    flag: '<path d="M4 14V2.5M4 3h7.5L9.7 5.8 11.5 8.5H4"/>',
    left: '<path d="M10 3L5 8l5 5"/>',
    right: '<path d="M6 3l5 5-5 5"/>',
    down: '<path d="M8 2.5v8M4.5 7.5L8 11l3.5-3.5M3 13.5h10"/>',
    up: '<path d="M8 11V3M4.5 6L8 2.5 11.5 6M3 13.5h10"/>',
    trash: '<path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.7 9h5.6l.7-9"/>',
    play: '<path d="M5 3l8 5-8 5z"/>',
    grid: '<path d="M2.5 2.5h4v4h-4zM9.5 2.5h4v4h-4zM2.5 9.5h4v4h-4zM9.5 9.5h4v4h-4z"/>',
    exit: '<path d="M9.5 3H3v10h6.5M7 8h7M11.5 5.5L14 8l-2.5 2.5"/>',
    send: '<path d="M2.5 8h9M8 4.5L11.5 8 8 11.5M13.5 3v10"/>',
    redo: '<path d="M12.5 6A5 5 0 1 0 13 9.5M13 2.5V6H9.5"/>',
  };
  const ic = n => `<svg class="ic" viewBox="0 0 16 16" aria-hidden="true">${I[n]}</svg>`;

  // ---------------- Utilidades ----------------
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (a, t) => (t ? Math.round((100 * a) / t) : 0);
  const relogio = ms => { ms = Math.max(0, ms); const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(x).padStart(2, '0'); };
  const minutos = ms => Math.max(1, Math.round(ms / 60000)) + ' min';
  const dataCurta = t => new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
  const dataHora = t => new Date(t).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const corretas = q => q.alternativas.map((a, i) => (a.correta ? i : -1)).filter(i => i >= 0);
  const precisa = q => (q.tipo === 'multipla' ? q.selecionar : 1);
  const completa = (q, r) => !!r && r.length === precisa(q);
  const acertou = (q, r) => { if (!completa(q, r)) return false; const c = corretas(q); return c.every(i => r.includes(i)); };
  const $ = (s, el = document) => el.querySelector(s);

  // ---------------- Estado persistente ----------------
  let S = carregar();
  function vazio() { return { v: 1, sessoes: {}, historico: [], caderno: {} }; }
  function carregar() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === 1) {
        for (const ses of Object.values(s.sessoes || {})) ses.ids = ses.ids.filter(id => QB[id]);
        return Object.assign(vazio(), s);
      }
    } catch (e) { /* estado corrompido: recomeça */ }
    return vazio();
  }
  function salvar() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { toast('Não foi possível salvar o progresso neste navegador.'); }
  }
  function registrar(qid, ok) {
    const c = S.caderno[qid] || (S.caderno[qid] = { v: 0, e: 0, u: 0 });
    c.v++; if (!ok) c.e++; c.u = ok ? 1 : -1; c.t = Date.now();
  }
  const vistas = id => (S.caderno[id] ? S.caderno[id].v : 0);

  // ---------------- Sessões ----------------
  function novaSessao(sid, { nome, modo, tipo, ids }) {
    const ordem = {};
    ids.forEach(id => { ordem[id] = shuffle(QB[id].alternativas.map((_, i) => i)); });
    const agora = Date.now();
    const s = { sid, nome, modo, tipo, ids: tipo === 'caderno' ? ids.slice() : shuffle(ids.slice()), ordem, resp: {}, trav: {}, marc: {}, riscadas: {}, idx: 0, inicio: agora, deadline: modo === 'prova' ? agora + DURACAO : 0, gasto: 0, tick: agora };
    S.sessoes[sid] = s; salvar(); return s;
  }
  function sortearProva() {
    const ids = [];
    for (const d of [1, 2, 3, 4]) {
      const pool = shuffle(BANCO.filter(q => q.dominio === d)).sort((a, b) => vistas(a.id) - vistas(b.id));
      ids.push(...pool.slice(0, COTA[d]).map(q => q.id));
    }
    return ids;
  }
  function filtrarEstudo(f) {
    return BANCO.filter(q => (!f.dom || q.dominio === +f.dom) && (!f.task || q.task === f.task) &&
      (f.origem === 'ineditas' ? !vistas(q.id) : f.origem === 'erradas' ? S.caderno[q.id] && S.caderno[q.id].u === -1 : true));
  }
  const erradasAgora = () => Object.keys(S.caderno).filter(id => QB[id] && S.caderno[id].u === -1);

  function encerrar(s, porTempo, navegar = true) {
    const ids = s.modo === 'prova' ? s.ids : s.ids.filter(id => s.trav[id]);
    if (!ids.length) { delete S.sessoes[s.sid]; salvar(); if (navegar) ir('#/'); return null; }
    const porDom = { 1: [0, 0], 2: [0, 0], 3: [0, 0], 4: [0, 0] }, porTask = {};
    let ac = 0;
    for (const id of ids) {
      const q = QB[id], ok = acertou(q, s.resp[id]);
      if (ok) ac++;
      porDom[q.dominio][1]++; if (ok) porDom[q.dominio][0]++;
      const t = porTask[q.task] || (porTask[q.task] = [0, 0]); t[1]++; if (ok) t[0]++;
      if (s.modo === 'prova') registrar(id, ok);
    }
    const fim = porTempo ? s.deadline : Date.now();
    const h = {
      id: s.sid + '-' + fim, sid: s.sid, nome: s.nome, modo: s.modo, tipo: s.tipo, fim,
      dur: s.modo === 'prova' ? Math.min(DURACAO, fim - s.inicio) : s.gasto,
      total: ids.length, acertos: ac, porDom, porTask, ids, resp: s.resp, marc: s.marc, ordem: s.ordem, porTempo: !!porTempo,
      score: s.modo === 'prova' ? SCORE.calcular(ac, ids.length) : null,
      riscadas: s.riscadas || {},
    };
    S.historico.unshift(h);
    delete S.sessoes[s.sid];
    salvar();
    if (navegar) ir('#/resultado/' + h.id);
    return h;
  }

  // Provas cujo tempo acabou com a página fechada
  const encerradasPorTempo = [];
  for (const s of Object.values(S.sessoes)) if (s.modo === 'prova' && Date.now() >= s.deadline) { encerrar(s, true, false); encerradasPorTempo.push(s.nome); }

  // ---------------- Navegação ----------------
  const ir = h => { if (location.hash === h) render(); else location.hash = h; };
  function rota() {
    const p = location.hash.replace(/^#\/?/, '').split('/');
    return { tela: p[0] || 'inicio', arg: p[1] ? decodeURIComponent(p[1]) : '' };
  }
  let ui = { filtroGab: 'todas', domGab: '', avisoMulti: null, folhaAberta: false };

  // ---------------- Render ----------------
  const rail = $('#rail'), main = $('#main'), barra = $('#barra');
  function render(opts = {}) {
    const foco = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.k : null;
    const r = rota();
    let v;
    if (r.tela === 'q' && S.sessoes[r.arg]) v = telaQuestao(S.sessoes[r.arg]);
    else if (r.tela === 'revisao' && S.sessoes[r.arg] && S.sessoes[r.arg].modo === 'prova') v = telaRevisao(S.sessoes[r.arg]);
    else if (r.tela === 'resultado' && S.historico.find(h => h.id === r.arg)) v = telaResultado(S.historico.find(h => h.id === r.arg));
    else v = telaInicio();
    rail.className = 'rail' + (v.railClasse ? ' ' + v.railClasse : '') + (ui.folhaAberta ? ' aberto' : '');
    rail.innerHTML = v.rail; main.innerHTML = v.main; barra.innerHTML = v.barra || '';
    document.title = v.titulo ? v.titulo + ' · Simulados CLF-C02' : 'Simulados CLF-C02';
    if (opts.focar) { const el = $(opts.focar); if (el) el.focus({ preventScroll: true }); }
    else if (foco) { const el = $(`[data-k="${foco}"]`); if (el) el.focus({ preventScroll: true }); }
    if (opts.topo) window.scrollTo(0, 0);
    tick();
  }

  const marcaHTML = `<a class="marca" href="#/" data-k="marca"><b>CLF</b><span>Simulados C02</span></a>`;

  // ---------- Início ----------
  function diasParaProva() {
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    return Math.round((DATA_PROVA - hoje) / 86400000);
  }
  function telaInicio() {
    const dias = diasParaProva();
    const contagem = dias > 1 ? `<span class="num">${dias}</span><span class="txt">dias para<br>a prova</span>` :
      dias === 1 ? `<span class="num">1</span><span class="txt">dia para<br>a prova</span>` :
        dias === 0 ? `<span class="num">Hoje</span><span class="txt">dia da<br>prova</span>` : `<span class="txt">Prova realizada em 26 nov 2026</span>`;
    const erradas = erradasAgora();
    const railH = `
      ${marcaHTML}
      <div class="rail-bloco">
        <div class="contagem">${contagem}</div>
        <div class="rail-rot so-desk">26 nov 2026 · AWS Certified Cloud Practitioner</div>
      </div>
      <nav class="rail-nav" aria-label="Seções">
        <a href="#simulados" data-k="n1">Simulados <span class="n">${SIMS.length + 1}</span></a>
        <a href="#estudo" data-k="n2">Modo estudo</a>
        <a href="#caderno" data-k="n3">Caderno de erros <span class="n">${erradas.length}</span></a>
        <a href="#desempenho" data-k="n4">Desempenho</a>
        <a href="#historico" data-k="n5">Histórico <span class="n">${S.historico.length}</span></a>
        <a href="#dados" data-k="n6">Seus dados</a>
      </nav>
      <div class="rail-pe">Banco: ${BANCO.length} questões<br>${esc(META.guia || 'CLF-C02')}</div>`;

    const linhaSim = (sid, nome, sub, ativo, hs) => {
      const ult = hs[0];
      let estado;
      if (ativo) {
        const resp = ativo.ids.filter(id => completa(QB[id], ativo.resp[id])).length;
        estado = `<span class="estado andamento">Em andamento · ${resp}/${ativo.ids.length} · ${relogio(ativo.deadline - Date.now()).replace(/:\d\d$/, '')} min restantes</span>`;
      } else if (ult) estado = `<span class="estado">Última: <b class="num">${scoreHistorico(ult).valor}/1.000</b> estimado · ${pct(ult.acertos, ult.total)}% · ${dataCurta(ult.fim)}${hs.length > 1 ? ` · ${hs.length} tentativas` : ''}</span>`;
      else estado = `<span class="estado">Não iniciado</span>`;
      const acoes = ativo
        ? `<button class="btn" data-acao="continuar" data-sid="${sid}" data-k="c-${sid}">${ic('play')}Continuar</button>
           <button class="btn perigo" data-acao="recomecar" data-sid="${sid}" data-k="r-${sid}">${ic('redo')}Recomeçar</button>`
        : `<button class="btn${ult ? ' sec2' : ''}" data-acao="iniciar" data-sid="${sid}" data-k="i-${sid}">${ic(ult ? 'redo' : 'play')}${ult ? 'Refazer' : 'Iniciar'}</button>
           ${ult ? `<a class="btn ghost" href="#/resultado/${encodeURIComponent(ult.id)}" data-k="v-${sid}">Ver resultado</a>` : ''}`;
      return `<tr><td><span class="nome">${esc(nome)}</span><span class="sub">${sub}</span></td><td>${estado}</td><td class="acoes-td"><div class="acoes">${acoes}</div></td></tr>`;
    };
    const histDe = sid => S.historico.filter(h => h.sid === sid);
    const linhas = SIMS.map(s => linhaSim(s.id, s.nome, '65 questões fixas · 16/19/22/8 por domínio', S.sessoes[s.id], histDe(s.id))).join('') +
      linhaSim('AL', 'Prova aleatória', '65 questões sorteadas do banco, priorizando as que você viu menos', S.sessoes.AL, histDe('AL'));

    // Estudo
    const es = S.sessoes.ES, ce = S.sessoes.CE;
    const andamentoEstudo = s => {
      const n = s.ids.filter(id => s.trav[id]).length;
      return `<div class="painel" style="margin-bottom:14px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
        <span class="estado andamento">${esc(s.nome)} em andamento · ${n}/${s.ids.length} respondidas</span>
        <span class="acoes" style="display:flex;gap:8px"><button class="btn" data-acao="continuar" data-sid="${s.sid}" data-k="c-${s.sid}">${ic('play')}Continuar</button>
        <button class="btn sec2" data-acao="encerrar" data-sid="${s.sid}" data-k="e-${s.sid}">Encerrar</button></span></div>`;
    };
    const opDom = `<option value="">Todos</option>` + [1, 2, 3, 4].map(d => `<option value="${d}">D${d} · ${DOM[d]}</option>`).join('');

    // Desempenho
    const desemp = [1, 2, 3, 4].map(d => {
      let v = 0, e = 0, n = 0;
      for (const q of BANCO) if (q.dominio === d && S.caderno[q.id]) { const c = S.caderno[q.id]; v += c.v; e += c.e; n++; }
      const total = BANCO.filter(q => q.dominio === d).length;
      const p = pct(v - e, v);
      return `<div class="dom"><span class="nm">D${d} · ${DOM[d]}</span>
        <span class="pct${v ? '' : ' vazio'}">${v ? p + '<small>%</small>' : '—'}</span>
        <div class="barra${v && p < META_TREINO ? ' baixo' : ''}" aria-hidden="true"><i style="width:${p}%"></i><span class="alvo" style="left:${META_TREINO}%"></span></div>
        <span class="meta">${v ? `${v - e} acertos em ${v} respostas · ` : ''}${n} de ${total} questões vistas · peso ${PESO[d]}%</span></div>`;
    }).join('');

    const hist = S.historico.length ? `<table class="tabela"><thead><tr><th>Data</th><th>Tentativa</th><th>Nota</th><th></th></tr></thead><tbody>${S.historico.map(h =>
      `<tr><td><span class="estado">${dataHora(h.fim)}</span></td><td><span class="nome" style="font-size:18px">${esc(h.nome)}</span><span class="sub">Modo ${h.modo} · ${h.acertos}/${h.total} corretas · ${minutos(h.dur)}${h.porTempo ? ' · encerrado por tempo' : ''}</span></td>
       <td>${h.modo === 'prova'
         ? `<span class="num" style="color:${scoreHistorico(h).atingiuCorte ? 'var(--azul)' : 'var(--erro)'}">${scoreHistorico(h).valor}/1.000</span><span class="sub">Score estimado · ${pct(h.acertos, h.total)}% de acertos</span>`
         : `<span class="num" style="color:${pct(h.acertos, h.total) >= META_TREINO ? 'var(--azul)' : 'var(--erro)'}">${pct(h.acertos, h.total)}%</span>`}</td>
       <td class="acoes-td"><div class="acoes"><a class="btn ghost" href="#/resultado/${encodeURIComponent(h.id)}" data-k="h-${esc(h.id)}">Ver</a></div></td></tr>`).join('')}</tbody></table>`
      : `<p class="vazio-txt">Nenhuma tentativa concluída ainda. Os resultados aparecem aqui ao enviar uma prova ou encerrar um estudo.</p>`;

    const porDomErr = [1, 2, 3, 4].map(d => { const n = erradas.filter(id => QB[id].dominio === d).length; return n ? `<span class="chip">D${d} · ${n}</span>` : ''; }).join('');

    const mainH = `<div class="wrap">
      <div class="topo-inicio">
        <div><h1>Simulados CLF-C02</h1>
        <p class="lead">Provas no formato da AWS Certified Cloud Practitioner: 65 questões, 90 minutos, escolha única e resposta múltipla, com os pesos do guia oficial. Cada alternativa tem justificativa.</p></div>
      </div>
      <div class="formato"><span class="chip cheio">65 questões</span><span class="chip">90 minutos</span><span class="chip">D1 24% · D2 30% · D3 34% · D4 12%</span><span class="chip">${BANCO.length} questões no banco</span></div>
      ${encerradasPorTempo.length ? `<div class="alerta-box" role="status">O tempo acabou com a página fechada e a prova foi enviada automaticamente: ${encerradasPorTempo.map(esc).join(', ')}. O resultado está no histórico.</div>` : ''}

      <section class="sec" id="simulados" aria-labelledby="t-sim"><h2 id="t-sim">Simulados</h2>
        <table class="tabela"><thead><tr><th>Prova</th><th>Situação</th><th></th></tr></thead><tbody>${linhas}</tbody></table>
        <p class="nota">Os simulados 1 a 6 não repetem questões entre si. No modo prova não há correção até o envio, e o relógio continua contando mesmo com a página fechada. A ordem das questões e das alternativas muda a cada tentativa.</p>
      </section>

      <section class="sec" id="estudo" aria-labelledby="t-est"><h2 id="t-est">Modo estudo</h2>
        ${es ? andamentoEstudo(es) : ''}
        <form class="painel form-estudo" id="form-estudo">
          <div class="campo"><label for="f-dom">Domínio</label><select id="f-dom" name="dom">${opDom}</select></div>
          <div class="campo"><label for="f-task">Tópico do guia</label><select id="f-task" name="task"><option value="">Todos</option></select></div>
          <div class="campo"><label for="f-origem">Questões</label><select id="f-origem" name="origem"><option value="todas">Todas</option><option value="ineditas">Nunca respondidas</option><option value="erradas">Erradas na última vez</option></select></div>
          <div class="campo"><label for="f-qtd">Quantidade</label><select id="f-qtd" name="qtd"><option>10</option><option selected>20</option><option>30</option><option>65</option><option value="0">Todas</option></select></div>
          <button class="btn" type="submit" id="f-ir" data-k="f-ir">${ic('play')}Começar</button>
        </form>
        <p class="nota" id="f-disp" aria-live="polite"></p>
      </section>

      <section class="sec" id="caderno" aria-labelledby="t-cad"><h2 id="t-cad">Caderno de erros</h2>
        ${ce ? andamentoEstudo(ce) : ''}
        ${erradas.length ? `<div class="painel" style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between">
            <div><span class="nome" style="font:300 48px/.9 var(--display);color:var(--erro)">${erradas.length}</span>
            <span class="estado" style="margin-left:8px">questões erradas na última tentativa</span><div class="formato" style="margin-top:10px">${porDomErr}</div></div>
            <button class="btn" data-acao="caderno" data-k="cad">${ic('play')}Revisar erros</button></div>
            <p class="nota">Uma questão sai do caderno quando você a acerta.</p>`
        : `<p class="vazio-txt">Nenhum erro registrado ainda. As questões que você errar em provas ou no estudo ficam aqui até você acertá-las.</p>`}
      </section>

      <section class="sec" id="desempenho" aria-labelledby="t-des"><h2 id="t-des">Desempenho por domínio</h2>
        <div class="dom-grade">${desemp}</div>
        <p class="nota">Taxa de acerto acumulada em todas as respostas corrigidas. A linha vertical marca a meta de treino de ${META_TREINO}%.</p>
      </section>

      <section class="sec" id="historico" aria-labelledby="t-his"><h2 id="t-his">Histórico</h2>${hist}</section>

      <section class="sec" id="dados" aria-labelledby="t-dad"><h2 id="t-dad">Seus dados</h2>
        <p class="nota" style="margin:0 0 14px">O progresso fica só neste navegador. Exporte um arquivo para continuar em outro computador.</p>
        <div class="dados-acoes">
          <button class="btn sec2" data-acao="exportar" data-k="exp">${ic('down')}Exportar progresso</button>
          <button class="btn sec2" data-acao="importar" data-k="imp">${ic('up')}Importar progresso</button>
          <button class="btn perigo" data-acao="apagar" data-k="apg">${ic('trash')}Apagar tudo</button>
          <input type="file" id="arq" accept="application/json,.json" hidden>
        </div>
      </section>
    </div>`;
    return { rail: railH, main: mainH, titulo: '' };
  }

  function atualizarFormEstudo() {
    const fd = $('#f-dom'), ft = $('#f-task'); if (!fd) return;
    const atual = ft.value;
    const ts = Object.keys(TASK).filter(t => !fd.value || t[0] === fd.value);
    ft.innerHTML = `<option value="">Todos</option>` + ts.map(t => `<option value="${t}"${t === atual ? ' selected' : ''}>${t} · ${TASK[t]}</option>`).join('');
    const n = filtrarEstudo({ dom: fd.value, task: ft.value, origem: $('#f-origem').value }).length;
    $('#f-disp').textContent = n ? `${n} questões disponíveis com esse filtro.` : 'Nenhuma questão com esse filtro.';
    $('#f-ir').disabled = !n;
  }

  // ---------- Questão ----------
  function railSessao(s, atualIdx, naRevisao) {
    const prova = s.modo === 'prova';
    const resp = s.ids.filter(id => completa(QB[id], s.resp[id])).length;
    const marc = s.ids.filter(id => s.marc[id]).length;
    const trav = s.ids.filter(id => s.trav[id]);
    const ac = trav.filter(id => acertou(QB[id], s.resp[id])).length;
    const cont = prova
      ? `<div><b>${resp}</b><span>Respondidas</span></div><div><b>${marc}</b><span>Marcadas</span></div><div><b>${s.ids.length - resp}</b><span>Em branco</span></div>`
      : `<div><b>${ac}</b><span>Acertos</span></div><div><b>${trav.length - ac}</b><span>Erros</span></div><div><b>${s.ids.length - trav.length}</b><span>Restantes</span></div>`;
    const celulas = s.ids.map((id, i) => {
      const q = QB[id];
      let c = 'cel', st = 'em branco';
      if (!prova && s.trav[id]) { const ok = acertou(q, s.resp[id]); c += ok ? ' ok' : ' err'; st = ok ? 'correta' : 'errada'; }
      else if (completa(q, s.resp[id])) { c += ' resp'; st = 'respondida'; }
      else if (s.resp[id] && s.resp[id].length) { c += ' parcial'; st = 'incompleta'; }
      if (s.marc[id]) { c += ' marc'; st += ', marcada'; }
      if (i === atualIdx && !naRevisao) c += ' atual';
      return `<button class="${c}" data-ir="${i}" data-k="cel-${i}" aria-label="Questão ${i + 1}, ${st}"${i === atualIdx && !naRevisao ? ' aria-current="true"' : ''}>${i + 1}</button>`;
    }).join('');
    const legenda = prova
      ? `<span><i class="resp"></i>Respondida</span><span><i></i>Em branco</span><span><i class="marc"></i>Marcada</span>`
      : `<span><i class="ok"></i>Correta</span><span><i class="err"></i>Errada</span><span><i></i>Pendente</span><span><i class="marc"></i>Marcada</span>`;
    return `
      ${marcaHTML}
      <div class="rail-bloco">
        <div class="modo-linha"><span class="chip ${prova ? 'cheio' : 'claro'}">Modo ${prova ? 'prova' : 'estudo'}</span><button class="btn contorno-claro pq mapa-toggle" data-acao="folha" aria-expanded="${ui.folhaAberta}" aria-controls="folha" data-k="folha">${ic('grid')}Folha</button></div>
        <div class="titulo-prova">${esc(s.nome)}</div>
      </div>
      <div class="relogio" id="relogio"><span class="t" id="rel-t">${prova ? relogio(s.deadline - Date.now()) : relogio(s.gasto)}</span><span class="s">${prova ? 'restantes de 90:00' : 'tempo de estudo'}</span></div>
      <div class="contadores">${cont}</div>
      <div class="rail-bloco bloco-folha"><span class="rail-rot">Folha de respostas</span><div class="folha" id="folha">${celulas}</div><div class="legenda">${legenda}</div></div>
      <div class="rail-acoes">
        ${prova ? (naRevisao ? '' : `<button class="btn claro" data-acao="revisar" data-k="rv">${ic('send')}Revisar e enviar</button>`) : `<button class="btn claro" data-acao="encerrar" data-sid="${s.sid}" data-k="enc">Encerrar estudo</button>`}
        <button class="btn contorno-claro" data-acao="sair" data-k="sair">${ic('exit')}Sair e salvar</button>
      </div>`;
  }

  function altsHTML(q, ordem, resp, corrigir, prova, riscadas = [], podeRiscar = false) {
    resp = resp || [];
    const multi = q.tipo === 'multipla';
    return `<ul class="alts" role="${multi ? 'group' : 'radiogroup'}" aria-label="Alternativas">${ordem.map((orig, pos) => {
      const a = q.alternativas[orig], sel = resp.includes(orig), riscada = riscadas.includes(orig);
      const desenharRisco = riscada && podeRiscar && ui.riscoAnimado && ui.riscoAnimado.id === q.id && ui.riscoAnimado.orig === orig;
      let cls = 'alt' + (riscada ? ' riscada' : '') + (desenharRisco ? ' riscada-entrando' : ''), selo = '', porque = '';
      if (corrigir) {
        if (a.correta && sel) { cls += ' c-ok'; selo = `<span class="selo">${ic('check')}Correta · sua</span>`; }
        else if (a.correta) { cls += ' c-falta'; selo = `<span class="selo">${ic('check')}Correta</span>`; }
        else if (sel) { cls += ' c-err'; selo = `<span class="selo">${ic('x')}Sua resposta</span>`; }
        else cls += ' c-neutro';
        porque = `<span class="porque">${esc(a.porque)}</span>`;
      } else if (sel) { cls += ' sel'; selo = `<span class="marca-sel">${ic('check')}</span>`; }
      const attrs = corrigir ? 'aria-disabled="true"' : `data-alt="${orig}" role="${multi ? 'checkbox' : 'radio'}" aria-checked="${sel}"`;
      const anotacaoId = `risco-${q.id}-${orig}`;
      const anotacao = riscada ? `<span class="sr" id="${anotacaoId}">Riscada por você. Apenas uma anotação visual.</span>` : '';
      const gesto = podeRiscar ? ` data-riscar="${orig}" title="Botão direito: ${riscada ? 'restaurar' : 'riscar'} alternativa ${L[pos]} (Shift+${L[pos]})"` : '';
      const descricao = [podeRiscar ? 'dica-riscar' : '', riscada ? anotacaoId : ''].filter(Boolean).join(' ');
      const traco = riscada ? `<svg class="risco-traco" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" d="M4 28L594 12"/><path pathLength="1" d="M18 32L575 18"/></svg>` : '';
      const cancela = riscada ? `<svg class="risco-cancela" viewBox="0 0 44 40" aria-hidden="true" focusable="false"><path pathLength="1" d="M4 34L40 5"/><path pathLength="1" d="M7 6L38 33"/></svg>` : '';
      const carimbo = riscada ? '<span class="risco-carimbo" aria-hidden="true">Descartada por você</span>' : '';
      return `<li role="none"><button class="${cls}" ${attrs}${gesto}${descricao ? ` aria-describedby="${descricao}"` : ''} data-k="alt-${pos}"><span class="letra">${L[pos]}${cancela}</span><span class="alt-corpo"><span class="risco-texto"><span class="txt">${esc(a.texto)}</span>${traco}</span>${carimbo}${anotacao}${porque}</span>${selo}</button></li>`;
    }).join('')}</ul>`;
  }

  function feedbackHTML(q, resp) {
    const ok = acertou(q, resp), branco = !resp || !resp.length;
    return `<div class="feedback" role="status">
      <span class="res ${branco ? 'nada' : ok ? 'ok' : 'err'}">${branco ? 'Em branco' : ok ? ic('check') + 'Acertou' : ic('x') + 'Errou'}</span>
      <div><h3>Conceito-chave</h3><p>${esc(q.explicacao)}</p>
      <div class="meta-q"><span class="chip">D${q.dominio} · ${q.task} ${esc(TASK[q.task])}</span>${(q.servicos || []).map(x => `<span class="chip mono">${esc(x)}</span>`).join('')}</div></div></div>`;
  }

  function telaQuestao(s) {
    s.idx = Math.min(Math.max(0, s.idx), s.ids.length - 1);
    const id = s.ids[s.idx], q = QB[id], prova = s.modo === 'prova', trav = !prova && s.trav[id];
    const r = s.resp[id] || [], n = precisa(q), ultima = s.idx === s.ids.length - 1;
    const instr = q.tipo === 'multipla'
      ? `<div class="instr" aria-live="polite">${r.length} de ${n} selecionadas${ui.avisoMulti === id ? `<span class="aviso">Você já marcou ${NUM[n].toLowerCase()}. Desmarque uma para trocar.</span>` : ''}</div>` : '';
    const mainH = `<div class="wrap">
      <div class="q-cab">
        <span class="q-num">Questão <b>${s.idx + 1}</b> de ${s.ids.length}</span>
        ${prova ? '' : `<span class="chip">D${q.dominio} · ${q.task}</span>`}
        ${q.tipo === 'multipla' ? `<span class="chip navy">Resposta múltipla · ${NUM[n]}</span>` : ''}
        <span class="espaco"></span>
        <button class="btn sec2 pq" data-acao="marcar" aria-pressed="${!!s.marc[id]}" data-k="marcar">${ic('flag')}${s.marc[id] ? 'Marcada' : 'Marcar'}</button>
      </div>
      <p class="enunciado" id="enun" tabindex="-1">${esc(q.enunciado)}</p>
      ${instr}
      <p class="dica-riscar" id="dica-riscar"><strong>Botão direito</strong> na alternativa: riscar ou restaurar. Apenas visual, sem alterar sua resposta. <span>Atalho: Shift + letra.</span></p>
      ${altsHTML(q, s.ordem[id], r, trav, prova, (s.riscadas || {})[id] || [], true)}
      ${trav ? feedbackHTML(q, r) : ''}
    </div>`;
    let principal;
    if (!prova && !trav) principal = `<button class="btn" data-acao="responder" data-k="resp" ${completa(q, r) ? '' : 'disabled'}>${ic('check')}<span class="rot">Responder</span> <kbd>Enter</kbd></button>`;
    else if (ultima) principal = prova ? `<button class="btn" data-acao="revisar" data-k="rv2">${ic('send')}<span class="rot">Revisar e enviar</span></button>` : `<button class="btn" data-acao="encerrar" data-sid="${s.sid}" data-k="enc2">Encerrar estudo</button>`;
    else principal = `<button class="btn" data-acao="prox" data-k="prox" aria-label="Próxima questão"><span class="rot">Próxima</span>${ic('right')}</button>`;
    const barraH = `<div class="barra-acoes">
      <button class="btn sec2" data-acao="ant" data-k="ant" aria-label="Questão anterior" ${s.idx === 0 ? 'disabled' : ''}>${ic('left')}<span class="rot">Anterior</span></button>
      ${!prova && !trav ? `<button class="btn ghost" data-acao="prox" data-k="pular" ${ultima ? 'disabled' : ''}>Pular</button>` : ''}
      <span class="espaco"></span>
      <span class="dica" aria-hidden="true">A–${L[q.alternativas.length - 1]} escolhe · ← → navega · M marca${prova ? '' : ' · Enter responde'}</span>
      ${principal}
    </div>`;
    return { rail: railSessao(s, s.idx), main: mainH, barra: barraH, railClasse: 'prova', titulo: `Questão ${s.idx + 1}` };
  }

  // ---------- Revisão ----------
  function telaRevisao(s) {
    const brancos = [], marcadas = [];
    s.ids.forEach((id, i) => { if (!completa(QB[id], s.resp[id])) brancos.push(i); if (s.marc[id]) marcadas.push(i); });
    const lista = arr => arr.length ? `<div class="lista-ir">${arr.map(i => `<button data-ir="${i}" data-k="li-${i}">${i + 1}</button>`).join('')}</div>` : `<p class="vazio-txt" style="padding:8px 0">Nenhuma.</p>`;
    const mainH = `<div class="wrap">
      <h1>Revisão</h1>
      <p class="lead">Confira antes de enviar. Questões em branco contam como erro e não há penalidade por chute, então vale responder todas.</p>
      <div class="resumo-rev">
        <div><b>${s.ids.length - brancos.length}</b><span>Respondidas</span></div>
        <div><b class="${brancos.length ? 'alerta' : ''}">${brancos.length}</b><span>Em branco ou incompletas</span></div>
        <div><b>${marcadas.length}</b><span>Marcadas</span></div>
        <div><b id="rev-t">${relogio(s.deadline - Date.now())}</b><span>Tempo restante</span></div>
      </div>
      <section class="sec" style="margin-top:40px"><h3>Em branco ou incompletas</h3>${lista(brancos)}</section>
      <section class="sec" style="margin-top:28px"><h3>Marcadas para revisão</h3>${lista(marcadas)}</section>
      <div class="acoes-linha">
        <button class="btn sec2" data-acao="voltar-q" data-k="vq">${ic('left')}Voltar às questões</button>
        <button class="btn" data-acao="enviar" data-k="env">${ic('send')}Enviar prova</button>
      </div>
    </div>`;
    return { rail: railSessao(s, s.idx, true), main: mainH, railClasse: 'prova', titulo: 'Revisão' };
  }

  // ---------- Resultado ----------
  function telaResultado(h) {
    const p = pct(h.acertos, h.total), ok = p >= META_TREINO, prova = h.modo === 'prova';
    const score = scoreHistorico(h);
    const brancos = h.ids.filter(id => !h.resp[id] || !h.resp[id].length).length;
    const erros = h.ids.filter(id => !acertou(QB[id], h.resp[id]));
    const domRows = [1, 2, 3, 4].filter(d => h.porDom[d][1]).map(d => {
      const [a, t] = h.porDom[d], pp = pct(a, t), bom = pp >= META_TREINO;
      return `<tr><td><span class="dnome">D${d} · ${DOM[d]}</span><span class="sub">${DOM_EN[d]} · peso ${PESO[d]}%</span></td>
        <td><span class="num">${a}/${t}</span></td><td><span class="num" style="color:${bom ? 'var(--azul)' : 'var(--erro)'}">${pp}%</span></td>
        <td class="barra-td"><div class="barra${bom ? '' : ' baixo'}" aria-hidden="true"><i style="width:${pp}%"></i><span class="alvo" style="left:${META_TREINO}%"></span></div></td>
        <td><span class="st ${bom ? 'ok' : 'baixo'}">${bom ? 'Atende' : 'Precisa melhorar'}</span></td></tr>`;
    }).join('');
    const tasks = Object.keys(h.porTask).sort((a, b) => parseFloat(a) - parseFloat(b)).map(t => {
      const [a, n] = h.porTask[t], pp = pct(a, n);
      return `<div class="task"><div class="tl"><span>${t} · ${esc(TASK[t])}</span><b class="${pp < META_TREINO ? 'baixo' : ''}">${a}/${n}</b></div>
        <div class="barra${pp < META_TREINO ? ' baixo' : ''}" aria-hidden="true"><i style="width:${pp}%"></i></div></div>`;
    }).join('');
    const cont = {
      todas: h.ids.length, incorretas: erros.length - brancos, branco: brancos,
      corretas: h.ids.length - erros.length, marcadas: h.ids.filter(id => h.marc[id]).length,
    };
    const filtroBtn = (k, rot) => `<button class="filtro" data-filtro="${k}" aria-pressed="${ui.filtroGab === k}" data-k="fg-${k}">${rot}<span class="n">${cont[k]}</span></button>`;
    const passa = id => {
      const q = QB[id], r = h.resp[id], br = !r || !r.length, acc = acertou(q, r);
      if (ui.domGab && q.dominio !== +ui.domGab) return false;
      return ui.filtroGab === 'todas' || (ui.filtroGab === 'incorretas' && !acc && !br) || (ui.filtroGab === 'branco' && br) ||
        (ui.filtroGab === 'corretas' && acc) || (ui.filtroGab === 'marcadas' && h.marc[id]);
    };
    const itens = h.ids.map((id, i) => ({ id, i })).filter(x => passa(x.id)).map(({ id, i }) => {
      const q = QB[id], r = h.resp[id], br = !r || !r.length, acc = acertou(q, r);
      const st = br ? `<span class="chip navy">Em branco</span>` : acc ? `<span class="chip cheio">${ic('check')}Certa</span>` : `<span class="chip erro">${ic('x')}Errada</span>`;
      return `<details data-gab="${id}" data-i="${i}"><summary data-k="gs-${i}"><span class="gn">${String(i + 1).padStart(2, '0')}</span>${st}<span class="gt">${esc(q.enunciado)}</span><span class="chip">D${q.dominio} · ${q.task}</span></summary><div class="corpo"></div></details>`;
    }).join('') || `<p class="vazio-txt">Nenhuma questão neste filtro.</p>`;

    const railH = `${marcaHTML}
      <nav class="rail-nav" aria-label="Seções"><a href="#/" data-k="n0">${ic('left')}Início</a><a href="#r-dom" data-k="n1">Por domínio</a><a href="#r-task" data-k="n2">Por tópico</a><a href="#r-gab" data-k="n3">Gabarito</a></nav>
      <div class="rail-pe">${esc(h.nome)}<br>${dataHora(h.fim)}</div>`;
    const mainH = `<div class="wrap">
      <h1>${esc(h.nome)}</h1>
      <p class="lead">Modo ${h.modo} · concluído em ${dataHora(h.fim)} · ${minutos(h.dur)}${h.porTempo ? ' · enviado automaticamente quando o tempo acabou' : ''}</p>
      <div class="res-topo">
        ${prova ? `<div class="score-bloco">
          <div class="pct-grande score-grande"><span aria-hidden="true">${score.valor}<small>/1.000</small></span><span class="sr">Score estimado: ${score.valor} pontos na escala de 100 a 1.000</span></div>
          <span class="score-legenda">Score estimado · escala 100–1.000</span>
        </div>` : `<div class="pct-grande"><span aria-hidden="true">${p}<small>%</small></span><span class="sr">${p} por cento de acertos</span></div>`}
        <div class="veredito">
          <span class="linha ${(prova ? score.atingiuCorte : ok) ? 'ok' : 'baixo'}">${prova
            ? (score.atingiuCorte ? 'Atingiu 700 pontos na estimativa' : 'Não atingiu 700 pontos na estimativa')
            : (ok ? 'Acima da meta de treino' : 'Abaixo da meta de treino')}</span>
          <div class="dados"><span><b>${h.acertos}</b> de ${h.total} corretas</span>${prova ? `<span><b>${p}%</b> de acertos</span><span><b>${brancos}</b> em branco</span><span>Corte de referência <b>700</b></span>` : `<span>Meta <b>${META_TREINO}%</b></span>`}</div>
        </div>
      </div>
      ${prova ? `<div class="score-resumo">
        <div class="score-trilho" role="img" aria-label="Score estimado ${score.valor}; mínimo 100, máximo 1.000, corte de referência 700">
          <span class="score-preenchimento${score.atingiuCorte ? '' : ' baixo'}" style="width:${100 * (score.valor - score.minimo) / (score.maximo - score.minimo)}%"></span>
          <span class="score-corte" style="left:${100 * (score.corte - score.minimo) / (score.maximo - score.minimo)}%"></span>
        </div>
        <div class="score-marcas" aria-hidden="true"><span>100</span><span>Corte de referência: 700</span><span>1.000</span></div>
        <p class="nota">Esta é uma estimativa didática, não uma nota oficial nem uma previsão de aprovação. A AWS usa a escala 100–1.000 e exige 700, mas não divulga a fórmula que converte acertos em pontos. A meta de treino de ${META_TREINO}% de acertos continua separada: ${ok ? 'atingida' : 'ainda não atingida'}.</p>
        <details class="score-metodo"><summary>Como o score estimado é calculado?</summary>
          <p class="nota"><code>score = arredondar(100 + 900 × acertos ÷ total)</code>. É uma conversão linear própria do simulado. Todas as ${h.total} questões entram no cálculo; questões em branco contam como erro e respostas múltiplas só pontuam com o conjunto exato, sem crédito parcial. Na prova oficial, 50 questões pontuam e 15 não pontuam, sem identificação; a pontuação também é ajustada entre versões da prova. Por isso o mesmo percentual pode não produzir esta nota na AWS.</p>
        </details>
      </div>` : ''}
      <section class="sec" id="r-dom" aria-labelledby="t-rd"><h2 id="t-rd">Desempenho por domínio</h2>
        <table class="tabela tab-dom"><thead><tr><th>Domínio</th><th>Acertos</th><th>%</th><th style="width:34%"></th><th>Situação</th></tr></thead><tbody>${domRows}</tbody></table>
      </section>
      <section class="sec" id="r-task" aria-labelledby="t-rt"><h2 id="t-rt">Por tópico do guia</h2><div class="tasks">${tasks}</div></section>
      <section class="sec" id="r-gab" aria-labelledby="t-rg"><h2 id="t-rg">Gabarito comentado</h2>
        <div class="filtros">${filtroBtn('todas', 'Todas')}${filtroBtn('incorretas', 'Erradas')}${prova ? filtroBtn('branco', 'Em branco') : ''}${filtroBtn('corretas', 'Certas')}${filtroBtn('marcadas', 'Marcadas')}
          <select id="dom-gab" aria-label="Filtrar por domínio" data-k="dg"><option value="">Todos os domínios</option>${[1, 2, 3, 4].map(d => `<option value="${d}"${ui.domGab == d ? ' selected' : ''}>D${d} · ${DOM[d]}</option>`).join('')}</select>
          <button class="btn ghost pq" data-acao="expandir" data-k="exp-all">Abrir todas</button></div>
        <div class="gab">${itens}</div>
      </section>
      <div class="acoes-linha">
        ${erros.length ? `<button class="btn" data-acao="estudar-erros" data-hid="${esc(h.id)}" data-k="ee">${ic('play')}Estudar os ${erros.length} erros</button>` : ''}
        ${h.sid !== 'ES' && h.sid !== 'CE' ? `<button class="btn sec2" data-acao="iniciar" data-sid="${h.sid}" data-k="ref">${ic('redo')}Refazer ${h.sid === 'AL' ? 'com novo sorteio' : 'este simulado'}</button>` : ''}
        <a class="btn ghost" href="#/" data-k="ini">Início</a>
      </div>
    </div>`;
    return { rail: railH, main: mainH, titulo: 'Resultado' };
  }

  function preencherGab(det) {
    const corpo = det.querySelector('.corpo'); if (corpo.childElementCount) return;
    const h = S.historico.find(x => x.id === rota().arg); if (!h) return;
    const id = det.dataset.gab, q = QB[id];
    corpo.innerHTML = `<p class="enunciado">${esc(q.enunciado)}</p>${altsHTML(q, h.ordem[id] || q.alternativas.map((_, i) => i), h.resp[id], true, false, (h.riscadas || {})[id] || [])}${feedbackHTML(q, h.resp[id])}`;
  }

  // ---------------- Ações ----------------
  const sessaoAtual = () => { const r = rota(); return (r.tela === 'q' || r.tela === 'revisao') ? S.sessoes[r.arg] : null; };
  function irQuestao(s, i) { s.idx = i; ui.avisoMulti = null; salvar(); if (rota().tela !== 'q') ir('#/q/' + s.sid); else render({ focar: '#enun', topo: true }); }

  function riscarAlternativa(s, orig) {
    const id = s.ids[s.idx], q = QB[id];
    if (!Number.isInteger(orig) || orig < 0 || orig >= q.alternativas.length) return;
    // Anotação pessoal: independente do gabarito, das respostas e do bloqueio no estudo.
    const porQuestao = s.riscadas || (s.riscadas = {});
    const riscos = porQuestao[id] || [];
    const estavaRiscada = riscos.includes(orig);
    const novos = estavaRiscada ? riscos.filter(i => i !== orig) : [...riscos, orig];
    if (novos.length) porQuestao[id] = novos; else delete porQuestao[id];
    // Desenha só ao riscar: a animação não se repete ao selecionar, navegar ou recarregar.
    ui.riscoAnimado = estavaRiscada ? null : { id, orig };
    salvar(); render();
    ui.riscoAnimado = null;
    anunciar(`Alternativa ${L[s.ordem[id].indexOf(orig)]} ${estavaRiscada ? 'restaurada' : 'riscada por você'}. Sua resposta não foi alterada.`);
  }

  function escolher(s, orig) {
    const id = s.ids[s.idx], q = QB[id];
    if (s.modo === 'estudo' && s.trav[id]) return;
    let r = (s.resp[id] || []).slice();
    if (q.tipo === 'multipla') {
      if (r.includes(orig)) { r = r.filter(x => x !== orig); ui.avisoMulti = null; }
      else if (r.length >= q.selecionar) { ui.avisoMulti = id; render(); return; }
      else { r.push(orig); ui.avisoMulti = null; }
    } else r = [orig];
    s.resp[id] = r; salvar(); render();
    if (q.tipo === 'multipla') anunciar(`${r.length} de ${q.selecionar} selecionadas`);
  }
  function responder(s) {
    const id = s.ids[s.idx], q = QB[id];
    if (s.trav[id] || !completa(q, s.resp[id])) return;
    s.trav[id] = true; const ok = acertou(q, s.resp[id]); registrar(id, ok); salvar(); render({ focar: '[data-k="prox"], [data-k="enc2"]' });
    anunciar(ok ? 'Acertou.' : 'Errou. ' + q.explicacao);
  }

  async function iniciar(sid) {
    if (S.sessoes[sid]) { ir('#/q/' + sid); return; }
    let s;
    if (sid === 'AL') s = novaSessao('AL', { nome: 'Prova aleatória', modo: 'prova', tipo: 'aleatorio', ids: sortearProva() });
    else { const f = SIMS.find(x => x.id === sid); if (!f) return; s = novaSessao(sid, { nome: f.nome, modo: 'prova', tipo: 'fixo', ids: f.questoes.filter(id => QB[id]) }); }
    ui.folhaAberta = false; ir('#/q/' + s.sid);
  }
  function iniciarEstudo(sid, nome, ids) {
    if (!ids.length) return;
    novaSessao(sid, { nome, modo: 'estudo', tipo: sid === 'CE' ? 'caderno' : 'estudo', ids });
    ui.folhaAberta = false; ir('#/q/' + sid);
  }

  const dlg = $('#dlg');
  function confirmar({ titulo, texto, ok = 'Confirmar', perigo = false, cancelar = 'Cancelar' }) {
    return new Promise(res => {
      dlg.innerHTML = `<form method="dialog" class="d-corpo"><h2>${esc(titulo)}</h2><p>${texto}</p>
        <div class="acoes-linha"><button class="btn sec2" value="nao"${perigo ? ' autofocus' : ''}>${esc(cancelar)}</button><button class="btn${perigo ? ' armado' : ''}" value="sim"${perigo ? '' : ' autofocus'}>${esc(ok)}</button></div></form>`;
      dlg.onclose = () => res(dlg.returnValue === 'sim');
      dlg.returnValue = ''; dlg.showModal();
    });
  }
  const viva = document.createElement('div'); viva.className = 'sr'; viva.setAttribute('aria-live', 'polite'); document.body.appendChild(viva);
  const anunciar = m => { viva.textContent = ''; setTimeout(() => { viva.textContent = m; }, 30); };
  let toastT;
  function toast(msg) {
    let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3200);
  }

  // Só substitui o menu de contexto sobre uma alternativa da questão em andamento.
  // Clique esquerdo continua selecionando; botão direito nunca responde ou desmarca.
  main.addEventListener('contextmenu', e => {
    const alternativa = e.target.closest('[data-riscar]');
    const s = sessaoAtual();
    if (!alternativa || !s || rota().tela !== 'q') return;
    e.preventDefault();
    riscarAlternativa(s, +alternativa.dataset.riscar);
  });

  document.addEventListener('click', async e => {
    const cel = e.target.closest('[data-ir]');
    if (cel) { const s = sessaoAtual(); if (s) { ui.folhaAberta = false; irQuestao(s, +cel.dataset.ir); } return; }
    const alt = e.target.closest('[data-alt]');
    if (alt) { const s = sessaoAtual(); if (s) escolher(s, +alt.dataset.alt); return; }
    const fil = e.target.closest('[data-filtro]');
    if (fil) { ui.filtroGab = fil.dataset.filtro; render(); return; }
    const b = e.target.closest('[data-acao]'); if (!b) return;
    const s = sessaoAtual(), a = b.dataset.acao;
    switch (a) {
      case 'iniciar': iniciar(b.dataset.sid); break;
      case 'continuar': ir('#/q/' + b.dataset.sid); break;
      case 'recomecar':
        if (await confirmar({ titulo: 'Recomeçar a prova?', texto: 'As respostas desta tentativa serão descartadas e o relógio volta a 90 minutos.', ok: 'Recomeçar', perigo: true })) {
          delete S.sessoes[b.dataset.sid]; salvar(); iniciar(b.dataset.sid);
        } break;
      case 'encerrar': {
        const ses = S.sessoes[b.dataset.sid]; if (!ses) break;
        const n = ses.ids.filter(id => ses.trav[id]).length;
        if (await confirmar({ titulo: 'Encerrar o estudo?', texto: n ? `Você respondeu ${n} de ${ses.ids.length}. O resultado considera só as respondidas.` : 'Nenhuma questão foi respondida, então nada será registrado.', ok: 'Encerrar' })) encerrar(ses, false);
        break;
      }
      case 'caderno': iniciarEstudo('CE', 'Caderno de erros', shuffle(erradasAgora())); break;
      case 'estudar-erros': {
        const h = S.historico.find(x => x.id === b.dataset.hid);
        if (h) iniciarEstudo('CE', 'Erros: ' + h.nome, h.ids.filter(id => !acertou(QB[id], h.resp[id])));
        break;
      }
      case 'marcar': if (s) { const id = s.ids[s.idx]; s.marc[id] = !s.marc[id]; if (!s.marc[id]) delete s.marc[id]; salvar(); render(); } break;
      case 'ant': if (s && s.idx > 0) irQuestao(s, s.idx - 1); break;
      case 'prox': if (s && s.idx < s.ids.length - 1) irQuestao(s, s.idx + 1); break;
      case 'responder': if (s) responder(s); break;
      case 'revisar': if (s) { ui.folhaAberta = false; ir('#/revisao/' + s.sid); } break;
      case 'voltar-q': if (s) ir('#/q/' + s.sid); break;
      case 'enviar': if (s) {
        const br = s.ids.filter(id => !completa(QB[id], s.resp[id])).length;
        if (await confirmar({ titulo: 'Enviar a prova?', texto: br ? `Ainda há <b>${br}</b> questões em branco ou incompletas, que contam como erro.` : 'Todas as questões foram respondidas.', ok: 'Enviar prova' })) encerrar(s, false);
      } break;
      case 'sair': ui.folhaAberta = false; ir('#/'); break;
      case 'folha': ui.folhaAberta = !ui.folhaAberta; render(); break;
      case 'expandir': document.querySelectorAll('.gab details').forEach(d => { d.open = true; preencherGab(d); }); break;
      case 'exportar': {
        const blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
        const u = URL.createObjectURL(blob), l = document.createElement('a');
        l.href = u; l.download = `progresso-clf-c02-${new Date().toISOString().slice(0, 10)}.json`; l.click(); setTimeout(() => URL.revokeObjectURL(u), 1000);
        break;
      }
      case 'importar': $('#arq').click(); break;
      case 'apagar':
        if (await confirmar({ titulo: 'Apagar todo o progresso?', texto: 'Histórico, caderno de erros e provas em andamento serão removidos deste navegador. Exporte antes se quiser guardar.', ok: 'Apagar tudo', perigo: true })) { S = vazio(); salvar(); render(); toast('Progresso apagado.'); }
        break;
    }
  });

  document.addEventListener('change', async e => {
    if (e.target.id === 'f-dom' || e.target.id === 'f-task' || e.target.id === 'f-origem') atualizarFormEstudo();
    if (e.target.id === 'dom-gab') { ui.domGab = e.target.value; render(); }
    if (e.target.id === 'arq' && e.target.files[0]) {
      try {
        const d = JSON.parse(await e.target.files[0].text());
        if (!d || d.v !== 1 || !d.caderno || !Array.isArray(d.historico)) throw new Error();
        if (await confirmar({ titulo: 'Importar progresso?', texto: `O arquivo tem ${d.historico.length} tentativas. O progresso atual deste navegador será substituído.`, ok: 'Importar', perigo: true })) {
          S = Object.assign(vazio(), d); salvar(); render(); toast('Progresso importado.');
        }
      } catch (err) { toast('Arquivo inválido: use um arquivo exportado por este simulado.'); }
      e.target.value = '';
    }
  });
  document.addEventListener('submit', e => {
    if (e.target.id !== 'form-estudo') return;
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    let ids = shuffle(filtrarEstudo(f).map(q => q.id));
    if (+f.qtd) ids = ids.slice(0, +f.qtd);
    const nome = f.task ? `Estudo ${f.task}` : f.dom ? `Estudo D${f.dom}` : 'Estudo livre';
    if (S.sessoes.ES) delete S.sessoes.ES;
    iniciarEstudo('ES', nome, ids);
  });
  main.addEventListener('toggle', e => { if (e.target.matches && e.target.matches('details[data-gab]') && e.target.open) preencherGab(e.target); }, true);

  document.addEventListener('keydown', e => {
    if (dlg.open || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
    const r = rota(); if (r.tela !== 'q') return;
    const s = S.sessoes[r.arg]; if (!s) return;
    const id = s.ids[s.idx], q = QB[id], k = e.key.toLowerCase();
    if (e.shiftKey && e.key === 'F10') {
      const alternativa = e.target.closest('[data-riscar]');
      if (alternativa) { e.preventDefault(); riscarAlternativa(s, +alternativa.dataset.riscar); }
      return;
    }
    const pos = L.toLowerCase().indexOf(k);
    if (pos >= 0 && pos < q.alternativas.length && k.length === 1) {
      e.preventDefault();
      if (e.shiftKey) riscarAlternativa(s, s.ordem[id][pos]); else escolher(s, s.ordem[id][pos]);
      return;
    }
    if (e.key === 'ArrowRight' && s.idx < s.ids.length - 1) { e.preventDefault(); irQuestao(s, s.idx + 1); }
    else if (e.key === 'ArrowLeft' && s.idx > 0) { e.preventDefault(); irQuestao(s, s.idx - 1); }
    else if (k === 'm') { e.preventDefault(); s.marc[id] = !s.marc[id]; if (!s.marc[id]) delete s.marc[id]; salvar(); render(); }
    else if (e.key === 'Enter' && tag !== 'button' && s.modo === 'estudo') {
      e.preventDefault();
      if (!s.trav[id]) responder(s); else if (s.idx < s.ids.length - 1) irQuestao(s, s.idx + 1);
    }
  });

  // ---------------- Relógio ----------------
  let ultimoSalvo = 0;
  function tick() {
    const s = sessaoAtual(); if (!s) return;
    const agora = Date.now();
    if (s.modo === 'prova') {
      const rest = s.deadline - agora;
      if (rest <= 0) { encerrar(s, true); toast('O tempo acabou e a prova foi enviada.'); return; }
      const t = $('#rel-t'); if (t) t.textContent = relogio(rest);
      const rv = $('#rev-t'); if (rv) rv.textContent = relogio(rest);
      const rel = $('#relogio'); if (rel) rel.classList.toggle('urgente', rest < 5 * 60 * 1000);
      for (const m of [15, 5]) if (rest < m * 60000 && rest > (m * 60000 - 60000) && !(s.avisos || []).includes(m)) { (s.avisos = s.avisos || []).push(m); salvar(); toast(`Faltam ${m} minutos.`); }
    } else {
      s.gasto += Math.min(agora - (s.tick || agora), 60000); s.tick = agora;
      const t = $('#rel-t'); if (t) t.textContent = relogio(s.gasto);
      if (agora - ultimoSalvo > 10000) { ultimoSalvo = agora; salvar(); }
    }
  }
  setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { const s = sessaoAtual(); if (s && s.modo === 'estudo') { s.tick = Date.now(); if (document.hidden) salvar(); } });
  window.addEventListener('hashchange', () => { ui.avisoMulti = null; const s = sessaoAtual(); if (s && s.modo === 'estudo') s.tick = Date.now(); render({ focar: rota().tela === 'q' ? '#enun' : 'h1', topo: !location.hash.match(/^#[a-z]/) }); });

  if (!BANCO.length) { main.innerHTML = '<div class="wrap"><h1>Banco não encontrado</h1><p class="lead">O arquivo banco/questoes.js não carregou. Abra o index.html a partir da pasta do projeto, sem mover os arquivos.</p></div>'; return; }
  render();
  if (rota().tela === 'inicio') atualizarFormEstudo();
  window.addEventListener('hashchange', () => { if (rota().tela === 'inicio') atualizarFormEstudo(); });
})();


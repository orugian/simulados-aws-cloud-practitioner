# Proposta de arquitetura: simulados CLF-C02

> Status: **proposta para aprovação**. Nenhuma interface foi construída ainda.

## 1. O que aproveitar do projeto AIF-C01 e o que mudar

| Aproveitar (rodada 5) | Corrigir |
| --- | --- |
| Arquivo único, offline, sem servidor | Banco duplicado em cada HTML → **um banco único** (`banco/questoes.js`) e um único motor |
| Modos **prova** e **estudo** | Ordem fixa (sementes) → **sorteio estratificado por domínio a cada tentativa** |
| Timer por *deadline* (continua contando com a página fechada) | Sem histórico → **histórico de tentativas** e evolução por domínio |
| Revisão antes de enviar e gabarito filtrável | Sem "refazer erros" → **modo revisão dos erros** (caderno de erros) |
| Justificativa por alternativa | Metadados perdidos → `task`, `servicos`, `fonte`, `explicacao`, `ref` por questão |
| Sem nota escalada falsa | Re-render total → render que preserva o foco, atalho `M` para marcar |
| | Sem validação → **script validador** do banco (pesos, escopo, duplicatas, formato) |

Ordenação e associação **saem**: não existem no CLF-C02.

## 2. Estrutura de arquivos

```
AWS/
├─ index.html                  ← simulador (abre direto no navegador)
├─ banco/questoes.js           ← banco único: window.BANCO = [...]
├─ simulados/                  ← provas fixas "congeladas" (rodada 1..N) geradas do banco
├─ tools/validar-banco.js      ← checagem: escopo, pesos, duplicatas, formato
├─ tools/gerar-simulado.js     ← gera simulado fixo de 65 questões com pesos 16/19/22/8
├─ docs/                       ← escopo oficial, auditoria das fontes, esta proposta
└─ _referencias/               ← repositórios clonados (não publicar)
```

O banco fica em `.js`, e não em `.json`, para funcionar por `file://` sem servidor, já que o `fetch` de JSON local é bloqueado.

## 3. Esquema de questão

```js
{
  id: "D2-023",
  dominio: 2, task: "2.3",
  tipo: "unica" | "multipla", selecionar: 2,
  enunciado: "…(Selecione DUAS.)",
  alternativas: [
    { texto: "…", correta: true,  porque: "…" },
    { texto: "…", correta: false, porque: "…" }
  ],
  explicacao: "Conceito-chave em 1–2 frases.",
  servicos: ["IAM Identity Center"],
  dificuldade: 1 | 2 | 3,
  fonte: "usuario-A17" | "kananinirav-ex4#12 (reescrita)" | "autoral",
  ref: "https://docs.aws.amazon.com/…"
}
```

## 4. Banco de questões: meta

| Domínio | Meta (cerca de 6 provas completas sem repetir) |
| --- | --- |
| D1 Cloud Concepts | 100 |
| D2 Security & Compliance | 120 |
| D3 Technology & Services | 135 |
| D4 Billing, Pricing & Support | 50 |
| **Total** | **~400** |

Fontes, em ordem de prioridade:
1. As 152 questões fornecidas, com gabarito conferido.
2. As ~946 únicas do kananinirav, filtradas: descartar as 168 desatualizadas ou reescrevê-las com a nomenclatura atual, e traduzir para PT-BR.
3. Questões autorais para as lacunas do guia v1.3 (ver [02-analise](02-analise-questoes-fornecidas.md#achados)).

Proporção de tipos igual à da prova: cerca de 15% de múltipla resposta.

## 5. Funcionalidades do `index.html`

- **Início:** contagem até 26/11, cobertura por domínio, histórico e botões de modo.
- **Modo prova:** 65 questões sorteadas (16/19/22/8), 90 min, sem feedback e sem rótulo de domínio, marcar para revisão, tela de revisão e envio automático.
- **Modo estudo:** filtros por domínio, task ou serviço; quantidade livre; correção imediata com justificativa por alternativa.
- **Caderno de erros:** refaz apenas as questões erradas ou marcadas em tentativas anteriores.
- **Simulados fixos:** rodadas 1…N congeladas, para comparar evolução na mesma prova.
- **Resultado:** % bruto, estimativa de nota (rotulada como aproximada), barras por domínio e task, gabarito comentado com filtros.
- **Atalhos:** `A`–`E` alternativa · `←` `→` navegar · `M` marcar · `Enter` responder (estudo).
- **Persistência:** localStorage, com exportar/importar progresso em JSON.

## 6. Design: aplicação do NOUS

O DESIGN.md do NOUS é uma extração automática (precisão de componentes 0,22). Ele define cores, tipografia e botões, mas **não define** estados de correto e errado, modal, progress bar nem espaçamento. A aplicação fica assim:

- **Paleta:** azul elétrico `#0000F2` (ações e texto de destaque), off-white `#F2F2F2` (fundo), navy `#000061` (barra lateral e mapa), `#616191` (texto secundário).
- **Estados de resposta:** o NOUS não tem verde nem vermelho, e a regra dele é "não introduzir cores não medidas". Proposta: **correta** = preenchimento `#0000F2` com ✓; **errada** = contorno navy, texto riscado e ✗. As cores ficam fiéis ao NOUS e a distinção vem do ícone e da forma, não da cor (ver decisão 3).
- **Tipografia:** as fontes do NOUS (Rules Condensed, Aeonik Fono TRIAL) são comerciais e não estão disponíveis. Substitutas livres: **Barlow Condensed** (UI e botões, em caixa alta), **Oswald** (display, timer e nota) e **IBM Plex Mono** (legendas e metadados), com fallback para fontes do sistema offline.
- **Formas:** raios de 2 a 5 px, chips com canto esquerdo reto e direito arredondado, **sem sombras projetadas**, só contornos internos de 1 px.
- **Rótulos de UI em CAIXA ALTA.** Enunciados e alternativas em caixa normal, pela legibilidade em 65 questões.

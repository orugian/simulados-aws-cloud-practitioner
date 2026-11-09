# Simulados AWS Certified Cloud Practitioner (CLF-C02)

**▶ Abrir o simulador:** https://orugian.github.io/simulados-aws-cloud-practitioner/

Ou offline: baixe o repositório (Code → Download ZIP), extraia e dê dois cliques em `index.html`. Não precisa instalar nada.
Banco de questões em português, revisado e alinhado ao **[Exam Guide CLF-C02 v1.3](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html)** (29/10/2026), com 6 simulados completos sem repetição.

## Banco de questões

| Domínio | Peso oficial | Questões no banco | Por simulado |
| --- | --- | --- | --- |
| 1. Cloud Concepts | 24% | 100 | 16 |
| 2. Security and Compliance | 30% | 120 | 19 |
| 3. Cloud Technology and Services | 34% | 135 | 22 |
| 4. Billing, Pricing, and Support | 12% | 50 | 8 |
| **Total** | | **405** | **65** |

- **Tipos:** os mesmos da prova. São 334 de escolha única (4 alternativas) e 71 de resposta múltipla (66 "Selecione DUAS" e 5 "Selecione TRÊS").
- **Cobertura:** as 19 task statements do guia, com cota por task.
- **Dificuldade:** 128 de nível 1, 203 de nível 2 e 74 de nível 3.
- **Origem:**
  - 143 vêm de questões coletadas e sanitizadas;
  - 94 do [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes), traduzidas, com gabarito conferido e nomenclatura atualizada;
  - 168 são autorais, escritas para cobrir lacunas do guia v1.3.
- **Justificativas:** toda alternativa explica por que está certa ou errada, e cada questão traz o conceito-chave.
- **Atualização:** o banco segue a nomenclatura e os fatos vigentes:
  - planos de suporte Basic / Business Support+ / Enterprise / Unified Operations;
  - Amazon Quick, SageMaker AI e WorkSpaces Applications;
  - AWS Health Dashboard e management account;
  - Snowball Edge indisponível para novos clientes;
  - serviços fora do escopo usados só como distratores.

## Score ao concluir o simulado

As provas completas mostram **score estimado de 100 a 1.000**, com **700 como corte de referência**, além dos acertos e do percentual bruto. O score aparece no resultado e no histórico, inclusive nas tentativas antigas, sem apagar progresso. O modo estudo continua mostrando o percentual.

**Método didático do simulado:** `score = arredondar(100 + 900 × acertos ÷ total)`.

- 0/65 → 100 · 43/65 → 695 · 44/65 → 709 · 52/65 → 820 · 65/65 → 1.000.
- Todas as 65 questões entram na estimativa. Em branco conta como erro; múltipla resposta exige o conjunto exato, sem crédito parcial.
- **Não é a nota oficial nem uma previsão de aprovação:** a AWS não publica a conversão dos acertos em nota escalada, ajusta resultados entre versões e tem 15 questões não pontuadas não identificadas.
- Não confunda a conversão com uma equivalência oficial entre 700 pontos e um percentual. A meta de treino de 80% permanece separada.

Testes da fórmula: `node --test tools/test-score.js`.

## Estrutura

```
banco/partes/*.json        fonte editável (8 partes, por task statement)
banco/questoes.js          banco consolidado (gerado; window.BANCO)
banco/simulados.js         6 simulados fixos de 65 questões (gerado; window.SIMULADOS)
tools/validar-banco.js     valida esquema, escopo, termos desatualizados, duplicatas e cobertura, e gera questoes.js
tools/gerar-simulados.js   distribui o banco em simulados balanceados (domínio, task, dificuldade, tipo)
tools/escopo.js            regras do guia v1.3 (pesos, tasks, fora do escopo, desatualizados)
docs/                      escopo oficial, auditoria das fontes, guia de redação, plano das partes
```

## Manutenção

```bash
node tools/validar-banco.js       # valida tudo e regenera banco/questoes.js
node tools/gerar-simulados.js     # regenera os 6 simulados (--n 6 --seed 2611)
```

Para incluir ou corrigir questões, edite `banco/partes/*.json` seguindo o [guia de redação](docs/04-guia-redacao.md) e rode o validador. O build só é gerado com zero erros.

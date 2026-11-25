# Simulados AWS Certified Cloud Practitioner (CLF-C02)

**▶ Abrir o simulador:** https://orugian.github.io/simulados-aws-cloud-practitioner/

Ou offline: baixe o repositório (Code → Download ZIP), extraia e dê dois cliques em `index.html`. Não precisa instalar nada.
Banco de questões em português alinhado ao **[Exam Guide CLF-C02](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html)**, com **9 simulados fixos sem questões repetidas**.

Os **Simulados 7, 8 e 9**, identificados como **Avançado**, trazem 195 questões autorais inéditas. Cada prova inclui 65 questões, 90 minutos, 15 questões de múltipla resposta e cobertura dos 19 tópicos do guia. O desafio vem de cenários com requisitos que exigem distinguir alternativas próximas, não de assuntos fora do nível Practitioner. A classificação de dificuldade é editorial. O gabarito dos novos itens inclui referências oficiais da AWS.

Os Simulados 1 a 6 mantêm os mesmos itens. O modo estudo e a prova aleatória podem sortear questões de todo o banco, inclusive das rodadas avançadas.

## Banco de questões

| Domínio | Peso oficial | Questões no banco | Por simulado |
| --- | --- | --- | --- |
| 1. Cloud Concepts | 24% | 148 | 16 |
| 2. Security and Compliance | 30% | 177 | 19 |
| 3. Cloud Technology and Services | 34% | 201 | 22 |
| 4. Billing, Pricing, and Support | 12% | 74 | 8 |
| **Total** | | **600** | **65** |

- **Tipos:** 484 de escolha única e 116 de resposta múltipla. A proporção de múltiplas é uma escolha editorial do simulador.
- **Cobertura:** as 19 task statements do guia. Os pesos oficiais aplicam-se às questões que valem nota no exame; as cotas acima são a distribuição adotada no treino de 65 itens.
- **Dificuldade:** as rodadas avançadas não têm questões introdutórias, e ao menos 49 itens de cada prova estão no nível mais alto da rubrica editorial.
- **Origem:**
  - 143 vêm de questões coletadas e sanitizadas;
  - 94 do [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes), traduzidas, com gabarito conferido e nomenclatura atualizada;
  - 363 são autorais: 168 do banco original e 195 das três rodadas avançadas.
- **Justificativas:** toda alternativa explica por que está certa ou errada, e cada questão traz o conceito-chave.
- **Atualização:** o banco segue a nomenclatura e os fatos vigentes:
  - planos de suporte Basic / Business Support+ / Enterprise / Unified Operations;
  - Amazon Quick, SageMaker AI e WorkSpaces Applications;
  - AWS Health Dashboard e management account;
  - Snowball Edge indisponível para novos clientes;
  - serviços fora do escopo usados só como distratores.

## Riscar alternativas

Nos modos prova e estudo, clique com o **botão direito do mouse sobre qualquer parte da alternativa** para riscar; repita para restaurar. O clique esquerdo continua selecionando a resposta. Não há botões extras ao lado: a marcação usa **rasura diagonal dupla em azul elétrico**, um **X sobre a letra** e um carimbo inclinado **“DESCARTADA POR VOCÊ”**, seguindo o visual NOUS da aplicação. A breve animação acontece só ao riscar, não a cada navegação, e respeita a preferência de movimento reduzido.

Atalhos preservados: **Shift + A–F**, conforme a letra exibida; **Shift + F10** ou a tecla de menu de contexto com a alternativa em foco. O menu do navegador só é substituído sobre as alternativas da questão em andamento.

- Funciona também em alternativas corretas, selecionadas e após a correção no estudo: é uma anotação sua, não uma indicação do gabarito.
- Não seleciona/desmarca respostas, não bloqueia a alternativa e não altera a correção nem o score.
- Você pode riscar todas as alternativas. Os riscos ficam separados das respostas e acompanham a navegação, o salvamento, a exportação/importação e o gabarito da tentativa.
- Tentativas novas começam sem riscos; sessões antigas continuam funcionando sem perder progresso.

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
banco/partes/*.json        fonte editável por tópico do guia e rodada
banco/questoes.js          banco consolidado (gerado; window.BANCO)
banco/simulados-base.json  atribuição congelada das rodadas S1–S6
banco/simulados.js         9 simulados fixos de 65 questões (gerado; window.SIMULADOS)
tools/validar-banco.js     valida esquema, escopo, termos desatualizados, duplicatas e cobertura, e gera questoes.js
tools/gerar-simulados.js   valida e compila as rodadas sem sortear novas atribuições
tools/auditar-avancados.js sinaliza possíveis pistas de redação para revisão editorial
tools/escopo.js            regras do guia v1.3 (pesos, tasks, fora do escopo, desatualizados)
docs/                      escopo oficial, auditoria das fontes, guia de redação, plano das partes
```

## Manutenção

```bash
node tools/validar-banco.js       # valida tudo e regenera banco/questoes.js
node tools/gerar-simulados.js     # recompila as 9 rodadas com as atribuições fixas
node tools/gerar-simulados.js --check
node tools/auditar-avancados.js   # triagem de comprimento, ecos e absolutos
```

Para incluir ou corrigir questões, edite `banco/partes/*.json` seguindo o [guia de redação](docs/04-guia-redacao.md) e rode o validador. O build só é gerado com zero erros.

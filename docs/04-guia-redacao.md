# Guia de redação e sanitização: banco CLF-C02

Regras obrigatórias para todas as questões do banco (`banco/partes/*.json`). Referências: [01-escopo-oficial-clf-c02.md](01-escopo-oficial-clf-c02.md) e [02-analise-questoes-fornecidas.md](02-analise-questoes-fornecidas.md).

## 1. Esquema (JSON)

```json
{
  "id": "D2-b-014",
  "dominio": 2,
  "task": "2.3",
  "tipo": "unica",
  "enunciado": "Uma empresa quer … Qual serviço da AWS atende a esse requisito com o MENOR esforço operacional?",
  "alternativas": [
    { "texto": "AWS IAM Identity Center", "correta": true,  "porque": "Centraliza o acesso de força de trabalho a várias contas e aplicações com SSO." },
    { "texto": "Amazon Cognito",          "correta": false, "porque": "É voltado a usuários finais de aplicações web/mobile, não à força de trabalho em várias contas." },
    { "texto": "AWS Directory Service",   "correta": false, "porque": "Fornece Active Directory gerenciado, mas sozinho não dá SSO entre contas AWS." },
    { "texto": "IAM users por conta",     "correta": false, "porque": "Cria credenciais de longo prazo duplicadas em cada conta: mais esforço e menos segurança." }
  ],
  "explicacao": "IAM Identity Center (sucessor do AWS SSO) é o serviço recomendado para acesso centralizado da força de trabalho a múltiplas contas.",
  "servicos": ["IAM Identity Center"],
  "dificuldade": 2,
  "fonte": "autoral"
}
```

- `id`: `D<domínio>-<parte>-<nnn>`, sequencial dentro da parte (ex.: `D1-a-001`).
- `tipo`: `"unica"` tem **exatamente 4** alternativas e 1 correta. `"multipla"` tem **5** alternativas (ou 6 quando forem 3 corretas), traz `"selecionar": 2` ou `3`, e o enunciado **termina** com `(Selecione DUAS.)` ou `(Selecione TRÊS.)`.
- `porque`: **toda** alternativa tem justificativa curta (1–2 frases), dizendo por que está certa ou errada.
- `explicacao`: o conceito-chave que o aluno precisa levar da questão (1–2 frases).
- `dificuldade`: 1 = conceito direto · 2 = cenário com distratores próximos · 3 = distinção fina (ex.: Standard x Convertible RI, Inspector x GuardDuty x Detective).
- `fonte`: `"usuario-A17"`, `"usuario-B12"`, `"kananinirav-k4#12"` (veja o campo `src` nos pools) ou `"autoral"`. Uma questão reescrita a partir de uma fonte mantém a fonte, com o sufixo `" (reescrita)"`.

## 2. Estilo da prova real

1. **Concisão:** o enunciado tem, em regra, 1 a 3 frases (até ~350 caracteres). Pode ser um cenário curto ("Uma empresa…") ou uma pergunta direta ("Qual serviço…"). Nada de narrativa longa.
2. **PT-BR com nomes de serviços em inglês** (Amazon S3, AWS Lambda, Security Group, Reserved Instances), como na versão em português da prova. Termos consagrados podem ficar em inglês (rightsizing, lifecycle policy, edge location, landing zone).
3. **Qualificadores em CAIXA ALTA** quando decidirem a questão: MAIS, MENOS, MELHOR, MENOR custo, MAIS econômica, MENOR esforço operacional.
4. **Distratores plausíveis e da mesma família:** serviços da mesma categoria, conceitos vizinhos ou meias-verdades. Proibido: "todas as anteriores", "nenhuma das anteriores", alternativa absurda ou piada, e alternativa correta visivelmente mais longa ou detalhada que as outras.
5. **Uma só resposta defensável:** se um especialista conseguir argumentar a favor de duas, reescreva.
6. **Nível Cloud Practitioner:** reconhecer serviços e conceitos e escolher entre eles. Nada de comandos CLI, sintaxe, configuração passo a passo, troubleshooting ou projeto de arquitetura detalhado.
7. **Múltipla resposta:** entre 15% e 20% das questões de cada parte; quase sempre "Selecione DUAS".
8. **Mistura de dificuldade:** ~30% nível 1, ~50% nível 2 e ~20% nível 3.

## 3. Sanitização das questões coletadas

Para cada questão das fontes (do usuário ou do kananinirav):

1. **Confirmar o gabarito** com o seu conhecimento da AWS. O repositório kananinirav tem erros conhecidos: quando o gabarito estiver errado, corrija e explique no `porque`. Use o gabarito do usuário que está no doc 02.
2. **Atualizar a nomenclatura:** management account (não "master"), AWS Health Dashboard, Amazon Quick (antigo QuickSight), SageMaker AI, OpenSearch Service, IAM Identity Center (não "AWS SSO"), S3 Glacier Instant Retrieval / Flexible Retrieval / Deep Archive, AWS Pricing Calculator.
3. **Descartar ou reescrever** questões cuja resposta dependa de serviço descontinuado ou fora do escopo (ver §5).
4. **Traduzir** as questões em inglês para PT-BR e **reescrever** o enunciado até que fique conciso.
5. **Deduplicar:** o mesmo conceito com a mesma resposta entra **uma vez** na sua parte. Duas questões sobre o mesmo serviço só valem se testarem facetas diferentes (ex.: "CloudTrail registra chamadas de API" e "CloudTrail x Config").
6. **Trocar distratores obsoletos:** ClassicLink, CodeStar, TCO Calculator etc. dão lugar a distratores atuais e plausíveis.
7. Questões marcadas ⚠️ ou ♻️ no doc 02 **precisam** ser reescritas antes de entrar no banco.
8. Respeite a **cota por task statement** da sua parte. Se faltar material das fontes, crie questões autorais cobrindo as lacunas do guia v1.3.

## 4. Fatos atuais que mudam gabaritos (prevalecem sobre o seu conhecimento prévio)

**Planos de suporte**: o guia v1.3 lista **Basic, AWS Business Support+, AWS Enterprise Support e AWS Unified Operations**. Os planos Developer, Business (clássico) e Enterprise On-Ramp serão descontinuados em 01/01/2027. **Não use esses nomes antigos em questões novas.**

| Plano | Características cobráveis |
| --- | --- |
| Basic (gratuito, todos os clientes) | Atendimento 24/7 a dúvidas de conta e cobrança, aumento de cotas, documentação, whitepapers, re:Post e fóruns, AWS Health Dashboard, verificações principais do Trusted Advisor. Sem casos técnicos |
| Business Support+ (a partir de US$ 29/mês por conta) | Assistência contextual com IA generativa; telefone, web e chat 24/7 com Cloud Support Engineers; **menos de 30 min** de atendimento humano para sistema crítico de negócio fora do ar; conjunto completo de verificações do Trusted Advisor; **AWS Support API**; suporte a software de terceiros; **casos ilimitados** abertos por qualquer usuário com permissão |
| Enterprise Support (mínimo de US$ 5.000/mês) | Tudo do Business Support+, mais **Technical Account Manager (TAM) designado**, resposta em até **15 min** para caso crítico de produção, **AWS Security Incident Response** incluso, revisões estratégicas de negócio e AWS Countdown (gestão de eventos críticos) |
| Unified Operations | Camada mais alta: TAM e Domain Specialist Engineer designados, orientação de arquitetura de aplicações, gestão de eventos de infraestrutura, revisões de cargas críticas, runbooks personalizados e Countdown Premium |

**Outros fatos:**
- **Trusted Advisor:** verificações em Cost Optimization, Performance, Security, Fault Tolerance, Service Limits (Service Quotas) e Operational Excellence. **AWS Health Dashboard** + **AWS Health API**: saúde dos serviços e eventos que afetam a conta.
- **Descontos:** Reserved Instances Standard até **72%** e Convertible até **66%**; prazo de 1 ou 3 anos; pagamento All Upfront, Partial Upfront ou No Upfront. Savings Plans (Compute ou EC2 Instance) até 72%; o Compute SP também cobre Fargate e Lambda. Spot até **90%**, mas pode ser interrompida. Dedicated Hosts servem para licenças por socket/core (BYOL) e conformidade. Capacity Reservations (On-Demand) reservam capacidade em uma AZ sem desconto e sem prazo.
- **Organizations:** consolidated billing soma o uso para descontos por volume (ex.: S3) e compartilha RIs e Savings Plans entre as contas (o compartilhamento pode ser desligado). **Management account** paga a fatura. SCPs limitam permissões máximas.
- **Transferência de dados:** entrada da internet é gratuita; saída para a internet é cobrada; entre Regiões é cobrada; entre AZs na mesma Região normalmente é cobrada; dentro da mesma AZ por IP privado é gratuita. CloudFront reduz custo de saída.
- **Cost allocation tags:** as geradas pela AWS e as definidas pelo usuário **precisam ser ativadas** no console de Billing antes de aparecerem no Cost Explorer e no CUR.
- **Well-Architected:** 6 pilares (Excelência Operacional, Segurança, Confiabilidade, Eficiência de Performance, Otimização de Custos, **Sustentabilidade**). O **AWS Well-Architected Tool** revisa cargas de trabalho contra os pilares.
- **AWS CAF:** 6 perspectivas. Negócios (Business), Pessoas (People) e Governança (Governance) são de negócio; Plataforma (Platform), Segurança (Security) e Operações (Operations) são técnicas. Benefícios: menor risco de negócio, melhor desempenho ESG, mais receita e mais eficiência operacional. Fases: Envision, Align, Launch, Scale.
- **Migração:** 7 Rs (Rehost, Replatform, Refactor/Re-architect, Repurchase, Retire, Retain, Relocate). Application Discovery Service, Migration Hub, Migration Evaluator (business case), Application Migration Service (MGN, rehost), DMS + SCT (bancos heterogêneos).
- **Root user:** tarefas exclusivas incluem alterar configurações da conta (nome, e-mail, senha do root), fechar a conta, alterar ou cancelar o plano de suporte, restaurar permissões IAM bloqueadas, registrar-se como vendedor de Reserved Instances no Marketplace, configurar MFA Delete em bucket S3 e alguns casos de política de bucket S3 que negou acesso a todos.
- **Credenciais:** Secrets Manager rotaciona segredos automaticamente; Systems Manager Parameter Store guarda parâmetros e segredos simples sem rotação nativa.
- **Detecção e conformidade:** Inspector varre vulnerabilidades (CVEs) e exposição de rede em EC2, ECR e Lambda. GuardDuty detecta ameaças a partir de logs (CloudTrail, VPC Flow Logs, DNS). Detective investiga a causa raiz. Security Hub agrega achados e verifica padrões de conformidade. Macie encontra dados sensíveis (PII) no S3. Firewall Manager gerencia centralmente regras de WAF, Shield Advanced e Security Groups em Organizations. Shield Standard é gratuito e automático; Shield Advanced é pago, tem resposta 24/7 da Shield Response Team e proteção de custos.
- **IA/ML:** Amazon Q é o assistente de IA generativa (Q Business para dados corporativos, Q Developer para desenvolvimento). Bedrock **não está na lista em escopo**: não use como resposta. SageMaker AI serve para construir, treinar e implantar modelos de ML.
- **Analytics:** Amazon Quick, antigo QuickSight, faz BI e dashboards e hoje traz recursos de IA.
- **Developer tools em escopo:** CLI, CodeBuild, CodePipeline e X-Ray. **CodeDeploy está fora** e pode ser só distrator.
- **Snow Family:** o AWS Snowball Edge **não está mais disponível para novos clientes**. A AWS recomenda DataSync para transferência online, AWS Data Transfer Terminal para transferência física e Outposts para computação de borda. **Não use Snowball como resposta correta**, só como distrator.
- **AppStream 2.0** foi renomeado para **Amazon WorkSpaces Applications**. Escreva "Amazon WorkSpaces Applications (antigo AppStream 2.0)".
- **APN:** use "parceiros de software (ISVs/SaaS)" e "parceiros de serviços (consultorias/system integrators)". Os rótulos antigos são Technology Partners e Consulting Partners.
- **Cost Explorer:** previsão para os próximos meses. Não fixe o horizonte em 12 meses.

## 5. Fora do escopo: nunca como resposta correta (podem ser distratores)

AppFlow, Clean Rooms, Data Exchange, DataZone, MSK, AppFabric, SWF, Copilot, Wavelength, Application Cost Profiler, DevPay, Activate, AWS IQ, Managed Services (AMS), Billing Conductor, Keyspaces, MemoryDB, AppConfig, Application Composer, CodeArtifact, CodeDeploy, CodeGuru, CloudShell, Device Farm, GameLift, IoT Device Defender, Greengrass, Fraud Detector, Personalize, Chatbot, Data Lifecycle Manager, Launch Wizard, Elemental (todos), IVS, Refactor Spaces, Transfer Family, Cloud Map, Network Access Analyzer, Ground Station, VPC Lattice, Cloud Directory, Network Firewall, FSx for Lustre.

**Descontinuados ou renomeados (não usar, nem como distrator, salvo raríssima exceção):** Simple Monthly Calculator, TCO Calculator, Personal/Service Health Dashboard, Snowmobile, CodeStar, Cloud9, CodeCommit, OpsWorks, EC2-Classic/ClassicLink, Scheduled RIs, S3 Reduced Redundancy, "master account", Elasticsearch Service, Server Migration Service, Data Pipeline, CloudSearch, Chime, Forecast, WorkDocs, AWS SSO (nome antigo), planos Developer, Business (clássico) e Enterprise On-Ramp.

## 6. Validação

Rode `node tools/validar-banco.js banco/partes/<sua-parte>.json` e corrija **todos os erros** e todos os avisos de quase-duplicata e de termo desatualizado. Avisos sobre distrator citando serviço fora do escopo podem ficar.

# Análise das questões fornecidas (152)

Duas fontes do usuário foram auditadas contra o [escopo oficial v1.3](01-escopo-oficial-clf-c02.md):

- **A** = `questoes_aws_cloud_computing.md` (65 questões, **sem gabarito**)
- **B** = `quest_es_de_prova_aws.md` (87 questões; gabarito só de B58 a B87)

Legenda de status: ✅ ok · ⚠️ revisar (ambígua ou com gabarito discutível) · ♻️ desatualizada (precisa ser reescrita antes de entrar no banco) · 🔁 duplicada.

## Gabarito proposto: fonte A

| Q | Resp. | Dom · Task | Status / nota |
|---|---|---|---|
| A01 | D | D2 · 2.3 | ✅ MFA virtual (app) |
| A02 | D | D3 · 3.6 | ✅ One Zone-IA: reconstruível, baixa latência |
| A03 | C, E | D2 · 2.1 | ✅ |
| A04 | D | D3 · 3.7 | ✅ EMR |
| A05 | D | D3 · 3.3 | ✅ Instance metadata |
| A06 | A, E | D3 · 3.3 | ✅ Auto Scaling + ELB (AppConfig e A2C fora do escopo, servem de distratores) |
| A07 | B | D3 · 3.3 | ✅ Tags |
| A08 | B | D3 · 3.6 | ✅ Instance Store |
| A09 | B, D | D3 · 3.2 | ✅ Latência + soberania (preço por Região também é fator real, mas "descontos por volume específicos da Região" não existe) |
| A10 | D | D3 · 3.6 | ✅ Bucket policy |
| A11 | B | D3 · 3.3 | ✅ Lambda |
| A12 | D | D4 · 4.3 | ✅ AWS Health Dashboard |
| A13 | C | D3 · 3.2 | ✅ |
| A14 | B, E | D3 · 3.2 | ✅ IAM e CloudFront são globais |
| A15 | B | D4 · 4.3 | ✅ Professional Services (AMS está fora do escopo, serve de distrator) |
| A16 | C | D3 · 3.3 | ✅ Lightsail |
| A17 | B | D2 · 2.3 | ✅ Cognito Identity Pool |
| A18 | B | D3 · 3.1 | ✅ IaaS |
| A19 | B | D2 · 2.4 | ✅ WAF |
| A20 | C, D | D4 · 4.1 | ✅ Requisições + duração |
| A21 | C | D3 · 3.6 | ⚠️ Objeto lido uma vez e depois cacheado no cliente. Upload direto em Standard-IA evita os 30 dias mínimos em Standard antes da transição por lifecycle |
| A22 | C, E | D3 · 3.6 | ✅ |
| A23 | C | D4 · 4.2 | ✅ us-east-1 |
| A24 | A | D3 · 3.7 | ✅ Lex (Personalize fora do escopo, serve de distrator) |
| A25 | A | D2 · 2.3 | ✅ IAM Policy |
| A26 | A, D | D3 · 3.5 | ✅ ELB + Route 53 (health checks) |
| A27 | C, E | D3 · 3.2 | ⚠️ WAF é regional ou global conforme o recurso associado; o gabarito clássico é Rekognition + Lambda |
| A28 | D | D3 · 3.5 | ✅ VPC |
| A29 | A | D2 · 2.2 | ✅ Artifact |
| A30 | D | D4 · 4.2 | ✅ S3 (preço em camadas somado entre as contas) |
| A31 | A | D1 · 1.1 | ✅ Go global in minutes |
| A32 | C | D1 · 1.3 | ⚠️ Perspectiva de Plataforma (reconstrução da infraestrutura). Enunciado ambíguo |
| A33 | A | D3 · 3.4 | ✅ Read Replicas |
| A34 | A | D2 · 2.2 | ✅ MFA Delete |
| A35 | B | D2 · 2.1 | ✅ |
| A36 | B | D1 · 1.2 | ✅ Excelência Operacional |
| A37 | A | D4 · 4.2 | ⚠️ Os relatórios de cobertura e utilização de RI ficam no Cost Explorer; o CUR também traz a taxa efetiva. Reescrever para tirar a ambiguidade |
| A38 | A | D3 · 3.2 | ✅ |
| A39 | B | D3 · 3.6 | ✅ Multipart Upload (S3 Transfer Acceleration seria outra resposta válida, mas não está entre as opções) |
| A40 | B, C | D3 · 3.5 | ✅ |
| A41 | C | D3 · 3.8 | ✅ Step Functions |
| A42 | C | D3 · 3.6 | ✅ CRR |
| A43 | D | D4 · 4.3 | ✅ Pedido de aumento (via Service Quotas ou Support Center) |
| A44 | B, D | D3 · 3.6 | ✅ |
| A45 | C | D4 · 4.1 | ✅ Até 72% |
| A46 | B | D2 · 2.3 | ✅ Effect + Action (e Resource em políticas de identidade) |
| A47 | C | D2 · 2.2 | ✅ Config |
| A48 | D | D3 · 3.5 | ✅ |
| A49 | A | D4 · 4.1 | ✅ Standard RI 3 anos |
| A50 | D | D3 · 3.5 | ✅ CloudFront |
| A51 | A | D3 · 3.1 | ✅ Híbrida 🔁 B77 |
| A52 | — | D4 · 4.3 | ♻️ Antes: "Business". Hoje o guia lista Basic / Business Support+ / Enterprise / Unified Operations, e a resposta seria **Business Support+** |
| A53 | — | D4 · 4.3 | ♻️ Antes: "Developer". O plano Developer será descontinuado; reescrever |
| A54 | B | D3 · 3.7 | ✅ Kinesis Data Streams |
| A55 | A | D3 · 3.6 | ✅ Lifecycle (Transfer Family fora do escopo, serve de distrator) |
| A56 | B | D2 · 2.3 | ✅ IAM Group |
| A57 | C, E | D3 · 3.5 | ✅ |
| A58 | C | D3 · 3.2 | ✅ Subnet ↔ AZ |
| A59 | C | D4 · 4.2 | ✅ Budgets (RI coverage budget) |
| A60 | B, E | D2 · 2.3 | ✅ |
| A61 | B | D2 · 2.2 | ✅ KMS |
| A62 | B | D3 · 3.4 | ✅ Multi-AZ |
| A63 | B, D, F | D4 · 4.1 | ✅ |
| A64 | B | D1 · 1.2 | ✅ Well-Architected |
| A65 | B | D3 · 3.7 | ✅ Rekognition |

## Gabarito proposto: fonte B

| Q | Resp. | Dom · Task | Status / nota |
|---|---|---|---|
| B01 | A | D3 · 3.6 | ⚠️ st1 é a definição literal da AWS ("frequently accessed, throughput-intensive"). O "rápido e consistente" puxa para SSD; reescrever |
| B02 | A | D3 · 3.6 | ✅ S3 Transfer Acceleration |
| B03 | A, E | D3 · 3.6 | ✅ |
| B04 | A | D3 · 3.3 | ✅ Elastic Beanstalk |
| B05 | C | D4 · 4.1 | ✅ Spot |
| B06 | D | D2 · 2.2 | ✅ CloudTrail 🔁 B50 |
| B07 | A | D3 · 3.6 | ⚠️ Snowball não está nas listas da v1.3; manter no máximo 1 por simulado |
| B08 | C | D3 · 3.4 | ✅ DMS (homogênea, dispensa SCT) |
| B09 | D | D2 · 2.2 | ✅ GuardDuty |
| B10 | C | D3 · 3.6 | ✅ Instance Store |
| B11 | A | D2 · 2.4 | ✅ Shield |
| B12 | D, E | D4 · 4.2 | ✅ **Corrigido**: segundo a documentação da AWS, tanto as tags geradas pela AWS quanto as definidas pelo usuário precisam ser ativadas separadamente |
| B13 | B | D2 · 2.3 | ✅ Origin Access Control |
| B14 | B | D4 · 4.3 | ✅ APN Technology Partners |
| B15 | D | D3 · 3.2 | ✅ |
| B16 | A, E | D3 · 3.2 | ✅ EC2 + EBS |
| B17 | C | D3 · 3.6 | ⚠️ Snow Family (ver B07) |
| B18 | B | D2 · 2.3 | ✅ Cognito |
| B19 | A | D3 · 3.1 | ✅ 🔁 A18 |
| B20 | A | D3 · 3.2 | ✅ |
| B21 | C | D2 · 2.2 | ✅ Control Tower |
| B22 | C, D | D3 · 3.4 | ⚠️ RDS for SQL Server + EC2; enunciado fraco |
| B23 | B | D4 · 4.2 | ✅ Cost allocation tags |
| B24 | A | D3 · 3.5 | ✅ IGW |
| B25 | C | D2 · 2.1 | ✅ Awareness & Training (controle compartilhado) |
| B26 | D, E | D1 · 1.3 | ✅ Data Curation + Data Governance |
| B27 | A, B | D1 · 1.2 | ✅ 🔁 A36 |
| B28 | B, E | D3 · 3.3 | ✅ |
| B29 | A | D3 · 3.8 | ✅ |
| B30 | C | D2 · 2.1 | ⚠️ Enunciado mal traduzido ("controles herdados"); reescrever |
| B31 | A | D4 · 4.2 | ✅ Pricing Calculator |
| B32 | B, C | D1 · 1.4 | ✅ |
| B33 | A | D3 · 3.5 | ✅ NACL na subnet |
| B34 | B | D3 · 3.1 | ✅ SaaS |
| B35 | C | D2 · 2.2 | ✅ KMS |
| B36 | B | D3 · 3.5 | ✅ CloudFront |
| B37 | C, D | D3 · 3.5 | ✅ |
| B38 | D | D1 · 1.2 | ✅ Eficiência de Performance |
| B39 | B | D4 · 4.2 | ✅ Cost Explorer (RI recommendations) |
| B40 | C | D4 · 4.3 | ✅ Trusted Advisor |
| B41 | D | D2 · 2.2 | ✅ Security Hub |
| B42 | B, E | D4 · 4.3 | ✅ |
| B43 | D | D4 · 4.2 | ✅ Organizations (EN) |
| B44 | A, E | D3 · 3.8 | ✅ (EN) |
| B45 | C | D3 · 3.3 | ✅ Outposts (EN) |
| B46 | A | D2 · 2.1 | ✅ (EN) |
| B47 | D | D2 · 2.2 | ✅ (EN) |
| B48 | B | D1 · 1.3 | ✅ Application Discovery Service (EN) |
| B49 | D | D3 · 3.5 | ✅ VPC Flow Logs (EN) |
| B50 | D | D2 · 2.2 | ✅ (EN) 🔁 B06 |
| B51 | D | D1 · 1.3 | ✅ Operations (os outros são pilares do WAF) (EN) |
| B52 | A | D2 · 2.3 | ✅ (EN) |
| B53 | B | D2 · 2.4 | ⚠️ Enunciado mistura pentest com Inspector (EN) |
| B54 | A | D2 · 2.2 | ✅ Macie (EN) |
| B55 | D | D2 · 2.4 | ✅ (EN) 🔁 A19 |
| B56 | C, D | D2 · 2.1 | ✅ (EN) 🔁 B66 |
| B57 | D | D2 · 2.4 | ✅ Shield Advanced (EN) |
| B58 | C | D4 · 4.2 | ✅ Cost Explorer |
| B59 | A, D | D2 · 2.1 | ✅ Lambda: código e segurança do código |
| B60 | C, E | D2 · 2.1 | ✅ |
| B61 | C | D4 · 4.1 | ✅ On-Demand |
| B62 | C | D3 · 3.5 | ✅ VPC peering (ClassicLink aparece só como distrator e será trocado) |
| B63 | B | D2 · 2.1 | ✅ |
| B64 | B | D3 · 3.6 | ✅ Instance Store 🔁 A08/B10 (conceito) |
| B65 | C | D2 · 2.3 | ✅ IAM Access Analyzer |
| B66 | B, C | D2 · 2.1 | 🔁 B56 |
| B67 | B, C | D1 · 1.3 | ✅ Plataforma de CAF: Data engineering e CI/CD |
| B68 | B | D3 · 3.5 | ✅ Route 53 |
| B69 | D | D3 · 3.8 | ✅ EventBridge |
| B70 | A | D2 · 2.4 | ✅ Trusted Advisor |
| B71 | D | D1 · 1.1 | ✅ Agilidade |
| B72 | A | D2 · 2.1 | ✅ |
| B73 | A, B | D1 · 1.1 | ✅ |
| B74 | C | D3 · 3.4 | ✅ RDS |
| B75 | B, D | D2 · 2.3 | ✅ |
| B76 | B | D2 · 2.2 | ✅ Inspector |
| B77 | C | D3 · 3.1 | 🔁 A51 |
| B78 | C | D3 · 3.2 | ✅ |
| B79 | B, E | D1 · 1.1 | ✅ |
| B80 | B | D3 · 3.5 | ✅ CloudFront |
| B81 | B | D1 · 1.2 | ✅ Design for failure |
| B82 | C | D3 · 3.1 | ✅ CDK (CodeStar aparece só como distrator e será trocado) |
| B83 | C | D2 · 2.1 | ✅ |
| B84 | B | D4 · 4.1 | ✅ Compute Savings Plans |
| B85 | B | D3 · 3.7 | ✅ Glue |
| B86 | D | D4 · 4.2 | ✅ Cost Explorer (forecast) |
| B87 | A, D | D2 · 2.3 | ✅ |

## Achados

1. **Cobertura por domínio** das 152 (aprox., após mapeamento): D1 ≈ 20 · D2 ≈ 44 · D3 ≈ 70 · D4 ≈ 18. Proporcionalmente, D3 está acima do peso oficial e D1 e D4 abaixo. Os simulados vão completar D1 (Well-Architected, CAF, economia, BYOL, 7 Rs) e D4 (Savings Plans, transferência de dados, planos de suporte novos, Marketplace, Trust & Safety) com questões novas.
2. **Lacunas contra a v1.3** (tópicos do guia que nenhuma das 152 cobre ou cobre pouco): Sustentabilidade (6º pilar); BYOL e licenciamento; 7 Rs; tarefas exclusivas do root user; Secrets Manager x Parameter Store; IAM Identity Center; Firewall Manager; Detective; RAM; Amazon Q; Textract/Transcribe/Comprehend; Amazon Quick; SES/Connect; Amplify; IoT Core; WorkSpaces Secure Browser; CodeBuild/CodePipeline/X-Ray; AWS Backup; Elastic Disaster Recovery; FSx; Capacity Reservations; custos de transferência de dados; Compute Optimizer; License Manager; Migration Evaluator; Trust & Safety; re:Post / Prescriptive Guidance; Unified Operations e Business Support+.
3. **Desatualizadas:** A52 e A53 (planos de suporte). Na nova nomenclatura viram questões inéditas.
4. **Duplicatas:** 7 pares. No banco final, cada par vira uma questão única.
5. **15 questões em inglês** (B43–B57): serão traduzidas para PT-BR mantendo os nomes de serviço em inglês, como na prova em português.

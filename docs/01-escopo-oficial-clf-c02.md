# Escopo oficial: AWS Certified Cloud Practitioner (CLF-C02)

> Fonte: [Exam Guide CLF-C02](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html), **versão 1.3, publicada em 29/10/2026**.
> A AWS publica cada atualização do guia cerca de 1 mês antes de ela valer na prova. A prova é em **26/11/2026**, então a v1.3 é a referência.
> Este documento é a **régua de validação** de todo simulado: questão que não se encaixa aqui não entra.

## 1. Formato da prova

| Item | Valor oficial | Como o simulado reproduz |
| --- | --- | --- |
| Total de questões | **65** (50 pontuadas + 15 não pontuadas, sem identificação) | 65 questões por simulado |
| Duração | 90 min | Contagem regressiva de 90 min no modo prova |
| Tipos | **Múltipla escolha** (1 correta, 3 distratores) e **múltipla resposta** (2 ou mais corretas entre 5 ou mais opções) | Só esses dois tipos. Ordenação e associação **não** existem no CLF-C02 (diferente do AIF-C01) |
| Indicação do nº de respostas | Enunciado informa "(Selecione DUAS.)" / "(Selecione TRÊS.)" | Sempre explícito |
| Múltipla resposta | Não há crédito parcial | Acerto só com o conjunto exato |
| Em branco | Conta como erro, sem penalidade por chute | Igual |
| Pontuação | Escala de 100 a 1.000, aprovação em **700**, modelo compensatório (não precisa passar em cada domínio) | Nota escalada aproximada + % bruto + desempenho por domínio |
| Perfil do candidato | Até 6 meses de exposição à AWS | Nível conceitual: "qual serviço/conceito resolve X" |

**Fora do escopo do candidato:** codificação, projeto de arquitetura, troubleshooting, implementação, testes de carga e performance. As questões cobram reconhecimento e posicionamento de serviços, não configuração passo a passo.

## 2. Domínios e pesos

| Domínio | Peso | Em 65 questões* |
| --- | --- | --- |
| 1. Cloud Concepts | 24% | 16 |
| 2. Security and Compliance | 30% | 19 |
| 3. Cloud Technology and Services | 34% | 22 |
| 4. Billing, Pricing, and Support | 12% | 8 |

\* Os pesos valem para as 50 pontuadas (12 / 15 / 17 / 6). Aplicados às 65 dá 15,6 / 19,5 / 22,1 / 7,8, arredondados para 16 / 19 / 22 / 8.

## 3. Task statements (o que pode ser cobrado)

### Domínio 1: Cloud Concepts (24%)
- **1.1 Benefícios da AWS Cloud:** proposta de valor; infraestrutura global (velocidade de implantação, alcance global); alta disponibilidade, elasticidade e agilidade.
- **1.2 Princípios de design:** Well-Architected Framework e seus **6 pilares** (Excelência Operacional, Segurança, Confiabilidade, Eficiência de Performance, Otimização de Custos, Sustentabilidade), além das diferenças entre eles.
- **1.3 Migração:** estratégias de adoção; recursos de apoio à jornada; **AWS CAF**: benefícios (menor risco de negócio, melhor desempenho em ESG, mais receita, mais eficiência operacional) e as 6 perspectivas (Business, People, Governance, Platform, Security, Operations) com suas capacidades; estratégias de migração (7 Rs; replicação de banco de dados).
- **1.4 Economia da nuvem:** custo fixo x variável; custos do on-premises; licenciamento (**BYOL** x licença incluída); rightsizing; benefícios da automação; economia de escala.

### Domínio 2: Security and Compliance (30%)
- **2.1 Modelo de responsabilidade compartilhada:** responsabilidades do cliente, da AWS e compartilhadas (patch management, configuration management, awareness & training); como a divisão **muda conforme o serviço** (EC2 x RDS x Lambda).
- **2.2 Segurança, governança e conformidade:** criptografia em trânsito e em repouso; onde ficam os logs; **AWS Artifact** (relatórios de conformidade); conformidade por região e setor; proteção com **Inspector, Security Hub, GuardDuty e Shield**; monitoramento com **CloudWatch**, auditoria com **CloudTrail** e **Config**, relatórios de acesso.
- **2.3 Gestão de acesso:** IAM (users, groups, roles, políticas gerenciadas e customizadas); proteção do **root user** e as **tarefas exclusivas do root**; menor privilégio; **IAM Identity Center**; access keys, password policies e armazenamento de credenciais (**Secrets Manager**, **Systems Manager Parameter Store**); MFA, roles entre contas e federação.
- **2.4 Recursos de segurança:** **WAF, Firewall Manager, Shield, GuardDuty**; produtos de segurança de terceiros no **AWS Marketplace**; fontes de informação (Knowledge Center, Security Center, Security Blog); **Trusted Advisor** para identificar problemas de segurança.

### Domínio 3: Cloud Technology and Services (34%)
- **3.1 Implantação e operação:** Console, API, SDK, CLI e IaC (CloudFormation, CDK); operação pontual x processo repetível; modelos de implantação (nuvem, híbrido, on-premises).
- **3.2 Infraestrutura global:** Regiões, AZs e edge locations e a relação entre elas; alta disponibilidade com multi-AZ; AZs sem ponto único de falha compartilhado; quando usar várias Regiões (DR, continuidade, latência, soberania de dados).
- **3.3 Computação:** famílias de instância EC2 (uso geral, otimizada para computação, memória, armazenamento, computação acelerada); contêineres (ECS, EKS, ECR); serverless (**Fargate, Lambda**); Auto Scaling como elasticidade; propósito dos load balancers.
- **3.4 Bancos de dados:** banco no EC2 x banco gerenciado; relacional (**RDS, Aurora**); NoSQL (**DynamoDB**); em memória (**ElastiCache**); migração (**DMS, SCT**); também DocumentDB, Neptune e Redshift.
- **3.5 Rede:** componentes da VPC (subnets, gateways); segurança na VPC (**NACL x Security Group**, Inspector); **Route 53**; conectividade (**VPN, Direct Connect**), além de Transit Gateway, PrivateLink, Global Accelerator, CloudFront e API Gateway.
- **3.6 Armazenamento:** objeto (S3) e **classes de armazenamento**; bloco (**EBS, instance store**); arquivo (**EFS, FSx**); file system em cache (**Storage Gateway**); **lifecycle policies**; **AWS Backup**; Elastic Disaster Recovery.
- **3.7 IA/ML e analytics:** **SageMaker AI, Lex**, Comprehend, Polly, Rekognition, Textract, Transcribe, Translate, **Amazon Q**; **Athena, Kinesis, Glue, Amazon Quick** (antigo QuickSight), EMR, Redshift, OpenSearch.
- **3.8 Outras categorias:** integração (**EventBridge, SNS, SQS**, Step Functions); aplicações de negócio (**Connect, SES**); AWS Support; dev tools (**CodeBuild, CodePipeline, X-Ray**, CLI); end-user computing (**AppStream 2.0, WorkSpaces, WorkSpaces Secure Browser**); front-end e mobile (**Amplify**); IoT (**IoT Core**).

### Domínio 4: Billing, Pricing, and Support (12%)
- **4.1 Modelos de preço:** On-Demand, Reserved Instances (Standard x Convertible, All/Partial/No Upfront, flexibilidade e compartilhamento em Organizations), Spot, **Savings Plans**, Dedicated Hosts, Dedicated Instances, **Capacity Reservations**; custo de transferência de dados (entrada gratuita, saída cobrada, entre Regiões, dentro da Região); preços por classe de armazenamento.
- **4.2 Billing e gestão de custos:** **Budgets x Cost Explorer**; **Pricing Calculator**; **Organizations** e consolidated billing (descontos por volume, compartilhamento de RIs e SPs); **cost allocation tags** (geradas pela AWS x definidas pelo usuário; ativação) e o **Cost and Usage Report**.
- **4.3 Suporte e recursos técnicos:** whitepapers, blogs e documentação; **Prescriptive Guidance, Knowledge Center, re:Post**; **planos de suporte (nomenclatura nova, ver §5)**; APN (ISVs, system integrators) e benefícios de ser parceiro; **Trusted Advisor, AWS Health Dashboard e AWS Health API**; **AWS Trust & Safety** (denúncia de abuso); AWS Marketplace (gestão de custos, governança, entitlement); **Professional Services** e solutions architects; Support Center.

## 4. Serviços em escopo (lista oficial, v1.3)

- **Analytics:** Athena, EMR, Glue, Kinesis, OpenSearch Service, Amazon Quick, Redshift
- **Integração de aplicações:** EventBridge, SNS, SQS, Step Functions
- **Aplicações de negócio:** Connect, SES
- **Gestão financeira:** Budgets, Cost and Usage Reports, Cost Explorer, Marketplace
- **Computação:** Batch, EC2, Elastic Beanstalk, Lightsail, Outposts
- **Contêineres:** ECR, ECS, EKS
- **Habilitação do cliente:** AWS Support
- **Banco de dados:** Aurora, DocumentDB, DynamoDB, ElastiCache, Neptune, RDS
- **Ferramentas de desenvolvimento:** CLI, CodeBuild, CodePipeline, X-Ray
- **End-user computing:** AppStream 2.0, WorkSpaces, WorkSpaces Secure Browser
- **Front-end e mobile:** Amplify
- **IoT:** IoT Core
- **Machine learning:** Comprehend, Lex, Polly, Q, Rekognition, SageMaker AI, Textract, Transcribe, Translate
- **Gestão e governança:** Auto Scaling, CloudFormation, CloudTrail, CloudWatch, Compute Optimizer, Config, Control Tower, Health Dashboard, License Manager, Management Console, Organizations, Service Catalog, Service Quotas, Systems Manager, Trusted Advisor, Well-Architected Tool
- **Migração e transferência:** Application Discovery Service, Application Migration Service, DMS, Migration Evaluator, Migration Hub, SCT
- **Rede e entrega de conteúdo:** API Gateway, CloudFront, Direct Connect, Global Accelerator, PrivateLink, Route 53, Transit Gateway, VPC, VPN, Site-to-Site VPN, Client VPN
- **Segurança, identidade e conformidade:** Artifact, ACM, CloudHSM, Cognito, Detective, Directory Service, Firewall Manager, GuardDuty, IAM, IAM Identity Center, Inspector, KMS, Macie, RAM, Secrets Manager, Security Hub, Shield, WAF
- **Serverless:** Fargate, Lambda
- **Armazenamento:** Backup, EBS, EFS, Elastic Disaster Recovery, FSx, S3, S3 Glacier, Storage Gateway

> Observação: Snowball/Snow Family **não** aparece em nenhuma das duas listas da v1.3. Em lista não exaustiva, o assunto ainda pode cair como conceito de migração de dados offline. Por isso fica como **conteúdo secundário**, no máximo uma questão por simulado.

## 5. Serviços fora do escopo (não podem ser a resposta certa)

AppFlow, Clean Rooms, Data Exchange, DataZone, MSK · AppFabric, SWF · Copilot, Wavelength · Application Cost Profiler, **DevPay** · Activate, IQ, **Managed Services (AMS)** · Billing Conductor · Keyspaces, **MemoryDB**, **AppConfig** · Application Composer, CodeArtifact, **CodeDeploy**, CodeGuru, CloudShell, Device Farm · GameLift · IoT Device Defender, IoT Greengrass · Fraud Detector, **Personalize** · Chatbot, Data Lifecycle Manager, Launch Wizard · Elemental (todos), IVS · Migration Hub Refactor Spaces, **Transfer Family** · Cloud Map, Network Access Analyzer, Ground Station, VPC Lattice · Cloud Directory, Network Firewall · FSx for Lustre.

Esses serviços **podem aparecer como distratores**, como já acontece nas questões fornecidas (AppConfig, Personalize, MemoryDB, Transfer Family, DevPay), mas **nunca como resposta correta**.

## 6. Mudanças recentes que afetam o gabarito

| Tema | Situação na v1.3 / atual | Impacto nas questões |
| --- | --- | --- |
| **Planos de suporte** | O guia cita **Basic, Business Support+, Enterprise Support e Unified Operations**. Developer, Business e Enterprise On-Ramp serão descontinuados em 01/01/2027 | Questões antigas ("Developer permite casos ilimitados?", "Business é o menor com Support API") precisam ser reescritas. Hoje Business Support+ (a partir de US$ 29/mês) inclui Support API, Trusted Advisor completo, casos ilimitados, 24/7 e menos de 30 min para sistema crítico fora do ar. Enterprise inclui TAM designado, 15 min para produção crítica e Security Incident Response |
| **QuickSight → Amazon Quick** | Nome novo na lista em escopo | Usar "Amazon Quick (antigo QuickSight)" |
| **SageMaker → SageMaker AI** | Nome novo | Atualizar |
| **Personal Health Dashboard / Service Health Dashboard** | Unificados no **AWS Health Dashboard** | Não usar nomes antigos como corretos |
| **Glacier** | S3 Glacier Instant Retrieval, Flexible Retrieval e Deep Archive | Não usar "Amazon Glacier" puro ou "Reduced Redundancy" |
| **"Master account"** | Hoje se chama **management account** | Atualizar |
| **Descontinuados** | Simple Monthly Calculator, TCO Calculator, CodeStar, Cloud9, CodeCommit, OpsWorks, EC2-Classic/ClassicLink, Scheduled RIs, Snowmobile | Não podem ser resposta correta |

## 7. Regras de qualidade para cada questão (checklist)

1. Mapeada a **um domínio e uma task statement** (ex.: `D2 · 2.3`).
2. Resposta correta é um **serviço em escopo** e reflete o estado atual da AWS (ver §6).
3. Múltipla escolha com 4 opções; múltipla resposta com 5 ou mais opções e "(Selecione DUAS/TRÊS.)".
4. Distratores plausíveis, da mesma área (outros serviços de segurança numa questão de segurança).
5. Justificativa para **cada alternativa**, dizendo por que está certa ou errada.
6. Enunciado em PT-BR e nomes de serviços em inglês, como na prova em português.
7. Palavras-chave em caixa alta quando a prova usa: MAIS, MENOS, MELHOR, MENOR custo, MENOR esforço operacional.

# Questões de AWS Cloud Computing

> Total: 65 questões. Transcrição dos enunciados e alternativas, sem gabarito.

## Questão 01

Uma rede de agências de viagem está habilitando uma solução MFA para funcionários em viagem. Como os trabalhadores estão frequentemente na estrada, a rede prefere uma opção que não exija um hardware dedicado. Qual opção de MFA é a mais adequada?

- **A)** Um dispositivo MFA baseado em token de hardware.
- **B)** Uma chave de segurança U2F.
- **C)** Uma senha de uso único por e-mail enviada para a caixa de entrada corporativa do usuário.
- **D)** Um dispositivo MFA virtual baseado em software.

---

## Questão 02

Um cliente quer economizar nas faturas do Amazon S3 colocando dados lidos com menos frequência em uma classe mais barata. Como o dataset pode ser reconstruído a partir de outras fontes e serve apenas como cópia secundária, perdê-lo não seria fatal. Mesmo assim, o cliente ainda espera baixa latência e alto throughput em leituras no nível S3. Qual classe de armazenamento é a opção MENOS cara que atende a esse caso?

- **A)** S3 Glacier Deep Archive
- **B)** S3 Standard
- **C)** S3 Glacier Flexible Retrieval
- **D)** S3 One Zone-IA

---

## Questão 03

Sob o framework de governança do Modelo de Responsabilidade Compartilhada da AWS, quais dois itens abaixo são de propriedade do cliente? (Selecione DOIS.)

- **A)** Segurança física do backbone de rede global da AWS.
- **B)** Validar a postura de conformidade da infraestrutura AWS.
- **C)** Criar IAM users e roles dentro da conta.
- **D)** Impedir que funcionários da AWS acessem dados de clientes.
- **E)** Aplicar patches no sistema operacional da máquina virtual em uma instância Amazon EC2.

---

## Questão 04

Qual serviço da AWS executa frameworks open source de big data como o Apache Spark em clusters gerenciados para que uma equipe possa executar cargas de ETL de transformação de dados e analytics mantendo o gasto geral baixo?

- **A)** Amazon OpenSearch Service
- **B)** Data warehouse Amazon Redshift
- **C)** Bancos gerenciados Amazon RDS
- **D)** Amazon EMR

---

## Questão 05

Dentro de uma instância EC2, qual local expõe os metadados da própria instância (incluindo o ID da instância, as permissões do perfil IAM e informações de kernel) para qualquer aplicação executada dentro da mesma instância?

- **A)** O user data da instância
- **B)** Uma Resource tag
- **C)** Uma Amazon Machine Image (AMI)
- **D)** Instance metadata

---

## Questão 06

Para construir uma aplicação web na AWS que seja tanto de alta disponibilidade quanto elasticamente escalável, qual par de serviços abaixo contribuiria MAIS? (Selecione DOIS.)

- **A)** Amazon EC2 Auto Scaling
- **B)** Recurso AWS AppConfig
- **C)** Amazon AppStream 2.0 (streaming de desktop)
- **D)** Ferramenta AWS App2Container (A2C)
- **E)** AWS Elastic Load Balancing

---

## Questão 07

Qual recurso do EC2 permite rotular e classificar instâncias por seu estágio de implantação (por exemplo, desenvolvimento, staging, produção)?

- **A)** User data da instância EC2
- **B)** Tags de instância EC2
- **C)** Metadata de instância EC2
- **D)** O instance type do EC2

---

## Questão 08

Qual opção de armazenamento da AWS oferece performance rápida de leitura e gravação em disco enquanto fornece armazenamento em blocos temporário para uma instância?

- **A)** EBS Provisioned IOPS SSD (io2)
- **B)** Instance Store
- **C)** Amazon EFS
- **D)** EBS Throughput Optimized HDD (st1)

---

## Questão 09

Uma empresa está avaliando qual Região AWS MELHOR atende ao lançamento de sua nova aplicação. Quais dos fatores abaixo a empresa deve considerar nessa decisão? (Selecione DOIS.)

- **A)** Camadas de desconto por volume específicas de cada Região.
- **B)** Baixa latência entre o usuário final e a Região.
- **C)** Proximidade para visita presencial ao data center físico da empresa.
- **D)** Requisitos regulatórios e de soberania de dados específicos de cada país.
- **E)** Diferenças de segurança entre Zonas de Disponibilidade.

---

## Questão 10

Uma startup em estágio seed acabou de implantar sua landing page de produto como um site estático no Amazon S3, mas a página ainda está retornando erros de access-denied para os visitantes. Como Cloud Practitioner, o que você recomendaria para resolver esse problema?

- **A)** Habilitar a S3 cross-region replication
- **B)** Desabilitar a criptografia do S3 no bucket
- **C)** Ativar o S3 versioning
- **D)** Corrigir a bucket policy do S3

---

## Questão 11

Entre os serviços a seguir, qual é uma oferta de computação serverless da AWS?

- **A)** Amazon DynamoDB (NoSQL)
- **B)** AWS Lambda
- **C)** Banco de dados gerenciado Amazon Aurora
- **D)** Motor de consultas Amazon Athena

---

## Questão 12

Qual oferta da AWS publica a saúde geral de cada serviço da AWS e alerta os clientes quando algum deles tem problemas de disponibilidade?

- **A)** AWS Config Dashboard
- **B)** Amazon CloudWatch
- **C)** AWS Trusted Advisor
- **D)** AWS Health Dashboard

---

## Questão 13

Qual é a ordem correta dos componentes da AWS Global Infrastructure organizados por área de cobertura geográfica, do MAIOR ao MENOR?

- **A)** Edge Locations, Zonas de Disponibilidade, Regiões
- **B)** Zonas de Disponibilidade, Edge Locations, Regiões
- **C)** Regiões, Zonas de Disponibilidade, Edge Locations
- **D)** Regiões, Edge Locations, Zonas de Disponibilidade

---

## Questão 14

Dentre o catálogo da AWS, quais ofertas são classificadas como globais em vez de regionais? (Selecione DUAS.)

- **A)** Banco de dados relacional Amazon RDS
- **B)** AWS Identity and Access Management
- **C)** Banco de dados NoSQL Amazon DynamoDB
- **D)** Agendador de jobs AWS Batch
- **E)** Amazon CloudFront

---

## Questão 15

Qual oferta da AWS disponibiliza um catálogo de projetos pagos voltados a ajudar organizações a atingir resultados de negócio específicos durante a adoção da nuvem, em diversas áreas de prática?

- **A)** AWS Managed Services
- **B)** AWS Professional Services
- **C)** AWS Business Support
- **D)** AWS Partner Network

---

## Questão 16

Uma nova equipe está se preparando para executar um site WordPress simples dentro da AWS. Ninguém na equipe está familiarizado com a AWS ainda, e eles querem a forma de MENOR esforço para provisionar o site. Qual serviço é adequado?

- **A)** Amazon EC2 diretamente
- **B)** Amazon Elastic Beanstalk
- **C)** Amazon Lightsail
- **D)** ETL AWS Glue

---

## Questão 17

Qual serviço da AWS distribui credenciais temporárias para pessoas que fizeram login por meio de redes sociais e para convidados anônimos que não se autenticam?

- **A)** Um Amazon Cognito User Pool
- **B)** Amazon Cognito Identity Pool
- **C)** AWS AppSync (serviço GraphQL)
- **D)** AWS IAM Identity Center

---

## Questão 18

Qual modelo de computação em nuvem inclui serviços como instâncias Amazon EC2?

- **A)** PaaS (Platform-as-a-Service)
- **B)** IaaS
- **C)** SaaS (Software-as-a-Service)
- **D)** DBaaS (Database-as-a-Service)

---

## Questão 19

Qual serviço da AWS dá aos clientes uma forma de escrever regras filtrando tráfego HTTP por atributos como IP de origem, headers ou padrões de path?

- **A)** AWS Trusted Advisor
- **B)** AWS WAF
- **C)** Security Groups
- **D)** Network ACLs

---

## Questão 20

Quais duas dimensões de uso determinam a cobrança do AWS Lambda? (Selecione DUAS.)

- **A)** A linguagem do runtime usada pelo código da função
- **B)** Quantas linhas de código-fonte a função contém
- **C)** O número de invocações de função recebidas por período
- **D)** A duração total gasta executando cada chamada de função
- **E)** O tamanho do arquivo do pacote de código da função

---

## Questão 21

Um cliente mantém arquivos de sprites de personagens de jogo dentro do Amazon S3. Toda vez que um jogador busca um sprite, uma cópia é armazenada em cache localmente no próprio dispositivo do jogador. Os objetos de sprites ficam hoje no tier S3 Standard. Qual mudança reduziria a fatura de armazenamento de forma MAIS eficaz?

- **A)** Comprimir os arquivos de sprite antes do upload para que cada objeto ocupe menos armazenamento.
- **B)** Configurar uma regra de lifecycle que faz a transição de sprites enviados para o S3 Glacier Flexible Retrieval.
- **C)** Fazer com que o cliente envie os sprites diretamente para o S3 Standard-IA.
- **D)** Adicionar uma policy de lifecycle que move sprites para o S3 Standard-IA depois do upload.

---

## Questão 22

Quais das alternativas a seguir descrevem corretamente o Amazon Simple Storage Service (Amazon S3)? (Selecione DUAS.)

- **A)** Um dispositivo de borda para transferência de dados em grande volume
- **B)** Um sistema de arquivos paralelo de alto desempenho
- **C)** Um serviço de armazenamento com capacidade praticamente ilimitada
- **D)** Um sistema de arquivos compartilhado gerenciado e compatível com Windows
- **E)** Um sistema de armazenamento de objetos altamente durável

---

## Questão 23

Em qual Região da AWS os dados de billing-metric do Amazon CloudWatch são armazenados?

- **A)** A Região da AWS onde essa conta foi criada pela primeira vez.
- **B)** Na Região da AWS em que o recurso AWS executa.
- **C)** A Região `us-east-1` (N. Virginia).
- **D)** A Região `us-west-1` (N. California).

---

## Questão 24

Um desenvolvedor de uma startup está construindo um aplicativo que precisa aceitar entrada falada e digitada de clientes por um front end no estilo chat. Qual serviço da AWS ajuda a entregar essa experiência conversacional?

- **A)** Amazon Lex
- **B)** Amazon Polly text-to-speech
- **C)** Recomendações Amazon Personalize
- **D)** Amazon Translate, serviço de idiomas

---

## Questão 25

Uma startup acabou de mover sua stack para a AWS e precisa de uma forma de controlar o que cada funcionário tem permissão de fazer. Qual construto do IAM expressa e impõe essas decisões de permissão?

- **A)** IAM Policy
- **B)** Um IAM User
- **C)** Um IAM Group
- **D)** Uma IAM Role

---

## Questão 26

Quais dois serviços da AWS conseguem manter os usuários alheios a quedas breves enviando requisições de entrada para as instâncias de back-end que permanecem saudáveis? (Selecione DOIS.)

- **A)** AWS Elastic Load Balancing
- **B)** Amazon ECS Service Connect
- **C)** AWS EC2 Auto Scaling
- **D)** Amazon Route 53
- **E)** Tabelas de rotas da VPC

---

## Questão 27

Quais dois serviços da AWS abaixo têm escopo de Região por design? (Selecione DUAS.)

- **A)** AWS Identity and Access Management (IAM).
- **B)** Amazon CloudFront.
- **C)** Amazon Rekognition.
- **D)** AWS Web Application Firewall (WAF).
- **E)** AWS Lambda.

---

## Questão 28

Qual serviço permite que um cliente provisione uma rede virtual privada dentro da AWS com sua própria faixa de IP e subnets, onde cargas de trabalho de computação podem executar?

- **A)** Um Internet Gateway
- **B)** Computação Amazon EC2
- **C)** AWS Elastic Beanstalk
- **D)** Amazon VPC

---

## Questão 29

Um fornecedor de software de capital aberto sujeito ao Sarbanes-Oxley Act (SOX) precisa fornecer os relatórios SOC 1 e SOC 2 que cobrem seus recursos hospedados na AWS. Onde pode obter esses documentos de conformidade da AWS?

- **A)** AWS Artifact
- **B)** AWS Certificate Manager (ACM)
- **C)** Serviço AWS Audit Manager
- **D)** Região AWS GovCloud (US)

---

## Questão 30

Qual serviço da AWS concede preços por volume em camadas depois que o Consolidated Billing é ativado?

- **A)** Logging AWS CloudTrail
- **B)** Amazon CloudFront
- **C)** Mensageria Amazon SNS
- **D)** Amazon S3

---

## Questão 31

Qual benefício da computação em nuvem cobre a capacidade de implantar uma aplicação em várias Regiões da AWS em alguns cliques?

- **A)** Tornar-se global em minutos
- **B)** Acessar as economias de escala enormes que a AWS desfruta
- **C)** Parar de gastar dinheiro executando e mantendo data centers físicos
- **D)** Parar de adivinhar as necessidades de capacidade

---

## Questão 32

Uma seguradora multinacional está reconstruindo sua infraestrutura e movendo todas as cargas de produção para a nuvem pública. O CTO da empresa escolheu a Amazon Web Services como plataforma-alvo e pretende conduzir o programa com base no AWS Cloud Adoption Framework (AWS CAF). Entre as perspectivas do CAF, qual sustenta mais diretamente uma migração e transformação bem-sucedidas para um cenário com esse formato?

- **A)** A Perspectiva de Governança
- **B)** A Perspectiva de Negócios
- **C)** A Perspectiva de Plataforma
- **D)** A Perspectiva de Pessoas

---

## Questão 33

Um cliente opera um site popular cujos leitores somam milhões em todas as regiões do mundo. O banco de dados de apoio está vendo uma carga pesada de leitura desses visitantes. Qual opção abaixo é a MELHOR forma de elevar o throughput de leitura do banco de dados?

- **A)** Habilitar Read Replicas do Amazon RDS.
- **B)** Habilitar implantações Multi-AZ.
- **C)** Colocar cada requisição de entrada primeiro em uma fila do Amazon SQS.
- **D)** Habilitar Standby Replicas do Amazon RDS.

---

## Questão 34

Uma equipe teve um objeto do S3 excluído por uma conta sem autorização do proprietário. Qual controle preventivo impede a exclusão não autorizada de objetos no S3?

- **A)** Habilitar a proteção MFA Delete no bucket S3 alvo.
- **B)** Criar uma política IAM que permita apenas a você executar ações no S3.
- **C)** Definir políticas IAM mais restritas para impedir que usuários excluam objetos do S3.
- **D)** Tornar o bucket S3 privado para que os objetos não sejam públicos para leitura ou escrita.

---

## Questão 35

A aplicação web de um cliente executando no EC2 sofreu um ataque de SQL injection contra seu banco de dados. O cliente abriu um ticket de reclamação com a AWS. Qual resposta o cliente deve esperar?

- **A)** A AWS deveria proteger melhor sua infraestrutura para reduzir tais incidentes.
- **B)** A AWS apontará o cliente de volta ao Modelo de Responsabilidade Compartilhada, sob o qual a segurança da aplicação pertence ao cliente, não à AWS.
- **C)** A AWS e o cliente devem contratar um auditor terceirizado para verificar o incidente.
- **D)** A AWS não é responsável porque o cliente deveria ter aplicado patches na instância EC2.

---

## Questão 36

Qual pilar do AWS Well-Architected Framework menciona infrastructure as code (IaC) como uma prática recomendada?

- **A)** Segurança.
- **B)** Excelência Operacional.
- **C)** Eficiência de Performance.
- **D)** Otimização de Custo.

---

## Questão 37

Entre os serviços de acompanhamento de custos da AWS, qual mostra quanto da cobertura de Reserved Instances está sendo aplicada a recursos EC2 e exibe a taxa horária com desconto que essas reservas oferecem?

- **A)** Visualizador AWS Cost Explorer
- **B)** A AWS Price List Bulk API
- **C)** AWS Cost and Usage Report
- **D)** Recurso de alertas do AWS Budgets

---

## Questão 38

Um fornecedor aeroespacial está implantando um portal web desenvolvido internamente que usuários finais vão acessar de qualquer lugar do mundo. A implantação precisa alcançar a redundância e tolerância a falhas MAIS fortes possíveis para que indisponibilidade fique fora da experiência do usuário. Como a equipe deve espalhar as instâncias Amazon EC2?

- **A)** Implantar em múltiplas Zonas de Disponibilidade em três Regiões da AWS.
- **B)** Implantar em múltiplas Zonas de Disponibilidade em uma única Região da AWS.
- **C)** Implantar em três Regiões da AWS com uma Zona de Disponibilidade por Região.
- **D)** Implantar em uma única Zona de Disponibilidade em uma única Região da AWS.

---

## Questão 39

Um estúdio de filmes documentários envia gravações 4K de câmera de múltiplos gigabytes para o Amazon S3 ao final de cada dia de filmagem. Qual das alternativas a seguir o estúdio deve adotar para MINIMIZAR o tempo de upload?

- **A)** Enviar os arquivos usando a API BatchWriteItem.
- **B)** Usar a API Amazon S3 Multipart Upload.
- **C)** Migrar o bucket para a classe de armazenamento S3 Intelligent-Tiering.
- **D)** Habilitar Cross-Origin Resource Sharing (CORS) no bucket.

---

## Questão 40

Usuários em diferentes partes do mundo estão reclamando do carregamento lento de imagens em alta resolução em uma plataforma de blog de viagens. Qual par de serviços da AWS a equipe deve escolher para entregar os arquivos com a MENOR latência possível? (Selecione DOIS.)

- **A)** AWS Storage Gateway
- **B)** Amazon CloudFront
- **C)** Amazon S3
- **D)** Amazon S3 Glacier
- **E)** Amazon Elastic File System

---

## Questão 41

Qual serviço da AWS ajuda equipes a orquestrar aplicações distribuídas e microsserviços conectando seus componentes por meio de state machines visuais?

- **A)** Amazon API Gateway
- **B)** AWS Batch
- **C)** AWS Step Functions
- **D)** Amazon Rekognition

---

## Questão 42

Um instituto de pesquisa em genômica armazena datasets de sequenciamento no Amazon S3. Uma exigência regulatória obriga que todos os datasets sejam mantidos em duas Regiões da AWS geograficamente distantes. Qual opção é a forma MAIS eficiente de satisfazer esse requisito?

- **A)** Executar um job noturno em uma instância Amazon EC2 para copiar novos objetos S3 para um bucket em uma Região distante.
- **B)** Habilitar a same-region replication do S3 para duplicar objetos entre dois buckets dentro de uma Região da AWS.
- **C)** Habilitar a cross-region replication do S3 para copiar cada novo objeto do bucket primário para um bucket em uma Região distante.
- **D)** Disparar uma função AWS Lambda em cada novo upload para gravar o objeto em um bucket em outra Região.

---

## Questão 43

Um cliente novo na AWS deseja iniciar 100 instâncias EC2 t3a.large dentro de um VPC recém-criado. Essa quantidade excede a cota de serviço padrão. Qual medida o cliente deve adotar para conseguir lançar as instâncias adicionais?

- **A)** Habilitar Enhanced Networking.
- **B)** Usar o AWS Trusted Advisor para aumentar os limites de serviço padrão do EC2.
- **C)** Não fazer nada. A AWS aumenta o limite automaticamente.
- **D)** Abrir um chamado de suporte no AWS Support Center solicitando um aumento de cota de serviço.

---

## Questão 44

Quais serviços da AWS são adequados para armazenar dados que mudam rapidamente e exigem baixa latência de leitura e escrita? (Selecione DOIS.)

- **A)** Amazon S3
- **B)** Amazon EBS
- **C)** AWS Glue
- **D)** Amazon RDS
- **E)** AWS Data Pipeline

---

## Questão 45

As Reserved Instances no Amazon EC2 oferecem economia em relação ao preço on-demand. Qual é a porcentagem MÁXIMA de desconto disponível por meio de um compromisso de Reserved Instance?

- **A)** 50%
- **B)** 90%
- **C)** 72%
- **D)** 40%

---

## Questão 46

Uma policy do AWS IAM é expressa como um documento JSON. Qual par de elementos é exigido em toda IAM policy?

- **A)** Action, Condition.
- **B)** Effect, Action.
- **C)** Effect, Sid.
- **D)** Sid, Principal.

---

## Questão 47

Qual serviço da AWS avalia continuamente se as configurações de recursos de uma conta estão alinhadas a um conjunto definido de regras de conformidade?

- **A)** Monitoramento Amazon CloudWatch
- **B)** Relatórios AWS Artifact
- **C)** AWS Config
- **D)** Gerenciamento de acesso AWS IAM

---

## Questão 48

Entre os itens listados, qual descreve um benefício real entregue pelo AWS Global Accelerator?

- **A)** Acelera a performance dos servidores EC2 globalmente.
- **B)** Custos reduzidos de servidores ao executar serviços AWS.
- **C)** Fornece um armazenamento de dados altamente durável na AWS.
- **D)** Menor latência ao acessar aplicações hospedadas na AWS.

---

## Questão 49

Quando uma aplicação precisa executar cargas de trabalho não interrompíveis continuamente por um período de três anos, qual opção de compra de instância EC2 oferece o MENOR custo total?

- **A)** Amazon EC2 Standard Reserved Instances
- **B)** Amazon EC2 On-Demand Instances (cobrança por hora)
- **C)** Amazon EC2 Spot Instances (capacidade ociosa)
- **D)** Amazon EC2 Convertible Reserved Instances (RIs flexíveis)

---

## Questão 50

Qual oferta da AWS entrega as páginas dinâmicas de uma aplicação web a usuários finais em qualquer lugar do mundo com baixa latência?

- **A)** Armazenamento de objetos Amazon S3
- **B)** DNS Amazon Route 53
- **C)** Um AWS Elastic Load Balancer
- **D)** Amazon CloudFront

---

## Questão 51

Os servidores web de uma empresa estão hospedados no Amazon EC2 e fazem chamadas a uma API RESTful que continua em execução dentro do data center on-premises da empresa. Qual tipo de arquitetura descreve essa configuração?

- **A)** Uma arquitetura de nuvem híbrida
- **B)** Um modelo Software-as-a-Service (SaaS)
- **C)** Uma arquitetura serverless
- **D)** Um modelo Platform-as-a-Service (PaaS)

---

## Questão 52

Entre os níveis do AWS Support, qual é o de MENOR custo que também desbloqueia o uso programático da AWS Support API?

- **A)** Business
- **B)** Developer
- **C)** Basic
- **D)** Enterprise

---

## Questão 53

Qual nível do AWS Support é o primeiro a permitir que um cliente abra casos técnicos ilimitados?

- **A)** O plano Basic
- **B)** O plano Business
- **C)** O plano Enterprise
- **D)** Developer

---

## Questão 54

Para ingerir e processar fluxos de alto volume de registros com latência quase imediata, qual serviço da AWS é a escolha natural?

- **A)** AWS CloudTrail
- **B)** Amazon Kinesis Data Streams
- **C)** Amazon CloudWatch
- **D)** AWS Glue

---

## Questão 55

Qual recurso da AWS move automaticamente, conforme uma agenda, objetos raramente acessados dentro de um bucket do S3 para uma camada de armazenamento MAIS barata?

- **A)** Uma política de ciclo de vida do S3
- **B)** Uma access control list do S3
- **C)** Serviço AWS Transfer Family
- **D)** Appliance AWS Storage Gateway

---

## Questão 56

Quando vários usuários IAM precisam compartilhar o mesmo conjunto de permissões na AWS, qual abordagem permite manter essas permissões com o MENOR esforço possível?

- **A)** Anexar a mesma IAM policy individualmente a cada usuário IAM.
- **B)** Criar um IAM group, anexar as políticas necessárias a ele e, em seguida, alocar os usuários nesse grupo.
- **C)** Vincular a IAM policy a uma IAM role e, em seguida, anexar essa role a cada usuário IAM individualmente.
- **D)** Aplicar permissões a vários usuários IAM por meio de uma role entre contas.

---

## Questão 57

Quais duas afirmações abaixo são verdadeiras sobre security groups e network ACLs? (Selecione DUAS.)

- **A)** Uma network ACL é stateful, e o tráfego de retorno para uma requisição de saída é automaticamente permitido de volta.
- **B)** Um security group contém regras numeradas e as avalia em ordem numérica para decidir se permite o tráfego.
- **C)** Uma network ACL contém regras numeradas e as avalia em ordem numérica para decidir se permite ou nega o tráfego.
- **D)** Um security group é stateless, o que significa que o tráfego de retorno exige sua própria regra explícita de allow.
- **E)** Um security group é stateful, e o tráfego de retorno correspondente a uma requisição de saída é automaticamente permitido de volta.

---

## Questão 58

Qual peça da infraestrutura da AWS se correlaciona diretamente com uma subnet de VPC?

- **A)** Uma Região da AWS
- **B)** Uma edge location do CloudFront
- **C)** Uma Zona de Disponibilidade
- **D)** Um único servidor

---

## Questão 59

Qual serviço da AWS você escolheria se precisasse definir uma meta percentual de cobertura de reservas e ser notificado sempre que o uso real ficasse abaixo dessa meta?

- **A)** AWS Trusted Advisor
- **B)** AWS Cost Anomaly Detection
- **C)** AWS Budgets
- **D)** AWS Cost and Usage Report

---

## Questão 60

Quais tipos de política listados abaixo concedem acesso a recursos do Amazon S3? (Selecione DOIS.)

- **A)** Políticas de roteamento do Route 53
- **B)** User policies
- **C)** Políticas de Network access control list
- **D)** Políticas em nível de objeto do S3
- **E)** Bucket policies

---

## Questão 61

Dentro da AWS, \_\_\_\_\_\_\_\_\_  é uma oferta gerenciada que permite a clientes criar e governar chaves criptográficas usadas para operações como criptografia e assinatura, sem precisar operar um módulo de hardware próprio.

- **A)** AWS Systems Manager
- **B)** AWS KMS
- **C)** AWS CloudHSM
- **D)** AWS IAM

---

## Questão 62

Para obter alta disponibilidade junto com failover automático para um banco de dados Amazon RDS, qual capacidade do RDS a equipe deve habilitar?

- **A)** Amazon RDS Read Replica
- **B)** Implantação Amazon RDS Multi-AZ
- **C)** Amazon RDS Performance Insights
- **D)** Amazon RDS DB Snapshots

---

## Questão 63

Ao comprar uma RI Standard ou Convertible, quais estruturas de pagamento abaixo são realmente oferecidas pela AWS? (Selecione TRÊS.)

- **A)** Um plano de pagamento adiado
- **B)** All Upfront
- **C)** Uma opção de pagamento reservado
- **D)** Partial Upfront
- **E)** Um plano Bill-Me-Later
- **F)** No Upfront

---

## Questão 64

Entre os recursos da AWS, qual reúne os princípios centrais, preceitos de design e melhores práticas arquiteturais usados ao construir e operar cargas de trabalho na nuvem?

- **A)** AWS Reference Architecture Diagrams
- **B)** AWS Well-Architected Framework
- **C)** Modelo de Responsabilidade Compartilhada da AWS
- **D)** AWS Trusted Advisor

---

## Questão 65

Qual capacidade embutida é oferecida pelo Amazon Rekognition sem exigir um modelo personalizado?

- **A)** Detectar poses do corpo humano
- **B)** Identificar objetos dentro de uma fotografia
- **C)** Redimensionar imagens em massa
- **D)** Converter imagens coloridas em escala de cinza

---

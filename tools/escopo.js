// Regras de escopo do CLF-C02 (Exam Guide v1.3, 29/10/2026). Usado pelo validador.
module.exports = {
  // Pesos oficiais e distribuição em 65 questões
  pesos: { 1: 0.24, 2: 0.30, 3: 0.34, 4: 0.12 },
  porProva: { 1: 16, 2: 19, 3: 22, 4: 8 },
  tasks: {
    1: ['1.1', '1.2', '1.3', '1.4'],
    2: ['2.1', '2.2', '2.3', '2.4'],
    3: ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8'],
    4: ['4.1', '4.2', '4.3'],
  },
  // Serviços FORA do escopo: podem ser distratores, nunca a alternativa correta.
  foraDoEscopo: [
    /\bAppFlow\b/i, /Clean Rooms/i, /Data Exchange/i, /DataZone/i, /\bMSK\b|Managed Streaming for (Apache )?Kafka/i,
    /AppFabric/i, /Simple Workflow|\bSWF\b/i, /\bCopilot\b/i, /Wavelength/i, /Application Cost Profiler/i, /DevPay/i,
    /AWS Activate/i, /\bAWS IQ\b/i, /Managed Services|\bAMS\b/i, /Billing Conductor/i, /Keyspaces/i, /MemoryDB/i,
    /AppConfig/i, /Application Composer/i, /CodeArtifact/i, /CodeDeploy/i, /CodeGuru/i, /CloudShell/i, /Device Farm/i,
    /GameLift/i, /IoT Device Defender/i, /Greengrass/i, /Fraud Detector/i, /Personalize/i, /AWS Chatbot/i,
    /Data Lifecycle Manager/i, /Launch Wizard/i, /\bElemental\b|MediaConvert|MediaLive|MediaPackage|MediaTailor|MediaConnect/i,
    /Interactive Video Service|\bIVS\b/i, /Refactor Spaces/i, /Transfer Family/i, /Cloud Map/i, /Network Access Analyzer/i,
    /Ground Station/i, /VPC Lattice/i, /Cloud Directory/i, /Network Firewall/i, /FSx for Lustre/i,
  ],
  // Nomes/serviços descontinuados ou renomeados: proibidos em QUALQUER lugar da alternativa correta
  // e proibidos no enunciado (exceto quando explicitamente marcados como "antigo").
  desatualizados: [
    [/Simple Monthly Calculator/i, 'use AWS Pricing Calculator'],
    [/TCO Calculator/i, 'use AWS Pricing Calculator / Migration Evaluator'],
    [/Personal Health Dashboard|Service Health Dashboard/i, 'use AWS Health Dashboard'],
    [/Snowmobile/i, 'descontinuado'],
    [/CodeStar|Cloud9|CodeCommit|OpsWorks/i, 'descontinuado/fora da lista'],
    [/EC2.Classic|ClassicLink/i, 'descontinuado'],
    [/Scheduled Reserved/i, 'descontinuado'],
    [/Reduced Redundancy/i, 'descontinuado'],
    [/master (payer )?account|conta mestre/i, 'use management account'],
    [/QuickSight(?! *\))/i, 'use Amazon Quick (antigo QuickSight)'],
    [/Elasticsearch Service/i, 'use Amazon OpenSearch Service'],
    [/Server Migration Service/i, 'use AWS Application Migration Service'],
    [/Data Pipeline|CloudSearch|Amazon Chime|Amazon Forecast|WorkDocs|Honeycode|WorkLink/i, 'legado/descontinuado'],
    [/\bDeveloper Support\b|plano Developer|Developer plan|Enterprise On-Ramp|\bBusiness Support\b(?!\+)/i, 'planos novos: Basic, Business Support+, Enterprise, Unified Operations'],
    [/AWS Single Sign-On|\bAWS SSO\b/i, 'use IAM Identity Center'],
    [/AppStream 2\.0(?! *\))/i, 'renomeado: Amazon WorkSpaces Applications (antigo AppStream 2.0)'],
    [/Snowball|Snowcone|Snow Family/i, 'Snowball Edge indisponível para novos clientes (use DataSync / Data Transfer Terminal); só como distrator'],
    [/Technology Partners?|Consulting Partners?/i, 'APN atual: parceiros de software / parceiros de serviços'],
  ],
  // Termos que só podem aparecer como distrator e são aceitos (não disparam alerta) — nenhum por padrão.
};

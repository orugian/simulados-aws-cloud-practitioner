// Correções da revisão adversarial nº 1 (17 questões). Aplicar uma vez: node tools/correcoes-revisao-1.js
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'banco', 'partes');
const parte = id => ({ 'D1-a': 'd1a', 'D1-b': 'd1b', 'D2-a': 'd2a', 'D2-b': 'd2b', 'D3-a': 'd3a', 'D3-b': 'd3b', 'D3-c': 'd3c', 'D4-x': 'd4' })[id.slice(0, 4)];
const cache = {};
const load = p => (cache[p] = cache[p] || JSON.parse(fs.readFileSync(path.join(DIR, p + '.json'), 'utf8')));
const get = id => { const q = load(parte(id)).find(x => x.id === id); if (!q) throw new Error('não achei ' + id); return q; };
const put = q => { const a = load(parte(q.id)); a[a.findIndex(x => x.id === q.id)] = q; };
const alt = (q, texto) => { const a = q.alternativas.find(x => x.texto === texto); if (!a) throw new Error(`${q.id}: alternativa "${texto}"`); return a; };

let q;
// D1-a-029 — ambígua com Otimização de Custos
q = get('D1-a-029');
q.enunciado = 'Qual pilar do AWS Well-Architected Framework enfatiza selecionar e usar recursos de computação de forma eficiente para atender aos requisitos de DESEMPENHO da carga de trabalho, mantendo essa eficiência quando a demanda muda?';
alt(q, 'Otimização de Custos').porque = 'Foca em entregar valor ao menor preço e evitar gastos desnecessários, não em atender requisitos de desempenho.';

// D1-b-028 — distratores eram da nuvem (pista de contexto)
q = get('D1-b-028');
q.enunciado = 'Qual item é um exemplo de custo FIXO?';
q.alternativas[1] = { texto: 'O valor cobrado por GB transferido para a internet a partir da AWS', correta: false, porque: 'Cobrança por volume transferido é custo variável, proporcional ao uso.' };

// D1-b-031 — "ociosa" repetida só na correta
q = get('D1-b-031');
q.enunciado = 'Um varejista dimensiona seu data center para o pico da Black Friday. No restante do ano, a maior parte dos servidores roda com baixa utilização. Qual custo on-premises esse cenário ilustra e como a AWS o reduz?';
alt(q, 'Custo de capacidade ociosa, reduzido pagando apenas pela capacidade usada').texto = 'Custo de superprovisionamento, reduzido com capacidade sob demanda paga pelo uso';

// D1-b-044 — duplicata de D1-a-016 / D1-b-043 → nova questão de 1.4 (automação)
put({
  id: 'D1-b-044', dominio: 1, task: '1.4', tipo: 'unica',
  enunciado: 'Uma empresa ainda cria e configura servidores manualmente e registra muitos erros humanos e atrasos. Qual benefício econômico ela obtém ao automatizar o provisionamento na AWS com infraestrutura como código?',
  alternativas: [
    { texto: 'Desconto automático de Reserved Instances nos recursos criados por template', correta: false, porque: 'IaC não altera o modelo de preço; descontos dependem de compromissos como RIs e Savings Plans.' },
    { texto: 'Menos horas de trabalho operacional e menos retrabalho causado por erros', correta: true, porque: 'Automatizar torna o provisionamento rápido, repetível e consistente, reduzindo custo de mão de obra e de falhas.' },
    { texto: 'Isenção de cobrança pelos recursos provisionados por automação', correta: false, porque: 'Recursos criados por automação são cobrados normalmente; o CloudFormation em si não tem custo adicional.' },
    { texto: 'Eliminação da responsabilidade do cliente pela segurança dos recursos', correta: false, porque: 'A automação não muda o modelo de responsabilidade compartilhada.' },
  ],
  explicacao: 'Automação (IaC, scripts, Auto Scaling) reduz esforço manual e erros, liberando a equipe para atividades de maior valor: é um dos aspectos de economia da nuvem.',
  servicos: ['AWS CloudFormation'], dificuldade: 2, fonte: 'autoral',
});

// D2-b-004 — sintaxe JSON acima do nível → Deny explícito
put({
  id: 'D2-b-004', dominio: 2, task: '2.3', tipo: 'unica',
  enunciado: 'Um usuário do IAM recebe duas políticas: uma permite (Allow) excluir objetos de um bucket S3 e outra nega (Deny) explicitamente a mesma ação. O que acontece quando ele tenta excluir um objeto?',
  alternativas: [
    { texto: 'A exclusão é permitida, porque o Allow foi anexado primeiro', correta: false, porque: 'A ordem de anexação das políticas não influencia a avaliação.' },
    { texto: 'A exclusão é negada, porque um Deny explícito sempre prevalece', correta: true, porque: 'Na avaliação do IAM, um Deny explícito sobrepõe qualquer Allow.' },
    { texto: 'A exclusão é permitida, porque o Allow é mais específico', correta: false, porque: 'Especificidade não importa: o Deny explícito vence.' },
    { texto: 'A AWS pede aprovação do root user para decidir', correta: false, porque: 'Não existe aprovação em tempo real pelo root; a avaliação de políticas é automática.' },
  ],
  explicacao: 'Por padrão tudo é negado (deny implícito); um Allow concede acesso; um Deny explícito sempre prevalece sobre qualquer Allow.',
  servicos: ['IAM'], dificuldade: 2, fonte: 'usuario-A46 (reescrita)',
});

// D2-b-047 — duplicata de Firewall Manager → Security Group x NACL? (fica em 3.5). Usar Shield Advanced x WAF? já coberto.
// Nova faceta de 2.4: produtos de segurança de terceiros no AWS Marketplace.
put({
  id: 'D2-b-047', dominio: 2, task: '2.4', tipo: 'unica',
  enunciado: 'Uma empresa padronizou um firewall de próxima geração de um fornecedor específico e quer usar o mesmo produto na AWS, com cobrança integrada à fatura da AWS. Onde ela deve obtê-lo?',
  alternativas: [
    { texto: 'AWS Artifact', correta: false, porque: 'Disponibiliza relatórios de conformidade da AWS, não produtos de terceiros.' },
    { texto: 'AWS Marketplace', correta: true, porque: 'Catálogo de software de terceiros (inclusive segurança) pronto para rodar na AWS, com cobrança na fatura da AWS.' },
    { texto: 'AWS Service Catalog', correta: false, porque: 'Publica produtos aprovados internamente pela própria organização; não é a loja de fornecedores.' },
    { texto: 'AWS Firewall Manager', correta: false, porque: 'Gerencia centralmente WAF, Shield Advanced e Security Groups; não vende produtos de terceiros.' },
  ],
  explicacao: 'Produtos de segurança de terceiros (firewalls, antivírus, SIEM) estão disponíveis no AWS Marketplace, com faturamento consolidado na conta AWS.',
  servicos: ['AWS Marketplace'], dificuldade: 2, fonte: 'autoral',
});

// D2-b-016 — porque impreciso
q = get('D2-b-016');
q.alternativas[2].porque = 'O usuário acessa a conta assumindo uma IAM role gerada pelo permission set, que não pode executar tarefas exclusivas do root.';

// D2-b-048 — duplicata de D2-a-036 → faceta GuardDuty x Inspector x Detective (investigação)
put({
  id: 'D2-b-048', dominio: 2, task: '2.4', tipo: 'unica',
  enunciado: 'O Amazon GuardDuty gerou um achado de possível credencial comprometida. A equipe agora precisa analisar a causa raiz e visualizar as entidades e atividades relacionadas ao longo do tempo. Qual serviço deve usar?',
  alternativas: [
    { texto: 'Amazon Inspector', correta: false, porque: 'Varre vulnerabilidades de software e exposição de rede; não investiga incidentes.' },
    { texto: 'AWS Trusted Advisor', correta: false, porque: 'Verifica boas práticas de configuração; não analisa causa raiz de achados.' },
    { texto: 'Amazon Detective', correta: true, porque: 'Correlaciona logs e cria gráficos de comportamento para investigar a causa raiz de achados de segurança.' },
    { texto: 'Amazon Macie', correta: false, porque: 'Descobre dados sensíveis no Amazon S3; não investiga credenciais comprometidas.' },
  ],
  explicacao: 'GuardDuty detecta a ameaça; Detective investiga a causa raiz; Security Hub agrega os achados.',
  servicos: ['Amazon Detective', 'Amazon GuardDuty'], dificuldade: 3, fonte: 'autoral',
});

// D3-a-015 — correta muito mais longa
q = get('D3-a-015');
q.alternativas[0].texto = 'Cada AZ contém várias Regiões; as edge locations ficam dentro das AZs';
q.alternativas[1].texto = 'Cada edge location é uma AZ reduzida que hospeda o Amazon EC2';
q.alternativas[2].texto = 'Cada Região contém várias AZs; as edge locations ficam fora dessa estrutura';
q.alternativas[3].texto = 'Região e AZ são sinônimos; as edge locations são data centers da AZ';

// D3-a-047 — nome antigo (AppStream 2.0) e "AWS Elastic Load Balancing"
q = get('D3-a-047');
q.alternativas[2] = { texto: 'Amazon SQS', correta: false, porque: 'Desacopla componentes com filas, mas não distribui tráfego web nem ajusta a capacidade.' };
q.alternativas[3].texto = 'Elastic Load Balancing (ELB)';

// D3-b-029 — Snowball Edge não está mais disponível para novos clientes
q = get('D3-b-029');
q.enunciado = 'Uma empresa precisa transferir dezenas de terabytes de arquivos de um servidor NFS on-premises para o Amazon S3 pela rede, de forma automatizada, com verificação de integridade e agendamento. Qual serviço é o MAIS adequado?';
q.alternativas = [
  { texto: 'AWS Site-to-Site VPN', correta: false, porque: 'Cria um túnel criptografado entre as redes, mas não automatiza nem gerencia a cópia de arquivos.' },
  { texto: 'AWS Storage Gateway (File Gateway)', correta: false, porque: 'Oferece acesso híbrido contínuo a arquivos com cache local; não é a ferramenta de migração em massa agendada.' },
  { texto: 'AWS Transit Gateway', correta: false, porque: 'Interconecta VPCs e redes on-premises; não transfere dados.' },
  { texto: 'AWS DataSync', correta: true, porque: 'Automatiza e acelera a transferência online de arquivos (NFS, SMB, HDFS) para S3, EFS e FSx, com verificação de integridade e agendamento.' },
];
q.explicacao = 'Transferência online em massa de arquivos para a AWS = DataSync. Observação: o AWS Snowball Edge não está mais disponível para novos clientes; a AWS indica DataSync (online) ou AWS Data Transfer Terminal (física).';
q.servicos = ['AWS DataSync']; q.fonte = 'usuario-B07 (reescrita)';
// distrator Snowball em d3b (linha 249/458) continua ok como distrator; idem "dispositivo de borda".

// D3-b-006 — porque impreciso (RDS Custom)
q = get('D3-b-006');
q.alternativas[0].porque = 'É gerenciado e só suporta as engines e versões oferecidas pela AWS, com acesso limitado ao sistema operacional.';

// D4-x-020 — porques vazios
q = get('D4-x-020');
q.alternativas[1] = { texto: 'AWS CloudFormation', correta: false, porque: 'O CloudFormation não tem custo próprio para recursos da AWS; não há faixa de volume a alcançar.' };
q.alternativas[2].porque = 'O SNS cobra por requisição e entrega sem as faixas de armazenamento por volume que são o exemplo clássico; o caso típico é o S3.';

// D3-c-016 — enunciado entregava a resposta
q = get('D3-c-016');
q.enunciado = 'Uma empresa quer reduzir a latência para usuários do mundo todo que baixam vídeos e imagens do seu site, sem alterar a origem. Qual serviço da AWS deve usar?';
q.dificuldade = 2;

// D3-c-041 — AppStream 2.0 renomeado
q = get('D3-c-041');
q.alternativas[1].texto = 'Amazon WorkSpaces Applications (antigo AppStream 2.0)';
q.explicacao = 'End-user computing: WorkSpaces (desktop virtual completo), WorkSpaces Applications, antigo AppStream 2.0 (streaming de aplicações desktop), e WorkSpaces Secure Browser (acesso seguro a apps web pelo navegador).';
q.servicos = q.servicos.map(s => s === 'Amazon AppStream 2.0' ? 'Amazon WorkSpaces Applications' : s);

// D4-x-042 e D4-x-050 — nomenclatura do APN
q = get('D4-x-042');
q.alternativas[1].texto = 'Parceiros de serviços (consultorias e system integrators)';
q.alternativas[2].texto = 'Parceiros de software (ISVs e fornecedores de SaaS)';
q.explicacao = 'APN: parceiros de software (ISVs, SaaS; antes chamados Technology Partners) x parceiros de serviços (consultorias, system integrators, MSPs; antes Consulting Partners).';
q = get('D4-x-050');
q.explicacao = q.explicacao.replace('Consulting/Services Partners', 'parceiros de serviços').replace('Technology Partners (ISVs)', 'parceiros de software (ISVs)');

// D4-x-029 — horizonte da previsão
q = get('D4-x-029');
alt(q, 'AWS Cost Explorer').porque = 'Gera previsões de custo para os próximos meses com base no uso histórico da conta.';

for (const [p, a] of Object.entries(cache)) fs.writeFileSync(path.join(DIR, p + '.json'), JSON.stringify(a, null, 2));
console.log('ok:', Object.keys(cache).join(', '));

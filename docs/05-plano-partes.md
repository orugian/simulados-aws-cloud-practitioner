# Plano de produção do banco: partes e cotas

Meta: **405 questões**, o suficiente para **6 provas completas** (16/19/22/8 por domínio) sem repetir questão.

| Parte | Arquivo | Tasks e cotas | Total | Questões do usuário (doc 02) |
| --- | --- | --- | --- | --- |
| d1a | `banco/partes/d1a.json` | 1.1 = 25 · 1.2 = 25 | 50 | A31 B71 B73 B79 · A36 A64 B27 B38 B81 |
| d1b | `banco/partes/d1b.json` | 1.3 = 25 · 1.4 = 25 | 50 | A32 B26 B48 B51 B67 · B32 |
| d2a | `banco/partes/d2a.json` | 2.1 = 30 · 2.2 = 30 | 60 | A03 A35 B25 B30 B46 B56 B59 B60 B63 B66 B72 B83 · A29 A34 A47 A61 B06 B09 B21 B35 B41 B47 B50 B54 B76 |
| d2b | `banco/partes/d2b.json` | 2.3 = 35 · 2.4 = 25 | 60 | A01 A17 A25 A46 A56 A60 B13 B18 B52 B65 B75 B87 · A19 B11 B53 B55 B57 B70 |
| d3a | `banco/partes/d3a.json` | 3.1 = 14 · 3.2 = 18 · 3.3 = 20 | 52 | A18 A51 B19 B34 B77 B82 · A09 A13 A14 A27 A38 A58 B15 B16 B20 B78 · A05 A06 A07 A11 A16 B04 B28 B45 |
| d3b | `banco/partes/d3b.json` | 3.4 = 16 · 3.6 = 24 | 40 | A33 A62 B08 B22 B74 · A02 A08 A10 A21 A22 A39 A42 A44 A55 B01 B02 B03 B07 B10 B17 B64 |
| d3c | `banco/partes/d3c.json` | 3.5 = 20 · 3.7 = 12 · 3.8 = 11 | 43 | A26 A28 A40 A48 A50 A57 B24 B33 B36 B37 B49 B62 B68 B80 · A04 A24 A54 A65 B85 · A41 B29 B44 B69 |
| d4  | `banco/partes/d4.json`  | 4.1 = 18 · 4.2 = 18 · 4.3 = 14 | 50 | A20 A45 A49 A63 B05 B61 B84 · A23 A30 A37 A59 B12 B23 B31 B39 B43 B58 B86 · A12 A15 A43 A52 A53 B14 B40 B42 |

Total: 50 + 50 + 60 + 60 + 52 + 40 + 43 + 50 = **405** (D1 = 100 · D2 = 120 · D3 = 135 · D4 = 50).

## Fronteiras entre partes (evitar sobreposição)

| Assunto | Fica em | Não entra em |
| --- | --- | --- |
| Trusted Advisor: segurança (SG aberto, MFA no root) | 2.4 (d2b) | — |
| Trusted Advisor: custo, limites, planos de suporte | 4.3 (d4) | — |
| CloudTrail, Config, CloudWatch, Artifact, criptografia, GuardDuty, Inspector, Security Hub, Macie, Detective | 2.2 (d2a) | 2.4 (d2b) só como distrator |
| WAF, Shield, Firewall Manager, Marketplace de segurança, fontes de informação de segurança | 2.4 (d2b) | — |
| Security Group x NACL **como componente de VPC** | 3.5 (d3c) | 2.x |
| Elasticidade e alta disponibilidade **como benefício** | 1.1 (d1a) | — |
| Regiões, AZs, edge e multi-AZ **como infraestrutura** | 3.2 (d3a) | — |
| DMS e SCT como **ferramentas de banco** | 3.4 (d3b) | — |
| Estratégias de migração, 7 Rs, CAF, Discovery, Migration Hub, Evaluator, MGN | 1.3 (d1b) | — |
| Preço de classes de S3 e transferência de dados | 4.1 (d4) | — |
| Classes de S3 **como característica técnica** | 3.6 (d3b) | — |
| Planos de AWS Support como opção de apoio ao negócio | 4.3 (d4) | 3.8 (d3c) |
| Pilares do Well-Architected e princípios de design | 1.2 (d1a) | — |
| Rightsizing, BYOL, custo fixo x variável, economia de escala | 1.4 (d1b) | — |

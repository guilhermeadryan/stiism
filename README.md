# Head Pulse — Vercel

Next.js padrão. Não utiliza Cloudflare, D1, Wrangler, Vinext, Vite ou Sites.

## Publicar: apenas configuração da sua conta

1. Extraia o ZIP. A pasta com `package.json` é a raiz. Envie os arquivos para um repositório Git e importe esse repositório na Vercel como **Next.js**. Se o repositório contiver a pasta externa inteira, selecione `head-pulse-vercel` como Root Directory.
2. Conecte um banco **Neon / Postgres** à Vercel pelo Marketplace ou pela seção Storage. A conexão precisa fornecer `DATABASE_URL` (também é aceito `POSTGRES_URL`). Use a URL com SSL fornecida pelo banco.
3. Em Settings → Environment Variables, defina **ADMIN_PASSWORD** com pelo menos 12 caracteres. Essas variáveis são privadas: não utilize prefixo NEXT_PUBLIC_.
4. Faça Deploy / Redeploy com as variáveis habilitadas em Production. Para testes em Preview configure as variáveis também nesse ambiente, preferencialmente com outro banco.

Não é necessário editar código, executar migração manual ou configurar Output Directory. A configuração já usa npm ci e npm run build. As tabelas são criadas automaticamente na primeira conexão; o usuário do banco precisa ter permissão para criar tabelas. Salvar dados permanentemente exige conectar um banco real à sua conta.

## Administrador

A senha será a definida em ADMIN_PASSWORD. Clique em Entrar como admin. Só uma sessão autorizada consegue salvar dados e importar backups. A sessão dura até 8 horas. Alterar ADMIN_PASSWORD e fazer Redeploy invalida as sessões anteriores.

## Transferir dados do site antigo

O projeto inclui os dados iniciais das imagens e Jessica como Head. Os lançamentos atuais estão no banco do site anterior. Exporte o JSON em Configurações → Exportar backup no site antigo, entre como administrador na nova instalação e importe o JSON em Configurações. Revise e salve. Backups da versão anterior são convertidos automaticamente.

## Executar no computador

Requer Node.js 22 e PostgreSQL acessível. Copie .env.example para .env.local e preencha DATABASE_URL e ADMIN_PASSWORD.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000.

```sh
npm run build
npm start
```

## Testes

```sh
npm run typecheck
npm test
```

Os testes usam PostgreSQL embarcado PGlite apenas para validação. Em produção utiliza-se PostgreSQL externo.

## Recursos

STI e ISM; Head Jessica; Jessica, Bob e Rudinei no ISM; períodos com ano; indicadores e metas independentes; gráficos; histórico; backup; importação; notas; apresentação; limite de tentativas de senha; sessões HttpOnly; proteção no servidor contra edição sem senha e sobrescrita entre sessões.

## Arquivos

app/: interface e APIs. db/: PostgreSQL e criação automática do esquema. lib/: dados e segurança. tests/: testes funcionais. vercel.json: configuração da Vercel.

Documentação oficial: https://vercel.com/docs/storage e https://nextjs.org/docs/app/getting-started/deploying

## Excluir períodos

Entre como administrador, abra Editar dados, selecione o período e clique em Excluir período selecionado. Confirme e clique em Salvar alterações. A exclusão remove apenas os dados desse período da equipe selecionada. É necessário manter pelo menos um período em cada equipe. Ao abrir o site, cada equipe começa no último período adicionado.

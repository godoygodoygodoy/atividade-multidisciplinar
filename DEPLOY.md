# 🚀 GUIA DE DEPLOY - PASSO A PASSO

## ✅ Checklist de Pré-Deploy

Antes de fazer o deploy, certifique-se de que:

- [ ] MongoDB Atlas está configurado
- [ ] Data API está habilitada
- [ ] Banco de dados foi populado (com script ou manualmente)
- [ ] Arquivo `vercel.json` existe no projeto
- [ ] Arquivo `api/mongo.js` existe no projeto
- [ ] `USE_MOCK_DATA = false` no `app.js`
- [ ] Código está commitado no GitHub

---

## 🗄️ PARTE 1: Configurar MongoDB Atlas

### 1.1 Criar Cluster (se ainda não tiver)
```
1. Acesse: https://cloud.mongodb.com
2. Login ou crie conta gratuita
3. Create New Cluster → M0 (Free Tier)
4. Provider: AWS, Region: São Paulo
5. Cluster Name: Cluster0
```

### 1.2 Configurar Segurança
```
Database Access:
- Add New User
- Username: devops_user
- Password: [gere senha forte]
- Role: Read and Write to any database

Network Access:
- Add IP Address
- 0.0.0.0/0 (permite todos IPs)
- Comentário: "Vercel Dynamic IPs"
```

### 1.3 Habilitar Data API
```
1. No menu lateral: Data API
2. Clique: Enable Data API
3. Copie: Endpoint URL
   Exemplo: https://data.mongodb-api.com/app/data-abcde/endpoint/data/v1
4. Create API Key
5. Copie e salve a chave (só aparece uma vez!)
```

### 1.4 Criar Database e Collections
```
1. Browse Collections → Add My Own Data
2. Database name: devops_projeto
3. Collection name: restaurantes
4. Create
5. Adicione outra collection: artistas
```

### 1.5 Popular o Banco
```bash
# Opção 1 - Script automatizado
npm install
cp .env.example .env
# [Edite o .env com suas credenciais]
npm run populate

# Opção 2 - Manual via UI
# Insert Document → Cole JSON dos exemplos
```

---

## 🌐 PARTE 2: Deploy na Vercel

### 2.1 Criar Conta na Vercel
```
1. Acesse: https://vercel.com
2. Sign Up with GitHub
3. Autorize a Vercel a acessar seus repos
```

### 2.2 Importar Projeto
```
1. New Project
2. Import Git Repository
3. Selecione: atividade-multidisciplinar
4. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (vazio)
   - Output Directory: (vazio)
```

### 2.3 Configurar Environment Variables
```
ANTES DE CLICAR EM DEPLOY!

Settings → Environment Variables → Add

Variável 1:
- Name: MONGODB_DATA_API_URL
- Value: [Cole a URL do MongoDB]
- Environments: ✅ Production ✅ Preview ✅ Development

Variável 2:
- Name: MONGODB_API_KEY
- Value: [Cole a API Key do MongoDB]
- Environments: ✅ Production ✅ Preview ✅ Development

Variável 3:
- Name: MONGODB_DATA_SOURCE
- Value: Cluster0
- Environments: ✅ Production ✅ Preview ✅ Development

Variável 4:
- Name: MONGODB_DATABASE
- Value: devops_projeto
- Environments: ✅ Production ✅ Preview ✅ Development
```

### 2.4 Deploy Inicial
```
1. Clique: Deploy
2. Aguarde: 1-2 minutos
3. Vercel vai:
   - Clonar seu repositório
   - Instalar dependências (se houver)
   - Buildar a aplicação
   - Criar a função serverless /api/mongo
   - Fazer deploy
```

### 2.5 Verificar Deploy
```
1. Visit (clique no botão Visit)
2. Verifique se os dados do MongoDB aparecem
3. Abra o Console do navegador (F12)
4. Deve ver: "✅ Dados recebidos da API"
```

---

## 🌿 PARTE 3: Git Flow e CI/CD

### 3.1 Criar Branch Staging (se não existir)
```bash
git checkout -b staging
git push origin staging
```

### 3.2 Configurar Deploy Automático
```
Na Vercel, settings do projeto:
- Git → Production Branch: main
- Automatic Deployments: ✅ Enabled

Agora:
- Push na main → Deploy em produção
- Push na staging → Preview deployment
```

### 3.3 Workflow Recomendado
```bash
# 1. Trabalhe na staging
git checkout staging
# [Faça alterações]
git add .
git commit -m "feat: Nova funcionalidade"
git push origin staging

# 2. Vercel cria preview automaticamente
# Acesse: seu-projeto-git-staging.vercel.app

# 3. Teste no preview

# 4. Se OK, crie Pull Request no GitHub
# staging → main

# 5. Revise e faça merge

# 6. Vercel deploya em produção automaticamente
# Acesse: seu-projeto.vercel.app
```

---

## 🧪 PARTE 4: Testar em Produção

### 4.1 Checklist de Testes
```
✅ Site carrega?
✅ Dados do MongoDB aparecem?
✅ Cards de restaurantes renderizam?
✅ Cards de artistas renderizam?
✅ Não há erros no Console (F12)?
✅ Site é responsivo (mobile)?
✅ Favicon aparece?
```

### 4.2 Debugar Problemas Comuns

**Erro: "Configuração incompleta"**
```
Causa: Variáveis de ambiente não configuradas
Solução: Vercel → Settings → Environment Variables
        Verifique se todas as 4 variáveis existem
```

**Erro: "Authentication failed"**
```
Causa: MONGODB_API_KEY incorreta
Solução: Gere nova API Key no MongoDB Atlas
        Atualize na Vercel
        Redeploy (Deployments → ... → Redeploy)
```

**Erro: "Network request failed"**
```
Causa: IP não liberado no MongoDB
Solução: Network Access → 0.0.0.0/0
```

**Dados não aparecem (mas sem erro)**
```
Causa: Banco vazio
Solução: Execute o script populate-db.js
```

---

## 📊 PARTE 5: Monitoramento

### 5.1 Ver Logs na Vercel
```
1. Vercel Dashboard → Seu Projeto
2. Deployments → [Deploy mais recente]
3. Functions → api/mongo.js
4. Realtime Logs
```

### 5.2 Analytics
```
1. Analytics (menu lateral)
2. Veja:
   - Pageviews
   - Unique Visitors
   - Top Pages
```

---

## 🎯 PARTE 6: Entrega Final

### 6.1 Links para Entregar
```
✅ GitHub Repo:
   https://github.com/seu-usuario/atividade-multidisciplinar

✅ Produção (main):
   https://seu-projeto.vercel.app

✅ Staging (staging):
   https://seu-projeto-git-staging.vercel.app
```

### 6.2 Screenshots para Documentar
```
1. MongoDB Atlas → Dashboard (mostrando cluster)
2. MongoDB Atlas → Data API (mostrando endpoint)
3. MongoDB Atlas → Collections (mostrando dados)
4. Vercel → Deployments (mostrando deploy success)
5. Vercel → Environment Variables (sem mostrar valores!)
6. GitHub → Pull Request (staging → main)
7. Site funcionando (produção)
8. Console do navegador (sem erros)
```

---

## 🆘 Troubleshooting

### Função serverless não funciona
```bash
# Verifique estrutura de pastas:
api/
  mongo.js     # ✅ Correto
  
NÃO:
apis/mongo.js  # ❌ Errado
api/mongo/index.js  # ❌ Errado
```

### Vercel não detecta função serverless
```json
// Verifique vercel.json:
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ]
}
```

### Redeploy após mudar env vars
```
1. Vercel Dashboard → Deployments
2. ... (menu do último deploy)
3. Redeploy
4. Use existing Build Cache: ❌ (desmarque!)
```

---

## ✅ Deploy Completo!

Se você seguiu todos os passos:

🎉 **Seu projeto está em produção!**
🔐 **Com segurança (credenciais protegidas)**
🔄 **Com CI/CD (deploy automático)**
📊 **Com dados reais do MongoDB**

**Próximos passos:**
- Adicione mais features
- Crie testes automatizados
- Configure domínio customizado (opcional)
- Monitore performance

---

**Dúvidas?** Consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [GitHub Actions](https://docs.github.com/actions)

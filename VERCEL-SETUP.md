# 🎯 CONFIGURAÇÃO VERCEL - GUIA RÁPIDO

## ✅ CHECKLIST COMPLETO

Execute cada passo NA ORDEM e marque quando concluir:

---

## 📝 PASSO 1: Login/Cadastro na Vercel

### O que fazer:
1. ✅ Abra: https://vercel.com/login
2. ✅ Clique: **"Continue with GitHub"**
3. ✅ Autorize a Vercel (se pedir autorização)
4. ✅ Aguarde carregar o dashboard

### Como saber que deu certo:
- Você verá o dashboard da Vercel
- No canto superior direito, verá seu avatar do GitHub

---

## 📦 PASSO 2: Importar Projeto do GitHub

### O que fazer:
1. ✅ No dashboard da Vercel, clique: **"Add New..."** → **"Project"**
2. ✅ Encontre: `godoygodoygodoy/atividade-multidisciplinar`
3. ✅ Clique: **"Import"**

### Se não aparecer o repositório:
- Clique em: **"Adjust GitHub App Permissions"**
- Autorize acesso ao repositório `atividade-multidisciplinar`
- Volte e tente importar novamente

---

## ⚙️ PASSO 3: Configurar Projeto

### O que fazer:
1. ✅ **Project Name:** pode deixar o padrão
2. ✅ **Framework Preset:** selecione "Other"
3. ✅ **Root Directory:** deixe `./`
4. ✅ **Build Command:** deixe VAZIO (ou ignore)
5. ✅ **Output Directory:** deixe VAZIO (ou ignore)
6. ✅ **Install Command:** deixe VAZIO (ou ignore)

### ⚠️ NÃO CLIQUE EM DEPLOY AINDA!

---

## 🔐 PASSO 4: Environment Variables (CRUCIAL!)

### O que fazer:
1. ✅ Na tela de configuração, role até: **"Environment Variables"**
2. ✅ Clique em: **"Add"** (ou expanda a seção)

### Adicione 4 variáveis:

#### Variável 1:
- **Key:** `MONGODB_DATA_API_URL`
- **Value:** Sua URL do MongoDB (ex: https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1)
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variável 2:
- **Key:** `MONGODB_API_KEY`
- **Value:** Sua API Key do MongoDB
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variável 3:
- **Key:** `MONGODB_DATA_SOURCE`
- **Value:** `Cluster0`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### Variável 4:
- **Key:** `MONGODB_DATABASE`
- **Value:** `devops_projeto`
- **Environments:** ✅ Production ✅ Preview ✅ Development

---

## 🚀 PASSO 5: Deploy

### O que fazer:
1. ✅ Após adicionar as 4 variáveis, clique: **"Deploy"**
2. ✅ Aguarde 1-2 minutos (build + deploy)
3. ✅ Veja os logs em tempo real

### Como saber que deu certo:
- Verá: "Building..."
- Depois: "Deploying..."
- Por fim: "Your project has been deployed" 🎉

---

## 🧪 PASSO 6: Testar

### O que fazer:
1. ✅ Clique no botão: **"Visit"** ou no link gerado
2. ✅ Seu site abrirá: `https://atividade-multidisciplinar-xxx.vercel.app`
3. ✅ Abra o Console do navegador (F12 → Console)
4. ✅ Verifique se não há erros em vermelho

### Deve aparecer:
- Cards de restaurantes
- Cards de artistas
- No console: "✅ Dados recebidos da API"

---

## ❌ SE DER ERRO

### Erro: "Configuração incompleta"
**Causa:** Variáveis de ambiente faltando
**Solução:**
1. Vercel Dashboard → Seu Projeto
2. Settings → Environment Variables
3. Verifique se todas as 4 estão lá
4. Se faltar alguma, adicione
5. Deployments → ... → Redeploy

### Erro: "Authentication failed"
**Causa:** MONGODB_API_KEY incorreta
**Solução:**
1. Vá no MongoDB Atlas
2. Data API → Crie nova API Key
3. Copie a chave
4. Vercel → Settings → Environment Variables
5. Edite MONGODB_API_KEY
6. Redeploy

### Erro: Site mostra dados mock (falsos)
**Causa:** USE_MOCK_DATA ainda está true OU variáveis erradas
**Solução:**
1. Abra app.js localmente
2. Confirme: `const USE_MOCK_DATA = false;`
3. Se estiver true, mude para false
4. Commit e push
5. Vercel fará deploy automaticamente

### Dados não aparecem (banco vazio)
**Causa:** MongoDB não tem dados
**Solução:**
```bash
npm install
npm run populate
```

---

## 📊 PASSO 7: Configurar Branches (Opcional)

### Para ter ambiente de staging:

1. ✅ Localmente, crie branch staging:
```bash
git checkout -b staging
git push origin staging
```

2. ✅ Na Vercel, todo push na staging criará um preview automaticamente
3. ✅ URL do preview: `https://atividade-multidisciplinar-git-staging-xxx.vercel.app`

---

## 🎯 LINKS FINAIS

Após deploy bem-sucedido, você terá:

- **Production:** https://atividade-multidisciplinar-xxx.vercel.app
- **Dashboard Vercel:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/godoygodoygodoy/atividade-multidisciplinar

---

## 💡 DICAS

1. **Cada push na main** = deploy automático em produção
2. **Cada push na staging** = preview deploy (teste antes de produção)
3. **Ver logs:** Vercel → Deployments → [último deploy] → View Function Logs
4. **Redeploy:** Deployments → ... → Redeploy (quando mudar env vars)

---

## 🆘 PRECISA DE AJUDA?

Me avise em qual passo você está e qual erro apareceu!

Posso:
- ✅ Verificar seu código
- ✅ Debugar erros
- ✅ Ajustar configurações
- ✅ Criar novos arquivos se necessário

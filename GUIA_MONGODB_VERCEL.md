# 🚀 GUIA COMPLETO: MONGODB + VERCEL

## 📋 VISÃO GERAL

Este guia te levará do zero ao deploy completo com:
- ✅ Login funcional (localStorage)
- ✅ MongoDB Atlas configurado
- ✅ Vercel com deploy automático
- ✅ Environment Variables seguras

---

## 🗄️ PARTE 1: CONFIGURAR MONGODB ATLAS

### Passo 1: Criar Conta no MongoDB Atlas

1. Acesse: **https://www.mongodb.com/cloud/atlas**
2. Clique em **"Try Free"**
3. Faça login com Google ou GitHub (mais rápido)

### Passo 2: Criar Cluster Gratuito

1. Após login, clique em **"Build a Database"**
2. Escolha: **Shared** (Free tier - M0)
3. Configurações:
   - **Provider**: AWS
   - **Region**: São Paulo (sa-east-1) ou mais próxima
   - **Cluster Name**: `Cluster0` (deixe padrão)
4. Clique em **"Create"**
5. Aguarde 3-5 minutos para provisionar

### Passo 3: Configurar Segurança - Usuário do Banco

1. Você verá uma tela: **"Security Quickstart"**
2. **Authentication Method**: Username and Password
3. Configure:
   - **Username**: `devops_user`
   - **Password**: (clique em "Autogenerate Secure Password" e SALVE!)
   - **Database User Privileges**: `Atlas admin` (ou `Read and write to any database`)
4. Clique em **"Create User"**

### Passo 4: Configurar Segurança - Acesso de Rede

1. Na mesma tela, seção **"Where would you like to connect from?"**
2. Clique em **"Add My Current IP Address"**
3. **IMPORTANTE**: Adicione também acesso global:
   - Clique em **"Add IP Address"**
   - Digite: `0.0.0.0/0`
   - Description: `Permite acesso da Vercel`
   - Clique em **"Add Entry"**

> ⚠️ **Por que 0.0.0.0/0?** A Vercel usa IPs dinâmicos, então precisamos permitir todos os IPs. Em produção real, você limitaria aos IPs da Vercel.

4. Clique em **"Finish and Close"**

### Passo 5: Habilitar Data API

1. No menu esquerdo, clique em **"Data API"** (ou **"App Services"**)
2. Clique em **"Create a New App"** ou **"Build your own App"**
3. Configure:
   - **App Name**: `devops-api`
   - **Link to Cluster**: Selecione `Cluster0`
4. Clique em **"Create App Service"**
5. Aguarde alguns segundos

### Passo 6: Habilitar Data API Endpoint

1. No menu esquerdo da sua App, clique em **"HTTPS Endpoints"**
2. Clique em **"Data API"**
3. Ative o toggle **"Enable Data API"**
4. Você verá:
   - **URL Endpoint**: `https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1`
   - Copie e salve esta URL!

### Passo 7: Criar API Key

1. Ainda na página Data API, procure **"API Keys"**
2. Clique em **"Create API Key"**
3. Configure:
   - **Name**: `vercel-key`
   - **Permissions**: `Read and Write`
4. Clique em **"Generate Key"**
5. **COPIE A CHAVE** que aparecerá (ela não será mostrada novamente!)

### Passo 8: Criar Database e Collections

1. No menu esquerdo principal, clique em **"Database"** (ícone de cilindro)
2. Clique em **"Browse Collections"**
3. Clique em **"Add My Own Data"**
4. Configure:
   - **Database name**: `devops_projeto`
   - **Collection name**: `restaurantes`
5. Clique em **"Create"**

6. Repita para criar mais uma collection:
   - Clique no botão **"+" ao lado de devops_projeto**
   - **Collection name**: `artistas`
   - Clique em **"Create"**

### Passo 9: Inserir Dados de Exemplo

1. Clique na collection **`restaurantes`**
2. Clique em **"INSERT DOCUMENT"**
3. Cole este JSON:

```json
{
  "nome": "Burger King",
  "especialidade": "Fast Food",
  "avaliacao": 4,
  "preco": 2,
  "pratos": [
    {
      "nome": "Whopper Rodeio",
      "descricao": "Hambúrguer com carne grelhada, queijo, cebola crispy e molho barbecue",
      "valor": 28.90,
      "link": "https://www.burgerking.com.br/cardapio/whopper-rodeio"
    },
    {
      "nome": "Whopper",
      "descricao": "Hambúrguer com carne grelhada, queijo, alface, tomate e maionese",
      "valor": 24.90,
      "link": "https://www.burgerking.com.br/cardapio/whopper"
    },
    {
      "nome": "Big King",
      "descricao": "Dois hambúrgueres, queijo, alface e molho especial",
      "valor": 26.90,
      "link": "https://www.burgerking.com.br/cardapio/big-king"
    }
  ]
}
```

4. Clique em **"Insert"**

5. Repita para collection **`artistas`**:

```json
{
  "nome": "VMZ",
  "genero": "Trap/Rap",
  "popularidade": 92,
  "musicas": [
    {
      "titulo": "Segunda",
      "duracao": "2:33",
      "album": "Segunda",
      "link": "https://youtu.be/PWM3CUk4pW0?si=h19e0kJsccKSrpbg"
    },
    {
      "titulo": "Redento",
      "duracao": "2:45",
      "album": "Redento",
      "link": "https://youtu.be/34f8vcnr-Kc?si=xbuLv6_lozpwfBpi"
    },
    {
      "titulo": "Sonhos Irreais",
      "duracao": "3:12",
      "album": "Sonhos Irreais",
      "link": "https://youtu.be/gfFqxuD1d5Q?si=Y_F-43da1FiZ-rKY"
    }
  ]
}
```

6. Insira mais um artista:

```json
{
  "nome": "BoyWithUke",
  "genero": "Indie Pop/Alternative",
  "popularidade": 89,
  "musicas": [
    {
      "titulo": "Ghost",
      "duracao": "2:33",
      "album": "Serotonin Dreams",
      "link": "https://youtu.be/DevwFKEFrfo?si=OX41BLRaDIlDBVL2"
    },
    {
      "titulo": "Corduroy",
      "duracao": "2:48",
      "album": "Lucid Dreams",
      "link": "https://youtu.be/VvnnQ7csmC8?si=uQ_yncSzwR10z-xw"
    },
    {
      "titulo": "Petrichor (interlude)",
      "duracao": "1:45",
      "album": "Lucid Dreams",
      "link": "https://youtu.be/NlGpRGRUUhY?si=Z3VEV0P0RJIHVDUg"
    }
  ]
}
```

---

## 📝 PARTE 2: CONFIGURAR .ENV LOCAL

### Passo 1: Criar arquivo .env

1. No seu projeto, crie um arquivo chamado `.env` (sem extensão)
2. Cole estas variáveis (com SEUS valores do MongoDB):

```env
API_URL=https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1
API_KEY=sua-chave-api-aqui
NODE_ENV=development
```

**Onde pegar os valores:**
- `API_URL`: Copiado no Passo 6 do MongoDB
- `API_KEY`: Copiado no Passo 7 do MongoDB

### Passo 2: Verificar .gitignore

Certifique-se que `.env` está no `.gitignore`:

```
.env
.env.local
node_modules/
.vercel
```

### Passo 3: Mudar app.js para usar API

No arquivo `app.js`, mude esta linha:

```javascript
// De:
const USE_MOCK_DATA = true;

// Para:
const USE_MOCK_DATA = false; // Agora usa MongoDB!
```

---

## 🚀 PARTE 3: DEPLOY NA VERCEL

### Passo 1: Criar Conta na Vercel

1. Acesse: **https://vercel.com**
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize a Vercel no GitHub

### Passo 2: Importar Repositório

1. No dashboard da Vercel, clique em **"Add New"** → **"Project"**
2. Você verá seus repositórios do GitHub
3. Procure por: `atividade-multidisciplinar`
4. Clique em **"Import"**

### Passo 3: Configurar Projeto

1. **Project Name**: deixe o padrão ou mude
2. **Framework Preset**: `Other` (ou deixe auto-detectar)
3. **Root Directory**: `./` (padrão)
4. **Build Command**: deixe vazio
5. **Output Directory**: deixe vazio

### Passo 4: Configurar Environment Variables (MAIS IMPORTANTE!)

1. Expanda a seção **"Environment Variables"**
2. Adicione:

| Name | Value | Environments |
|------|-------|--------------|
| `API_URL` | (cole sua URL do MongoDB) | ✅ Production ✅ Preview ✅ Development |
| `API_KEY` | (cole sua chave do MongoDB) | ✅ Production ✅ Preview ✅ Development |

3. Clique em **"Add"** após cada variável

### Passo 5: Deploy!

1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. Você verá: **"🎉 Congratulations!"**
4. Clique em **"Visit"** para ver seu site no ar!

### Passo 6: Configurar Branches

1. No dashboard do projeto, vá em **"Settings"**
2. Clique em **"Git"**
3. Verifique:
   - **Production Branch**: `main`
   - Preview Branches: Todas (staging incluída)

Agora:
- **Push na `staging`** → Cria deploy de preview automaticamente
- **Merge na `main`** → Deploya em produção automaticamente

---

## 🔄 PARTE 4: FLUXO CI/CD AUTOMÁTICO

### O que acontece agora:

#### 1. Você faz mudanças localmente

```powershell
# Trabalha na staging
git checkout staging
# Faz mudanças em arquivos
git add .
git commit -m "feat: Nova funcionalidade"
git push origin staging
```

#### 2. Vercel detecta automaticamente

- Vercel recebe webhook do GitHub
- Inicia build automático
- Usa environment variables de **Preview**
- Gera URL: `seu-projeto-git-staging.vercel.app`
- Notifica você por email

#### 3. Você testa o preview

- Acessa a URL de preview
- Testa todas funcionalidades
- Verifica se MongoDB está conectando

#### 4. Se estiver OK, abre Pull Request

```
GitHub → Pull Requests → New PR
Base: main ← Compare: staging
```

#### 5. Após aprovar, faz merge

- No GitHub, clique em "Merge Pull Request"

#### 6. Vercel deploya em produção automaticamente

- Detecta merge na `main`
- Inicia production build
- Usa environment variables de **Production**
- Deploya em: `seu-projeto.vercel.app`
- Usuários veem nova versão instantaneamente!

---

## 🧪 PARTE 5: TESTAR TUDO

### Teste Local (com MongoDB)

1. Certifique-se que `.env` está criado
2. Mude `USE_MOCK_DATA = false` no `app.js`
3. Abra `login.html` no navegador
4. Faça login com:
   - Nome: Seu Nome
   - Email: seuemail@teste.com
   - Senha: 123456
5. Você será redirecionado para `index.html`
6. Deve ver dados do **MongoDB** (não os dados fake!)

### Teste na Vercel (Preview)

1. Acesse a URL de preview que a Vercel gerou
2. Faça login
3. Verifique se dados do MongoDB aparecem

### Teste em Produção

1. Acesse `seu-projeto.vercel.app`
2. Faça login
3. Tudo funcionando!

---

## ⚠️ TROUBLESHOOTING

### Erro: "API_URL is not defined"

**Problema**: Environment Variables não configuradas na Vercel

**Solução**:
1. Vercel Dashboard → Seu projeto → Settings
2. Environment Variables
3. Adicione `API_URL` e `API_KEY`
4. Redeploy: Deployments → ⋯ → Redeploy

### Erro: "Network request failed"

**Problema**: IP não liberado no MongoDB Atlas

**Solução**:
1. MongoDB Atlas → Network Access
2. Adicione `0.0.0.0/0`

### Erro: "Authentication failed"

**Problema**: API Key incorreta

**Solução**:
1. Verifique se `API_KEY` no .env é a mesma do MongoDB
2. Gere nova API Key se necessário
3. Atualize na Vercel

### Site mostra dados mock (fake)

**Problema**: `USE_MOCK_DATA` ainda está `true`

**Solução**:
1. Abra `app.js`
2. Mude para: `const USE_MOCK_DATA = false;`
3. Commit e push

---

## 📦 CHECKLIST FINAL

### MongoDB Atlas
- [ ] Conta criada
- [ ] Cluster provisionado
- [ ] Usuário criado
- [ ] IP 0.0.0.0/0 liberado
- [ ] Data API habilitada
- [ ] API Key gerada
- [ ] Database `devops_projeto` criada
- [ ] Collections `restaurantes` e `artistas` criadas
- [ ] Dados de exemplo inseridos

### Projeto Local
- [ ] Arquivo `.env` criado
- [ ] `API_URL` e `API_KEY` configuradas
- [ ] `.env` está no `.gitignore`
- [ ] `USE_MOCK_DATA = false` no app.js
- [ ] Testado localmente com MongoDB
- [ ] Sistema de login funcionando

### Vercel
- [ ] Conta criada
- [ ] Repositório importado
- [ ] Environment Variables configuradas
- [ ] Deploy de staging funcionando
- [ ] Deploy de produção funcionando
- [ ] Login funciona no preview
- [ ] Dados do MongoDB aparecem

### Git/GitHub
- [ ] Branch staging atualizada
- [ ] Pull Request criado
- [ ] Merge realizado
- [ ] Vercel deploou automaticamente

---

## 🎉 PRONTO!

Agora você tem:
- ✅ Sistema de login completo
- ✅ MongoDB Atlas conectado
- ✅ Vercel com CI/CD automático
- ✅ Staging e Production separados
- ✅ Environment Variables seguras

**Links importantes:**
- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard
- Seu Projeto: `https://seu-projeto.vercel.app`

**Próximo passo**: Testar tudo e apresentar para o professor! 🚀

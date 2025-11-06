# 🚀 Projeto DevOps - Ciclo Completo de Desenvolvimento

## 📋 Visão Geral

Este projeto demonstra um **ciclo completo de DevOps**, desde o planejamento até o deploy em produção, utilizando:

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **POO**: Classes JavaScript (Restaurante, Prato, Artista, Música)
- **Banco de Dados**: MongoDB Atlas (Data API)
- **Segurança**: Variáveis de ambiente (.env)
- **Versionamento**: Git Flow (main + staging)
- **CI/CD**: GitHub + Vercel (Deploy Automatizado)

---

## 🎯 Objetivos Pedagógicos

### Disciplinas Abordadas:
1. **Desenvolvimento Web**: HTML/CSS/JS moderno
2. **POO**: 4 pilares (Encapsulamento, Abstração, Herança, Polimorfismo)
3. **Banco de Dados**: MongoDB, NoSQL, API REST
4. **Engenharia de Software**: Git Flow, Issues, Pull Requests, CI/CD

### Foco:
- Entender **processos profissionais** de desenvolvimento
- Usar IA (GitHub Copilot) para **gerar código** e **explicar conceitos**
- Dominar **DevOps** (Issues, Branches, Deploy)

---

## 📁 Estrutura do Projeto

```
atividade/
├── index.html          # Estrutura da página principal
├── style.css           # Estilos (gradiente, cards, responsivo)
├── app.js              # Lógica POO + Integração API
├── login.html          # Página de autenticação
├── login.css           # Estilos da página de login
├── login.js            # Lógica de autenticação
├── admin.html          # Painel administrativo (NOVO!)
├── admin.css           # Estilos do painel admin (NOVO!)
├── admin.js            # Lógica do painel admin (NOVO!)
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore          # Arquivos que o Git deve ignorar
├── README.md           # Este arquivo
├── CONCEITOS.md        # Explicação detalhada para prova
├── GUIA_MONGODB_VERCEL.md  # Tutorial completo de deploy
└── INSTRUCOES_GITHUB.md    # Como usar o GitHub
```

---

## 🔐 Sistema de Autenticação

### Login de Usuário Normal
- Acesse `login.html`
- Preencha: nome, email e senha (mínimo 6 caracteres)
- Será redirecionado para `index.html`
- Todos os usuários são rastreados automaticamente

### Login de Administrador
**Credenciais Especiais:**
- **Email**: `dann.adm`
- **Senha**: `gI.adm.dA`

Ao usar essas credenciais, você será redirecionado para o **Painel Administrativo** com acesso total ao sistema.

---

## 👑 Painel Administrativo

### Funcionalidades:

#### 📊 Dashboard Principal
- **Total de Usuários**: Quantidade total de usuários cadastrados
- **Usuários Online**: Usuários ativos no momento
- **Novos Hoje**: Cadastros realizados no dia atual
- **Total de Restaurantes**: Quantidade de restaurantes no sistema

#### 📈 Gráficos Interativos (Chart.js)
1. **Crescimento de Usuários**: Linha temporal mostrando evolução mensal
2. **Horários de Acesso**: Distribuição de acessos por período do dia
3. **Restaurantes Populares**: Pizza/rosca mostrando preferências
4. **Músicas Mais Ouvidas**: Ranking das músicas favoritas
5. **Dispositivos**: Distribuição entre Desktop/Mobile/Tablet
6. **Visitas Diárias**: Acompanhamento semanal de visitas
7. **Taxa de Conversão**: Métricas de conversão ao longo do tempo

#### 👥 Gerenciamento de Usuários
- **Visualizar** todos os usuários cadastrados
- **Buscar** por nome ou email em tempo real
- **Editar** informações de usuários
- **Excluir** usuários do sistema
- **Exportar** dados para CSV
- Ver **status** (online/offline)
- Ver **tipo** (admin/usuário)
- Ver **último acesso**

#### 🎵 Analytics
- Análise de músicas mais ouvidas
- Tendências de acesso
- Métricas de engajamento

#### 🍔 Gerenciamento de Restaurantes
- Adicionar novos restaurantes
- Editar informações existentes
- Remover restaurantes

#### ⚙️ Configurações
- **Segurança**: Autenticação 2FA, senha forte, notificações de login
- **Banco de Dados**: Configurar host e porta do MongoDB
- **Notificações**: Email para novos usuários, atividades, push notifications
- **Manutenção**: Limpar cache, fazer backup

### Navegação do Admin:
- **Dashboard**: Visão geral com estatísticas
- **Usuários**: Gerenciamento completo
- **Analytics**: Gráficos e métricas detalhadas
- **Restaurantes**: CRUD de restaurantes
- **Músicas**: CRUD de músicas
- **Configurações**: Ajustes do sistema

### Botões de Ação:
- **Voltar**: Retorna para `index.html` (página principal)
- **Logout**: Sai do painel administrativo

---

## 📁 Estrutura do Projeto
```

---

## 🔧 Instalação Local

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configure Variáveis de Ambiente
```bash
# Copie o exemplo
cp .env.example .env

# Edite .env com suas credenciais do MongoDB
# (Veja seção "Configurar MongoDB Atlas" abaixo)
```

### 3. Abra no Navegador
```bash
# Opção 1: Abra index.html diretamente

# Opção 2: Use um servidor local (recomendado)
# Com Python 3:
python -m http.server 8000

# Com Node.js:
npx serve

# Com VS Code:
# Instale extensão "Live Server" e clique em "Go Live"
```

### 4. Acesse
```
http://localhost:8000
```

---

## 🗄️ Configurar MongoDB Atlas

### Passo 1: Criar Conta
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Clique em **"Try Free"**
3. Crie conta com Google/GitHub

### Passo 2: Criar Cluster
1. Escolha: **FREE Tier (M0)**
2. Provider: **AWS**
3. Region: **São Paulo (sa-east-1)**
4. Cluster Name: **Cluster0**

### Passo 3: Configurar Segurança

**Database Access:**
1. Database Access → Add New User
2. Username: `devops_user`
3. Password: (gere uma senha forte)
4. Role: **Read and Write to any database**

**Network Access:**
1. Network Access → Add IP Address
2. **IMPORTANTE**: `0.0.0.0/0` (permite todos IPs)
3. Justificativa: Vercel usa IPs dinâmicos

### Passo 4: Habilitar Data API
1. Aba: **Data API**
2. Clique: **Enable Data API**
3. Copie: **URL Endpoint**
4. Crie: **API Key**
5. Cole no arquivo `.env`

### Passo 5: Criar Database e Collections
1. Browse Collections → **Add My Own Data**
2. Database name: `devops_projeto`
3. Collections:
   - `restaurantes`
   - `artistas`

### Passo 6: Inserir Dados de Exemplo

**Collection: restaurantes**
```json
{
  "nome": "La Bella Pasta",
  "especialidade": "Italiana",
  "avaliacao": 5,
  "preco": 3,
  "pratos": [
    {
      "nome": "Carbonara",
      "descricao": "Massa com bacon, ovos e parmesão",
      "valor": 45.90
    },
    {
      "nome": "Margherita",
      "descricao": "Pizza napolitana com manjericão",
      "valor": 38.00
    }
  ]
}
```

**Collection: artistas**
```json
{
  "nome": "VMZ",
  "genero": "Trap/Rap",
  "popularidade": 92,
  "musicas": [
    {
      "titulo": "Segunda",
      "duracao": "2:33",
      "album": "Segunda"
    },
    {
      "titulo": "Redento",
      "duracao": "2:45",
      "album": "Redento"
    },
    {
      "titulo": "Sonhos Irreais",
      "duracao": "3:12",
      "album": "Sonhos Irreais"
    }
  ]
}
```

---

## 🌿 Git Flow - Branches

### Estrutura de Branches

```
main (Produção - NUNCA commitar direto aqui!)
  ↑
  | merge via Pull Request
  |
staging (Homologação - Todo trabalho começa aqui)
```

### Fluxo de Trabalho

1. **Criar branch staging:**
```bash
git checkout -b staging
```

2. **Fazer alterações e commitar:**
```bash
git add .
git commit -m "feat: Adiciona classes POO"
git push origin staging
```

3. **Criar Pull Request:**
   - No GitHub: `staging` → `main`
   - Descreva as mudanças
   - **NÃO faça merge ainda** (só após revisar)

4. **Testar em Staging (Vercel cria automaticamente)**

5. **Merge para Produção:**
   - Após testes, faça merge do PR
   - Vercel deploya automaticamente na main

---

## 🚀 Deploy na Vercel

### Passo 1: Criar Conta
1. Acesse: https://vercel.com
2. Login com **GitHub**

### Passo 2: Importar Repositório
1. Clique: **Add New** → **Project**
2. Selecione seu repositório
3. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)

### Passo 3: Configurar Environment Variables
1. Settings → **Environment Variables**
2. Adicione:

| Name | Value | Environments |
|------|-------|--------------|
| `API_URL` | (URL do MongoDB) | ✅ Production ✅ Preview |
| `API_KEY` | (Chave do MongoDB) | ✅ Production ✅ Preview |

### Passo 4: Deploy
1. Clique em **Deploy**
2. Aguarde (1-2 minutos)
3. Vercel gerará:
   - **Production**: `seu-projeto.vercel.app` (branch main)
   - **Preview**: `seu-projeto-git-staging.vercel.app` (branch staging)

### Passo 5: Automatização (CI/CD)
A partir de agora:
- **Push na staging** → Vercel cria Preview Deploy automaticamente
- **Merge na main** → Vercel deploya em Produção automaticamente

---

## 📚 Conceitos POO Implementados

### 1. Encapsulamento
Dados e métodos agrupados em classes:
```javascript
class Restaurante {
    constructor(nome, especialidade, avaliacao, preco) {
        this.nome = nome;
        // ... dados encapsulados
    }
    
    render() {
        // ... método encapsulado
    }
}
```

### 2. Abstração
Esconder complexidade, expor funcionalidades simples:
```javascript
// O usuário só precisa saber que .render() existe
const resto = new Restaurante(...);
resto.render(); // Não precisa saber como funciona internamente
```

### 3. Polimorfismo
Mesma interface, comportamento diferente:
```javascript
restaurante.render(); // Retorna HTML de restaurante
artista.render();     // Retorna HTML de artista
// Ambos têm render(), mas fazem coisas diferentes
```

### 4. Composição (Favor over Inheritance)
Objetos contêm outros objetos:
```javascript
class Restaurante {
    constructor() {
        this.pratos = []; // Restaurante "TEM" pratos
    }
}
```

---

## 🔒 Segurança - .env e .gitignore

### Por que usar .env?

1. **Segurança**: Chaves não ficam expostas no código
2. **Flexibilidade**: Diferentes ambientes (dev, staging, prod)
3. **Compartilhamento**: Código pode ser público, credenciais não

### Fluxo Correto:

```
Desenvolvimento Local:
.env (local) → Carrega variáveis → app.js usa process.env

GitHub:
.gitignore bloqueia .env → Código sobe SEM credenciais

Vercel (Produção):
Environment Variables no dashboard → Vercel injeta no build
```

### O que aconteceria sem .gitignore?

⚠️ **PERIGO**: Se você commitar .env:
1. **Hackers** escaneiam GitHub com bots 24/7
2. Suas chaves são **roubadas em segundos**
3. Podem **apagar seu banco de dados**
4. Podem **gerar custos** de milhares de dólares
5. **LGPD/GDPR**: Multas por expor credenciais

---

## 📝 Issues e Gerenciamento

### Criar Issues no GitHub:

**Issue #1: Criar estrutura HTML/CSS base**
```markdown
**Descrição**: Criar index.html e style.css com layout responsivo

**Tarefas**:
- [ ] Header com título
- [ ] Seções para restaurantes e músicas
- [ ] Cards com hover effect
- [ ] Responsividade mobile

**Labels**: frontend, enhancement
```

**Issue #2: Modelar classes POO**
```markdown
**Descrição**: Implementar classes Restaurante, Prato, Artista, Música

**Tarefas**:
- [ ] Constructor de cada classe
- [ ] Métodos render()
- [ ] Métodos fromJSON()
- [ ] Documentar com comentários Copilot

**Labels**: backend, POO
```

**Issue #3: Configurar MongoDB Atlas**
```markdown
**Descrição**: Setup completo do banco de dados

**Tarefas**:
- [ ] Criar cluster
- [ ] Configurar usuário e IP
- [ ] Habilitar Data API
- [ ] Inserir dados de exemplo

**Labels**: database, setup
```

---

## 🧪 Testes e Validação

### Checklist antes do Merge:

- [ ] Código funciona localmente com dados mock
- [ ] Código funciona localmente com MongoDB
- [ ] Deploy staging funcionando na Vercel
- [ ] Todas as Issues foram fechadas
- [ ] Pull Request tem descrição clara
- [ ] Código tem comentários explicativos
- [ ] README atualizado

---

## 📖 Para Estudar para a Prova

### Tópicos Essenciais:

1. **Git Flow**:
   - Diferença entre `main` e `staging`
   - O que é Pull Request
   - Por que não commitamos direto na main

2. **POO**:
   - O que é classe, constructor, this
   - 4 pilares: Encapsulamento, Abstração, Herança, Polimorfismo
   - Composição vs Herança

3. **Segurança**:
   - Por que usar .env
   - O que é .gitignore
   - Environment Variables na Vercel

4. **DevOps/CI/CD**:
   - O que acontece quando faço push na staging
   - O que acontece quando faço merge na main
   - Como a Vercel automatiza o deploy

5. **Banco de Dados**:
   - MongoDB Atlas (Cloud)
   - Data API vs SDK
   - JSON vs Objetos JavaScript

---

## 🤖 Prompt Final para o Copilot (Prova)

```
Atue como um Engenheiro DevOps Sênior. Meu professor pediu para eu 
explicar o fluxo de deploy que fiz. Meu projeto (HTML/JS/CSS + MongoDB 
Data API) está no GitHub com uma branch 'main' (produção) e 'staging' 
(homologação), e fiz o deploy na Vercel. Me explique em detalhes:

1. Qual a diferença entre a branch 'staging' e a 'main'? 
   Por que não trabalhamos direto na 'main'?

2. O que é um Pull Request e por que o usamos antes de fazer o 'merge'?

3. O que são os arquivos .env e .gitignore? 
   Qual a relação entre eles e segurança?

4. O que são 'Environment Variables' (Secrets) na Vercel? 
   Por que elas são necessárias se já tenho o .env?

5. O que a Vercel faz quando eu dou 'push' na 'staging' vs. quando eu 
   faço 'merge' na 'main'? (Explique o que é CI/CD nesse contexto).
```

---

## 📦 Entregáveis Finais

Para o professor:

1. ✅ **Documento de Pesquisa** (PDF com conceitos teóricos)
2. ✅ **Link do GitHub** (repositório público)
3. ✅ **Link de Produção** (Vercel - main)
4. ✅ **Link de Staging** (Vercel - staging)
5. ✅ **Resposta do Copilot** (prompt final explicado)
6. ✅ **Screenshots** (Issues, PRs, Vercel Dashboard)

---

## 🆘 Problemas Comuns

### Erro: "API_URL is not defined"
**Solução**: Configure Environment Variables na Vercel

### Erro: "Network request failed"
**Solução**: Verifique se liberou IP 0.0.0.0/0 no MongoDB Atlas

### Erro: "Authentication failed"
**Solução**: Verifique se API_KEY está correta no .env e na Vercel

### Site não atualiza após deploy
**Solução**: Limpe cache do navegador (Ctrl+Shift+R)

---

## 📞 Recursos

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Vercel**: https://vercel.com
- **Git Docs**: https://git-scm.com/doc
- **MDN Web Docs**: https://developer.mozilla.org

---

## 👨‍💻 Autor

**Seu Nome**  
GitHub: [@seu-usuario](https://github.com/seu-usuario)  
Email: seu.email@exemplo.com

---

## 📄 Licença

Este projeto é educacional e de código aberto.

---

**Boa sorte na prova! 🚀**

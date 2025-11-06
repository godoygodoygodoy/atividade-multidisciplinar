# 📚 CONCEITOS FUNDAMENTAIS PARA A PROVA

Este documento contém **todas as explicações teóricas** necessárias para a prova. Leia com atenção!

---

## 🎯 PARTE 1: GIT FLOW E BRANCHES

### 1.1 Qual a diferença entre 'staging' e 'main'?

**Branch MAIN (Produção):**
- É a branch **principal** do projeto
- Contém código **100% funcional e testado**
- É o que está **no ar** para usuários reais
- **NUNCA** deve receber commits diretos
- Só recebe código via **Pull Request** após aprovação

**Branch STAGING (Homologação):**
- É o ambiente de **testes**
- Onde desenvolvemos novos recursos
- Onde fazemos **experimentos** sem risco
- Pode ter bugs temporários (não afeta produção)
- É um "rascunho" antes do código ir para main

**Analogia:**
```
STAGING = Rascunho de redação (pode errar, apagar, reescrever)
MAIN = Redação passada a limpo (versão final, sem erros)
```

### 1.2 Por que NÃO trabalhamos direto na main?

**Motivos Técnicos:**
1. **Segurança**: Um bug na main derruba o site para TODOS os usuários
2. **Reversão**: Se algo der errado, é difícil voltar atrás
3. **Colaboração**: Vários devs trabalhando na main = conflitos constantes
4. **Qualidade**: Sem revisão de código antes do deploy

**Fluxo Profissional Correto:**
```
Developer → Trabalha na staging
         → Testa localmente
         → Push staging
         → Vercel cria Preview Deploy
         → Testa no Preview
         → Abre Pull Request
         → Líder revisa código
         → Aprovado? Merge na main
         → Vercel deploya automaticamente em produção
```

**Analogia do Mundo Real:**
- Você não construiria um prédio diretamente onde pessoas moram
- Primeiro faz maquete → protótipo → testes → SÓ DEPOIS constrói

---

## 🔀 PARTE 2: PULL REQUESTS (PRs)

### 2.1 O que é um Pull Request?

Um Pull Request é uma **solicitação formal** para mesclar (merge) código de uma branch para outra.

**Componentes de um PR:**
```markdown
Título: feat: Adiciona sistema de login

Descrição:
- Implementa autenticação JWT
- Adiciona página de login
- Protege rotas privadas

Issues Relacionadas: #12, #15

Checklist:
- [x] Código testado localmente
- [x] Sem erros no console
- [x] Documentação atualizada
```

### 2.2 Por que usar Pull Request antes do Merge?

**Motivos:**

1. **REVISÃO DE CÓDIGO (Code Review)**
   - Outro desenvolvedor analisa seu código
   - Encontra bugs que você não viu
   - Sugere melhorias de performance
   - Garante padrões de código

2. **DISCUSSÃO**
   - Time debate soluções
   - Compartilha conhecimento
   - Documenta decisões técnicas

3. **HISTÓRICO**
   - Fica registrado o que mudou e por quê
   - Facilita debug futuro
   - Compliance e auditoria

4. **PROTEÇÃO**
   - Branch main fica "protegida"
   - Ninguém pode fazer merge sem aprovação
   - Previne acidentes

**Exemplo de Revisão:**
```
Revisor: "Este método está fazendo 3 coisas diferentes. 
          Poderia separar em funções menores?"

Desenvolvedor: "Boa! Vou refatorar."

[Desenvolvedor atualiza o código]

Revisor: "Agora sim! Aprovado ✅"

[Merge realizado]
```

### 2.3 Fluxo Completo de um PR

```
1. Developer faz commits na staging
   git add .
   git commit -m "feat: Nova funcionalidade"
   git push origin staging

2. No GitHub, abre PR: staging → main
   - Escreve descrição detalhada
   - Marca revisores

3. CI/CD roda testes automaticamente
   - Vercel cria Preview Deploy
   - Testes unitários rodam
   - Linter verifica código

4. Revisor analisa
   - Lê o código linha por linha
   - Testa o Preview Deploy
   - Aprova OU solicita mudanças

5. Developer corrige (se necessário)
   - Faz novos commits
   - PR é atualizado automaticamente

6. Aprovado? Merge!
   - Código vai para main
   - Vercel deploya em produção
   - PR é fechado automaticamente
```

---

## 🔒 PARTE 3: SEGURANÇA (.env e .gitignore)

### 3.1 O que é o arquivo .env?

**Definição:**
`.env` é um arquivo que armazena **variáveis de ambiente** (configurações sensíveis).

**Exemplo:**
```env
API_URL=https://api.mongodb.com/endpoint
API_KEY=abc123xyz789-chave-secreta
DATABASE_PASSWORD=SenhaF0rte!2024
JWT_SECRET=meu-token-super-secreto
```

**Por que existe?**
- **Separação**: Configuração separada do código
- **Segurança**: Chaves NÃO ficam no código-fonte
- **Flexibilidade**: Mesma codebase, configs diferentes

**Ambientes Diferentes:**
```
.env.local        → Desenvolvimento local
.env.staging      → Servidor de testes
.env.production   → Servidor de produção

Mesmo código, credenciais diferentes!
```

### 3.2 O que é o arquivo .gitignore?

**Definição:**
`.gitignore` diz ao Git quais arquivos **NÃO** deve rastrear/commitar.

**Exemplo:**
```gitignore
.env              # Credenciais
node_modules/     # Bibliotecas (muito grandes)
*.log             # Arquivos de log
.DS_Store         # Arquivo do macOS
```

**Como funciona:**
```
git add .

Git vê:
- index.html → ✅ Adiciona
- style.css  → ✅ Adiciona
- .env       → ❌ Ignora (está no .gitignore)
- app.js     → ✅ Adiciona
```

### 3.3 Relação entre .env e .gitignore (SEGURANÇA)

**Fluxo Correto:**

```
1. Você cria .env com suas chaves
   API_KEY=chave-secreta

2. Você adiciona .env no .gitignore
   # .gitignore
   .env

3. Você faz commit
   git add .
   git commit -m "feat: Adiciona funcionalidade"

4. Git ignora .env automaticamente
   ✅ index.html commitado
   ✅ app.js commitado
   ❌ .env NÃO commitado (protegido!)

5. Você sobe para o GitHub
   git push origin staging

6. Código público, chaves privadas!
```

### 3.4 O que aconteceria SEM .gitignore?

**CENÁRIO CATASTRÓFICO:**

```
Sem .gitignore:
Developer → Commita .env com chaves
         → Push para GitHub
         → Repositório público

[5 segundos depois]

Bot Hacker (automático) → Escaneia GitHub
                       → Encontra API_KEY
                       → Baixa sua chave

[10 minutos depois]

Hacker → Usa sua chave do MongoDB
      → DELETA todos os dados
      → OU rouba informações de clientes
      
[No dia seguinte]

Você → Recebe conta de $10.000 da AWS
    → Seu banco de dados está vazio
    → Clientes processam empresa
    → Você é demitido
```

**NÚMEROS REAIS:**
- GitHub escaneia 100 milhões de repos/dia
- Bots encontram chaves em **média de 4 segundos**
- 86% das empresas já sofreram vazamento de credenciais
- Custo médio: **$4.24 milhões** (IBM, 2023)

**CASOS FAMOSOS:**
1. **Uber (2016)**: Desenvolvedor commitou chaves da AWS
   - Hackers roubaram dados de 57 milhões de usuários
   - Multa: $148 milhões

2. **Toyota (2022)**: Chave commitada no GitHub
   - 296GB de código-fonte vazado
   - 5 anos de histórico exposto

### 3.5 Alternativas Seguras

**Nunca:**
```javascript
// ❌ ERRADO - Chave exposta no código
const API_KEY = 'abc123xyz';
```

**Sempre:**
```javascript
// ✅ CORRETO - Variável de ambiente
const API_KEY = process.env.API_KEY;
```

**Documentação Segura:**
```env
# .env.example (PODE commitar - sem valores reais)
API_URL=sua-url-aqui
API_KEY=sua-chave-aqui

# .env (NÃO commitar - valores reais)
API_URL=https://real-url.com
API_KEY=chave-real-secreta-123
```

---

## ☁️ PARTE 4: VERCEL E ENVIRONMENT VARIABLES

### 4.1 O que são Environment Variables na Vercel?

**Definição:**
São **variáveis de ambiente** configuradas diretamente no painel da Vercel (não no código).

**Onde configurar:**
```
Vercel Dashboard
→ Seu Projeto
→ Settings
→ Environment Variables

Name:  API_URL
Value: https://mongodb.com/endpoint
Environments: ✅ Production ✅ Preview
```

### 4.2 Por que são necessárias se já tenho .env?

**ENTENDA A DIFERENÇA:**

| Aspecto | .env (Local) | Vercel (Cloud) |
|---------|-------------|----------------|
| **Onde fica** | No SEU computador | Nos servidores da Vercel |
| **Quem usa** | Você (desenvolvimento) | Vercel (produção) |
| **Git rastreia** | ❌ NÃO (.gitignore) | N/A (não está no Git) |
| **Como acessa** | `process.env.API_KEY` | `process.env.API_KEY` |

**Fluxo Completo:**

```
DESENVOLVIMENTO LOCAL:
Seu PC → Lê .env → Carrega API_KEY → app.js funciona

GITHUB:
Seu PC → git push → Código sobe (SEM .env) → Repo público

VERCEL (PRODUÇÃO):
Vercel → Clona repo do GitHub
      → NÃO tem .env (foi ignorado!)
      → COMO VAI FUNCIONAR? 🤔
      
Solução:
Vercel → Lê Environment Variables configuradas no dashboard
      → Injeta no build: process.env.API_KEY = 'valor-real'
      → app.js funciona!
```

**Analogia:**
```
.env = Senhas anotadas no seu caderno pessoal
Vercel = Cofre da empresa com as mesmas senhas

Seu caderno não vai para o escritório (GitHub),
mas o cofre da empresa tem cópias seguras.
```

### 4.3 Como a Vercel Injeta as Variáveis?

**Durante o Build:**

```javascript
// Seu código (app.js)
const API_KEY = process.env.API_KEY;

// O que a Vercel faz no build:
const API_KEY = 'abc123xyz'; // Substitui pelo valor real

// Resultado final (bundle.js):
const API_KEY = 'abc123xyz'; // Usuários NÃO veem isso (código minificado)
```

**IMPORTANTE:**
- Variáveis ficam no **servidor** da Vercel
- Usuários finais **NÃO conseguem ver** (não vão para o navegador)
- Apenas código servidor-side (Node.js, API Routes) acessa

### 4.4 Configuração Avançada

**Variáveis por Ambiente:**

```
Production (main):
API_URL = https://api-producao.com
DATABASE = banco-real

Preview (staging):
API_URL = https://api-staging.com
DATABASE = banco-teste

Development (local):
API_URL = http://localhost:3000
DATABASE = banco-local
```

**Vantagens:**
- Mesma codebase
- Ambientes isolados
- Sem risco de afetar produção
- Fácil rollback

---

## 🚀 PARTE 5: CI/CD COM VERCEL

### 5.1 O que é CI/CD?

**CI = Continuous Integration (Integração Contínua)**
- Desenvolvedores integram código **frequentemente** (várias vezes ao dia)
- Cada integração é **testada automaticamente**
- Detecta bugs **rapidamente**

**CD = Continuous Deployment (Deploy Contínuo)**
- Código aprovado é **deployado automaticamente**
- Sem intervenção manual
- Usuários recebem atualizações **constantemente**

**Antes do CI/CD (Manual):**
```
Developer → Escreve código
         → Copia arquivos para servidor (FTP)
         → Testa em produção (!!)
         → Se der erro, todo mundo vê
         → Leva horas para corrigir
```

**Com CI/CD (Automatizado):**
```
Developer → git push staging
         → CI testa automaticamente
         → CD deploya em preview
         → Developer valida
         → git merge main
         → CD deploya em produção
         → 100% automático, 2 minutos
```

### 5.2 O que a Vercel faz quando você dá PUSH na STAGING?

**Passo a Passo:**

```
1. Você faz commit
   git add .
   git commit -m "feat: Nova funcionalidade"
   git push origin staging

2. GitHub recebe o push
   - Notifica a Vercel via Webhook

3. Vercel detecta mudança
   ✅ "Nova commit na staging detectada!"

4. Vercel inicia Build Automático
   - Clona código do GitHub
   - Instala dependências (npm install)
   - Executa build (se houver)
   - Injeta Environment Variables (Preview)
   - Gera bundle final

5. Vercel cria Preview Deployment
   - URL única: projeto-git-staging-abc123.vercel.app
   - Ambiente isolado (não afeta produção)
   - Notifica você via email/dashboard

6. Você acessa o Preview
   - Testa a funcionalidade
   - Valida mudanças
   - Se estiver OK, aprova PR

7. Se der erro?
   - Nenhum problema! É só preview
   - Produção continua funcionando
   - Você corrige e faz novo push
```

**LOGS DA VERCEL:**
```
✅ Build started
✅ Cloning repository
✅ Installing dependencies
✅ Building application
✅ Deploying to Preview
✅ Preview deployment ready!
   https://projeto-git-staging.vercel.app
```

### 5.3 O que a Vercel faz quando você faz MERGE na MAIN?

**Passo a Passo:**

```
1. Você faz merge do PR
   - No GitHub: staging → main
   - Clica "Merge Pull Request"

2. GitHub registra o merge
   - Branch main é atualizada
   - Notifica Vercel

3. Vercel detecta merge na MAIN
   🚨 "Mudança na branch de PRODUÇÃO detectada!"

4. Vercel inicia Production Build
   - MESMO processo do preview
   - MAS usa Environment Variables de PRODUÇÃO
   - Build otimizado (minificação, compressão)

5. Vercel deploya em Produção
   - URL principal: projeto.vercel.app
   - Substitui deploy antigo
   - Zero downtime (sem tirar site do ar)

6. Vercel notifica sucesso
   - Email: "Production deployment successful"
   - Dashboard atualizado
   - Logs disponíveis

7. Usuários acessam
   - Veem nova versão instantaneamente
   - Sem precisar limpar cache (Vercel gerencia)
```

**LOGS DA VERCEL:**
```
🚀 Production Build started
✅ Cloning repository (main branch)
✅ Installing dependencies
✅ Building application
✅ Optimizing assets
✅ Deploying to Production
✅ Production deployment live!
   https://projeto.vercel.app
```

### 5.4 Comparação: Push Staging vs Merge Main

| Aspecto | Push Staging | Merge Main |
|---------|-------------|------------|
| **Gatilho** | `git push origin staging` | Merge PR no GitHub |
| **URL** | `projeto-git-staging.vercel.app` | `projeto.vercel.app` |
| **Environment** | Preview | Production |
| **Variáveis** | Preview env vars | Production env vars |
| **Propósito** | Testar mudanças | Publicar para usuários |
| **Risco** | Zero (isolado) | Alto (produção) |
| **Notificação** | Email (se ativado) | Email sempre |
| **Rollback** | Não necessário | Fácil (deploy anterior) |

### 5.5 CI/CD na Prática - Exemplo Real

**Cenário: Adicionar novo restaurante**

```
DIA 1 - 14:00
Developer: git checkout -b staging
Developer: [Adiciona código do restaurante]
Developer: git commit -m "feat: Adiciona Pizzaria"
Developer: git push origin staging

→ Vercel: Preview deploy criado em 1 minuto
→ Developer: Acessa preview, testa, funciona!

DIA 1 - 14:30
Developer: Abre PR no GitHub (staging → main)
Developer: Escreve descrição, marca líder

DIA 1 - 15:00
Líder: Revisa código, testa preview
Líder: "Aprovado! ✅"
Líder: Faz merge do PR

→ Vercel: Detecta merge na main
→ Vercel: Production build iniciado
→ Vercel: Deploy completo em 1 minuto
→ Usuários: Veem nova pizzaria no site!

TOTAL: 1 hora do código à produção (com revisão!)
```

---

## 🗄️ PARTE 6: BANCO DE DADOS

### 6.1 MongoDB Atlas (Cloud Database)

**O que é:**
- Banco de dados NoSQL **hospedado na nuvem**
- Gerenciado pela MongoDB (você não cuida de servidores)
- Escalável automaticamente

**Vantagens:**
```
Tradicional (MySQL local):
- Instalar servidor MySQL
- Configurar segurança
- Fazer backups manualmente
- Gerenciar updates
- Escalar manualmente

MongoDB Atlas (Cloud):
- Criar conta
- Clicar "Create Cluster"
- ✅ PRONTO! Já tem banco funcionando
- Backups automáticos
- Escala com 1 clique
```

### 6.2 Data API vs SDK

**SDK (Software Development Kit):**
```javascript
// Requer MongoDB Driver instalado
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
await client.connect();
const db = client.db('devops_projeto');
const restaurantes = await db.collection('restaurantes').find();
```

**Data API (HTTP REST):**
```javascript
// Apenas fetch (nativo do navegador)
const response = await fetch('https://data.mongodb-api.com/endpoint', {
    method: 'POST',
    headers: { 'api-key': API_KEY },
    body: JSON.stringify({ ... })
});
```

**Por que usamos Data API neste projeto?**
1. **Simplicidade**: Não precisa instalar bibliotecas
2. **Frontend**: Funciona direto no navegador
3. **Segurança**: Vercel gerencia credenciais
4. **CORS**: Data API já tem CORS habilitado

### 6.3 JSON vs Objetos JavaScript

**JSON (JavaScript Object Notation):**
```json
{
  "nome": "La Bella Pasta",
  "avaliacao": 5,
  "pratos": [
    { "nome": "Carbonara", "valor": 45.90 }
  ]
}
```

**Objeto JavaScript:**
```javascript
const restaurante = {
    nome: "La Bella Pasta",
    avaliacao: 5,
    pratos: [
        { nome: "Carbonara", valor: 45.90 }
    ],
    render() { return `<div>...</div>`; }
};
```

**Diferenças:**

| Aspecto | JSON | JS Object |
|---------|------|-----------|
| **Formato** | String (texto) | Objeto nativo |
| **Métodos** | ❌ Não tem | ✅ Tem |
| **Aspas** | Obrigatórias | Opcionais |
| **Uso** | Transferir dados | Trabalhar com dados |

**Conversão:**
```javascript
// JSON → Objeto
const obj = JSON.parse('{"nome":"Teste"}');

// Objeto → JSON
const json = JSON.stringify({ nome: "Teste" });

// Objeto → Classe
const restaurante = Restaurante.fromJSON(data);
```

---

## 💡 PARTE 7: POO - PROGRAMAÇÃO ORIENTADA A OBJETOS

### 7.1 Os 4 Pilares da POO

#### 1. ENCAPSULAMENTO

**Definição**: Agrupar dados e métodos relacionados.

```javascript
// ❌ SEM Encapsulamento
let restauranteNome = "Pizzaria";
let restauranteAvaliacao = 5;
function renderRestaurante() { ... }
function calcularMedia() { ... }
// Tudo separado, desorganizado

// ✅ COM Encapsulamento
class Restaurante {
    constructor(nome, avaliacao) {
        this.nome = nome;           // Dados
        this.avaliacao = avaliacao; // Dados
    }
    
    render() { ... }          // Método
    calcularMedia() { ... }   // Método
}
// Tudo junto, organizado
```

**Vantagens:**
- Código organizado
- Fácil manutenção
- Dados protegidos

#### 2. ABSTRAÇÃO

**Definição**: Esconder complexidade, expor simplicidade.

```javascript
class Restaurante {
    // Método público (simples)
    render() {
        return this._gerarHTML(); // Chama método privado
    }
    
    // Método privado (complexo)
    _gerarHTML() {
        // Lógica complexa aqui
        let html = '<div>';
        html += this._formatarNome();
        html += this._formatarAvaliacao();
        html += this._formatarPreco();
        html += '</div>';
        return html;
    }
}

// Usuário usa:
const resto = new Restaurante(...);
resto.render(); // Simples! Não precisa saber como funciona
```

**Analogia:**
- Dirigir carro: Você aperta acelerador (abstração)
- Não precisa saber como motor funciona (complexidade escondida)

#### 3. HERANÇA

**Definição**: Classes filhas herdam propriedades de classes pais.

```javascript
// Classe Pai
class Item {
    constructor(nome, valor) {
        this.nome = nome;
        this.valor = valor;
    }
    
    calcularDesconto(percent) {
        return this.valor * (1 - percent/100);
    }
}

// Classes Filhas
class Prato extends Item {
    constructor(nome, valor, calorias) {
        super(nome, valor); // Herda de Item
        this.calorias = calorias;
    }
}

class Bebida extends Item {
    constructor(nome, valor, ml) {
        super(nome, valor);
        this.ml = ml;
    }
}

// Ambos têm calcularDesconto() automaticamente!
```

**Nota**: Neste projeto usamos COMPOSIÇÃO, não herança (ver próximo tópico).

#### 4. POLIMORFISMO

**Definição**: Mesma interface, comportamentos diferentes.

```javascript
class Restaurante {
    render() {
        return `<div class="restaurante">...</div>`;
    }
}

class Artista {
    render() {
        return `<div class="artista">...</div>`;
    }
}

// Código genérico funciona para ambos
const itens = [new Restaurante(), new Artista()];
itens.forEach(item => {
    console.log(item.render()); // Cada um renderiza diferente!
});
```

### 7.2 Composição vs Herança

**HERANÇA (Prato "É UM" Item):**
```javascript
class Item {
    constructor(nome) {
        this.nome = nome;
    }
}

class Prato extends Item {
    constructor(nome, valor) {
        super(nome);
        this.valor = valor;
    }
}
```

**COMPOSIÇÃO (Restaurante "TEM" Pratos):**
```javascript
class Restaurante {
    constructor() {
        this.pratos = []; // TEM pratos
    }
    
    adicionarPrato(prato) {
        this.pratos.push(prato);
    }
}

const resto = new Restaurante();
resto.adicionarPrato(new Prato(...));
```

**Por que Composição é melhor?**
- **Flexibilidade**: Fácil adicionar/remover pratos
- **Sem Hierarquia**: Não cria árvore complexa de classes
- **Reutilização**: Pratos podem pertencer a vários restaurantes

**Princípio**: "Favor Composition Over Inheritance"

### 7.3 Conceitos Importantes

#### Constructor
```javascript
class Pessoa {
    constructor(nome, idade) {
        // Executado automaticamente com 'new'
        this.nome = nome;
        this.idade = idade;
        console.log(`${nome} foi criado!`);
    }
}

const pessoa = new Pessoa('João', 25);
// Output: "João foi criado!"
```

#### This
```javascript
class Contador {
    constructor() {
        this.valor = 0; // 'this' = objeto atual
    }
    
    incrementar() {
        this.valor++; // Acessa valor do objeto atual
    }
}

const c1 = new Contador();
const c2 = new Contador();

c1.incrementar();
console.log(c1.valor); // 1
console.log(c2.valor); // 0 (objetos independentes!)
```

#### Métodos Estáticos
```javascript
class Matematica {
    // Método de instância (precisa de objeto)
    calcular(x, y) {
        return x + y;
    }
    
    // Método estático (não precisa de objeto)
    static somar(x, y) {
        return x + y;
    }
}

// Método de instância
const mat = new Matematica();
mat.calcular(2, 3); // 5

// Método estático
Matematica.somar(2, 3); // 5 (sem criar objeto!)
```

---

## 📝 RESUMO PARA A PROVA

### Checklist de Conceitos:

**Git Flow:**
- [ ] Sei explicar diferença entre main e staging
- [ ] Sei explicar por que não commitamos direto na main
- [ ] Sei o que é Pull Request e sua importância

**Segurança:**
- [ ] Sei o que é .env e por que existe
- [ ] Sei o que é .gitignore e como protege
- [ ] Sei consequências de vazar credenciais no GitHub

**Vercel:**
- [ ] Sei o que são Environment Variables
- [ ] Sei diferença entre .env local e Vercel
- [ ] Sei explicar o que acontece em push staging vs merge main

**CI/CD:**
- [ ] Sei o que significa CI/CD
- [ ] Sei explicar fluxo automático de deploy
- [ ] Sei vantagens sobre deploy manual

**POO:**
- [ ] Sei explicar os 4 pilares
- [ ] Sei diferença entre classe, objeto e instância
- [ ] Sei o que é constructor, this, métodos

**Banco de Dados:**
- [ ] Sei diferença entre SQL e NoSQL
- [ ] Sei o que é MongoDB Atlas
- [ ] Sei diferença entre JSON e objeto JS

---

## 🎓 DICAS PARA A PROVA

1. **Leia TODO este documento** (vale a pena!)
2. **Faça o projeto** (a prática solidifica teoria)
3. **Use o Copilot** para tirar dúvidas
4. **Anote** os conceitos principais
5. **Explique** para alguém (ensinar é aprender)

**Boa sorte! 🚀**

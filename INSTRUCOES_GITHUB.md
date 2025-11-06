# 🚀 INSTRUÇÕES PARA PUBLICAR NO GITHUB

## Passo a Passo Completo

### 1️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com
2. Clique no **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Configure:
   - **Repository name**: `projeto-devops-restaurante` (ou nome de sua escolha)
   - **Description**: "Projeto DevOps completo com POO, MongoDB e CI/CD"
   - **Visibility**: ✅ Public (para compartilhar com professor)
   - ❌ **NÃO** marque "Initialize with README" (já temos!)
5. Clique em **"Create repository"**

---

### 2️⃣ Conectar Repositório Local ao GitHub

O GitHub mostrará comandos. Use estes:

```powershell
# Adicionar remote (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/projeto-devops-restaurante.git

# Verificar se foi adicionado
git remote -v

# Push da branch main
git push -u origin main

# Push da branch staging
git push -u origin staging
```

**Exemplo real:**
```powershell
git remote add origin https://github.com/danielgodoy/projeto-devops-restaurante.git
git push -u origin main
git push -u origin staging
```

---

### 3️⃣ Criar Issues (Gerenciamento de Tarefas)

No GitHub, vá para a aba **"Issues"** e crie:

#### Issue #1: Estrutura Base
```markdown
**Título**: Criar estrutura HTML/CSS base

**Descrição**:
Implementar layout responsivo com cards para restaurantes e artistas.

**Tarefas**:
- [x] Header com título e gradiente
- [x] Seções separadas (restaurantes/músicas)
- [x] Cards com hover effect
- [x] Footer informativo
- [x] Responsividade mobile

**Labels**: frontend, enhancement
**Assignees**: (você mesmo)
```

#### Issue #2: Classes POO
```markdown
**Título**: Modelar classes POO (Restaurante, Prato, Artista, Música)

**Descrição**:
Implementar 4 pilares da POO com documentação Copilot.

**Tarefas**:
- [x] Classe Restaurante com constructor
- [x] Classe Prato com render()
- [x] Classe Artista com composição
- [x] Classe Música com polimorfismo
- [x] Métodos fromJSON() para todas
- [x] Comentários explicativos do Copilot

**Labels**: backend, POO, documentation
**Assignees**: (você mesmo)
```

#### Issue #3: MongoDB Atlas
```markdown
**Título**: Configurar banco de dados MongoDB Atlas

**Descrição**:
Setup completo do banco com Data API.

**Tarefas**:
- [ ] Criar conta no Atlas
- [ ] Configurar cluster gratuito
- [ ] Criar usuário e senha
- [ ] Liberar IP 0.0.0.0/0
- [ ] Habilitar Data API
- [ ] Criar database 'devops_projeto'
- [ ] Criar collections 'restaurantes' e 'artistas'
- [ ] Inserir dados de exemplo

**Labels**: database, setup
**Assignees**: (você mesmo)
```

#### Issue #4: Segurança (.env)
```markdown
**Título**: Implementar variáveis de ambiente seguras

**Descrição**:
Proteger credenciais com .env e .gitignore.

**Tarefas**:
- [x] Criar arquivo .gitignore
- [x] Criar .env.example com instruções
- [x] Documentar riscos de exposição
- [x] Preparar Environment Variables para Vercel

**Labels**: security, config
**Assignees**: (você mesmo)
```

---

### 4️⃣ Criar Pull Request (Staging → Main)

1. No GitHub, vá para **"Pull requests"**
2. Clique em **"New pull request"**
3. Configure:
   - **base**: `main` ← **compare**: `staging`
4. Título: `V1 - Estrutura base com POO e segurança`
5. Descrição:

```markdown
## 📋 Descrição

Esta é a **versão 1 do projeto**, pronta para deploy em staging.

## ✨ O que foi implementado

- ✅ Estrutura HTML5 semântica
- ✅ CSS com gradiente e animações
- ✅ Classes POO (Restaurante, Prato, Artista, Música)
- ✅ 4 pilares: Encapsulamento, Abstração, Herança, Polimorfismo
- ✅ Dados mock para desenvolvimento local
- ✅ .gitignore protegendo .env
- ✅ README completo com instruções
- ✅ CONCEITOS.md para estudar para prova

## 🔗 Issues Relacionadas

Closes #1  
Closes #2  
Closes #4  

## 📝 Checklist

- [x] Código funciona localmente
- [x] Todas as classes têm comentários Copilot
- [x] README atualizado
- [x] .env.example criado
- [x] .gitignore funcionando

## 🚀 Próximos Passos (Semana 2)

- Configurar MongoDB Atlas
- Integrar Data API
- Deploy na Vercel (staging)
- Testes em preview
- Merge para produção

## 📸 Screenshots

(Adicione prints do site funcionando)
```

6. **⚠️ NÃO FAÇA O MERGE AINDA!** Apenas crie o PR.

---

### 5️⃣ Configurar GitHub (Opcional mas Recomendado)

#### Proteger Branch Main

1. Vá em **Settings** → **Branches**
2. Clique em **"Add rule"**
3. Configure:
   - **Branch name pattern**: `main`
   - ✅ **Require a pull request before merging**
   - ✅ **Require approvals**: 1
   - ✅ **Dismiss stale pull request approvals**
4. Salve

Agora ninguém (nem você!) pode fazer push direto na main!

#### Habilitar GitHub Actions (CI)

1. Vá em **Actions**
2. Clique em **"set up a workflow yourself"**
3. Cole este código:

```yaml
name: CI - Verificação de Código

on:
  push:
    branches: [ staging ]
  pull_request:
    branches: [ main ]

jobs:
  check:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Verificar arquivos obrigatórios
      run: |
        test -f index.html && echo "✅ index.html encontrado"
        test -f style.css && echo "✅ style.css encontrado"
        test -f app.js && echo "✅ app.js encontrado"
        test -f .gitignore && echo "✅ .gitignore encontrado"
        test -f README.md && echo "✅ README.md encontrado"
    
    - name: Verificar .env não está commitado
      run: |
        if [ -f .env ]; then
          echo "❌ ERRO: .env foi commitado! Remova imediatamente!"
          exit 1
        else
          echo "✅ .env não está no repositório (correto!)"
        fi
    
    - name: Validação bem-sucedida
      run: echo "✅ Todos os checks passaram!"
```

4. Commit: "ci: Adiciona workflow de validação"

Agora a cada push, o GitHub executa esses checks automaticamente!

---

### 6️⃣ Comandos Úteis Git

```powershell
# Ver status atual
git status

# Ver histórico de commits
git log --oneline

# Ver branches
git branch -a

# Mudar de branch
git checkout main
git checkout staging

# Ver diferenças
git diff

# Ver remote configurado
git remote -v

# Atualizar local com GitHub
git pull origin staging
git pull origin main

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Ver arquivos ignorados
git status --ignored
```

---

### 7️⃣ Troubleshooting

#### Erro: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/seu-repo.git
```

#### Erro: "Authentication failed"
- Use **Personal Access Token** em vez de senha
- GitHub → Settings → Developer settings → Personal access tokens
- Gere token com permissões `repo`
- Use token como senha

#### Erro: ".env foi commitado acidentalmente"
```powershell
# Remover do Git (mantém arquivo local)
git rm --cached .env

# Commit da remoção
git commit -m "fix: Remove .env do Git"

# Push
git push origin staging
```

#### Arquivo .gitignore não funciona
```powershell
# Limpar cache do Git
git rm -r --cached .

# Re-adicionar tudo
git add .

# Commit
git commit -m "fix: Aplica .gitignore corretamente"
```

---

### 8️⃣ Verificações Finais

Antes de prosseguir, confira:

- [ ] Repositório criado no GitHub
- [ ] Branch `main` existe no GitHub
- [ ] Branch `staging` existe no GitHub
- [ ] Pull Request criado (staging → main)
- [ ] Issues criadas (#1, #2, #3, #4)
- [ ] README.md visível no GitHub
- [ ] .env NÃO está no GitHub
- [ ] .gitignore está funcionando

---

### 9️⃣ Próximos Passos (Semana 2)

Agora que o GitHub está configurado:

1. **Configurar MongoDB Atlas** (fechar Issue #3)
2. **Copiar credenciais** para .env local
3. **Testar integração** com banco
4. **Deploy na Vercel** (staging)
5. **Testar preview deployment**
6. **Aprovar PR** e fazer merge
7. **Deploy automático** em produção
8. **Fechar todas Issues**
9. **Preencher documento final** com links

---

## 📦 Entregável para o Professor

Quando terminar tudo, envie:

```
1. Link do Repositório: https://github.com/SEU-USUARIO/seu-repo
2. Link Produção Vercel: https://seu-projeto.vercel.app
3. Link Staging Vercel: https://seu-projeto-git-staging.vercel.app
4. Screenshot das Issues fechadas
5. Screenshot do Pull Request mergeado
6. Documento PDF com conceitos explicados
```

---

**Dúvidas? Pergunte ao Copilot! 🤖**

```
"Copilot, explique [conceito específico] como se eu tivesse 10 anos"
"Copilot, por que o fluxo staging → main é importante?"
"Copilot, qual a diferença entre git add, commit e push?"
```

---

**Boa sorte! Você consegue! 🚀**

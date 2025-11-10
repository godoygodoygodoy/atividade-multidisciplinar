/* =====================================================================
   SISTEMA DE LOGIN - JAVASCRIPT
   =====================================================================
   
   Este arquivo gerencia:
   - Validação de formulário
   - Autenticação local (localStorage)
   - Redirecionamento para página principal
   - Feedback visual para o usuário
===================================================================== */

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const btnCadastro = document.getElementById('btnCadastro');
const mensagemDiv = document.getElementById('mensagem');

/* =====================================================================
   VERIFICAR SE JÁ ESTÁ LOGADO
   =====================================================================
   Se usuário já fez login e marcou "lembrar-me", redireciona direto
===================================================================== */
function verificarLoginExistente() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const lembrarMe = localStorage.getItem('lembrarMe');
    
    if (usuarioLogado && lembrarMe === 'true') {
        // Usuário já está logado, redireciona
        window.location.href = 'index.html';
    }
}

/* =====================================================================
   MOSTRAR MENSAGEM DE FEEDBACK
===================================================================== */
function mostrarMensagem(texto, tipo = 'success') {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    
    // Auto-remover após 3 segundos
    setTimeout(() => {
        mensagemDiv.classList.add('hidden');
    }, 3000);
}

/* =====================================================================
   VALIDAR EMAIL
===================================================================== */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* =====================================================================
   PROCESSAR LOGIN
===================================================================== */
function processarLogin(event) {
    event.preventDefault(); // Impede envio padrão do formulário
    
    // Pegar dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const lembrar = document.getElementById('lembrar').checked;
    
    // Validações
    if (nome.length < 3) {
        mostrarMensagem('❌ Nome deve ter pelo menos 3 caracteres', 'error');
        return;
    }
    
    if (!validarEmail(email)) {
        mostrarMensagem('❌ E-mail inválido', 'error');
        return;
    }
    
    if (senha.length < 6) {
        mostrarMensagem('❌ Senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    // Verificar se é admin
    const isAdmin = (email === 'dann.adm' && senha === 'gI.adm.dA');
    
    // Simular loading
    const btnLogin = event.target.querySelector('button[type="submit"]');
    btnLogin.classList.add('loading');
    
    // Simular delay de autenticação (em produção, seria chamada à API)
    setTimeout(() => {
        if (isAdmin) {
            // Login de administrador
            const adminData = {
                username: email,
                senha: senha,
                nome: 'Administrador',
                dataLogin: new Date().toISOString()
            };
            
            localStorage.setItem('adminLogado', JSON.stringify(adminData));
            localStorage.setItem('lembrarMe', lembrar.toString());
            
            mostrarMensagem('🔐 Login administrativo realizado com sucesso!', 'success');
            
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        } else {
            // Login de usuário normal
            const usuario = {
                nome: nome,
                email: email,
                dataLogin: new Date().toISOString()
            };
            
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            localStorage.setItem('lembrarMe', lembrar.toString());
            
            // Adicionar usuário à lista de todos os usuários
            let todosUsuarios = JSON.parse(localStorage.getItem('todosUsuarios') || '[]');
            const usuarioExistente = todosUsuarios.find(u => u.email === email);
            
            if (!usuarioExistente) {
                const novoUsuario = {
                    id: todosUsuarios.length + 1,
                    nome: nome,
                    email: email,
                    dataCriacao: new Date().toISOString().split('T')[0],
                    ultimoAcesso: new Date().toLocaleString('pt-BR'),
                    status: 'online',
                    tipo: 'usuario'
                };
                todosUsuarios.push(novoUsuario);
                localStorage.setItem('todosUsuarios', JSON.stringify(todosUsuarios));
            } else {
                // Atualizar último acesso
                usuarioExistente.ultimoAcesso = new Date().toLocaleString('pt-BR');
                usuarioExistente.status = 'online';
                localStorage.setItem('todosUsuarios', JSON.stringify(todosUsuarios));
            }
            
            // Sucesso!
            mostrarMensagem('✅ Login realizado com sucesso!', 'success');
            
            // Redirecionar após 1 segundo
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
        
    }, 1500); // Simula 1.5s de processamento
}

/* =====================================================================
   CRIAR NOVA CONTA
===================================================================== */
function criarConta() {
    window.location.href = 'cadastro.html';
}

/* =====================================================================
   EVENT LISTENERS
===================================================================== */
loginForm.addEventListener('submit', processarLogin);
btnCadastro.addEventListener('click', criarConta);

// Verificar se já está logado ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLoginExistente);

/* =====================================================================
   VALIDAÇÃO EM TEMPO REAL
===================================================================== */
// Email
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !validarEmail(this.value)) {
        this.setCustomValidity('E-mail inválido');
    } else {
        this.setCustomValidity('');
    }
});

// Senha
document.getElementById('senha').addEventListener('input', function() {
    const hint = this.parentElement.querySelector('.hint');
    if (this.value.length > 0 && this.value.length < 6) {
        hint.style.color = 'var(--error-color)';
        hint.textContent = `Faltam ${6 - this.value.length} caracteres`;
    } else if (this.value.length >= 6) {
        hint.style.color = 'var(--success-color)';
        hint.textContent = '✓ Senha válida';
    } else {
        hint.style.color = 'var(--text-light)';
        hint.textContent = 'Mínimo 6 caracteres';
    }
});

/* =====================================================================
   TECLA ENTER PARA SUBMETER
===================================================================== */
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

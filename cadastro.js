/* =====================================================================
   SISTEMA DE CADASTRO - JAVASCRIPT
   =====================================================================
   
   Este arquivo gerencia:
   - Validação completa de formulário
   - Prevenção de emails duplicados
   - Confirmação de senha
   - Criação de novo usuário
   - Integração com sistema de usuários
   - Feedback visual em tempo real
===================================================================== */

// Elementos do DOM
const cadastroForm = document.getElementById('cadastroForm');
const btnVoltar = document.getElementById('btnVoltar');
const mensagemDiv = document.getElementById('mensagem');

/* =====================================================================
   MOSTRAR MENSAGEM DE FEEDBACK
===================================================================== */
function mostrarMensagem(texto, tipo = 'success') {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        mensagemDiv.classList.add('hidden');
    }, 5000);
}

/* =====================================================================
   VALIDAR EMAIL
===================================================================== */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/* =====================================================================
   VERIFICAR SE EMAIL JÁ EXISTE
===================================================================== */
function emailJaExiste(email) {
    const todosUsuarios = JSON.parse(localStorage.getItem('todosUsuarios') || '[]');
    return todosUsuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
}

/* =====================================================================
   VALIDAR FORÇA DA SENHA
===================================================================== */
function validarForcaSenha(senha) {
    const forcas = {
        fraca: senha.length >= 6 && senha.length < 8,
        media: senha.length >= 8 && /[0-9]/.test(senha),
        forte: senha.length >= 8 && /[0-9]/.test(senha) && /[A-Z]/.test(senha)
    };
    
    if (forcas.forte) return { nivel: 'forte', texto: '💪 Senha forte!', cor: '#10b981' };
    if (forcas.media) return { nivel: 'media', texto: '👍 Senha média', cor: '#f59e0b' };
    if (forcas.fraca) return { nivel: 'fraca', texto: '⚠️ Senha fraca', cor: '#ef4444' };
    return { nivel: 'invalida', texto: '❌ Muito curta', cor: '#ef4444' };
}

/* =====================================================================
   PROCESSAR CADASTRO
===================================================================== */
function processarCadastro(event) {
    event.preventDefault(); // Impede envio padrão do formulário
    
    // Pegar dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const termos = document.getElementById('termos').checked;
    
    // Validações
    if (nome.length < 3) {
        mostrarMensagem('❌ Nome deve ter pelo menos 3 caracteres', 'error');
        return;
    }
    
    if (!validarEmail(email)) {
        mostrarMensagem('❌ E-mail inválido', 'error');
        return;
    }
    
    // Verificar email duplicado
    if (emailJaExiste(email)) {
        mostrarMensagem('❌ Este e-mail já está cadastrado! Use outro ou faça login.', 'error');
        return;
    }
    
    if (senha.length < 6) {
        mostrarMensagem('❌ Senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    if (senha !== confirmarSenha) {
        mostrarMensagem('❌ As senhas não coincidem', 'error');
        return;
    }
    
    if (!termos) {
        mostrarMensagem('❌ Você precisa aceitar os termos de uso', 'error');
        return;
    }
    
    // Simular loading
    const btnCadastro = event.target.querySelector('button[type="submit"]');
    btnCadastro.classList.add('loading');
    btnCadastro.disabled = true;
    btnCadastro.textContent = 'Criando conta...';
    
    // Simular delay de cadastro (em produção, seria chamada à API)
    setTimeout(() => {
        // Criar objeto do novo usuário
        const novoUsuario = {
            id: Date.now(), // ID único baseado em timestamp
            nome: nome,
            email: email,
            dataCriacao: new Date().toISOString().split('T')[0],
            ultimoAcesso: new Date().toLocaleString('pt-BR'),
            status: 'offline',
            tipo: 'usuario'
        };
        
        // Adicionar à lista de todos os usuários
        let todosUsuarios = JSON.parse(localStorage.getItem('todosUsuarios') || '[]');
        todosUsuarios.push(novoUsuario);
        localStorage.setItem('todosUsuarios', JSON.stringify(todosUsuarios));
        
        // Fazer login automático após cadastro
        const usuarioLogado = {
            nome: nome,
            email: email,
            dataLogin: new Date().toISOString()
        };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        localStorage.setItem('lembrarMe', 'true');
        
        // Atualizar status para online
        const usuariosAtualizados = todosUsuarios.map(u => {
            if (u.email === email) {
                return { ...u, status: 'online' };
            }
            return u;
        });
        localStorage.setItem('todosUsuarios', JSON.stringify(usuariosAtualizados));
        
        // Sucesso!
        mostrarMensagem('✅ Conta criada com sucesso! Redirecionando...', 'success');
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 1500); // Simula 1.5s de processamento
}

/* =====================================================================
   VOLTAR PARA LOGIN
===================================================================== */
function voltarParaLogin() {
    window.location.href = 'login.html';
}

/* =====================================================================
   EVENT LISTENERS
===================================================================== */
cadastroForm.addEventListener('submit', processarCadastro);
btnVoltar.addEventListener('click', voltarParaLogin);

/* =====================================================================
   VALIDAÇÃO EM TEMPO REAL - EMAIL
===================================================================== */
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    const hint = this.parentElement.querySelector('.hint');
    
    if (!email) {
        hint.style.color = 'var(--text-light)';
        hint.textContent = 'Use um email válido';
        return;
    }
    
    if (!validarEmail(email)) {
        hint.style.color = 'var(--error-color)';
        hint.textContent = '❌ E-mail inválido';
        this.setCustomValidity('E-mail inválido');
    } else if (emailJaExiste(email)) {
        hint.style.color = 'var(--error-color)';
        hint.textContent = '⚠️ Este e-mail já está cadastrado';
        this.setCustomValidity('E-mail já cadastrado');
    } else {
        hint.style.color = 'var(--success-color)';
        hint.textContent = '✓ E-mail disponível';
        this.setCustomValidity('');
    }
});

/* =====================================================================
   VALIDAÇÃO EM TEMPO REAL - SENHA
===================================================================== */
document.getElementById('senha').addEventListener('input', function() {
    const senha = this.value;
    const hint = document.getElementById('senhaHint');
    
    if (senha.length === 0) {
        hint.style.color = 'var(--text-light)';
        hint.textContent = 'Mínimo 6 caracteres';
        return;
    }
    
    const forca = validarForcaSenha(senha);
    hint.style.color = forca.cor;
    hint.textContent = forca.texto;
    
    // Validar confirmação se já tiver algo digitado
    const confirmar = document.getElementById('confirmarSenha').value;
    if (confirmar) {
        validarConfirmacaoSenha();
    }
});

/* =====================================================================
   VALIDAÇÃO EM TEMPO REAL - CONFIRMAR SENHA
===================================================================== */
function validarConfirmacaoSenha() {
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmarSenha').value;
    const hint = document.getElementById('confirmarHint');
    
    if (!confirmar) {
        hint.style.color = 'var(--text-light)';
        hint.textContent = 'As senhas devem ser iguais';
        return;
    }
    
    if (senha !== confirmar) {
        hint.style.color = 'var(--error-color)';
        hint.textContent = '❌ As senhas não coincidem';
        document.getElementById('confirmarSenha').setCustomValidity('Senhas diferentes');
    } else {
        hint.style.color = 'var(--success-color)';
        hint.textContent = '✓ Senhas coincidem';
        document.getElementById('confirmarSenha').setCustomValidity('');
    }
}

document.getElementById('confirmarSenha').addEventListener('input', validarConfirmacaoSenha);

/* =====================================================================
   VALIDAÇÃO EM TEMPO REAL - NOME
===================================================================== */
document.getElementById('nome').addEventListener('input', function() {
    const nome = this.value.trim();
    const hint = this.parentElement.querySelector('.hint');
    
    if (nome.length === 0) {
        hint.style.color = 'var(--text-light)';
        hint.textContent = 'Mínimo 3 caracteres';
    } else if (nome.length < 3) {
        hint.style.color = 'var(--error-color)';
        hint.textContent = `Faltam ${3 - nome.length} caracteres`;
    } else {
        hint.style.color = 'var(--success-color)';
        hint.textContent = `✓ ${nome.length} caracteres`;
    }
});

/* =====================================================================
   TECLA ENTER PARA SUBMETER
===================================================================== */
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            cadastroForm.dispatchEvent(new Event('submit'));
        }
    });
});

/* =====================================================================
   INICIALIZAÇÃO
===================================================================== */
console.log('✅ Sistema de cadastro carregado!');
console.log('📝 Funcionalidades: Validação em tempo real, prevenção de duplicados, login automático');

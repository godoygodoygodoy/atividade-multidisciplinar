/* ===================================
   ADMIN PANEL - LÓGICA COMPLETA
   Autor: GitHub Copilot
   =================================== */

// ===================================
// AUTENTICAÇÃO ADMIN
// ===================================
function verificarAutenticacaoAdmin() {
    const adminLogado = localStorage.getItem('adminLogado');
    
    if (!adminLogado) {
        alert('❌ Acesso negado! Área restrita apenas para administradores.');
        window.location.href = 'login.html';
        return false;
    }
    
    const adminData = JSON.parse(adminLogado);
    
    // Verificar credenciais específicas do admin
    if (adminData.username !== 'dann.adm' || adminData.senha !== 'gI.adm.dA') {
        alert('❌ Credenciais de administrador inválidas!');
        localStorage.removeItem('adminLogado');
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// ===================================
// LOGOUT ADMIN
// ===================================
function fazerLogoutAdmin() {
    if (confirm('🚪 Tem certeza que deseja sair do painel administrativo?')) {
        localStorage.removeItem('adminLogado');
        window.location.href = 'login.html';
    }
}

// ===================================
// VOLTAR PARA PÁGINA PRINCIPAL
// ===================================
function voltarPaginaPrincipal() {
    window.location.href = 'index.html';
}

// ===================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ===================================
function navegarParaSecao(secaoId) {
    // Remover active de todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ativar seção selecionada
    document.getElementById(secaoId).classList.add('active');
    
    // Ativar botão correspondente
    event.target.classList.add('active');
}

// ===================================
// RELÓGIO EM TEMPO REAL
// ===================================
function atualizarRelogio() {
    const agora = new Date();
    const opcoes = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    document.getElementById('currentTime').textContent = dataFormatada;
}

// ===================================
// GERENCIAMENTO DE USUÁRIOS
// ===================================
class GerenciadorUsuarios {
    constructor() {
        this.usuarios = this.carregarUsuarios();
    }
    
    carregarUsuarios() {
        const usuariosStorage = localStorage.getItem('todosUsuarios');
        if (usuariosStorage) {
            return JSON.parse(usuariosStorage);
        }
        
        // Dados mock para demonstração
        return [
            {
                id: 1,
                nome: 'Daniel Godoy',
                email: 'daniel@example.com',
                dataCriacao: '2024-01-15',
                ultimoAcesso: '2024-01-20 14:30',
                status: 'online',
                tipo: 'admin'
            },
            {
                id: 2,
                nome: 'Maria Silva',
                email: 'maria@example.com',
                dataCriacao: '2024-01-16',
                ultimoAcesso: '2024-01-19 10:15',
                status: 'offline',
                tipo: 'usuario'
            },
            {
                id: 3,
                nome: 'João Santos',
                email: 'joao@example.com',
                dataCriacao: '2024-01-18',
                ultimoAcesso: '2024-01-20 15:00',
                status: 'online',
                tipo: 'usuario'
            },
            {
                id: 4,
                nome: 'Ana Costa',
                email: 'ana@example.com',
                dataCriacao: '2024-01-19',
                ultimoAcesso: '2024-01-20 09:45',
                status: 'online',
                tipo: 'usuario'
            },
            {
                id: 5,
                nome: 'Pedro Lima',
                email: 'pedro@example.com',
                dataCriacao: '2024-01-20',
                ultimoAcesso: '2024-01-20 16:00',
                status: 'online',
                tipo: 'usuario'
            }
        ];
    }
    
    salvarUsuarios() {
        localStorage.setItem('todosUsuarios', JSON.stringify(this.usuarios));
    }
    
    renderizarTabela() {
        const tbody = document.getElementById('usuariosTableBody');
        tbody.innerHTML = '';
        
        this.usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.dataCriacao}</td>
                <td>${usuario.ultimoAcesso}</td>
                <td><span class="badge ${usuario.status}">${usuario.status === 'online' ? '🟢 Online' : '⚫ Offline'}</span></td>
                <td><span class="badge ${usuario.tipo}">${usuario.tipo === 'admin' ? '👑 Admin' : '👤 Usuário'}</span></td>
                <td class="table-actions">
                    <button class="btn-icon" onclick="gerenciador.editarUsuario(${usuario.id})" title="Editar">✏️</button>
                    <button class="btn-icon danger" onclick="gerenciador.excluirUsuario(${usuario.id})" title="Excluir">🗑️</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        this.atualizarEstatisticas();
    }
    
    buscarUsuarios(termo) {
        const termoLower = termo.toLowerCase();
        const usuariosFiltrados = this.usuarios.filter(u => 
            u.nome.toLowerCase().includes(termoLower) || 
            u.email.toLowerCase().includes(termoLower)
        );
        
        const tbody = document.getElementById('usuariosTableBody');
        tbody.innerHTML = '';
        
        usuariosFiltrados.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.dataCriacao}</td>
                <td>${usuario.ultimoAcesso}</td>
                <td><span class="badge ${usuario.status}">${usuario.status === 'online' ? '🟢 Online' : '⚫ Offline'}</span></td>
                <td><span class="badge ${usuario.tipo}">${usuario.tipo === 'admin' ? '👑 Admin' : '👤 Usuário'}</span></td>
                <td class="table-actions">
                    <button class="btn-icon" onclick="gerenciador.editarUsuario(${usuario.id})" title="Editar">✏️</button>
                    <button class="btn-icon danger" onclick="gerenciador.excluirUsuario(${usuario.id})" title="Excluir">🗑️</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    editarUsuario(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (usuario) {
            const novoNome = prompt('📝 Editar nome:', usuario.nome);
            if (novoNome) {
                usuario.nome = novoNome;
                this.salvarUsuarios();
                this.renderizarTabela();
                alert('✅ Usuário atualizado com sucesso!');
            }
        }
    }
    
    excluirUsuario(id) {
        if (confirm('⚠️ Tem certeza que deseja excluir este usuário?')) {
            this.usuarios = this.usuarios.filter(u => u.id !== id);
            this.salvarUsuarios();
            this.renderizarTabela();
            alert('✅ Usuário excluído com sucesso!');
        }
    }
    
    exportarCSV() {
        let csv = 'ID,Nome,Email,Data Criação,Último Acesso,Status,Tipo\n';
        
        this.usuarios.forEach(u => {
            csv += `${u.id},"${u.nome}","${u.email}","${u.dataCriacao}","${u.ultimoAcesso}","${u.status}","${u.tipo}"\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        alert('📊 Exportação concluída com sucesso!');
    }
    
    atualizarEstatisticas() {
        const total = this.usuarios.length;
        const online = this.usuarios.filter(u => u.status === 'online').length;
        
        const hoje = new Date().toISOString().split('T')[0];
        const novosHoje = this.usuarios.filter(u => u.dataCriacao === hoje).length;
        
        document.getElementById('totalUsuarios').textContent = total;
        document.getElementById('usuariosOnline').textContent = online;
        document.getElementById('novosHoje').textContent = novosHoje;
    }
}

// ===================================
// CHARTS.JS - GRÁFICOS
// ===================================
let charts = {};

function inicializarGraficos() {
    // Gráfico de Crescimento de Usuários
    const ctxCrescimento = document.getElementById('chartCrescimento').getContext('2d');
    charts.crescimento = new Chart(ctxCrescimento, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Novos Usuários',
                data: [12, 19, 25, 32, 45, 58],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico de Horários de Acesso
    const ctxHorarios = document.getElementById('chartHorarios').getContext('2d');
    charts.horarios = new Chart(ctxHorarios, {
        type: 'bar',
        data: {
            labels: ['00-04h', '04-08h', '08-12h', '12-16h', '16-20h', '20-24h'],
            datasets: [{
                label: 'Acessos',
                data: [5, 12, 45, 38, 52, 28],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#3b82f6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Gráfico de Restaurantes Populares
    const ctxRestaurantes = document.getElementById('chartRestaurantes').getContext('2d');
    charts.restaurantes = new Chart(ctxRestaurantes, {
        type: 'doughnut',
        data: {
            labels: ['Burger King', 'Sushi Master', 'Pizza Hut', 'KFC'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#667eea', '#764ba2', '#10b981', '#f59e0b']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico de Músicas Mais Ouvidas
    const ctxMusicas = document.getElementById('chartMusicas').getContext('2d');
    charts.musicas = new Chart(ctxMusicas, {
        type: 'bar',
        data: {
            labels: ['Ghost', 'Segunda', 'Corduroy', 'Redento', 'Petrichor'],
            datasets: [{
                label: 'Reproduções',
                data: [120, 95, 88, 75, 62],
                backgroundColor: '#667eea'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Gráfico de Dispositivos
    const ctxDispositivos = document.getElementById('chartDispositivos').getContext('2d');
    charts.dispositivos = new Chart(ctxDispositivos, {
        type: 'pie',
        data: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
                data: [55, 35, 10],
                backgroundColor: ['#667eea', '#764ba2', '#10b981']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico de Analytics - Visitas Diárias
    const ctxVisitas = document.getElementById('chartVisitasDiarias').getContext('2d');
    charts.visitas = new Chart(ctxVisitas, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Visitas',
                data: [150, 180, 220, 195, 240, 120, 90],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
    
    // Gráfico de Analytics - Taxa de Conversão
    const ctxConversao = document.getElementById('chartTaxaConversao').getContext('2d');
    charts.conversao = new Chart(ctxConversao, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                label: 'Taxa (%)',
                data: [65, 72, 68, 78],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// ===================================
// CONFIGURAÇÕES
// ===================================
function salvarConfiguracoes() {
    const config = {
        seguranca: {
            autenticacao2FA: document.getElementById('config2FA').checked,
            senhaForte: document.getElementById('configSenhaForte').checked,
            loginNotificacao: document.getElementById('configLoginNotif').checked
        },
        database: {
            host: document.getElementById('configDBHost').value,
            porta: document.getElementById('configDBPorta').value
        },
        notificacoes: {
            emailNovoUsuario: document.getElementById('configEmailNovo').checked,
            emailAtividade: document.getElementById('configEmailAtividade').checked,
            pushNotif: document.getElementById('configPush').checked
        }
    };
    
    localStorage.setItem('adminConfig', JSON.stringify(config));
    alert('✅ Configurações salvas com sucesso!');
}

function carregarConfiguracoes() {
    const config = JSON.parse(localStorage.getItem('adminConfig') || '{}');
    
    if (config.seguranca) {
        document.getElementById('config2FA').checked = config.seguranca.autenticacao2FA || false;
        document.getElementById('configSenhaForte').checked = config.seguranca.senhaForte || false;
        document.getElementById('configLoginNotif').checked = config.seguranca.loginNotificacao || false;
    }
    
    if (config.database) {
        document.getElementById('configDBHost').value = config.database.host || 'localhost';
        document.getElementById('configDBPorta').value = config.database.porta || '27017';
    }
    
    if (config.notificacoes) {
        document.getElementById('configEmailNovo').checked = config.notificacoes.emailNovoUsuario || false;
        document.getElementById('configEmailAtividade').checked = config.notificacoes.emailAtividade || false;
        document.getElementById('configPush').checked = config.notificacoes.pushNotif || false;
    }
}

function limparCache() {
    if (confirm('⚠️ Isso irá limpar todos os dados em cache. Continuar?')) {
        // Não limpar adminLogado e todosUsuarios
        const adminLogado = localStorage.getItem('adminLogado');
        const todosUsuarios = localStorage.getItem('todosUsuarios');
        
        localStorage.clear();
        
        localStorage.setItem('adminLogado', adminLogado);
        localStorage.setItem('todosUsuarios', todosUsuarios);
        
        alert('✅ Cache limpo com sucesso!');
    }
}

// ===================================
// INICIALIZAÇÃO
// ===================================
let gerenciador;

window.onload = function() {
    // Verificar autenticação admin
    if (!verificarAutenticacaoAdmin()) {
        return;
    }
    
    // Inicializar gerenciador de usuários
    gerenciador = new GerenciadorUsuarios();
    gerenciador.renderizarTabela();
    
    // Inicializar gráficos
    inicializarGraficos();
    
    // Carregar configurações
    carregarConfiguracoes();
    
    // Atualizar relógio
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
    
    // Event Listeners
    document.getElementById('searchUsuarios').addEventListener('input', (e) => {
        gerenciador.buscarUsuarios(e.target.value);
    });
    
    console.log('✅ Painel Admin inicializado com sucesso!');
};

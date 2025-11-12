// Sistema de Gestão - Autenticação
const AppState = { currentUser: null, screens: { login: null, register: null, user: null, admin: null } };
document.addEventListener('DOMContentLoaded', () => {
    AppState.screens = {
        login: document.getElementById('login-screen'),
        register: document.getElementById('register-screen'),
        user: document.getElementById('user-screen'),
        admin: document.getElementById('admin-screen')
    };
    checkSession();
    setupEventListeners();
});
function checkSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        try {
            const user = JSON.parse(session);
            AppState.currentUser = user;
            if (user.isAdmin) { showAdminScreen(); } else { showUserScreen(); }
        } catch (error) {
            localStorage.removeItem('userSession');
            showLoginScreen();
        }
    } else { showLoginScreen(); }
}
function setupEventListeners() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('show-register').addEventListener('click', (e) => { e.preventDefault(); showRegisterScreen(); });
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('show-login').addEventListener('click', (e) => { e.preventDefault(); showLoginScreen(); });
    document.getElementById('logout-user')?.addEventListener('click', handleLogout);
    document.getElementById('logout-admin')?.addEventListener('click', handleLogout);
}
function hideAllScreens() { Object.values(AppState.screens).forEach(screen => { if (screen) screen.style.display = 'none'; }); }
function showLoginScreen() { hideAllScreens(); AppState.screens.login.style.display = 'flex'; document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; }
function showRegisterScreen() { hideAllScreens(); AppState.screens.register.style.display = 'flex'; document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; }
function showUserScreen() { hideAllScreens(); AppState.screens.user.style.display = 'block'; document.body.style.background = '#f5f7fa'; document.getElementById('user-name-display').textContent = `Olá, ${AppState.currentUser.name}`; }
function showAdminScreen() { hideAllScreens(); AppState.screens.admin.style.display = 'block'; document.body.style.background = '#f5f7fa'; document.getElementById('admin-name-display').textContent = `Olá, ${AppState.currentUser.name} (Admin)`; loadAdminDashboard(); }
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const messageEl = document.getElementById('login-message');
    if (!email || !password) { showMessage(messageEl, 'Preencha todos os campos', 'error'); return; }
    try {
        const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', email, password }) });
        const result = await response.json();
        if (result.success) {
            AppState.currentUser = result.user;
            localStorage.setItem('userSession', JSON.stringify(result.user));
            showMessage(messageEl, 'Login realizado com sucesso!', 'success');
            setTimeout(() => { if (result.user.isAdmin) { showAdminScreen(); } else { showUserScreen(); } }, 1000);
        } else { showMessage(messageEl, result.message || 'Credenciais inválidas', 'error'); }
    } catch (error) { showMessage(messageEl, 'Erro ao conectar com o servidor', 'error'); }
}
async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const messageEl = document.getElementById('register-message');
    if (!name || !email || !password || !confirm) { showMessage(messageEl, 'Preencha todos os campos', 'error'); return; }
    if (password.length < 6) { showMessage(messageEl, 'A senha deve ter no mínimo 6 caracteres', 'error'); return; }
    if (password !== confirm) { showMessage(messageEl, 'As senhas não coincidem', 'error'); return; }
    if (!validateEmail(email)) { showMessage(messageEl, 'E-mail inválido', 'error'); return; }
    try {
        const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'register', name, email, password }) });
        const result = await response.json();
        if (result.success) {
            showMessage(messageEl, 'Cadastro realizado! Redirecionando...', 'success');
            document.getElementById('register-form').reset();
            setTimeout(() => { showLoginScreen(); }, 2000);
        } else { showMessage(messageEl, result.message || 'Erro ao criar conta', 'error'); }
    } catch (error) { showMessage(messageEl, 'Erro ao conectar com o servidor', 'error'); }
}
function handleLogout() { localStorage.removeItem('userSession'); AppState.currentUser = null; showLoginScreen(); }
async function loadAdminDashboard() {
    try {
        const response = await fetch('/api/users', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        const result = await response.json();
        if (result.success) {
            const users = result.users;
            const totalUsers = users.length;
            const totalAdmins = users.filter(u => u.isAdmin).length;
            document.getElementById('total-users').textContent = totalUsers;
            document.getElementById('total-admins').textContent = totalAdmins;
            renderUsersTable(users);
        }
    } catch (error) { document.getElementById('users-tbody').innerHTML = '<tr><td colspan="4" class="loading" style="color: #ff4757;">Erro ao carregar usuários</td></tr>'; }
}
function renderUsersTable(users) {
    const tbody = document.getElementById('users-tbody');
    if (users.length === 0) { tbody.innerHTML = '<tr><td colspan="4" class="loading">Nenhum usuário encontrado</td></tr>'; return; }
    tbody.innerHTML = users.map(user => `<tr><td>${user.name}</td><td>${user.email}</td><td><span class="badge ${user.isAdmin ? 'badge-admin' : 'badge-user'}">${user.isAdmin ? 'Administrador' : 'Usuário'}</span></td><td>${!user.isAdmin ? `<button class="btn btn-danger" onclick="deleteUser('${user._id}')">Excluir</button>` : '<em>-</em>'}</td></tr>`).join('');
}
async function deleteUser(userId) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) { return; }
    try {
        const response = await fetch('/api/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) });
        const result = await response.json();
        if (result.success) { alert('Usuário excluído com sucesso!'); loadAdminDashboard(); } else { alert('Erro ao excluir usuário: ' + result.message); }
    } catch (error) { alert('Erro ao conectar com o servidor'); }
}
function showMessage(element, message, type) { element.textContent = message; element.className = `message ${type}`; setTimeout(() => { element.className = 'message'; }, 5000); }
function validateEmail(email) { const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return re.test(email); }
window.deleteUser = deleteUser;

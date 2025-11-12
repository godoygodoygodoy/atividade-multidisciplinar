// Verificar se está logado
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'index.html';
}

// Atualizar informações do usuário
document.getElementById('userName').textContent = user.name;

const userDetails = document.getElementById('userDetails');
userDetails.innerHTML = `
    <p><strong>Nome:</strong> ${user.name}</p>
    <p><strong>E-mail:</strong> ${user.email}</p>
    <p><strong>Tipo:</strong> ${user.isAdmin ? 'Administrador' : 'Usuário'}</p>
`;

// Botão de logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Carregar painel admin se for administrador
if (user.isAdmin) {
    document.getElementById('adminPanel').style.display = 'block';
    loadUsers();
}

async function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (response.ok) {
            if (data.users.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="loading">Nenhum usuário encontrado</td></tr>';
                return;
            }
            
            tbody.innerHTML = data.users.map(u => `
                <tr>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td>
                        <span class="badge ${u.isAdmin ? 'badge-admin' : 'badge-user'}">
                            ${u.isAdmin ? 'Admin' : 'Usuário'}
                        </span>
                    </td>
                    <td>${new Date(u.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td>
                        ${u._id !== user._id ? `
                            <button class="btn btn-danger" onclick="deleteUser('${u._id}', '${u.name}')">
                                Excluir
                            </button>
                        ` : '<span style="color: var(--text-secondary); font-size: 12px;">Você</span>'}
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="5" class="loading">Erro ao carregar usuários</td></tr>';
        }
    } catch (error) {
        console.error('Erro:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Erro ao conectar com o servidor</td></tr>';
    }
}

async function deleteUser(userId, userName) {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/users?userId=${userId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Usuário excluído com sucesso!');
            loadUsers();
        } else {
            alert(data.error || 'Erro ao excluir usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
}

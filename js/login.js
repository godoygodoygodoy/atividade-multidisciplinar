const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Limpar mensagem de erro
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Desabilitar botão durante o envio
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';
    
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'login',
                email,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Salvar sessão
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token || 'authenticated');
            
            // Redirecionar para dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Mostrar erro
            errorMessage.textContent = data.error || 'Erro ao fazer login';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Erro:', error);
        errorMessage.textContent = 'Erro ao conectar com o servidor';
        errorMessage.classList.add('show');
    } finally {
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = 'Entrar';
    }
});

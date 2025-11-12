const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Limpar mensagens
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
    errorMessage.textContent = '';
    successMessage.textContent = '';
    
    // Validar senhas
    if (password !== confirmPassword) {
        errorMessage.textContent = 'As senhas não coincidem';
        errorMessage.classList.add('show');
        return;
    }
    
    if (password.length < 6) {
        errorMessage.textContent = 'A senha deve ter no mínimo 6 caracteres';
        errorMessage.classList.add('show');
        return;
    }
    
    // Desabilitar botão durante o envio
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';
    
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'register',
                name,
                email,
                password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Mostrar sucesso
            successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
            successMessage.classList.add('show');
            
            // Limpar formulário
            registerForm.reset();
            
            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Mostrar erro
            errorMessage.textContent = data.error || 'Erro ao fazer cadastro';
            errorMessage.classList.add('show');
        }
    } catch (error) {
        console.error('Erro:', error);
        errorMessage.textContent = 'Erro ao conectar com o servidor';
        errorMessage.classList.add('show');
    } finally {
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cadastrar';
    }
});

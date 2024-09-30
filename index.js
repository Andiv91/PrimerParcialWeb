document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    
    // Datos correctos para el login
    const correctUsername = "mor_2314";
    const correctPassword = "83r5^_";

    // Manejar el evento de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se recargue la página

        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // Verificar credenciales
        if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
            // Redirigir a la página principal (shop.html)
            window.location.href = 'shop.html';
        } else {
            errorMessage.textContent = "Usuario o contraseña incorrectos";
        }
    });
});

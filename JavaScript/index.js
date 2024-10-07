document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se recargue la página

        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // Llamar a la API de autenticación
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: enteredUsername,
                password: enteredPassword
            })
        })
        .then(res => {
            if (res.status === 200) {
                return res.json(); // Si la respuesta es 200, continuar
            } else {
                throw new Error("Usuario y/o contraseña equivocada"); // Lanzar error si el status no es 200
            }
        })
        .then(json => {
            // Si la autenticación es exitosa, redirigir
            window.location.href = 'shop.html';
        })
        .catch(err => {
            // Mostrar mensaje de error si las credenciales no son correctas o hay un problema en la red
            errorMessage.textContent = err.message;
        });
    });
});

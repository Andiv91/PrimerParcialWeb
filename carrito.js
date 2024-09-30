document.addEventListener("DOMContentLoaded", () => {
    const userId = 5; // El ID del usuario

    // Obtener los carritos desde la API de FakeStore
    fetch(`https://fakestoreapi.com/carts/user/${userId}`)
        .then(res => res.json())
        .then(carts => {
            const tbody = document.querySelector("#carrito-table tbody");

            carts.forEach(cart => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cart.id}</td>
                    <td>${new Date(cart.date).toLocaleDateString()}</td>
                    <td><a href="detalle.html?id=${cart.id}" class="ver-button">Ver</a></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});

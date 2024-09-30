document.addEventListener("DOMContentLoaded", () => {
    // Función para obtener parámetros de la URL
    const getQueryParams = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const cartId = getQueryParams("id");

    // Obtener el carrito específico desde la API
    fetch(`https://fakestoreapi.com/carts/${cartId}`)
        .then(res => res.json())
        .then(cart => {
            const pedidoInfo = document.querySelector(".pedido-info");
            pedidoInfo.innerHTML = `
                <p>Fecha: ${new Date(cart.date).toLocaleDateString()}</p>
                <p>Pedido Número: ${cart.id}</p>
                <p>Nombre del Cliente: User ${cart.userId}</p>
            `;

            const tbody = document.querySelector("#detalle-table tbody");

            cart.products.forEach(product => {
                fetch(`https://fakestoreapi.com/products/${product.productId}`)
                    .then(res => res.json())
                    .then(productDetail => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${productDetail.title}</td>
                            <td>${product.quantity}</td>
                            <td>$${productDetail.price}</td>
                            <td>$${(product.quantity * productDetail.price).toFixed(2)}</td>
                        `;
                        tbody.appendChild(row);
                    });
            });

            // Calcular el total
            const total = cart.products.reduce((acc, product) => acc + product.quantity * product.price, 0);
            document.querySelector(".total").innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
        })
        .catch(error => console.error('Error:', error));
});

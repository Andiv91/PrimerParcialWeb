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

            // Mostrar la fecha, id de pedido y usuario de manera dinámica
            document.getElementById("pedido-fecha").textContent = new Date(cart.date).toLocaleDateString();
            document.getElementById("pedido-id").textContent = cart.id;
            document.getElementById("pedido-cliente").textContent = `User ${cart.userId}`;

            const tbody = document.querySelector("#detalle-table tbody");
            tbody.innerHTML = ''; // Limpiar tabla de detalles

            let total = 0; // Inicializar total

            // Obtener los detalles de cada producto
            cart.products.forEach(product => {
                fetch(`https://fakestoreapi.com/products/${product.productId}`)
                    .then(res => res.json())
                    .then(productDetail => {
                        const subtotal = product.quantity * productDetail.price;
                        total += subtotal;

                        const row = document.createElement("tr");

                        // Generar una fila con input para la cantidad y recalcular en tiempo real
                        row.innerHTML = `
                            <td>${productDetail.title}</td>
                            <td>
                                <input type="number" min="1" value="${product.quantity}" data-price="${productDetail.price}" data-id="${product.productId}" class="quantity-input" />
                            </td>
                            <td>$${productDetail.price.toFixed(2)}</td>
                            <td class="subtotal">$${subtotal.toFixed(2)}</td>
                        `;
                        tbody.appendChild(row);

                        // Actualizar el total
                        document.getElementById("total-amount").textContent = total.toFixed(2);
                    });
            });

            // Evento para actualizar la cantidad y recalcular total
            tbody.addEventListener('input', (e) => {
                if (e.target.classList.contains('quantity-input')) {
                    const input = e.target;
                    const newQuantity = parseInt(input.value, 10);
                    const price = parseFloat(input.getAttribute('data-price'));
                    const productId = input.getAttribute('data-id');
                    
                    if (newQuantity > 0) {
                        // Recalcular el subtotal del producto
                        const newSubtotal = newQuantity * price;
                        input.closest('tr').querySelector('.subtotal').textContent = `$${newSubtotal.toFixed(2)}`;

                        // Recalcular el total
                        let newTotal = 0;
                        document.querySelectorAll('.quantity-input').forEach(input => {
                            const quantity = parseInt(input.value, 10);
                            const itemPrice = parseFloat(input.getAttribute('data-price'));
                            newTotal += quantity * itemPrice;
                        });
                        document.getElementById("total-amount").textContent = newTotal.toFixed(2);
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar los detalles del carrito:', error));
});

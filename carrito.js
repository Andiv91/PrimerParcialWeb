// Función para renderizar los pedidos en la tabla
function renderPedidos(pedidos) {
    const pedidosTable = document.getElementById('pedidos-table');
    pedidosTable.innerHTML = '';  // Limpiar el contenido existente

    pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        const fechaPedido = new Date(pedido.date).toLocaleDateString(); // Convertir fecha

        row.innerHTML = `
            <td>${pedido.id}</td>
            <td>${fechaPedido}</td>
            <td><a href="detalle.html?id=${pedido.id}" class="ver-button">Ver</a></td>
        `;
        pedidosTable.appendChild(row);
    });
}

// Obtener los pedidos desde la API
function fetchPedidos() {
    fetch('https://fakestoreapi.com/carts')
        .then(response => response.json())
        .then(pedidos => {
            renderPedidos(pedidos);
        })
        .catch(error => console.error('Error al obtener los pedidos:', error));
}

// Renderizar los pedidos al cargar la página
document.addEventListener('DOMContentLoaded', fetchPedidos);

// Simulación de datos de pedidos
const pedidos = [
    { numero: 12, fecha: '24/06/2022' },
    { numero: 1, fecha: '21/06/2022' },
    { numero: 3, fecha: '21/06/2022' }
];

// Función para renderizar los pedidos en la tabla
function renderPedidos() {
    const pedidosTable = document.getElementById('pedidos-table');
    pedidosTable.innerHTML = '';  // Limpiar el contenido existente

    pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.numero}</td>
            <td>${pedido.fecha}</td>
            <td><a href="detalle.html?pedido=${pedido.numero}" class="ver-button">Ver</a></td>
        `;
        pedidosTable.appendChild(row);
    });
}

// Renderizar los pedidos al cargar la página
document.addEventListener('DOMContentLoaded', renderPedidos);

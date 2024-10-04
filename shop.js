document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const categoriesContainer = document.getElementById('category-buttons');
    const userId = 5; // Asumiendo que el ID del usuario es 5

    // Función para cargar todas las categorías (API)
    function loadCategories() {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(categories => {
                categories.forEach(category => {
                    const btn = document.createElement('button');
                    btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                    btn.addEventListener('click', () => loadProducts(category));
                    categoriesContainer.appendChild(btn);
                });
            });

        // Cargar todos los productos al iniciar la página
        loadAllProducts();
    }

    // Función para cargar todos los productos (API)
    function loadAllProducts() {
        productsContainer.innerHTML = ''; // Limpiar el contenedor de productos

        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(products => {
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>$${product.price}</p>
                        <button data-id="${product.id}">Add</button>
                    `;
                    productsContainer.appendChild(productCard);
                });

                // Agregar evento al botón "Add"
                const addButtons = document.querySelectorAll('.product-card button');
                addButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.getAttribute('data-id');
                        addToCart(userId, productId);
                    });
                });
            });
    }

    // Función para cargar productos de una categoría específica
    function loadProducts(category) {
        productsContainer.innerHTML = ''; // Limpiar el contenedor de productos

        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then(products => {
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>$${product.price}</p>
                        <button data-id="${product.id}">Add</button>
                    `;
                    productsContainer.appendChild(productCard);
                });

                // Agregar evento al botón "Add"
                const addButtons = document.querySelectorAll('.product-card button');
                addButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.getAttribute('data-id');
                        addToCart(userId, productId);
                    });
                });
            });
    }

    // Función para agregar un producto al carrito de la API
    function addToCart(userId, productId) {
        // Simular agregar un producto al carrito del usuario con ID 5
        const cart = {
            userId: userId,
            date: new Date().toISOString(),
            products: [
                { productId: productId, quantity: 1 }
            ]
        };

        fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            body: JSON.stringify(cart),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log('Producto añadido:', json);
            alert(`Producto añadido al carrito: ${json.products[0].productId}`);
        })
        .catch(error => console.error('Error:', error));
    }

    // Cargar categorías y todos los productos cuando se inicia la tienda
    loadCategories();
});

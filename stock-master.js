// Sauvegarder les modifications
async function saveProduct() {
    try {
        const response = await fetch(JSON_BIN_URL, {
            headers: { "X-Master-Key": JSON_BIN_KEY }
        });
        const data = await response.json();
        let products = data.record;

        products[currentProductId] = {
            name: nameInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            image: products[currentProductId].image
        };

        await fetch(JSON_BIN_URL, {
            method: "PUT",
            headers: {
                "X-Master-Key": JSON_BIN_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(products)
        });

        loadProducts();
    } catch (error) {
        console.error("Erreur de sauvegarde:", error);
    }
}

    // Simple interactivity for the demo
    document.querySelector('button.bg-blue-700').addEventListener('click', function() {
        document.getElementById('addProductModal').classList.remove('hidden');
    });

    
document.addEventListener('DOMContentLoaded', fetchProducts);
document.addEventListener('DOMContentLoaded', function() {
    // Ajoutez l'écouteur d'événements pour le formulaire d'ajout de produit
    document.getElementById('addProductForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            reference: document.getElementById('productReference').value,
            price: parseFloat(document.getElementById('productPrice').value),
            quantity: parseInt(document.getElementById('productQuantity').value)
        };

        await addProduct(productData); // Appeler la fonction pour ajouter le produit
        closeModal(); // Fermer le modal après l'ajout
    });
});

// Fonction pour fermer le modal
function closeModal() {
    document.getElementById('addProductModal').classList.add('hidden'); // Masquer le modal
}



    async function addProduct(productData) {
    try {
        // Récupérer les données existantes
        const getResponse = await fetch('https://api.jsonbin.io/v3/b/685ece818561e97a502cde4a', {
            headers: {
                'X-Master-Key': '$2a$10$FBUwKcUwYQRm7bZQbDitjOBD6nIK8StVYx9dyu5G.GPwBmddUbKA.' // Remplacez par votre clé d'API
            }
        });

        if (getResponse.ok) {
            const currentData = await getResponse.json();
            currentData.record.push(productData); // Ajouter le nouveau produit

            // Mettre à jour le bin avec le tableau mis à jour
            const updateResponse = await fetch('https://api.jsonbin.io/v3/b/685ece818561e97a502cde4a', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$FBUwKcUwYQRm7bZQbDitjOBD6nIK8StVYx9dyu5G.GPwBmddUbKA.' // Remplacez par votre clé d'API
                },
                body: JSON.stringify(currentData.record)
            });

            if (updateResponse.ok) {
                console.log('Produit ajouté avec succès:', productData);
                // Vous pouvez également appeler une fonction pour mettre à jour l'interface utilisateur ici
            } else {
                console.error('Erreur lors de la mise à jour du produit:', updateResponse.statusText);
            }
        } else {
            console.error('Erreur lors de la récupération des données:', getResponse.statusText);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}
    async function fetchProducts() {
    try {
        const response = await fetch('https://api.jsonbin.io/v3/b/685ece818561e97a502cde4a', {
            headers: {
                'X-Master-Key': '$2a$10$FBUwKcUwYQRm7bZQbDitjOBD6nIK8StVYx9dyu5G.GPwBmddUbKA.' // Remplacez par votre clé d'API
            }
        });

        if (response.ok) {
            const data = await response.json();
            data.record.forEach(product => {
                addProductToGrid(product); // Ajouter chaque produit à la grille
            });
        } else {
            console.error('Erreur lors de la récupération des produits:', response.statusText);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

    
function addProductToGrid(product) {
    const productsGrid = document.getElementById('product_grid'); // Sélectionner la grille de produits
    const productCard = document.createElement('div');
    productCard.className = 'product-card bg-white rounded-lg shadow overflow-hidden';
    productCard.innerHTML = `
                <div class="h-40 bg-gray-200 flex items-center justify-center">
                    <i class="fas fa-image text-gray-400 text-4xl"></i>
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-lg">${product.name}</h3>
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${product.category}</span>
                    </div>
                    <p class="text-gray-500 text-sm mt-1">REF: ${product.reference}</p>
                    <div class="flex justify-between items-center mt-3">
                        <span class="font-bold text-blue-600">${product.price.toFixed(2)} €</span>
                        <div class="flex items-center">
                        <span class="text-sm text-gray-500 mr-2">Stock:</span>
                        <span class="font-medium">${product.quantity}</span>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 flex justify-end">
                <button class="text-blue-500 hover:text-blue-700 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
    `;
    productsGrid.appendChild(productCard); // Ajouter la carte produit à la grille
}


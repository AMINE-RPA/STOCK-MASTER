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

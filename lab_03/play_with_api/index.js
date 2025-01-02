// Zmienne globalne
let products = []; // tablica na prodyktu z JSONa

// Pobieramy dane asynchronicznie z API
async function fetchData() {
    try {
        // Czekamy z dalszą operacją aż dostaniemy dane
        const response = await fetch("https://dummyjson.com/products");
        // Otrzymanie danych w psotaci JSON
        const data = await response.json(); 
        // Zapisujemy dane tych produktów w tabeli
        products = data.products;
        // Wyświetlenie danych na stronie
        updateDisplay();
    } catch (error) {
        console.error("Error while fetching data: ", error);
    }
}


// Funkcja do filtrowania produktów
function filterProducts() {
    // Po czym mmay sortować
    const searchQuery = document.getElementById("search-input").value;
    // Filtrowanie tylko po tytułach
    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchQuery);
    });

    return filteredProducts;
}


// Funkcja sortująca dane
function sortProducts(sortedProducts) {
    // Pobranie opcji sortowania
    const optionPick = document.getElementById("sorting-options").value;

    switch(optionPick) {
        case "asc":
            return sortedProducts.toSorted((a, b) => a.title.localeCompare(b.title));
        case "dsc":
            return sortedProducts.toSorted((a, b) => b.title.localeCompare(a.title));
        case "original":
        default:
            return sortedProducts;
    };

}


// Funkcja do aktualizowania listy produktów
function updateDisplay() {
    const filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);

    // Wyświetlenie wyniku
    displayProducts(sortedProducts);
}


// Funkcja do wyświetlania danych na stronie
function displayProducts(data) {
    // Pobieramy miejsce gdzie będziemy dodawać elementy
    const productsContainer = document.getElementById("container");
    productsContainer.innerHTML = ""; // czyścimy ten element

    // Bierzemy każdy z produktów i umieszczamy go w gridzie
    data.forEach(product => {
        // Tworzymy kontener na element
        const singleProductsContainer = document.createElement("div");
        singleProductsContainer.className = "product-card";

        // Pobieranie i dodawanie zdjęcia
        const productImage = document.createElement("img");
        productImage.src = product.images;

        // Pobieranie i dodawanie tytułu
        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;

        // Pobieranie i dodawanie opisu
        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        // Dodajemy elementy do karty z produktem
        singleProductsContainer.appendChild(productImage);
        singleProductsContainer.appendChild(productTitle);
        singleProductsContainer.appendChild(productDescription);

        // Dodanie całej kart nas tronę
        productsContainer.appendChild(singleProductsContainer);
    });
}

// Wywołanie funkcji
fetchData();
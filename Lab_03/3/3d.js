let products = [];
fetchAndDisplayData()

async function fetchAndDisplayData() { //Pobieranie danych
    const container = document.getElementById('productsContainer');
    container.innerHTML = "";
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products;

    displayProducts(products);
}

async function displayProducts(productsToDisplay) { //Wyświetlanie danych
    const container = document.getElementById('productsContainer');
    container.innerHTML = "";

    productsToDisplay.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImage = document.createElement('img');
        productImage.src = item.thumbnail;
        productImage.alt = item.title;

        const productDetailsDiv = document.createElement('div');
        productDetailsDiv.classList.add('product-details');

        const productTitle = document.createElement('h');
        productTitle.textContent = item.title;

        const productDescription = document.createElement('p');
        productDescription.textContent = item.description;

        productDetailsDiv.appendChild(productTitle);
        productDetailsDiv.appendChild(productDescription);
        productDiv.appendChild(productImage);
        productDiv.appendChild(productDetailsDiv);
        container.appendChild(productDiv);
    });
}
let products = [];
let sortedProductsAZ = [];
let sortedProductsZA = [];
let url = 'https://dummyjson.com/products';
let container = document.querySelector("#productsContainer")
let i;

window.addEventListener('load', function () {
    alert("It's loaded!");
    console.log(container);
    if (!container) {
        console.error("Container element not found!");
    }
    initialize();
})

async function initialize() {
    await fetch(url)
        .then(res => res.json())
        .then(out =>
            products=out.products)
        .catch(err => console.log(err));
    sortedProductsAZ = [...products];
    sortedProductsAZ.sort((a, b) => a.title.localeCompare(b.title));
    sortedProductsZA = [...products];
    sortedProductsZA.sort((b, a) => a.title.localeCompare(b.title));
    displayProducts(products)
}

function displayProducts(products) {
    container.innerHTML = '';
    for (i = 0; i < products.length; i++) {
        displayElement(products[i])
    }
}

async function displayElement(product) {
    const elementContainer = document.createElement('div');
    const elementImage = document.createElement('img');
    const elementDetails = document.createElement('div');
    const elementTitle = document.createElement('h1');
    const elementDescription = document.createElement('p');

    elementContainer.classList.add('product');

    elementImage.src = product.thumbnail;
    elementTitle.textContent = product.title;
    elementDescription.textContent = product.description;

    elementDetails.appendChild(elementTitle);
    elementDetails.appendChild(elementDescription);

    elementContainer.appendChild(elementImage);
    elementContainer.appendChild(elementDetails);

    container.appendChild(elementContainer);
}

function search() {
    const text = document.querySelector("#search").value.toLowerCase();
    const searchedProducts = products.filter(product => product.title.toLowerCase().includes(text));
    displayProducts(searchedProducts);
}

function sort() {
    type = document.querySelector("#sort").value;
    if (type==="def") {
        displayProducts(products);
    }
    if (type==="A-Z") {
        displayProducts(sortedProductsAZ);
    }
    if (type==="Z-A") {
        displayProducts(sortedProductsZA);
    }
}
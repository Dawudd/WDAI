let products = [];
let url = 'https://dummyjson.com/products';
let container = document.querySelector("#productsContainer")
let i;
//obj = await (await fetch(url)).json();

window.addEventListener('load', function () {
    alert("It's loaded!")
})

async function initialize() {
    await fetch(url)
        .then(res => res.json())
        .then(out =>
            //console.log('Checkout this JSON! ', out))
            products=out.products)
        .catch(err => console.log(err));

    //console.log(products)
    displayProducts()
}

function displayProducts() {
    for (i = 0; i < products.length; i++) {
        displayElement(products[i])
    }
}

function displayElement(product) {
    console.log(product)
    const elementContainer = document.createElement('div');
    const elementImage = document.createElement('img');
    const elementDetails = document.createElement('div');
    const elementTitle = document.createElement('h1');
    const elementDescription = document.createElement('p');

    elementImage.src = product.image;
    elementTitle.textContent = product.title;
    elementDescription.textContent = product.description;

    elementDetails.appendChild(elementTitle);
    elementDetails.appendChild(elementDescription);

    elementContainer.appendChild(elementImage);
    elementContainer.appendChild(elementDetails);
}





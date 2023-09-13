// Tableau des produits
const products = [
    {
        name: 'Perfume',
        price: 100,
        image: 'https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        name: 'Soap',
        price: 200,
        image: 'https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Blush',
        price: 10,
        image: 'https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        name: 'Scrub',
        price: 50,
        image: 'https://images.pexels.com/photos/7795646/pexels-photo-7795646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        name: 'Jade Roller',
        price: 20,
        image: 'https://images.pexels.com/photos/6621434/pexels-photo-6621434.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Moisturizing Cream',
        price: 100,
        image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];

const cart = [];

// Fonction pour ajouter un produit au panier
function addToCart(product) {
    // Recherchez si le produit est déjà dans le panier
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        // Si le produit existe déjà, augmentez simplement la quantité
        existingProduct.quantity++;
    } else {
        // Sinon, ajoutez le produit au panier
        cart.push({ name: product.name, price: product.price, quantity: 1, image: product.image });
    }

    // Mettez à jour l'affichage du panier
    displayCart();
}

// Fonction pour générer dynamiquement les produits dans le HTML
function generateProductCards() {
    const productContainer = document.querySelector('.row');

    products.forEach(product => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4', 'col-lg-4');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.width = '18rem';

        // Créer une balise img pour afficher l'image du produit
        const productImage = document.createElement('img');
        productImage.classList.add('card-img-top');
        productImage.src = product.image;
        cardDiv.appendChild(productImage);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        // Ajouter le nom du produit
        const productName = document.createElement('h3');
        productName.textContent = product.name;
        cardBodyDiv.appendChild(productName);

        // Ajouter le prix du produit
        const productPrice = document.createElement('h4');
        productPrice.textContent = `$${product.price}`;
        cardBodyDiv.appendChild(productPrice);

        const addToCartButton = document.createElement('a');
        addToCartButton.classList.add('btn', 'btn-info');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => addToCart(product));

        cardBodyDiv.appendChild(addToCartButton);
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);

        const like = document.createElement('button'); // Create a button element for "like"
        like.classList.add('like-button');
        like.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('liked'); // Toggle the "liked" class on click
        });

        

        cardBodyDiv.appendChild(like);

        
        productContainer.appendChild(colDiv);
    });
}

// Initialisation : générer les produits dans le HTML
generateProductCards();

// Fonction pour enlever un produit du panier
function removeFromCart(productName) {
    // Recherchez l'indice du produit dans le panier
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        // Si le produit est trouvé dans le panier, diminuez la quantité
        cart[productIndex].quantity--;

        // Si la quantité atteint 0, retirez complètement le produit du panier
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }

        // Mettez à jour l'affichage du panier
        displayCart();
    }
}

// Fonction pour afficher le contenu du panier
function displayCart() {
    const cartTableBody = document.querySelector('tbody');
    const grandTotalElement = document.querySelector('.grand-total strong');

    // Effacez le contenu actuel du panier
    cartTableBody.innerHTML = '';

    let grandTotal = 0;

    // Parcourez les produits du panier et affichez-les dans le tableau
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input class="uk-checkbox" type="checkbox"></td>
            <td><img class="uk-preserve-width uk-border-circle" src="${item.image}" width="40" alt=""></td>
            <td class="uk-table-link">
                <h3 class="item-name">${item.name}</h3>
            </td>
            <td class="uk-text-truncate item-price"><h3>$${item.price}</h3></td>
            <td><input type='number' class='num' value='${item.quantity}'></td>
            <td class="uk-text-truncate total-price"><h3>$${item.price * item.quantity}</h3></td>
            <td><button class="uk-button uk-button-danger" type="button" onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;

        grandTotal += item.price * item.quantity;

        cartTableBody.appendChild(row);
    });

    // Mettez à jour le total général
    grandTotalElement.textContent = `$${grandTotal}`;
}


let productName = [];
let productPrice = [];
let amount = [];

let popular = [
    {
        "name": "Hamburger",
        "description": "Saftiges Rindfleisch Patty Grukerl, Tomaten, Senf und Ketchup",
        "price": 6.20
    },
    {
        "name": "BBQ-Burger",
        "description": "Rindfleisch Patty mit Bacon und Rauchiger BBQ-Sauce",
        "price": 7.90
    },
    {
        "name": "Salami Pizza",
        "description": "Tomatensauce, Käse, Salami und Oregano",
        "price": 8.20
    },
]

let burger = [
    {
        "name": "Hamburger",
        "description": "Saftiges Rindfleisch Patty Grukerl, Tomaten, Senf und Ketchup",
        "price": 6.20
    },
    {
        "name": "Cheeseburger",
        "description": "Rindfleisch Patty mit Cheddar",
        "price": 6.90
    },
    {
        "name": "Chickenburger",
        "description": "Saftiges Hühnerfleisch Patty mit firschem Salat und Salsa Sauce",
        "price": 6.90
    },
    {
        "name": "Double-Deluxe",
        "description": "2x Rindfleisch Patty mit Cheddar, Tomaten und firschem Salat",
        "price": 8.50
    },
    {
        "name": "BBQ-Burger",
        "description": "Rindfleisch Patty mit Bacon und Rauchiger BBQ-Sauce",
        "price": 7.90
    },
    {
        "name": "Texas-Burger",
        "description": "scharfer Burger mit Pfefferoni und Chilisauce",
        "price": 7.90
    },
]

let pizza = [
    {
        "name": "Margherita",
        "description": "Tomatensauce, Käse und Oregano",
        "price": 7.20
    },
    {
        "name": "Salami Pizza",
        "description": "Tomatensauce, Käse, Salami und Oregano",
        "price": 8.20
    },
    {
        "name": "Kebab Pizza",
        "description": "Tomatensauce, Käse, Kebabfleisch, Kebabsauce unf Zwiebel",
        "price": 9.50
    },
]

let salat = [
    {
        "name": "Griechischer Salat",
        "description": "",
        "price": 5.50
    },
    {
        "name": "Bauern Salat",
        "description": "",
        "price": 6.00
    },
]

let traditional = [
    {
        "name": "Wiener Schnitzel",
        "description": "",
        "price": 9.20
    },
]

let desert = [
    {
        "name": "Kaiserschmarnn",
        "description": "",
        "price": 7.00
    },
    {
        "name": "Schokokuchen",
        "description": "",
        "price": 4.00
    },
]

let nonAlcoholicDrinks = [
    {
        "name": "Coca Cola 0,33l",
        "description": "",
        "price": 2.50
    },
    {
        "name": "Fanta 0,5l",
        "description": "",
        "price": 3.00
    },
    {
        "name": "Ice Tea Pfirsich 0,5l",
        "description": "",
        "price": 2.70
    },
    {
        "name": "Mineralwasser 1l",
        "description": "",
        "price": 2.70
    },
]

let productImages = ['', 'img/burger2.jpg', 'img/pizza.jpg', 'img/salad.jpg', 'img/schnitzel.jpg', 'img/cake.jpg', 'img/coke.jpg']
let productCategories = [popular, burger, pizza, salat, traditional, desert, nonAlcoholicDrinks]
let productCategoryNames = ['Beliebte Gerichte', 'Burger & Co', 'Pizza', 'Salate', 'Traditionelle Küche', 'Nachspeisen', 'Alkoholfreie Getränke']


function render() {
    let container = document.getElementById('products');
    container.innerHTML = '';
    for (let i = 0; i < productCategories.length; i++) {
        renderProducts(container, productCategories[i], productCategoryNames[i], i)
    }
    renderShoppingCart();
    renderPopUpCart();
    renderToBasketButton();  
}


function renderProducts(container, category, categoryName, i) {
    //first product section has no slider
    if (i > 0) {
        renderProductSliderImages(container, i);
    }
    container.innerHTML += /*html*/ `
        <h3 class="current-category" id="${categoryName}">${categoryName}</h3>
    `;
    for (let i = 0; i < category.length; i++) {
        let name = category[i]['name'];
        let price = category[i]['price'];
        price = price.toFixed(2);
        priceAsText = price.replace('.', ',')
        let description = category[i]['description'];
        container.innerHTML += generateProductContainersHTML(name, price, priceAsText, description);
    }
}


function renderProductSliderImages(container, i) {
    return container.innerHTML += /*html*/ `
        <img class="slider-image" src="${productImages[i]}" alt="">
    `;
}


function generateProductContainersHTML(name, price, priceAsText, description) {
    return /*html*/ `
        <div class="product-container" onclick="addProduct('${name}', '${price}'), removeDnone()">
            <div class="product-container-child">
                <h3>${name}</h3>
                <p>${description}</p>
                <span class="price">${priceAsText} €</span>
            </div>  
            <img src="img/plus.png" alt="">
        </div>
    `;
}


function renderShoppingCart() {
    let cart = document.getElementById('cart-content');
    cart.innerHTML = '';
    let sumsection = document.getElementById('cart-content-sum-section');
    sumsection.innerHTML = '';
    //ensures that the pay button on the side and the one in the pop-up window have different ids
    //therefore i can use the same code 
    let buttonID = 'pay-button'
    if (!productName.length) {
        cart.innerHTML = emptyCartHTML();
    } else {
        for (let i = 0; i < productName.length; i++) {
            let price = calculateProductPrices(i)
            cart.innerHTML += filledCartHTML(price, i);
        }
        renderSumAndOrderSection(cart, buttonID, sumsection);
    }
}


function renderPopUpCart() {
    let cart = document.getElementById('pop-up-cart-content');
    cart.innerHTML = '';
    let sumsection = document.getElementById('pop-up-cart-sum-section');
    sumsection.innerHTML = '';

    let buttonID = 'pop-up-pay-button'
    if (!productName.length) {
         cart.innerHTML = emptyPopUPCartHTML();
    } else {
         for (let i = 0; i < productName.length; i++) {
             let price = calculateProductPrices(i)
             cart.innerHTML += filledCartHTML(price, i);
         }
         renderSumAndOrderSection(cart, buttonID, sumsection);
    }
}


function emptyCartHTML() {
    return /*html*/ `
        <div class="empty-cart">
            <img src="img/shopping-bag.png" alt="">
            <h3>Fülle deinen Warenkorb</h3>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        </div>    
    `;
}


function emptyPopUPCartHTML() {
    return /*html*/ `
        <div class="empty-cart">
            <img src="img/shopping-bag.png" alt="">
            <h3>Fülle deinen Warenkorb</h3>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
            <button class="empty-pop-up-cart-button" onclick="makePopUpCartInvisible()">Füge Artikel hinzu</button>
        </div>    
    `;
}


function calculateProductPrices(i) {
    let price = amount[i]*productPrice[i];
    price = price.toFixed(2).replace('.', ',');
    return price
}

function filledCartHTML(price, i) {
    return /*html*/ `
        <div class="cart-content-container">
            <div class="cart-content-container-child">
                <div class="cart-content-left">
                    <h5>${amount[i]}</h5>
                    <h5 class="cart-content-product-name">${productName[i]}</h5>
                </div>
                <p>${price} €</p>
            </div>
            <div class="add-and-remove-buttons">
                <img onclick="decreaseAmount(${i}), addDnone()" src="img/minus.png" alt="">
                <img onclick="increaseAmount(${i})" src="img/plus.png" alt="">
            </div>
        </div>
    `;
}


function increaseAmount(i) {
    amount[i]++;
    renderShoppingCart();
    renderPopUpCart();
}


function decreaseAmount(i) {
    if (amount[i] == 1) {
        productName.splice(i, 1);
        productPrice.splice(i, 1);
        amount.splice(i, 1);
    } else {
        amount[i]--;
    }
    renderShoppingCart();
    renderPopUpCart();
}


function renderSumAndOrderSection(cart, buttonID, sumsection) {
    let subtotal = calculateSubtotal();
    let subtotalText = subtotal.toFixed(2).replace('.', ',');
    let deliveryFee = 1;
    let deliveryFeeText = deliveryFee.toFixed(2).replace('.', ',')
    let sum = subtotal + deliveryFee;
    sum = sum.toFixed(2).replace('.', ',');
    if (subtotal < 8) {
        renderMinimumOrderValue(cart, subtotal);
    }
    sumsection.innerHTML = sumSectionHTML(subtotalText, deliveryFeeText, sum, buttonID);
    changePayButtonColor(subtotal, buttonID);
}


function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < productName.length; i++) {
        let price = amount[i]*productPrice[i];
        subtotal = subtotal + price;
    }
    return subtotal
}


function renderMinimumOrderValue(cart, subtotal) {
    let difference = 8 - subtotal;
    difference = difference.toFixed(2).replace('.', ',')
        
    cart.innerHTML += /*html*/ `
        <div class="difference-container">
            <p class="difference-text">Benötiger Betrag, um den Mindestbestellwert zu erreichen</p>
            <p>${difference} €</p>
        </div>
        <p class="min-order-explanation">
            Leider kannst du noch nicht bestellen. 
            Der Burgerladen liefert erst ab einem Mindestbestellwert von 8,00 € (exkl. Lieferkosten).
        </p>  
    `;
    }


function sumSectionHTML(subtotal, deliveryFee, sum, buttonID) {
    return /*html*/ `
        <div class="sum-and-order-container">
            <div class="sum-overview">
                <div class="sum-overview-child">
                    <p>Zwischensumme</p>
                    <p>${subtotal} €</p>
                </div>
                <div class="sum-overview-child">
                    <p>Lieferkosten</p>
                    <p>${deliveryFee} €</p>
                </div>
                <div class="sum-overview-child">
                    <h5>Gesamtkosten</h5>
                    <h5>${sum} €</h5>
                </div>
            </div>
            <button class="pay-button" id="${buttonID}" onclick="pay(${subtotal})">Bezahlen (${sum} €)</button>
        </div>
    `;  
}


function changePayButtonColor(value, buttonID) {
    if (value >= 8) {
        document.getElementById(buttonID).classList.add('change-button-to-blue')
    }
}


function pay(value) {
    if (value >= 8) {
        alert("Diese Seite dient nur zu Übungszwecken. \nDiese Funktion ist daher nicht verfügbar.")
    }
}


function addProduct(name, price){
    //get index of the product in the shopping cart (-1 if it is not in there)
    let index = indexOfProduct(name);

    if (index > -1) {
        amount[index]++; //increase amount if index is greater than -1 (product is in the shopping cart)
    } else { //add product if is not there
        productName.push(name);
        productPrice.push(price);
        amount.push(1);
    }

    render()
}


function indexOfProduct(name) {
    let index = productName.indexOf(name);
    return index
}


//Responsive Design


function removeDnone() {
    document.getElementById('bottom-placeholder').classList.remove('d-none')
    document.getElementById('open-shopping-basket-container').classList.remove('d-none')
}


function addDnone() {
    //if nothing is in the basket anymore -> the button "Warenkorb" should not be shown (only relevant on smaller screens)
    if (!amount.length) {
        document.getElementById('bottom-placeholder').classList.add('d-none')
        document.getElementById('open-shopping-basket-container').classList.add('d-none')
    }
}


function makePopUpCartVisible() {
    document.getElementById('pop-up-shopping-cart').classList.remove('d-none-pop-up')
}

function makePopUpCartInvisible() {
    document.getElementById('pop-up-shopping-cart').classList.add('d-none-pop-up')
} 


function renderToBasketButton() {
    let subtotal = calculateSubtotal();
    let amounts = calculateAmounts();
    subtotal = subtotal.toFixed(2).replace('.', ',');
    let button = document.getElementById('open-shopping-basket-button')
    button.innerHTML = /*html*/ `
        <div class="open-shopping-basket-button-container">
            <img src="img/shopping-bag-white.png" alt="">
            <span class="amount-counter">${amounts}</span>
        </div>
        Warenkorb (${subtotal} €)
        <div class="open-shopping-basket-button-container"></div>
    `;
}


function calculateAmounts() {
    let amounts = 0
    for (let i = 0; i < amount.length; i++) {
        amounts = amounts + amount[i];
    }
    return amounts
}


//to make sure the "cart-content container" is always the max height
//otherwise when scrolling down the max-height is to low and there is white space after the sum section
window.onscroll = function() {
    let cartContent = document.getElementById('cart-content');
    if (window.scrollY > 0) {
        cartContent.style = 'max-height: calc(100vh - 160.8px);'
    } else {
        cartContent.style = 'max-height: calc(100vh - 296.2px);'
    }
}
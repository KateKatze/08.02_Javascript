/**
 * JavaScript Shopping Cart
 */
var products = [{
    name: "Summer bouquet",
    image: "https://cdn.pixabay.com/photo/2016/11/21/16/02/basket-1846135_1280.jpg",
    price: 80.00,
    qtty: 1
}, {
    name: "Wedding bouquet",
    image: "https://cdn.pixabay.com/photo/2017/08/31/11/55/wedding-2700495__480.jpg",
    price: 120.00,
    qtty: 1
}, {
    name: "Spring bouquet",
    image: "https://cdn.pixabay.com/photo/2019/04/10/17/10/tulip-4117556__480.jpg",
    price: 45.00,
    qtty: 1
}];

for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class="product-title h3 m-3">${val.name}</p>
    <img class="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
        <p class="product-price h4 m-3">${val.price} €</p>
        <button class="btn btn-outline-danger p-1 product-button" type="button">In cart</button>
    </div>
    </div>
    `
}

var cart = [];

function addToCart(product) {
    let item = cart.find((val) => val.name == product.name);
    if (item) {
        item.qtty++;
    } else {
        cart.push(product)
    }
    createRows();
    Total();
    qttynum();
    // discount();
}


let btns = document.getElementsByClassName("product-button");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i]);
        sortPrice();
    })
}

function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
    }
    document.getElementById("cart-items").innerHTML = result;

    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            qttynum();
            Total();
            sortPrice();
        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            qttynum();
            Total();
            sortPrice();
        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            qttynum();
            Total();
            sortPrice();
        });
    }
}

function qttynum() {
    let qttynum = 0;
    for (let val of cart) {
        qttynum = qttynum + val.qtty;
    }
    document.getElementById("qttynum").innerHTML = qttynum;
}

function Discount(price) {
    // let discount = 0;
    // let totalpr = document.getElementById("price").innerHTML;
    var amount = 0;
    // if (totalpr >= 100.00) {
    //     discount = totalpr - (totalpr * 0.1);
    // }
    // document.getElementById("discount").innerHTML = discount;
    if (price >= 100) {
        amount = price * 0.1;
    }

    return amount;
}

function Total() {
    var total = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }

    var discount = Discount(total);
    document.getElementById("discount").innerHTML = discount.toFixed(2) + " €";
    var finalPrice = total - discount;
    document.getElementById("price").innerHTML = finalPrice.toFixed(2) + " €";
}

function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}

function sortPrice() {
    // let pricecart = document.getElementsByClassName("cart-price")[i].innerHTML;
    // let quantitycart = document.getElementsByClassName("cart-quantity")[i].innerHTML;
    // let priceQuant = pricecart * quantitycart;
    cart.sort((a, b) => (b.price * b.qtty) - (a.price * a.qtty)); // array.sort((a,b) => a.qtty - b.qtty)
    createRows();
}

// document.getElementById("btn-purchase").addEventListener("click", sortPrice);
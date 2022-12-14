const url = "http://localhost:5000";
const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');
// sessionStorage.setItem('cart', '[]');
// localStorage.setItem('cart', '[]');

getCartItems();
getAddresses();

//fetches food items in user's cart
function getCartItems() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    fillCartItems(cart);
}

//fill items that user has in their cart
function fillCartItems(items) {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';

    const totalPrice = items.reduce((acc, current) => acc + current.price * current.amount, 0);
    const amount = items.reduce((acc, current) => acc + current.amount, 0);

    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `
    <span>${amount} item(s)</span>
    <span class="price"">$${totalPrice}</span>
    `

    list.appendChild(header);
    items.map(e => {
        list.appendChild(createItem(e));
    });
}

//create cart item
function createItem(item) {
    const { id, name, image, price, amount } = item;
    const container = document.createElement('div');
    container.classList.add('item');
    container.setAttribute('id', id);
    container.innerHTML = `
        <div class="img-container"><img src="data:image/png;base64, ${image}"></div>
        <div class="info">
            <h3>${name} (x${amount})</h3>
            <div id="${id}-ingredients"</div>
            <span class="price">$${price * amount}</span>
            <div class="delete">
                <button onclick="removeOne(${id})" class="remove-one" title="Remove One"></button>
                <button onclick="removeAll(${id})" class="remove-all" title="Remove All"></button>
            </div>
        </div>
    `;
    fillIngredients(id);
    return container;
}

//get ingredients of food, and fill a list of them
function fillIngredients(foodId) {
    fetch(`${url}/foods/ingredients`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: foodId })
    })
        .then((res) => res.json())
        .then((res) => {
            //create ul element, then fill it with li's containing every ingredient
            const ul = document.createElement('ul');
            res.map(i => {
                i = i[0].toUpperCase() + i.substring(1); //capitalize first letter
                const li = document.createElement('li');
                li.textContent = i;
                ul.appendChild(li);
            })
            const item = document.getElementById(`${foodId}-ingredients`);
            item.appendChild(ul);
        })
        .catch((err) => console.error(err));
}


function removeOne(foodId) {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    let below0 = false;
    cart.forEach(i => {
        if (i.id === foodId) {
            i.amount = i.amount - 1;
            if (i.amount <= 0) {
                removeAll(foodId);
                below0 = true;
                return;
            }
        }
    });
    if (!below0) {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        fillCartItems(cart);
    }
}

function removeAll(foodId) {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const newCart = cart.filter(i => i.id !== foodId);
    console.log(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    fillCartItems(newCart);
}

function getAddresses() {
    fetch(`${url}/users/get-addresses`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionStorage.getItem('userId') })
    })
        .then((res) => res.json())
        .then((res) => {
            fillAddressList(res);
        })
        .catch((err) => console.error(err));
}

function createAddressBox(address) {
    const { name, district, city, street_name } = address;
    const box = document.createElement('div');
    box.classList.add('address');
    box.innerHTML = `
        <h3>${name}</h3>
        <p> ${district} District, ${city}, ${street_name} </p>
        <input type="radio" name="address" value="${name}">
    `;
    return box;
}

function fillAddressList(addresses) {
    const list = document.getElementById('address-list');
    list.innerHtml = '';
    addresses.forEach(e => {
        list.appendChild(createAddressBox(e));
    })
}
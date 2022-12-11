const url = "http://localhost:5000/";
const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');

getCartItems(id);

//fetches food items in user's cart
function getCartItems(id) {
    fetch(`${url}users/cart`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id })
    })
        .then((res) => res.json())
        .then((res) => {
            fillCartItems(res);
        })
        .catch((err) => console.error(err));
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
                <button onclick="remove('cart-remove-one', ${id})" class="remove-one" title="Remove One"></button>
                <button onclick="remove('cart-remove-all', ${id})" class="remove-all" title="Remove All"></button>
            </div>
        </div>
    `;
    fillIngredients(id);
    return container;
}

//get ingredients of food, and fill a list of them
function fillIngredients(foodId) {
    fetch(`${url}foods/ingredients`, {
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

function remove(type, foodId) {
    fetch(`${url}foods/${type}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, foodId: foodId })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status === 'SUCCESS') getCartItems(id);
        })
        .catch((err) => console.error(err));
}
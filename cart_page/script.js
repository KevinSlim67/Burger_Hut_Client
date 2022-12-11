const url = "http://localhost:5000/";
const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');

//fetches food items in user's cart
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

//fill items that user has in their cart
function fillCartItems(items) {
    const list = document.getElementById('cart-items');
    const totalPrice = items.reduce((acc, current) => acc + current.price, 0);
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `
    <span>${items.length} item(s)</span>
    <span class="price"">$${totalPrice}</span>
    `

    const itemsCount = countObjects(items);
    const itemsList = removeDuplicateObjects(items);

    //add item count to each item
    for (let i = 0; i < itemsList.length; i++) {
        const key = itemsList[i].id;
        const count = itemsCount[key];
        itemsList[i].count = count;
    }

    list.appendChild(header);
    itemsList.map(e => {
        list.appendChild(createItem(e));
    });
}

//create cart item
function createItem(item) {
    const { id, name, image, price, count } = item;
    const container = document.createElement('div');
    container.classList.add('item');
    container.setAttribute('id', id);
    container.innerHTML = `
        <div class="img-container"><img src="data:image/png;base64, ${image}"></div>
        <div class="info">
            <h3>${name} (x${count})</h3>
            <div id="${id}-ingredients"</div>
            <span class="price">$${price * count}</span>
            <div class="delete">
                <button class="remove-one" title="Remove One"></button>
                <button class="remove-all" title="Remove All"></button>
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

function countObjects(arr) {
    // Use the reduce() method to create an object with the objects as keys and the counts as values
    const count = arr.reduce((acc, obj) => {
        const key = obj.id;
        if (acc[key] === undefined) {
            acc[key] = 1;
        } else {
            acc[key]++;
        }
        return acc;
    }, {});

    return count;
}

function removeDuplicateObjects(arr) {
    return arr.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
}
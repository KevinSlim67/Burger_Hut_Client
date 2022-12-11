const url = "http://localhost:5000/foods";

//get all buttons that are supposed to switch the category of items displayed
const buttons = (() => {
    const container = document.getElementById('category-list');
    return container.getElementsByTagName('button');
})();

//assign every category button the function that lets them retrieve data from server
for (let i = 0; i < buttons.length; i++) {
    const category = buttons[i].textContent;
    buttons[i].onclick = () => getCategoryItems(category);
}

//remove all items from current list, then get list of food items with specific category from server
function getCategoryItems(cat) {
    highlightSelectedItem(cat);

    //empties current food list
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';

    //fetches new data
    fetch(`${url}/category`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: cat })
    })
        .then((res) => res.json())
        .then((res) => {
            fillItemsList(res);
        })
        .catch((err) => console.error(err));
}

function highlightSelectedItem(cat) {
    const container = document.getElementById('category-list');
    const buttons = container.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected'); //remove select effect from old selected button
        const text = buttons[i].textContent;
        if (text === cat) {
            buttons[i].classList.add('selected'); //add select effect to clicked button
        }
    }
}

//create item card
function createItem(item) {
    const { id, name, price, image } = item;
    const itemCard = document.createElement('div');
    itemCard.classList.add('food-card');
    itemCard.innerHTML =
        `
        <img class="picture" src="data:image/png;base64, ${image}" alt="${name}" loading="lazy" />
        <div class="content">
            <h3>${name}</h3>
            <h4>$${price}</h4>
        </div>
        <button class="add"></button>
        `;

    //get ingredients, capitalize them, then add them to item object
    getIngredients(id).then((res) => {
        item.ingredients = [...res].map(i => {
            return i.charAt(0).toUpperCase() + i.slice(1).toLowerCase();
        });
    });

    itemCard.addEventListener('click', () => showItemDetails(item), false);


    return itemCard;
}

//fill food list with item cards with the present data
function fillItemsList(arr) {
    const list = document.getElementById('food-list');
    arr.forEach(e => {
        list.appendChild(createItem(e));
    });
}

function createItemDetails(item) {
    const { id, name, price, image, rating, cooktime, ingredients } = item;

    const ratingDiv = (rating !== null) ? `<h5 class="rating">${rating}</h5>` : '';
    const cookTimeDiv = (cooktime !== null) ? `<h5 class="cook-time">${cooktime} min</h5>` : '';

    const ingredientDiv = (ingredients.length > 0) ? ` 
    <div>
        <h5>Ingredients</h5>
        <p>${ingredients.join(' - ')}<p/>
    </div>` : '';

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('food-details');
    itemDetails.innerHTML = `
    <img src="data:image/png;base64, ${image}">
    <div class="details">
        <div class="info">
            <div>
                <div class="split-container">
                    <div class="left">
                        <h3>${name}</h3>
                        ${ratingDiv}
                        ${cookTimeDiv}
                    </div>
                    <div class="right"> 
                        <h4>$${price}</h4>
                        <div class="counter">
                        <button onclick="decrementCounter(this)">-</button>
                        <span id="amount" class="number">0</span>
                        <button onclick="incrementCounter(this)">+</button>
                        </div>
                    </div>
                </div>
                <hr>
                ${ingredientDiv}
            </div>
            <button class="type1 full cart" onclick="addToCart(${id})">
                <img src="./../assets/icons/cart.png" alt="" />
                Add To Cart
            </button>
        </div>
        <div class="image">
            <img src="data:image/png;base64, ${image}" alt="${name}">
        </div>
    </div>
    <button class="back" onclick="hideItemDetails()"></button>
    <button class="favorite"></button>
    `;
    return itemDetails;
}

const getIngredients = async (id) => {
    try {
        const response = await fetch(`${url}/ingredients`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return [];
    }
}


function showItemDetails(item) {
    hideItemDetails();
    const body = document.body;
    const div = createItemDetails(item);
    body.appendChild(div);
}

function incrementCounter() {
    const counter = document.getElementsByClassName('number')[0];
    let num = parseInt(counter.textContent);
    if (num + 1 < 100) counter.textContent = ++num;
}

function decrementCounter() {
    const counter = document.getElementsByClassName('number')[0];
    let num = parseInt(counter.textContent);
    if (num - 1 >= 0) counter.textContent = --num;
}

function hideItemDetails() {
    const body = document.body;
    const itemDetails = document.getElementsByClassName('food-details')[0];
    if (itemDetails !== undefined) body.removeChild(itemDetails);
}

function addToCart(foodId) {
    const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
    const amount = parseInt(document.getElementById('amount').textContent);
    if (amount === 0) return; //TODO : Display message that user has to specify an amount
    //adds food item to cart
    fetch(`${url}/add-to-cart`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId , foodId: foodId, amount: amount })
    })
        .then((res) => res.json())
        .then((res) => {
            //TODO : Display message that confirms that data has been sent
        })
        .catch((err) => console.error(err));
}
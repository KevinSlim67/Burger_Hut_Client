const url = "http://localhost:5000/foods";
const popup = document.getElementById('popup');
let temporaryTotalAmount = 0; //stores total amount of items added, it resets to 0 when popup setTimeout() is done
let timerId = null; //stores the current popup timer, useful to terminate it in case another one is triggered before this one is finished

getCategoryItems('Beef'); //by default display beef category

//hides cart button if user isn't logged in
if (sessionStorage.getItem('userId') === 'null') {
    const btn = document.querySelector('#cart-btn');
    btn.style.display = 'none';
} else updateCartBtnAmount();

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

    fetch(`${url}/${cat}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((res) => {
            fillItemsList(res);
        })
        .catch((err) => {
            popup.setAttribute('status', 'error');
            popup.setAttribute('text', `Uh oh, we couldn't get the items. If the issue persists, try again later.`);
            console.error(err);
        });
}


//highlights category button selected and unhighlights the rest
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
            <button class="view">View</button>
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
    list.innerHTML = '';
    arr.forEach(e => {
        list.appendChild(createItem(e));
    });
}

//displays a box that displays all details about item such as ingredients and cooktime 
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

//get a food item's ingredients
const getIngredients = async (id) => {
    try {
        const response = await fetch(`${url}/${id}/ingredients`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return [];
    }
}



function showItemDetails(item) {
    hideItemDetails(); //if another details pane is shown, delete it before displaying new one
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

//removes food item details pane
function hideItemDetails() {
    const body = document.body;
    const itemDetails = document.getElementsByClassName('food-details')[0];
    if (itemDetails !== undefined) body.removeChild(itemDetails);
}

//add food item to cart, and specifies the amount added
function addToCart(foodId) {
    const amount = parseInt(document.getElementById('amount').textContent);

    //if user isn't logged in, display a warning popup and exit out of function
    if (sessionStorage.getItem('userId') === 'null') {
        popup.setAttribute('status', 'error');
        popup.setAttribute('text', `You need to login in order to add an item to your cart !`);
        return false;
    };

    //if the amount set is 0, display a warning popup and exit out of function
    if (amount === 0) {
        popup.setAttribute('status', 'error');
        popup.setAttribute('text', `You need to specify an amount !`);
        return false;
    };

    //adds food item to cart
    fetch(`${url}/id/${foodId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            //if item already present in cart, just increment amount instead of adding the item again
            const cart = JSON.parse(sessionStorage.getItem('cart'));

            //checks if item is already in cart, if it is, increment its amount instead of adding it again
            let exists = false;
            cart.forEach(i => {
                if (i.id === foodId) {
                    i.amount = i.amount + amount;
                    exists = true;
                }
            });
            if (!exists) cart.push({ ...res, amount: amount });

            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartBtnAmount();
            handleSuccessPopup(amount, res);
        })
        .catch((err) => {
            popup.setAttribute('status', 'error');
            popup.setAttribute('text', `Uh oh, there appears to have been a problem. If the issue persists, try again later.`);
            console.error(err)
        });
}

//handles the success popup that appear if addToCart() is successful
function handleSuccessPopup(amount, res) {
    popup.setAttribute('status', 'success');
    popup.setAttribute('text', `${amount + temporaryTotalAmount} ${res.name}(s) added to cart`);
    //if the timer of the first timer isn't done, then cancel it, and start a new timer
    //with the amount updated
    if (timerId === null) {
        timerId = setTimeout(() => {
            temporaryTotalAmount = 0;
        }, 5000);
    } else {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            temporaryTotalAmount = 0;
        }, 5000);
    }
    temporaryTotalAmount += amount;
}

//updates the cart button amount that is on the bottom right of the screen
function updateCartBtnAmount() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const total = cart.reduce((total, item) => total + item.amount, 0);
    const btn = document.getElementById('cart-btn-amount');
    btn.innerText = total;
}

//compares the string inputted in the search bar with all the food items in the DB, then returns the results
function search() {
    const input = document.getElementById('search-bar').value;
    if (input === '') return;

    fetch(`${url}/search/${input}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .then((res) => {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('selected'); //remove select effect from old selected button
            }
            fillItemsList(res);
        })
        .catch((err) => console.error(err));
}
const items = [{
    name: 'Hamburger',
    price: 5.99,
    image: './../assets/computer/demo_burger.png',
    rating: 4,
    cookTime: 5
}, {
    name: 'Chicken Burger',
    price: 6.99,
    image: './../assets/computer/demo_burger.png',
    rating: 5,
    cookTime: 3
}, {
    name: 'Fish Burger',
    price: 7.99,
    image: './../assets/computer/demo_burger.png',
    rating: 3,
    cookTime: 6
}, {
    name: 'Hamburger',
    price: 5.99,
    image: './../assets/computer/demo_burger.png',
    rating: 4,
    cookTime: 6
}, {
    name: 'Chicken Burger',
    price: 6.99,
    image: './../assets/computer/demo_burger.png',
    rating: 4,
    cookTime: 3
}, {
    name: 'Fish Burger',
    price: 7.99,
    image: './../assets/computer/demo_burger.png'
}];

fillItemsList(items);

//create item card
function createItem(item) {
    const { name, price, image } = item;
    const itemCard = document.createElement('div');
    itemCard.classList.add('food-card');
    itemCard.innerHTML =
        `
        <img class="picture" src="${image}" alt="${name}" />
        <div class="content">
            <h3>${name}</h3>
            <h4>$${price}</h4>
        </div>
        <button class="add"></button>
        `;
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
    const { name, price, image, ingredients, rating, cookTime } = item;
    const itemDetails = document.createElement('div');
    itemDetails.classList.add('food-details');
    itemDetails.innerHTML = `
    <img src="../assets/computer/demo_burger.png">
    <div class="details">
        <div class="info">
            <div>
                <div class="split-container">
                    <div class="left">
                        <h3>${name}</h3>
                        <h5 class="rating">${rating}</h5>
                        <h5 class="cook-time">${cookTime} min</h5>
                    </div>
                    <div class="right"> 
                        <h4>$${price}</h4>
                        <div class="counter">
                        <button onclick="decrementCounter(this)">-</button>
                        <span class="number">0</span>
                        <button onclick="incrementCounter(this)">+</button>
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <h5>Ingredients</h5>
                    <p>Ham, Cheese, Tomato, Lettuce, Pickles, Onion.<p/>
                </div>
            </div>
            <button class="type1 full">Add To Cart</button>
        </div>
        <div class="image">
            <img src="${image}" alt="${name}">
        </div>
    </div>
    <button class="back" onclick="hideItemDetails()"></button>
    <button class="favorite"></button>
    `;
    return itemDetails;
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


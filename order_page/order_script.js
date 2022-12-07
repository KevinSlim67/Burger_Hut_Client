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
    let items = [];
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
            items = res;
            fillItemsList(items);
        })
        .catch((err) => console.error(err));
}

function highlightSelectedItem(cat) {
    const container = document.getElementById('category-list');
    const buttons =  container.getElementsByTagName('button');
    
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
    const { name, price, image } = item;
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
    const { name, price, image, ingredients, rating, cooktime } = item;
    const itemDetails = document.createElement('div');
    itemDetails.classList.add('food-details');
    itemDetails.innerHTML = `
    <img src="${image}">
    <div class="details">
        <div class="info">
            <div>
                <div class="split-container">
                    <div class="left">
                        <h3>${name}</h3>
                        <h5 class="rating">${rating}</h5>
                        <h5 class="cook-time">${cooktime} min</h5>
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
                    <p>aaaaaa<p/>
                </div>
            </div>
            <button class="type1 full">Add To Cart</button>
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


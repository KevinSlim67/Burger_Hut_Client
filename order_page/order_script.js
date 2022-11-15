function showFoodDetail() {
    hideFoodDetail();
    const body = document.body;
    const div = document.createElement('div');
    div.classList.add('food-details');

    div.innerHTML = `
    <img src="../assets/computer/demo_burger.png">
    <div class="details">
        <div class="info">
            <div>
                <div class="split-container">
                    <div class="left">
                        <h3>Hamburger</h3>
                        <h5 class="rating">4.2</h5>
                        <h5 class="cook-time">7 min</h5>
                    </div>
                    <div class="right"> 
                        <h4>$4.99</h4>
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
            <img src="../assets/computer/demo_burger.png" alt="food name">
        </div>
    </div>
    <button class="back" onclick="hideFoodDetail()"></button>
    <button class="favorite"></button>
    `;

    body.append(div);
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

function hideFoodDetail() {
    const body = document.body;

    const div = document.getElementsByClassName('food-details')[0];
    if (div !== undefined) body.removeChild(div);
}
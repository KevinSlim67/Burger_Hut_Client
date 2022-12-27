userId = sessionStorage.getItem('userId');

getOrders();

//Get the 10 latest user's orders
function getOrders() {
    fetch(`${url}/orders/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            fillOrderList(res);
        })
        .catch((err) => console.error(err));
}

//fill order list with orders from user
function fillOrderList(arr) {
    //empties current food list
    const list = document.getElementById('order-list');
    list.innerHTML = '';

    arr.forEach(e => {
        list.appendChild(createOrderBox(e));
    });
}

//create a box where you can see a user's previous or ongoing order
function createOrderBox(order) {
    const { id, status, ordered_date, total_price, phone_number, driver_id } = order;
    const orderedDate = ordered_date.substring(0, ordered_date.indexOf('.')).replace('T', ' ');
    let driverField = '';
    if (driver_id !== null) driverField = `<li><img src="./../assets/icons/order_driver.png" alt="">Driver</li>`

    const orderBox = document.createElement('div');
    orderBox.classList.add('order');
    orderBox.setAttribute('id', id);
    orderBox.innerHTML = `
    <div>
        <h2>Order ID: ${id}</h2>
        <span class="status">${status}</span>
    </div>
    <div class="info">
        <ul>
            <li><img src="./../assets/icons/order_date.png" alt="">${orderedDate}</li>
            <li><img src="./../assets/icons/order_date.png" alt="">${orderedDate}</li>
            <li><img src="./../assets/icons/order_address.png" alt="">Home</li>
        </ul>
        <ul>
            <li><img src="./../assets/icons/order_phone.png" alt="">${phone_number}</li>
            <li><img src="./../assets/icons/order_branch.png" alt="">Dekwaneh</li>
            ${driverField}
        </ul>
    </div>
    <hr />
    <p id=${`${id}-food`}>${getFood(id)}</p>
    <div>
        <span class="price">$${total_price}</span>
        <button class="re-order">
            <img src="./../assets/icons/refresh.png" />Re-Order
        </button>
    </div>
    `;

    return orderBox;
}

function getFood(orderId) {
    fetch(`${url}/orders/food/${orderId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            const list = res.map(e => `${e.amount} ${e.name}`).join(' - ');
            const order = document.getElementById(`${orderId}-food`);
            order.innerText = list;
        })
        .catch((err) => console.error(err));
}

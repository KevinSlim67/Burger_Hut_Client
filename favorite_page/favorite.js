const url = "http://localhost:5000";

getFavoriteItems(sessionStorage.getItem('userId'));

//get list of user's favorite food items 
function getFavoriteItems(id) {
    fetch(`${url}/users-favorites/${id}`, {
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

//fill food list with item cards with the present data
async function fillItemsList(arr) {
    const list = document.getElementById('food-list');
    list.innerHTML = '';
    for (const e of arr) {
        const item = await getItem(e.food_id);
        list.appendChild(createItem(item));
    }
}

//create item card
function createItem(item) {
    let isFavorite = true;

    const { id, name, price, image } = item;
    const itemCard = document.createElement('div');
    itemCard.classList.add('food-card');

    itemCard.setAttribute('id', id);

    if (isFavorite) {
        itemCard.classList.add('favorite');
        itemCard.setAttribute('favorite', isFavorite);
    }

    itemCard.innerHTML =
        `
        <img class="picture" src="data:image/png;base64, ${image}" alt="${name}" loading="lazy" />
        <div class="content">
            <h3>${name}</h3>
            <h4>$${price}</h4>
            <button class="view">View</button>
        </div>
        <button id="${id}-favorite" class="add" onclick="toggleFavorite(this); event.stopPropagation();"></button>
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


function getItem(id) {
    return fetch(`${url}/foods/id/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((err) => {
            popup.setAttribute("status", "error");
            popup.setAttribute("text", `Uh oh, we couldn't get the food item. If the issue persists, try again later.`);
            console.error(err);
        });
}

//get a food item's ingredients
const getIngredients = async (id) => {
    try {
        const response = await fetch(`${url}/foods/${id}/ingredients`, {
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


function toggleFavorite(element) {
    const id = element.id.split('-')[0];
    const itemCard = document.getElementById(id);
    const isFavorite = JSON.parse(itemCard.getAttribute('favorite'));
    if (isFavorite) {
        itemCard.classList.remove('favorite');
        itemCard.setAttribute('favorite', false);
    } else {
        itemCard.classList.add('favorite');
        itemCard.setAttribute('favorite', true);
    }
    //getFavoriteItems(sessionStorage.getItem('userId'));
}

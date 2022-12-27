const url = 'http://localhost:5000';

let userId = JSON.parse(sessionStorage.getItem('userId'));
if (userId === null) {
    userId = localStorage.getItem('userId');
    sessionStorage.setItem('userId', localStorage.getItem('userId'));
    sessionStorage.setItem('firstName', localStorage.getItem('firstName'));
    rememberCart();
}

function rememberCart() {
    if (sessionStorage.getItem('cart') === null || sessionStorage.getItem('cart').charAt(0) !== '[') {
        sessionStorage.setItem('cart', JSON.stringify([]));
    } else {
        sessionStorage.setItem('cart', localStorage.getItem('cart'));
    }
}

const layout = document.getElementById('layout');

//create blank popup-component
let popupComponent = document.createElement('popup-component');
popupComponent.setAttribute('id', 'popup');
layout.appendChild(popupComponent);
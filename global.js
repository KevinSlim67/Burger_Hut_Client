const url = 'http://localhost:5000';

const layout = document.getElementById('layout');

//create blank popup-component
let popupComponent = document.createElement('popup-component');
popupComponent.setAttribute('id', 'popup');
layout.appendChild(popupComponent);
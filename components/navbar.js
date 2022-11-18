class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav>
            <div class="brand">
                <img class="logo" src="./../assets/logo.png" alt="" />
                <h1>Burger Hut</h1>
            </div>
            <div class="links">
                <a href="">About Us</a>
                <a href="">Order</a>
                <a href="">Contact Us</a>
            </div>
            <div class="extra-links">
                <button class="favorite" title="Favorites"></button>
                <button class="order-history" title="Order History"></button>
                <button class="address-book" title="Address Book"></button>
                <button class="settings" title="Settings"></button>
                <span>Username</span>
                <button class="sign">Sign out</button>
            </div>

            <button class="hamburger" onClick=""></button>

        </nav>
        `;
    }
}

customElements.define('navbar-component', Navbar);
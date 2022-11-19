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
                <a href="./../order_page/order_page.html">Order</a>
                <a href="">Contact Us</a>
            </div>
            <div class="extra-links">
                <a href="./../favorite_page/favorite.html"
                 class="nav-favorite" title="Favorites"></a>

                <a href="./../order_history_page/order_history_page.html"
                 class="nav-order-history" title="Order History"></a>

                <a href="./../settings_page/settings_page.html#address-book"
                 class="nav-address-book" title="Address Book"></a>

                <a href="./../settings_page/settings_page.html#account-details"
                 class="nav-settings" title="Settings"></a>

                <span>Username</span>
                <a href="./../sign_in_page/sign_in_page.html" class="sign">Sign out</a>
            </div>

            <button class="hamburger" onClick=""></button>

        </nav>
        `;
    }
}

customElements.define('navbar-component', Navbar);
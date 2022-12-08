let userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');

let navbar = `
    <nav>
        <div class="content">
            <div class="brand">
                <img class="logo" src="./../assets/logo.png" alt="" />
                <h1>Burger Hut</h1>
            </div>
            <div class="links">
                <a href="./../home_page/home_page.html">Home</a>
                <a href="./../order_page/order_page.html">Order</a>
                <a href="./../contact_page/contact_page.html">Contact Us</a>
            </div>

            <div class="extra-links" style="display: flex;">
                <a href="./../sign_in_page/sign_in_page.html" class="sign in">Sign in</a>
                <a href="./../sign_in_page/sign_up_page.html" class="sign up">Sign up</a>
            </div> 
        </div>
    </nav>
`;

let signedIn = `
    <nav>
            <div class="content">
            <div class="brand">
                <img class="logo" src="./../assets/logo.png" alt="" />
                <h1>Burger Hut</h1>
            </div>
            <div class="links">
                <a href="./../home_page/home_page.html">Home</a>
                <a href="./../order_page/order_page.html">Order</a>
                <a href="./../contact_page/contact_page.html">Contact Us</a>
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

            <span>${sessionStorage.getItem('firstName') || localStorage.getItem('firstName')}</span>
            <button id="sign-out" class="sign">Sign out</button>
        </div>
        
        <button class="hamburger" onClick=""></button>
        </div>
    </nav>
`

if (userId !== null) {
    navbar = signedIn;
}


class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="empty"></div>
        ${navbar}
        `;

        if (userId !== null) {
            const signOut = document.getElementById('sign-out');
            signOut.onclick = () => {
                localStorage.clear();
                sessionStorage.clear();
                window.location = './../sign_in_page/sign_in_page.html';
            }
        }
    }
}

customElements.define('navbar-component', Navbar);
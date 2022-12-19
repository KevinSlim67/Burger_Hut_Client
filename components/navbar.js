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

let navbar = `
    <nav>
        <div class="content">
            <div>
                <div class="brand">
                    <img class="logo" src="./../assets/logo.png" alt="" />
                    <h1>Burger Hut</h1>
                </div>
                <div class="links">
                    <a href="./../home_page/home_page.html">Home</a>
                    <a href="./../order_page/order_page.html">Order</a>
                    <a href="./../contact_page/contact_page.html">Contact Us</a>
                </div>
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
            <div>
                <div class="brand">
                    <img class="logo" src="./../assets/logo.png" alt="" />
                    <h1>Burger Hut</h1>
                </div>
                <div class="links">
                    <a href="./../home_page/home_page.html">Home</a>
                    <a href="./../order_page/order_page.html">Order</a>
                    <a href="./../contact_page/contact_page.html">Contact Us</a>
                </div>
            </div>

            <div class="extra-links">
            <a href="./../favorite_page/favorite.html"
             class="nav-favorite" title="Favorites"></a>

            <a href="./../order_history_page/order_history_page.html"
             class="nav-order-history" title="Order History"></a>

            <a href="./../profile_page/profile_page.html#address-book"
             class="nav-address-book" title="Address Book"></a>

            <a href="./../profile_page/profile_page.html#account-details"
             class="nav-profile" title="Profile"></a>

            <a href="./../cart_page/cart_page.html"
             class="nav-cart" title="Cart"></a>

            <span>${sessionStorage.getItem('firstName') || sessionStorage.getItem('firstName')}</span>
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
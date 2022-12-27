let navbar = `
    <nav>
        <div class="content">
            <div>
                <div class="brand">
                    <img class="logo" src="./../assets/logo.png" alt="" />
                    <h1>Burger Hut</h1>
                </div>
                <div class="links">
                    <a href="./../home_page/home.html">Home</a>
                    <a href="./../order_page/order.html">Order</a>
                    <a href="./../contact_page/contact.html">Contact Us</a>
                </div>
            </div>

            <div class="extra-links" style="display: flex;">
                <a href="./../sign_in_page/sign_in.html" class="sign in">Sign in</a>
                <a href="./../sign_in_page/sign_up.html" class="sign up">Sign up</a>
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
                    <a href="./../home_page/home.html">Home</a>
                    <a href="./../order_page/order.html">Order</a>
                    <a href="./../contact_page/contact.html">Contact Us</a>
                </div>
            </div>

            <div class="extra-links">
            <a href="./../favorite_page/favorite.html"
             class="nav-favorite" title="Favorites"></a>

            <a href="./../order_history_page/order_history.html"
             class="nav-order-history" title="Order History"></a>

            <a href="./../profile_page/profile.html#address-book"
             class="nav-address-book" title="Address Book"></a>

            <a href="./../profile_page/profile.html#account-details"
             class="nav-profile" title="Profile"></a>

            <a href="./../cart_page/cart.html"
             class="nav-cart" title="Cart"></a>

            <span>${sessionStorage.getItem('firstName') || sessionStorage.getItem('firstName')}</span>
            <button class="sign sign-out">Sign out</button>
        </div>

        <button id="hamburger" class="hamburger"></button>
        <ul id="dropdown-list" class="dropdown-list">
            <li><a href="./../favorite_page/favorite.html">Favorites</a></li>
            <li><a href="./../order_history_page/order_history.html">Order History</a></li>
            <li><a href="./../profile_page/profile.html#address-book">Address Book</a></li>
            <li><a href="./../profile_page/profile.html#account-details">Profile</a></li>
            <li><a href="./../cart_page/cart.html">Cart</a></li>
            <li><button class="sign-out">Sign Out</button></li>
        </ul>
    </nav>
`

if (userId !== null) {
    navbar = signedIn;
}

class Navbar extends HTMLElement {

    dropdownActivated = false;

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="empty"></div>
        ${navbar}
        `;

        this.dropdownToggle();
        this.signOutSetting();
    }

    //adds function to hamburger button that lets user toggle on and off the dropdown list
    dropdownToggle() {
        const toggleButton = document.querySelector('#hamburger');
        if (toggleButton === null) return; //if togglebutton isn't found, meaning it's a big screen, stop the function
        const dropdown = document.querySelector('#dropdown-list')
        toggleButton.addEventListener('click', () => {
            if (!this.dropdownActivated) {
                dropdown.style.display = 'flex';
                this.dropdownActivated = true;
            } else {
                dropdown.style.display = 'none';
                this.dropdownActivated = false;
            }     
        });
    }

    //adds function to signout button that logs user out and clears their storage
    signOutSetting() {
        if (userId !== null) {
            const buttons = document.querySelectorAll('.sign-out');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onclick = () => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location = './../sign_in_page/sign_in.html';
                }
            }
        }
    }
}

customElements.define('navbar-component', Navbar);
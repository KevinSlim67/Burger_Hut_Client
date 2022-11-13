class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav>
            <img class="logo" src="./../assets/logo.png" alt="" />
            <div>
                <a href="">About Us</a>
                <a href="">Order</a>
                <a href="">Contact Us</a>
            </div>
            <button onClick="">
                <img class="hamburger" src="./../assets/icons/hamburger.png" alt="" />
            </button>
        </nav>
        `;
    }
}

customElements.define('navbar-component', Navbar);
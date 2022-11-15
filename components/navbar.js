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
            <button class="hamburger" onClick=""></button>
        </nav>
        `;
    }
}

customElements.define('navbar-component', Navbar);
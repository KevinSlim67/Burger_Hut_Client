const layout = document.getElementById('layout');

function createNavbar() {
    const template = document.createElement('template');

    template.innerHTML = `
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

    layout.appendChild(template.content);
}
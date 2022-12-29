class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="wrapper">
                <ul class="contact">
                    <h3>Contact</h3>
                    <li><img src="./../assets/icons/phone.png" alt="">
                        loremipsum@gmail.com</li>
                    <li><img src="./../assets/icons/message.png" alt="">+(961) 55 555 555
                        (Dekwaneh)</li>
                    <li><img src="./../assets/icons/message.png" alt="">+(961) 55 555 555
                        (Achrafieh)</li>
                    <li><img src="./../assets/icons/message.png" alt="">+(961) 55 555 555
                        (Antelias)</li>
                    <li><img src="./../assets/icons/message.png" alt="">+(961) 55 555 555
                        (Sin El Fil)</li>
                </ul>

                <div class="social-media">
                    <h3>Follow Us</h3>
                    <div>
                        <a href="#"><img src="/./../assets/icons/facebook.png" alt=""></a>
                        <a href="#"><img src="/./../assets/icons/twitter.png" alt=""></a>
                        <a href="#"><img src="/./../assets/icons/instagram.png" alt=""></a>
                    </div>
                </div>

                <div class="stay-updated">
                    <h3>Want to stay updated with our latest offer ?</h3>
                    <input type="email" placeholder="Enter your email">
                    <input class="type1" type="submit" value="Sign Up">
                </div>
            </div>
            <div class="copyright">© 2023 Kevin Slim. All Rights Reserved.</div>
        </footer>
        `;
    }
}

customElements.define('footer-component', Footer);
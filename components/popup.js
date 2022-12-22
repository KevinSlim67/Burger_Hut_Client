class Popup extends HTMLElement {
    constructor() {
        super();
        this.isUpdating = false;
    }

    connectedCallback() {
        this.isVisible = false;
        this.timer = false;
        this.style.display = 'none';
        this.classList.add('popup');
        let text = '';
        if (this.getAttribute('text') !== ('' || null)) {
            text = this.getAttribute('text');
        }

        this.innerHTML = `
        <p>${text}</p>
        <button>x</button>
    `;
    }

   setTimer = () => {
        return setTimeout(() => {
            this.style.display = 'none';
            this.timer = false;
        }, 5000);
    }

    attributeChangedCallback(name, oldValue, newValue) {

        // Update the element based on the changed attribute
        if (name === "text" && !this.isUpdating) {
            this.isUpdating = true;
            this.setAttribute("text", newValue);
            this.innerHTML = `
            <p>${newValue}</p>
            <button>x</button>`
                ;
            this.isUpdating = false;
            this.style.display = 'block';

            if (this.timer === false) {
                this.timer = true;
                this.timerId = this.setTimer();
            } else {
                clearTimeout(this.timerId);
                this.timer = true;
                this.timerId = this.setTimer();
            }
        }
    }

    static get observedAttributes() {
        return ["text"];
    }
}

customElements.define('popup-component', Popup);
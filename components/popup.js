class Popup extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.isUpdating = false;
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
        <button onclick="Popup.close()">x</button>
        `;
    }

    setTimer = () => {
        return setTimeout(() => {
            this.style.display = 'none';
            this.timer = false;
        }, 5000);
    }

    updateText = (newValue, oldValue) => {
        this.isUpdating = true;
        this.setAttribute("text", newValue);
        this.innerHTML = `
        <p>${newValue}</p>
        <button onclick="Popup.close()">x</button>
        `;

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

    updateStatus = (newValue, oldValue) => {
        this.isUpdating = true;
        switch (newValue) {
            case 'success':
                this.style.backgroundColor = 'rgba(98, 201, 84, 0.801)';
                this.style.borderColor = 'rgba(60, 179, 30, 0.8)';
                this.color = 'rgb(4, 19, 0)';
                break;
            case 'error':
                this.style.backgroundColor = 'rgba(218, 111, 111, 0.801)';
                this.style.borderColor = 'rgba(218, 58, 58, 0.8)';
                this.color = 'rgb(19, 0, 0)';
                break;
        }
        this.isUpdating = false;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "text" && !this.isUpdating) {
            this.updateText(newValue, oldValue);
        } else if (name === "status" && !this.isUpdating) {
            this.updateStatus(newValue, oldValue);
        }
    }

    static close() {
        const popup = document.getElementById('popup');
        clearTimeout(popup.timerId);
        popup.style.display = 'none';
        popup.timer = false;
    }

    static get observedAttributes() {
        return ["text", "status"];
    }
}


customElements.define('popup-component', Popup);
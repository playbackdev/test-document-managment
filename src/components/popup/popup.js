import './popup.css';

export const Popup = {
    create(message, timeout = 0) {
        if(this.created) {
            return;
        }
        this.created = true;
        this.opened = false;
        this.closing = false;
        this.popupElement = document.createElement('div');
        this.popupElement.classList.add('popup-wrapper');
        this.popupElement.insertAdjacentHTML('afterbegin', `
            <div class="popup-window">
                <p>${message}</p>
            </div>`);

        document.getElementById('app').appendChild(this.popupElement);

        this.popupElement.addEventListener('click', (e) => {
            if(e.target === this.popupElement) {
                this.close();
            }
        })
        setTimeout(() => {
            this.open();
            //если указали таймаут в мс, само закроется
            if(timeout > 0) {
                setTimeout(() => this.close(), timeout);
            }
        }, 0 );
    },
    open() {
        if(!this.closing && !this.opened) {
            this.opened = true;
            this.popupElement.classList.add('open');
        }
    },
    close() {
        if(this.opened) {
            this.closing = true;
            this.opened = false;
            this.popupElement.classList.remove('open');
            this.popupElement.classList.add('closing');
            setTimeout(() => {
                this.popupElement.classList.remove('closing');
                this.closing = false;
                this.created = false;
                this.popupElement.remove();
            }, 300);
        }
    }
}
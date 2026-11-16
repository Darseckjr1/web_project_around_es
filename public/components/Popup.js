export class Popup {
    popupSelector;
    popupElement;
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        const popupElement = document.querySelector(popupSelector);
        if (!popupElement) {
            throw new Error("No se encontro el elemento");
        }
        this.popupElement = popupElement;
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.escKeyListener);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.escKeyListener);
    }
    handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton?.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("click", (event) => {
            if (event.target === this.popupElement) {
                this.close();
            }
        });
    }
    escKeyListener = (event) => {
        this.handleEscClose(event);
    };
}

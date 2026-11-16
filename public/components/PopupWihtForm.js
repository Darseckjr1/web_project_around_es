import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formSubmit;
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this.formSubmit = formSubmit;
    }
    getInputValues() {
        const inputElements = this.popupElement.querySelectorAll(".popup__input");
        const values = {};
        inputElements.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        const form = this.popupElement.querySelector(".popup__form");
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                this.formSubmit(this.getInputValues());
                this.close();
            });
        }
    }
    close() {
        super.close();
        const form = this.popupElement.querySelector(".popup__form");
        form?.reset();
    }
}

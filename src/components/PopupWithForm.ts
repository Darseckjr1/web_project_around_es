import { Popup } from "./Popup.js";

type FormSubmitCallback = (values: Record<string, string>) => void;

export class PopupWithForm extends Popup {
    private formSubmit: FormSubmitCallback;

    constructor(popupSelector: string, formSubmit: FormSubmitCallback) {
        super(popupSelector);
        this.formSubmit = formSubmit;
    }

    private getInputValues(): Record<string, string> {
        const inputElements = this.popupElement.querySelectorAll<HTMLInputElement>(".popup__input");
        const values: Record<string, string> = {};

        inputElements.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    public setEventListeners(): void {
        super.setEventListeners();
        const form = this.popupElement.querySelector<HTMLFormElement>(".popup__form");

        if (form) {
            form.addEventListener("submit", (event: SubmitEvent) => {
                event.preventDefault();
                this.formSubmit(this.getInputValues());
                this.close();
            });
        }
    }

    public close(): void {
        super.close();

        const form = this.popupElement.querySelector<HTMLFormElement>(".popup__form");

        form?.reset();
    }
}
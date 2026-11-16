import type { FormConfig } from "../types/types.js";

export class FormValidator {
    private formConfig: FormConfig;
    private element: HTMLFormElement;

    constructor(formConfig: FormConfig, element: HTMLFormElement) {
        this.formConfig = formConfig;
        this.element = element;
    }

    private validateForm(): void {
        const isFormValid = this.element.checkValidity();
        const button = this.element.querySelector<HTMLButtonElement>(this.formConfig.submitButton);

        if (button) {
            this.toggleButtonState(button, isFormValid);
        }
    }

    private toggleButtonState(button: HTMLButtonElement, isFormValid: boolean) {
        if (!isFormValid) {
            button.classList.add(this.formConfig.inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(this.formConfig.inactiveButtonClass);
            button.disabled = false;
        }
    }

    private hideInputError(input: HTMLInputElement, errorElement: HTMLElement) {
        errorElement.classList.remove(this.formConfig.inputErrorTextClass);
        input.classList.remove(this.formConfig.inputErrorClass);
    }

    private showInputError(input: HTMLInputElement, errorElement: HTMLElement) {
        errorElement.classList.add(this.formConfig.inputErrorTextClass);
        errorElement.textContent = input.validationMessage;
        input.classList.add(this.formConfig.inputErrorClass);
    }

    private checkInputValidity(
        input: HTMLInputElement,
        errorElement: HTMLElement,
    ) {
        if (!input.validity.valid) {
            this.showInputError(input, errorElement);
        } else {
            this.hideInputError(input, errorElement);
        }
    }

    private setEventListeners(): void {
        const inputs = this.element.querySelectorAll<HTMLInputElement>(
            this.formConfig.inputs,
        );

        inputs.forEach((input) => {
            const popupError = this.element.querySelector<HTMLElement>(
                `#${input.id}-error`,
            );

            if (popupError) {
                input.addEventListener("input", () => {
                    this.checkInputValidity(input, popupError);
                    this.validateForm();
                });
            }
        });
    }

    public enableValidation(): void {
        this.setEventListeners();
        this.validateForm();
    }

    public resetValidation(): void {
        const inputs = this.element.querySelectorAll<HTMLInputElement>(
            this.formConfig.inputs
        );

        inputs.forEach((input) => {
            const inputError = this.element.querySelector<HTMLElement>(
                `#${input.id}-error`
            );

            input.classList.remove(this.formConfig.inputErrorClass);

            if (inputError) {
                inputError.classList.remove(this.formConfig.inputErrorTextClass);
                inputError.textContent = "";
            }
        });

        this.validateForm();
    }
}
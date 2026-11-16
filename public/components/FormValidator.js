export class FormValidator {
    formConfig;
    element;
    constructor(formConfig, element) {
        this.formConfig = formConfig;
        this.element = element;
    }
    validateForm() {
        const isFormValid = this.element.checkValidity();
        const button = this.element.querySelector(this.formConfig.submitButton);
        if (button) {
            this.toggleButtonState(button, isFormValid);
        }
    }
    toggleButtonState(button, isFormValid) {
        if (!isFormValid) {
            button.classList.add(this.formConfig.inactiveButtonClass);
            button.disabled = true;
        }
        else {
            button.classList.remove(this.formConfig.inactiveButtonClass);
            button.disabled = false;
        }
    }
    hideInputError(input, errorElement) {
        errorElement.classList.remove(this.formConfig.inputErrorTextClass);
        input.classList.remove(this.formConfig.inputErrorClass);
    }
    showInputError(input, errorElement) {
        errorElement.classList.add(this.formConfig.inputErrorTextClass);
        errorElement.textContent = input.validationMessage;
        input.classList.add(this.formConfig.inputErrorClass);
    }
    checkInputValidity(input, errorElement) {
        if (!input.validity.valid) {
            this.showInputError(input, errorElement);
        }
        else {
            this.hideInputError(input, errorElement);
        }
    }
    setEventListeners() {
        const inputs = this.element.querySelectorAll(this.formConfig.inputs);
        inputs.forEach((input) => {
            const popupError = this.element.querySelector(`#${input.id}-error`);
            if (popupError) {
                input.addEventListener("input", () => {
                    this.checkInputValidity(input, popupError);
                    this.validateForm();
                });
            }
        });
    }
    enableValidation() {
        this.setEventListeners();
        this.validateForm();
    }
    resetValidation() {
        const inputs = this.element.querySelectorAll(this.formConfig.inputs);
        inputs.forEach((input) => {
            const inputError = this.element.querySelector(`#${input.id}-error`);
            input.classList.remove(this.formConfig.inputErrorClass);
            if (inputError) {
                inputError.classList.remove(this.formConfig.inputErrorTextClass);
                inputError.textContent = "";
            }
        });
        this.validateForm();
    }
}

/* Funciones de validacion del formulario del perfil*/

function showInputError(input, errorElement) {
  errorElement.classList.add("popup__error_visible");
  errorElement.textContent = input.validationMessage;
  input.classList.add("popup__input_type_error");
}

function hideInputError(input, errorElement) {
  errorElement.classList.remove("popup__error_visible");
  input.classList.remove("popup__input_type_error");
}

function checkInputValidity(input, errorElement) {
  if (!input.validity.valid) {
    showInputError(input, errorElement);
  } else {
    hideInputError(input, errorElement);
  }
}

export function toggleButtonState(button, isFormValid) {
  if (!isFormValid) {
    button.classList.add("popup__button_disabled");
    button.disabled = true;
  } else {
    button.classList.remove("popup__button_disabled");
    button.disabled = false;
  }
}

/* Funcion de setEventListeners */

export function setEventListeners(
  form,
  input1,
  error1,
  input2,
  error2,
  button,
  submitHandler,
) {
  form.addEventListener("input", function () {
    const isFormValid = form.checkValidity();
    toggleButtonState(button, isFormValid);
  });

  input1.addEventListener("input", function () {
    checkInputValidity(input1, error1);
  });

  input2.addEventListener("input", function () {
    checkInputValidity(input2, error2);
  });

  form.addEventListener("submit", submitHandler);
}

/* Funcion para reiniciar el formulario al cerrarlo */

export function resetValidation(form) {
  const popupErrors = form.querySelectorAll(".popup__error");
  const inputs = form.querySelectorAll(".popup__input_type_error");
  const buttons = form.querySelectorAll(".popup__button");
  popupErrors.forEach((popupError) => {
    popupError.classList.remove("popup__error_visible");
    popupError.textContent = "";
  });

  inputs.forEach((input) => {
    input.classList.remove("popup__input_type_error");
  });

  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  });

  form.reset();
}

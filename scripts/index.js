import {
  toggleButtonState,
  setEventListeners,
  resetValidation,
} from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/* Profile section */

const editProfileButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close");
const profileModal = document.querySelector("#edit-popup");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClosePopup);
}

editProfileButton.addEventListener("click", function () {
  handleOpenEditModal();
});

function closeModal(modal) {
  const resetForm = modal.querySelector("form");
  if (resetForm) {
    resetValidation(resetForm);
  }
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", escClosePopup);
}

profileCloseButton.addEventListener("click", function () {
  closeModal(profileModal);
});

const profileName = document.querySelector(".profile__title");
const nameInput = document.querySelector(".popup__input_type_name");
const profileDescription = document.querySelector(".profile__description");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  resetValidation(profileModalForm);
  fillProfileForm();
  openModal(profileModal);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  if (profileModalForm.checkValidity() === true) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profileModal);
  }
}

const profileModalForm = document.querySelector("#edit-profile-form");

/*cards Section*/

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = document
    .querySelector("#card__template")
    .content.querySelector(".card")
    .cloneNode(true);

  const cardLink = cardElement.querySelector(".card__image");
  cardLink.src = link;
  cardLink.alt = name;

  const cardName = cardElement.querySelector(".card__title");
  cardName.textContent = name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardLink.addEventListener("click", function (event) {
    event.preventDefault();
    openModal(imgPopup);
    image.alt = cardName.textContent;
    image.src = cardLink.src;
    imgPopupCaption.textContent = cardName.textContent;
  });

  return cardElement;
}

const cardContainer = document.querySelector(".cards__list");

function renderCard(cardName, cardLink, cardContainer) {
  const cardElement = getCardElement(cardName, cardLink);
  cardContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
});

/* Add Card Form */

const cardModal = document.querySelector("#new-card-popup");
const cardFormModal = document.querySelector("#new-card-form");
const cardOpenButtonForm = document.querySelector(".profile__add-button");
const cardCloseButtonForm = cardModal.querySelector(".popup__close");

cardOpenButtonForm.addEventListener("click", function () {
  toggleButtonState(cardSaveButton, cardFormModal.checkValidity());
  openModal(cardModal);
});

cardCloseButtonForm.addEventListener("click", function () {
  closeModal(cardModal);
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  const isFormValid = cardFormModal.checkValidity();
  if (isFormValid) {
    const cardName = cardModal.querySelector(".popup__input_type_card-name");
    const cardLink = cardModal.querySelector(".popup__input_type_url");

    renderCard(cardName.value, cardLink.value, cardContainer);
    closeModal(cardModal);
  }
}

/* Image Popup */

const imgPopup = document.querySelector("#image-popup");
const image = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");
const imgPopupClose = imgPopup.querySelector(".popup__close");

imgPopupClose.addEventListener("click", function () {
  closeModal(imgPopup);
});

/* Cerrar al hacer click fuera del pop up */

const popups = document.querySelectorAll(".popup");

function closeClickPopup(click) {
  if (click.target === click.currentTarget) {
    closeModal(click.currentTarget);
  }
}

popups.forEach((popup) => {
  popup.addEventListener("click", closeClickPopup);
});

/* Cerrar el popup con Escape */

function escClosePopup(event) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (event.key === "Escape" && openedPopup) {
    closeModal(openedPopup);
  }
}

/* Variables para funciones exportadas */

const nameError = document.querySelector("#name-error");
const descriptionError = document.querySelector("#description-error");
const profileSaveButton = profileModalForm.querySelector(".popup__button");
const titleInput = document.querySelector("#place-name");
const linkInput = document.querySelector("#link");
const titleError = document.querySelector("#place-name-error");
const linkError = document.querySelector("#link-error");
const cardSaveButton = cardFormModal.querySelector(".popup__button");

setEventListeners(
  profileModalForm,
  nameInput,
  nameError,
  descriptionInput,
  descriptionError,
  profileSaveButton,
  handleProfileFormSubmit,
);

setEventListeners(
  cardFormModal,
  titleInput,
  titleError,
  linkInput,
  linkError,
  cardSaveButton,
  handleCardFormSubmit,
);

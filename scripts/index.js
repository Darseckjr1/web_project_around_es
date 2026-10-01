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

const editProfileBtn = document.querySelector(".profile__edit-button");
const profileCloseBtn = document.querySelector(".popup__close");
const profileModal = document.querySelector("#edit-popup");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  handleOpenEditModal();
});

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

profileCloseBtn.addEventListener("click", function () {
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
  fillProfileForm();
  openModal(profileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileModal);
}

const modalForm = document.querySelector("#edit-profile-form");

modalForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

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

  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    openModal(imgPopup);
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
const cardOpenBtnForm = document.querySelector(".profile__add-button");
const cardCloseBtnForm = cardModal.querySelector(".popup__close");

cardOpenBtnForm.addEventListener("click", function () {
  openModal(cardModal);
});

cardCloseBtnForm.addEventListener("click", function () {
  closeModal(cardModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardModal.querySelector(".popup__input_type_card-name");
  const cardLink = cardModal.querySelector(".popup__input_type_url");

  renderCard(cardName.value, cardLink.value, cardContainer);
  closeModal(cardModal);
}

cardFormModal.addEventListener("submit", handleCardFormSubmit);

/* Image Popup */

const imgPopup = document.querySelector("#image-popup");
const image = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");
const imgPopupClose = imgPopup.querySelector(".popup__close");

imgPopupClose.addEventListener("click", function () {
  closeModal(imgPopup);
});

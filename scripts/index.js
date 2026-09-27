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

initialCards.forEach(function (card) {
  console.log(card.name);
});

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

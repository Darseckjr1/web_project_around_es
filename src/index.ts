import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import type { CardData, UserData } from "./types/types.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";

let profileForm: FormValidator | null = null;
let cardForm: FormValidator | null = null;

/* Profile section */

const editProfileButton = document.querySelector<HTMLButtonElement>(".profile__edit-button");
const nameInput = document.querySelector<HTMLInputElement>(".popup__input_type_name");
const descriptionInput = document.querySelector<HTMLInputElement>(
  ".popup__input_type_description",
);
const profileModalForm = document.querySelector<HTMLFormElement>("#edit-profile-form");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

if (profileModalForm) {
  profileForm = new FormValidator(defaultFormConfig, profileModalForm);
  profileForm.enableValidation();
}

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  if (nameInput && descriptionInput) {
    nameInput.value = userData.name;
    descriptionInput.value = userData.description;
  }
}

function handleOpenEditModal() {
  fillProfileForm();
  profileForm?.resetValidation();
  popupWithProfileForm.open();
}

function handleProfileFormSubmit(values: Record<string, string>) {
  if (profileModalForm?.checkValidity() === true) {
    const userData: UserData = {
      name: values.name,
      description: values.description,
    };

    userInfo.setUserInfo(userData);
  }
}

const popupWithProfileForm = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
popupWithProfileForm.setEventListeners();

if (editProfileButton) {
  editProfileButton.addEventListener("click", function () {
    handleOpenEditModal();
  });
}

/* Cards section */

const popupWithProfileImage = new PopupWithImage("#image-popup");
popupWithProfileImage.setEventListeners();

function handleCardClick(data: CardData) {
  popupWithProfileImage.open(data);
}

const section = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card__template", handleCardClick);
      section.addItem(card.getElement());
    },
  },
  ".cards__list",
);

section.renderItems();

/* Add Card Form */

const cardModalForm = document.querySelector<HTMLFormElement>("#new-card-form");
const cardOpenButtonForm = document.querySelector<HTMLElement>(".profile__add-button");

if (cardModalForm) {
  cardForm = new FormValidator(defaultFormConfig, cardModalForm);
  cardForm.enableValidation();
}

function handleCardFormSubmit(values: Record<string, string>): void {
  const newCardData: CardData = {
    name: values["place-name"],
    link: values.link,
  };

  const newCard = new Card(newCardData, "#card__template", handleCardClick);
  section.addItem(newCard.getElement());
}

const popupWithCardForm = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
popupWithCardForm.setEventListeners();

cardOpenButtonForm?.addEventListener("click", function () {
  cardModalForm?.reset();
  cardForm?.resetValidation();
  popupWithCardForm.open();
});
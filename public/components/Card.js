export class Card {
    data;
    templateSelector;
    handleCardClick;
    element;
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        const cardTemplate = document.querySelector(this.templateSelector);
        if (!cardTemplate) {
            throw new Error("No se encontró la plantilla");
        }
        const cardElement = cardTemplate.content.querySelector(".card");
        if (!cardElement) {
            throw new Error("No se encontró la tarjeta en la plantilla");
        }
        this.element = cardElement.cloneNode(true);
        this.setCardContent();
        this.setEventListeners();
    }
    setEventListeners() {
        const cardImage = this.element.querySelector(".card__image");
        const cardLikeButton = this.element.querySelector(".card__like-button");
        const cardDeleteButton = this.element.querySelector(".card__delete-button");
        if (cardImage && cardLikeButton && cardDeleteButton) {
            cardImage.addEventListener("click", () => {
                this.handleCardClick(this.data);
            });
            cardLikeButton.addEventListener("click", () => {
                cardLikeButton.classList.toggle("card__like-button_is-active");
            });
            cardDeleteButton.addEventListener("click", () => {
                this.element.remove();
            });
        }
    }
    setCardContent() {
        const cardTitle = this.element.querySelector(".card__title");
        const cardLink = this.element.querySelector(".card__image");
        if (cardTitle && cardLink) {
            cardTitle.textContent = this.data.name;
            cardLink.src = this.data.link;
            cardLink.alt = this.data.name;
        }
    }
    getElement() {
        return this.element;
    }
}

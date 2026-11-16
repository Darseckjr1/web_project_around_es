import type { CardData } from "../types/types";

export class Card {
    private data: CardData;
    private templateSelector: string;
    private handleCardClick: (data: CardData) => void;
    private element: HTMLLIElement;

    constructor(
        data: CardData,
        templateSelector: string,
        handleCardClick: (data: CardData) => void,
    ) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;

        const cardTemplate = document.querySelector<HTMLTemplateElement>(this.templateSelector);

        if (!cardTemplate) {
            throw new Error("No se encontró la plantilla");
        }

        const cardElement = cardTemplate.content.querySelector<HTMLLIElement>(".card");

        if (!cardElement) {
            throw new Error("No se encontró la tarjeta en la plantilla");
        }

        this.element = cardElement.cloneNode(true) as HTMLLIElement;
        this.setCardContent();
        this.setEventListeners();
    }

    private setEventListeners(): void {
        const cardImage = this.element.querySelector<HTMLImageElement>(".card__image");
        const cardLikeButton = this.element.querySelector<HTMLButtonElement>(".card__like-button");
        const cardDeleteButton = this.element.querySelector<HTMLButtonElement>(".card__delete-button");

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

    private setCardContent(): void {
        const cardTitle = this.element.querySelector<HTMLElement>(".card__title");
        const cardLink = this.element.querySelector<HTMLImageElement>(".card__image");

        if (cardTitle && cardLink) {
            cardTitle.textContent = this.data.name;
            cardLink.src = this.data.link;
            cardLink.alt = this.data.name;
        }
    }

    public getElement(): HTMLElement {
        return this.element;
    }
}

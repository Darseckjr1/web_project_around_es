import type { CardData } from "../types/types.js";
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor(popupSelector: string) {
        super(popupSelector);
    }

    public open(data?: CardData): void {
        const popupImage = this.popupElement.querySelector<HTMLImageElement>(".popup__image");
        const popupCaption = this.popupElement.querySelector<HTMLElement>(".popup__caption");

        if (popupImage && popupCaption && data) {
            popupImage.src = data.link;
            popupImage.alt = data.name;
            popupCaption.textContent = data.name;
        }

        super.open();
    }
}
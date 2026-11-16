import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(data) {
        const popupImage = this.popupElement.querySelector(".popup__image");
        const popupCaption = this.popupElement.querySelector(".popup__caption");
        if (popupImage && popupCaption && data) {
            popupImage.src = data.link;
            popupImage.alt = data.name;
            popupCaption.textContent = data.name;
        }
        super.open();
    }
}

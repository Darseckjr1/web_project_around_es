export class Popup {
    private popupSelector: string;
    protected popupElement: HTMLElement;

    constructor(popupSelector: string) {
        this.popupSelector = popupSelector;
        const popupElement = document.querySelector<HTMLElement>(popupSelector);

        if (!popupElement) {
            throw new Error("No se encontro el elemento");
        }

        this.popupElement = popupElement;
    }

    public open(): void {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.escKeyListener);
    }

    public close(): void {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.escKeyListener);
    }

    private handleEscClose(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            this.close();
        }
    }

    public setEventListeners(): void {
        const closeButton = this.popupElement.querySelector<HTMLButtonElement>(".popup__close");

        closeButton?.addEventListener("click", () => {
            this.close();
        });

        this.popupElement.addEventListener("click", (event: MouseEvent) => {
            if (event.target === this.popupElement) {
                this.close();
            }
        });
    }

    private readonly escKeyListener = (event: KeyboardEvent): void => {
        this.handleEscClose(event);
    };
}
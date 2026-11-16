export class Section {
    renderedItems;
    renderer;
    container;
    constructor({ items, renderer }, containerSection) {
        const container = document.querySelector(containerSection);
        if (!container) {
            throw new Error("No se encontro el elemento");
        }
        this.container = container;
        this.renderedItems = items;
        this.renderer = renderer;
    }
    renderItems() {
        const invertedCards = this.renderedItems.slice().reverse();
        invertedCards.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.prepend(element);
    }
}

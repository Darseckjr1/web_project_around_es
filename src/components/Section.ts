type RenderedFunction<T> = (item: T) => void;

export class Section<T> {
    private renderedItems: T[];
    private renderer: RenderedFunction<T>;
    private container: HTMLElement;

    constructor(
        { items, renderer }: { items: T[]; renderer: RenderedFunction<T> },
        containerSection: string,
    ) {
        const container = document.querySelector<HTMLElement>(containerSection);

        if (!container) {
            throw new Error("No se encontro el elemento");
        }

        this.container = container;
        this.renderedItems = items;
        this.renderer = renderer;
    }

    public renderItems(): void {
        const invertedCards = this.renderedItems.slice().reverse();

        invertedCards.forEach((item) => {
            this.renderer(item);
        });
    }

    public addItem(element: HTMLElement): void {
        this.container.prepend(element);
    }
}
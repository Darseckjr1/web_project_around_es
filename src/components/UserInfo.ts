import type { UserData, UserSelector } from "../types/types.js";

export class UserInfo {
    private nameElement: HTMLElement;
    private descriptionElement: HTMLElement;

    constructor(
        { nameSelector, descriptionSelector }: UserSelector,
    ) {
        const name = document.querySelector<HTMLElement>(nameSelector);
        const description = document.querySelector<HTMLElement>(descriptionSelector);

        if (!name || !description) {
            throw new Error("No se encontro la informacion del usuario");
        }

        this.nameElement = name;
        this.descriptionElement = description;
    }

    public getUserInfo(): UserData {
        return {
            name: this.nameElement.textContent ?? "",
            description: this.descriptionElement.textContent ?? "",
        };
    }

    public setUserInfo(data: UserData): void {
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.description;
    }
}
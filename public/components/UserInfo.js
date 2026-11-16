export class UserInfo {
    nameElement;
    descriptionElement;
    constructor({ nameSelector, descriptionSelector }) {
        const name = document.querySelector(nameSelector);
        const description = document.querySelector(descriptionSelector);
        if (!name || !description) {
            throw new Error("No se encontro la informacion del usuario");
        }
        this.nameElement = name;
        this.descriptionElement = description;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            description: this.descriptionElement.textContent ?? "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.description;
    }
}

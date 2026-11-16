export interface FormConfig {
    inputs: string,
    submitButton: string,
    inactiveButtonClass: string,
    inputErrorClass: string,
    inputErrorTextClass: string
}

export interface CardData {
    name: string,
    link: string
}

export interface UserData {
    name: string;
    description: string;
}

export interface UserSelector {
    nameSelector: string;
    descriptionSelector: string;
}
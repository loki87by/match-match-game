import { FormElement } from '../consts/types';

export default class FormValidator {
  inputSelector: string;

  submitButtonSelector: string;

  inactiveButtonClass: string;

  inputErrorClass: string;

  errorClass: string;

  imageSelector: string;

  element: HTMLFormElement;

  constructor(data: FormElement, element: HTMLFormElement) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.imageSelector = data.imageSelector;
    this.element = element;
  }

  showInputError = (
    formElement: HTMLElement,
    inputElement: HTMLInputElement,
    picture: HTMLImageElement,
    errorMessage: string,
  ) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.parentElement?.classList.add(this.inputErrorClass);
    const img = picture;
    img.src = '../src/assets/icons/abort.png';
    (errorElement as HTMLElement).textContent = errorMessage;
    errorElement?.classList.add(this.errorClass);
  };

  hideInputError = (formElement: HTMLFormElement, inputElement: HTMLInputElement, picture: HTMLImageElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.parentElement?.classList.remove(this.inputErrorClass);
    const img = picture;
    img.src = '../src/assets/icons/checked.svg';
    errorElement?.classList.remove(this.errorClass);
    (errorElement as HTMLElement).textContent = '';
  };

  checkInputValidity = (formElement: HTMLFormElement, inputElement: HTMLInputElement, picture: HTMLImageElement) => {
    if (!inputElement.validity.valid) {
      this.showInputError(formElement, inputElement, picture, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement, picture);
    }
  };

  hasInvalidInput = (inputList: HTMLInputElement[]) =>
    inputList.some((inputElement: HTMLInputElement) => !inputElement.validity.valid);

  toggleButtonState = (inputList: HTMLInputElement[], buttonElement: HTMLButtonElement) => {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'true');
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  setEventListeners = (formElement: HTMLFormElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.inputSelector)) as HTMLInputElement[];
    const imageList = Array.from(formElement.querySelectorAll(this.imageSelector));
    const buttonElement = formElement.querySelector(this.submitButtonSelector) as HTMLButtonElement;
    this.toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement: HTMLInputElement, elementIndex: number) => {
      inputElement.addEventListener('input', () => {
        this.toggleButtonState(inputList, buttonElement);
        this.checkInputValidity(formElement, inputElement, imageList[elementIndex] as HTMLImageElement);
      });
    });
  };

  enableValidation = () => {
    this.setEventListeners(this.element);
  };
}

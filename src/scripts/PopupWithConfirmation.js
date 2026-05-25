import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;


    this._popupElement = document.querySelector(popupSelector);

    if (this._popupElement) {
      this._form = this._popupElement.querySelector(".popup__form");
    } else {
      console.error(`Não foi possível encontrar o popup com o seletor: ${popupSelector}`);
    }
  }


  setSubmitAction(action) {
    this._submitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();

    
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();

        if (this._submitAction) {
          this._submitAction();
        } else if (this._handleSubmit) {
          this._handleSubmit();
        }
      });
    }
  }
}
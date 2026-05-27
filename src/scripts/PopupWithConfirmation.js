import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);


    this._form = this._popupElement.querySelector(".popup__form");
  }


  setSubmitAction(action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmitAction) {
        this._handleSubmitAction();
      }
    });
  }
}
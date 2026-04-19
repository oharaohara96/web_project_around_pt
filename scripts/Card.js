import { openModal } from "./utils.js";

export default class Card {

constructor (text, link, cardSelector) {

this._text = text;
this._link = link;
this._cardSelector = cardSelector;
}

_getTemplate() {
  const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector(".card")
    .cloneNode(true);

  return cardElement;
}
generateCard() {
  this._element = this._getTemplate();

  const cardImage = this._element.querySelector(".card__image")

  const cardTitle = this._element.querySelector(".card__title");

  cardImage.src = this._link ;

  cardImage.alt = this._text ;

  cardTitle.textContent = this._text ;

  this._setEventListeners();

  return this._element;
}

_setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleOpenPreview();
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPreview() {
    console.log("Abrindo imagem...");
  }

  }




export default class Card {

  constructor(name, link, cardSelector, handleCardClick, isLiked, handleLikeClick, handleDeleteClick, ownerId) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._isLiked = isLiked;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this._ownerId = ownerId;
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }


  generateCard(myUserId) {
    this._element = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.updateLikeStatus(this._isLiked);

    
    if (this._ownerId !== myUserId) {
      this._deleteButton.remove();
    }

    return this._element;
  }
}
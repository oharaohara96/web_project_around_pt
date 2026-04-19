import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editPopup = document.querySelector("#edit-popup");
const editForm = document.querySelector("#edit-profile-form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const inputPlaceName = newCardForm.querySelector(".popup__input_type_card-name");
const inputUrl = newCardForm.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");


function renderCard(name, link, container) {
  const card = new Card(name, link, "#card-template", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(inputPlaceName.value, inputUrl.value, cardsList);
  newCardForm.reset();
  closeModal(newCardPopup);
}

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
 newCardForm.reset();
  const submitButton = newCardForm.querySelector(".popup__button");
  submitButton.classList.add("popup__button_disabled");
  submitButton.disabled = true;
  openModal(newCardPopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened") || evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

editForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);


initialCards.forEach((card) => renderCard(card.name, card.link, cardsList));

const editProfileValidator = new FormValidator(validationConfig, editForm);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, newCardForm);
addCardValidator.enableValidation();
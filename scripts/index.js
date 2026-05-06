import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" },
];


const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});


const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();


function createCard(name, link) {
  const card = new Card(name, link, "#card-template", () => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}


const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
      cardList.addItem(cardElement);
    }
  },
  '.cards__list'
);

cardList.renderItems();


const profilePopup = new PopupWithForm("#edit-popup", (formData) => {

  userInfo.setUserInfo(formData.name, formData.description);
  profilePopup.close();
});
profilePopup.setEventListeners();


const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const cardElement = createCard(formData["place-name"], formData.link);
  cardList.addItem(cardElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();


const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const editProfileValidator = new FormValidator(validationConfig, editForm);
const addCardValidator = new FormValidator(validationConfig, newCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();



document.querySelector(".profile__edit-button").addEventListener("click", () => {

  const { name, job } = userInfo.getUserInfo();

  const nameInput = editForm.querySelector(".popup__input_type_name");
  const jobInput = editForm.querySelector(".popup__input_type_description");


  nameInput.value = name;
  jobInput.value = job;

  editProfileValidator.resetValidation();
  profilePopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardValidator.resetValidation();
  newCardPopup.open();
});
import Api from "./Api.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";


const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "dc0d07dc-853a-4960-82cf-7ef7050d1bc3",
    "Content-Type": "application/json"
  }
});


let myUserId = "";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deleteConfirmPopup = new PopupWithConfirmation("#delete-confirm-popup");
deleteConfirmPopup.setEventListeners();


function renderLoading(popupSelector, isLoading, originalText = "Salvar") {
  const popupElement = document.querySelector(popupSelector);
  if (popupElement) {
    const submitButton = popupElement.querySelector(".popup__button");
    if (submitButton) {
      submitButton.textContent = isLoading ? "Salvando..." : originalText;
    }
  }
}


const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  renderLoading("#avatar-popup", true);

  api.updateAvatar(formData.avatar)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData.name, updatedUserData.about, updatedUserData.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao atualizar o avatar: ${err}`);
    })
    .finally(() => {
      renderLoading("#avatar-popup", false, "Salvar");
    });
});
avatarPopup.setEventListeners();


function createCard(name, link, cardId, ownerId, isLiked) {
  const card = new Card(
    name,
    link,
    "#card-template",
    () => {
      imagePopup.open(name, link);
    },
    isLiked,
    (cardInstance) => {

      const likePromise = cardInstance._isLiked ? api.removeLike(cardId) : api.addLike(cardId);

      likePromise
        .then((updatedCardData) => {
          cardInstance.updateLikeStatus(updatedCardData.isLiked);
        })
        .catch((err) => {
          console.log(`Erro ao processar curtida: ${err}`);
        });
    },
    (cardInstance) => {
      
      deleteConfirmPopup.open();
      deleteConfirmPopup.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(() => {
            cardInstance._element.remove();
            deleteConfirmPopup.close();
          })
          .catch((err) => {
            console.log(`Erro ao excluir o cartão: ${err}`);
          });
      });
    },
    ownerId
  );

  const cardElement = card.generateCard(myUserId);

  if (cardId) {
    cardElement.dataset.id = cardId;
  }

  return cardElement;
}


const cardList = new Section({
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link, item._id, item.owner, item.isLiked);
      cardList.addItem(cardElement);
    }
  },
  '.cards__list'
);


const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  renderLoading("#edit-popup", true);

  api.editProfile(formData.name, formData.description)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData.name, updatedUserData.about, updatedUserData.avatar);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao editar o perfil: ${err}`);
    })
    .finally(() => {
      renderLoading("#edit-popup", false, "Salvar");
    });
});
profilePopup.setEventListeners();


const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  renderLoading("#new-card-popup", true);

  api.addCard(formData["place-name"], formData.link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData.name, newCardData.link, newCardData._id, newCardData.owner, newCardData.isLiked);
      cardList.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao criar novo cartão: ${err}`);
    })
    .finally(() => {
      renderLoading("#new-card-popup", false, "Criar");
    });
});
newCardPopup.setEventListeners();


const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const avatarForm = document.querySelector("#avatar-form");

const editProfileValidator = new FormValidator(validationConfig, editForm);
const addCardValidator = new FormValidator(validationConfig, newCardForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();


document.querySelector(".profile__edit-button").addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  editForm.querySelector(".popup__input_type_name").value = name;
  editForm.querySelector(".popup__input_type_description").value = job;
  editProfileValidator.resetValidation();
  profilePopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardValidator.resetValidation();
  newCardPopup.open();
});

document.querySelector(".profile__avatar-edit-button").addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});


api.getAppInitialData()
  .then(([userData, cardsData]) => {

    myUserId = userData._id;


    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);


    cardsData.forEach((item) => {
      const cardElement = createCard(item.name, item.link, item._id, item.owner, item.isLiked);
      cardList.addItem(cardElement);
    });

    console.log("Aplicação inicializada com sucesso!");
  })
  .catch((err) => {

    console.log(`Falha crítica no carregamento inicial: ${err}`);
  });
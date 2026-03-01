// --- DADOS INICIAIS ---
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

// --- SELETORES GERAIS ---
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

// Seletores do Perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeEditButton = editPopup.querySelector(".popup__close");
const editForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Seletores do Popup "Novo Local"
const newCardPopup = document.querySelector("#new-card-popup");
const addButton = document.querySelector(".profile__add-button");
const closeNewCardButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const inputPlaceName = document.querySelector(".popup__input_type_card-name");
const inputUrl = document.querySelector(".popup__input_type_url");

// --- FUNÇÕES DE MODAL ---
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// --- FUNÇÕES DE PERFIL ---
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

// --- FUNÇÕES DE RENDERIZAÇÃO DE CARTÕES ---

function getCardElement(data = { name: "Local desconhecido", link: "#" }) {
  // Clona o template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Define os dados do cartão
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Foto de ${data.name}`;

  // 1. Ouvinte para Curtir (Corrigido para bater com seu CSS)
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  // 2. Ouvinte para Deletar
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardData = { name, link };
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

// --- FUNÇÕES DO POPUP "NOVO LOCAL" ---

function handleOpenNewCardModal() {
  newCardForm.reset();
  openModal(newCardPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputPlaceName.value;
  const link = inputUrl.value;
  renderCard(name, link, cardsList);
  closeModal(newCardPopup);
}

// --- EVENT LISTENERS E INICIALIZAÇÃO ---

// Eventos de Perfil
editButton.addEventListener("click", handleOpenEditModal);
closeEditButton.addEventListener("click", () => closeModal(editPopup));
editForm.addEventListener("submit", handleProfileFormSubmit);

// Eventos de Novo Cartão
addButton.addEventListener("click", handleOpenNewCardModal);
closeNewCardButton.addEventListener("click", () => closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Renderização Inicial
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

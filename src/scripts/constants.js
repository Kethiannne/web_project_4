export const initialCards = [
  {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"},
  {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"},
  {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"},
  {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"},
  {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"},
  {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
];

export const settings = {
  inputSelector: ".form__field",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__field_error",
  errorClass: "form__field-error_active"
};

// General Page Vars
  const page = document.querySelector(".page");
  const profile = page.querySelector(".profile");
  export const popupEdit = page.querySelector(".popup_edit-form");
  export const popupAdd = page.querySelector(".popup_add-form");
  export const popupAll = page.querySelectorAll(".popup");
  export const closeButtons = document.querySelectorAll(".popup__close-button");
// Edit form Vars
  export const edit = profile.querySelector(".profile__edit-button");
  export const myName = profile.querySelector(".profile__name");
  export const myOccupation = profile.querySelector(".profile__occupation");
  export const editForm = document.forms.edit;
  export const nameForm = editForm.elements.Name;
  export const occupationForm = editForm.elements.Occupation;
// Place Card and Add Form Vars
  export const add = profile.querySelector(".profile__add-button");
  export const create = popupAdd.querySelector(".form__save-button");
  export const addForm = document.forms.add;
  export const titleForm = addForm.elements.Title;
  export const imageForm = addForm.elements.ImageLink;
// Element Card Template Vars
  export const cardContainer = document.querySelector(".card-container");

// Image Popup Vars
  export const imagePopup = document.querySelector(".image-popup");
  export const imageCaption = document.querySelector(".image-caption");
  export const popupImages = document.querySelector(".popup_image");

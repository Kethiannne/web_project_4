import {Card} from "./Card.js";
import {openPopup, closePopup} from "./commonFunctions.js";
import {FormValidator} from "./FormValidator.js";

// General Page Vars
  const page = document.querySelector(".page");
  const profile = page.querySelector(".profile");
  const popupEdit = page.querySelector(".popup_edit-form");
  const popupAdd = page.querySelector(".popup_add-form");
  const popupAll = page.querySelectorAll(".popup");
  const closeButtons = document.querySelectorAll(".popup__close-button");
// Edit form Vars
  const edit = profile.querySelector(".profile__edit-button");
  const myName = profile.querySelector(".profile__name");
  const myOccupation = profile.querySelector(".profile__occupation");
  const editForm = document.forms.edit;
  const nameForm = editForm.elements.Name;
  const occupationForm = editForm.elements.Occupation;
// Place Card and Add Form Vars
  const add = profile.querySelector(".profile__add-button");
  const create = popupAdd.querySelector(".form__save-button");
  const addForm = document.forms.add;
  const titleForm = addForm.elements.Title;
  const imageForm = addForm.elements.ImageLink;
// Element Card Template Vars
  const cardContainer = document.querySelector(".card-container");

// A Section for stuff done when the page loads up
//---------------------------------------------

  const initialCards = [
    {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"},
    {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"},
    {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"},
    {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"},
    {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"},
    {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
  ];

  window.onload = initialCards.forEach(function (item){
    const initialCard = new Card(item.name, item.link, ".card-template");
    const loadedCard = initialCard.makeCard();

    cardContainer.append(loadedCard);
  });

  function initialValidation(){
    const formList = Array.from(document.querySelectorAll(".form"));

    formList.forEach(function(formElement) {
      const newForm = new FormValidator(
        {
        inputSelector: ".form__field",
        submitButtonSelector: ".form__save-button",
        inactiveButtonClass: "form__save-button_disabled",
        inputErrorClass: "form__field_error",
        errorClass: "form__field-error_active"
        },
        formElement)

      newForm.enableValidation();
    });
  }

  initialValidation();

//---------------------------------------------

// A section for Opening and for Closing
//---------------------------------------------

  Array.from(closeButtons).forEach(function(close) {
    close.addEventListener("click", function() {
      closePopup();
    })});



  Array.from(popupAll).forEach(function(popup){
    popup.addEventListener("click", function(evt){
      if (evt.target === evt.currentTarget){
        closePopup();
      }
    });
  })

//----------------------------------------------

// A Section for the Edit Form
//---------------------------------------------
  edit.addEventListener("click", function(evt) {
    openPopup(popupEdit);
    nameForm.value = myName.textContent;
    occupationForm.value = myOccupation.textContent;
  });

  function saveProfileEdits(){
    myName.textContent = nameForm.value;
    myOccupation.textContent = occupationForm.value;
  }

  editForm.addEventListener("submit", function(evt) {
    saveProfileEdits();
    closePopup(evt);
  });
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------
  add.addEventListener("click", function(evt) {
    openPopup(popupAdd);
  });

  function saveNewPlace() {
    const newCard = new Card(titleForm.value, imageForm.value, ".card-template");
    const saveCard = newCard.makeCard();

    cardContainer.prepend(saveCard);
  }


  addForm.addEventListener("submit", function(evt) {
    saveNewPlace();
    closePopup(evt);
    create.classList.add("form__save-button_disabled");
    create.setAttribute("disabled", true);
    addForm.reset();
  });
//---------------------------------------------

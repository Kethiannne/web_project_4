import "../pages/index.css";
import Section from "./Section.js";
import {Card} from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import {FormValidator} from "./FormValidator.js";
import * as constants from "./constants.js";
import {myName, myOccupation}from "./constants.js"
import UserInfo from "./UserInfo";


// A Section for stuff done when the page loads up
//---------------------------------------------
  function newValidator (formElement) {
    const newForm = new FormValidator(constants.settings, formElement)
    newForm.enableValidation();
  };

  newValidator(constants.addForm);
  newValidator(constants.editForm);
//---------------------------------------------

const userInformation = new UserInfo({myName, myOccupation});

function handleCardClick(text, link){
  const imagePop = new PopupWithImage(constants.popupImages);
  imagePop.setEventListeners();
  imagePop.openPopup(text, link)
}

const Cards = new Section(
  {
    items: constants.initialCards,

    renderer: (item) => {
      const initCard = new Card(item.name, item.link, ".card-template", handleCardClick);
      const loadCard = initCard.makeCard();
      Cards.addItem(loadCard);
    },
  },
  constants.cardContainer
)
Cards.renderElements();


// A Section for the Edit Form
//---------------------------------------------
  const editPopup = new PopupWithForm(
    constants.popupEdit,() => {
      //handles what happens when this form is submitted
      userInformation.setUserInfo(constants.nameForm.value ,constants.occupationForm.value)
      editPopup.closePopup();
    }, () => {
      //handles what happens when this form is opened
      let {name, job} = userInformation.getUserInfo();
      constants.nameForm.value = name;
      constants.occupationForm.value = job;
    }
  );
  editPopup.setEventListeners();
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------

  const addPopup = new PopupWithForm(
    constants.popupAdd, () => {
      //handles what happens when this form is submitted
      //makes a new card and sends it over to the cards section
        const newCard = new Card(constants.titleForm.value, constants.imageForm.value, ".card-template", handleCardClick);
        const saveCard = newCard.makeCard();
        Cards.addItem(saveCard);
      //closes the popup and disables the button
        addPopup.closePopup();
        constants.create.classList.add("form__save-button_disabled");
        constants.create.setAttribute("disabled", true);

    }, () => {
      //handles what happens when this form is opened
      constants.addForm.reset();
    }
  );
  addPopup.setEventListeners();
//---------------------------------------------

// event listeners on buttons which open the forms
//---------------------------------------------
constants.edit.addEventListener("click", function(evt) {
  editPopup.openPopup();
});

constants.add.addEventListener("click", function() {
  addPopup.openPopup();
});
//---------------------------------------------

import "./index.css";
import Section from "../components/Section.js";
import {Card} from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import * as constants from "../utils/constants.js";
import {myName, myOccupation}from "../utils/constants.js"
import UserInfo from "../components/UserInfo";


// A Section for Form Validators
//---------------------------------------------
  function newValidator (formElement) {
    const newForm = new FormValidator(constants.settings, formElement)
    newForm.enableValidation();
    return newForm;
  }

  const addValidator = newValidator(constants.addForm);
  const editValidator = newValidator(constants.editForm);
//---------------------------------------------
const userInformation = new UserInfo({myName, myOccupation});

const imagePop = new PopupWithImage(constants.popupImages);
imagePop.setEventListeners();

// A Section for functions that i will move later
//---------------------------------------------
function handleCardClick(text, link){
  imagePop.openPopup(text, link)
}

function makeANewCard(name, link){
  const initCard = new Card(name, link, ".card-template", handleCardClick);
  const loadCard = initCard.makeCard();
  return loadCard;
}
//---------------------------------------------

const cards = new Section(
  {
    items: constants.initialCards,

    renderer: (item) => {
      cards.addItem(makeANewCard(item.name, item.link));
    },
  },
  constants.cardContainer
)
cards.renderElements();


// A Section for the Edit Form
//---------------------------------------------
  const editPopup = new PopupWithForm(
    constants.popupEdit,(values) => {
      //handles what happens when this form is submitted
      userInformation.setUserInfo(values.Name ,values.Occupation);
      editPopup.closePopup();
    }, () => {
      //handles what happens when this form is opened
      const {name, job} = userInformation.getUserInfo();
      constants.nameForm.value = name;
      constants.occupationForm.value = job;
      editValidator.enableButton(constants.save);
    }
  );
  editPopup.setEventListeners();
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------

  const addPopup = new PopupWithForm(
    constants.popupAdd, (values) => {
      //handles what happens when this form is submitted
        cards.addItem(makeANewCard(values.Title, values.ImageLink));
        addPopup.closePopup();
    }, () => {
      //handles what happens when this form is opened
      constants.addForm.reset();
      addValidator.disableButton(constants.create);
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

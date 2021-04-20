import "./index.css";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import Section from "../components/Section.js";
import {Card} from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import * as constants from "../utils/constants.js";
import {myName, myOccupation}from "../utils/constants.js"
import UserInfo from "../components/UserInfo";



// Initial Classes and functions
// ---------------------------------------------
const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "a5454f22-eab5-4384-8e26-57b127f56551",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
  .then(
    res => {
      // code for rendering the initial cards
      const cards = new Section(
        {
          items: res,
          renderer: (item) => {
            cards.addItem(makeANewCard(item));
          },
        },
        constants.cardContainer
      )
      cards.renderElements();


      // code for the add card form
      const addPopup = new PopupWithForm(
        constants.popupAdd, (data) => {
          //handles what happens when this form is submitted
            addValidator.renderLoading(true);
            api.addCard(data)
            .then(res=>{
              cards.addItem(makeANewCard(res));
              addValidator.renderLoading(false);
              addPopup.closePopup();
            });

        }, () => {
          //handles what happens when this form is opened
          constants.addForm.reset();
          addValidator.disableButton(constants.create);
        }
      );
      addPopup.setEventListeners();

      // addbutton event listener that opens the add form
      constants.add.addEventListener("click", function() {
        addPopup.openPopup();
      });
    }
  );

api.getUserInfo()
  .then(
    res => {
      //code for handling the user info
      userInformation.setUserInfo(res);
      constants.avatarImage.setAttribute("src", res.avatar)
    }
  )

const userInformation = new UserInfo({myName, myOccupation});
const imagePop = new PopupWithImage(constants.popupImages);
imagePop.setEventListeners();
//---------------------------------------------

//Standard Card Creation
//---------------------------------------------
function handleCardClick(text, link){
  imagePop.openPopup(text, link)
}

function makeANewCard(data){
  const initCard = new Card(data, ".card-template", handleCardClick, handleDeleteClick);
  const loadCard = initCard.makeCard();
  return loadCard;
}

//---------------------------------------------

// Form Validators
function newValidator (formElement) {
  const newForm = new FormValidator(constants.settings, formElement)
  newForm.enableValidation();
  return newForm;
}
const addValidator = newValidator(constants.addForm);
const editValidator = newValidator(constants.editForm);
const avatarValidator = newValidator(constants.avatarForm);
//---------------------------------------------

// A Section for the Edit Form
//---------------------------------------------
  const editPopup = new PopupWithForm(
    constants.popupEdit,
    (values) => {
      //handles what happens when this form is submitted
      editValidator.renderLoading(true);
      api.updateUserInfo(values)
        .then(
          userInformation.setUserInfo(values),
          editValidator.renderLoading(false),
          editPopup.closePopup(),
        )
    },
    () => {
      //handles what happens when this form is opened
      const {name, about} = userInformation.getUserInfo();
      constants.nameForm.value = name;
      constants.occupationForm.value = about;
      editValidator.disableButton(constants.save);
    }
  );
  editPopup.setEventListeners();
//---------------------------------------------

// A Section for the Avatar Popup
//---------------------------------------------
  const avatarPopup = new PopupWithForm(
    constants.popupAvatar,
    (value)=> {
      //handles what happens when this form is submitted
        avatarValidator.renderLoading(true);
        constants.avatarImage.setAttribute("src", value.avatar)
        api.updateAvatar(value)
        .then(
          avatarValidator.renderLoading(false),
          avatarPopup.closePopup(),
        )
    },
    ()=> {
      avatarValidator.disableButton(constants.avatarSave);
    }
  )
  avatarPopup.setEventListeners();
//---------------------------------------------

//A Section for the Delete Popup
//---------------------------------------------
  function handleDeleteClick(id, card){
    deletePopup.openPopup(id, card)
  }
  const deletePopup = new PopupDelete(
    constants.popupDelete,
    (id, card)=> {
      api.deleteCard(id)
      .then(
        card.remove(),
        deletePopup.closePopup(),
      )
    }
  )
  deletePopup.setEventListeners();
// Event Listeners for Buttons Which Open Forms
//---------------------------------------------
  constants.edit.addEventListener("click", function(evt) {
    editPopup.openPopup();
  });
  constants.avatar.addEventListener("click", function(){
    avatarPopup.openPopup();
  })
//---------------------------------------------

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
  const api = new Api(constants.myAuth);


  api.getUserInfo()
  .then(
    res => {
      //code for handling the user info
      userInformation.setUserInfo(res);
      constants.avatarImage.setAttribute("src", res.avatar)
    }
  )
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
                cards.prepItem(makeANewCard(res));
                addPopup.closePopup();
                addValidator.renderLoading(false);
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
    const initCard = new Card(data, ".owner-template", handleCardClick, handleDeleteClick, handleLikeClick);
    const loadCard = initCard.makeCard();
    isOwner(data.owner._id, loadCard);
    isAlreadyLiked(data, loadCard);
    return loadCard;
  }

  function isOwner(id, loadCard){
    if(id !== userInformation.getID()){
      loadCard.querySelector(".elements__delete").remove();
    }
    return loadCard
  }

  function isAlreadyLiked(data, loadCard) {
    const myID = userInformation.getID();
    data.likes.forEach(like => {
      if (like._id === myID) {
        loadCard.querySelector(".elements__heart").classList.add("elements__heart_active");
      }
    })
    return loadCard
  }

  function handleLikeClick(cardId, isLiked, evt) {
    if(isLiked){
      api.updateLikeTrue(cardId)
        .then(res =>{
          evt.target.classList.add("elements__heart_active");
          evt.target.nextSibling.nextSibling.textContent = res.likes.length;
        })
    } else {
      api.updateLikeFalse(cardId)
        .then(res =>{
          evt.target.classList.remove("elements__heart_active");
          evt.target.nextSibling.nextSibling.textContent = res.likes.length;
        })
    }
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
          editPopup.closePopup(),
          editValidator.renderLoading(false),
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
          avatarPopup.closePopup(),
          avatarValidator.renderLoading(false),
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

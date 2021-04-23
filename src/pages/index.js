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

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((res) => {
      const resUserInfo = res[0];
      const resInitCards = res[1];
      const userInformation = new UserInfo(resUserInfo, myName, myOccupation, constants.avatarImage);
      userInformation.setUserInfo(resUserInfo);


      // A Section for the Edit Form
      //---------------------------------------------
        const editPopup = new PopupWithForm(
          constants.popupEdit,
          (values) => {
            //handles what happens when this form is submitted
            editPopup.renderLoading(true);
            api.updateUserInfo(values)
              .then(
                userInformation.setUserInfo(values),
                editPopup.closePopup(),
                editPopup.renderLoading(false),
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
        constants.edit.addEventListener("click", function() {
          editPopup.openPopup();
        });
      //---------------------------------------------



      // code for rendering the initial cards
        const cards = new Section(
          {
            items: resInitCards,
            renderer: (item) => {
              cards.addItem(makeANewCard(item));
            },
          },
          constants.cardContainer
        )
        cards.renderElements();


      // code for the add card form
      //---------------------------------------------
        const addPopup = new PopupWithForm(
          constants.popupAdd, (data) => {
            //handles what happens when this form is submitted
              addPopup.renderLoading(true);
              api.addCard(data)
              .then(res=>{
                cards.prepItem(makeANewCard(res));
                addPopup.closePopup();
                addPopup.renderLoading(false);
              });

          }, () => {
            //handles what happens when this form is opened
            addValidator.disableButton();
          }
        );
        addPopup.setEventListeners();
        constants.add.addEventListener("click", function() {
          addPopup.openPopup();
        });
      //---------------------------------------------


      //Standard Card Creation
      //---------------------------------------------
        function handleCardClick(text, link){
          imagePop.openPopup(text, link)
        }

        function makeANewCard(data){
          const initCard = new Card(data, ".owner-template", handleCardClick, handleDeleteClick, handleLikeClick);
          const loadCard = initCard.makeCard(userInformation.getID());
          return loadCard;
        }

        function handleLikeClick(cardId, isLiked, card) {
          if(isLiked){
            api.updateLikeTrue(cardId)
              .then(res =>{
                card.updateLikes(res)
              })
          } else {
            api.updateLikeFalse(cardId)
              .then(res =>{
                card.updateLikes(res)
              })
          }
        }

      //---------------------------------------------

      // A Section for the Avatar Popup
      //---------------------------------------------
        const avatarPopup = new PopupWithForm(
          constants.popupAvatar,
          (value)=> {
            //handles what happens when this form is submitted
              avatarPopup.renderLoading(true);
              userInformation.setAvatar({avatar: value.avatar})
              api.updateAvatar(value)
              .then(
                avatarPopup.closePopup(),
                avatarPopup.renderLoading(false),
              )
              .catch(err => {
                console.log((`Aang, your chi is out of focus: ${err}`));
              }
              )
          },
          ()=> {
            avatarValidator.disableButton(constants.avatarSave);
          }
        )
        avatarPopup.setEventListeners();
        constants.avatar.addEventListener("click", function(){
          avatarPopup.openPopup();
        })
      //---------------------------------------------
    })
    .catch(err => {
      console.log((`Houston, we have a problem... this one in fact: ${err}`));
    }
    )

// Image Popup Initialization
  const imagePop = new PopupWithImage(constants.popupImages);
  imagePop.setEventListeners();
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
      .catch(err => {
        console.log((`I'm sorry Dave, I'm afraid I can't do that: ${err}`));
      }
      )
    }
  )
  deletePopup.setEventListeners();

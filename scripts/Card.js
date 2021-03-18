import {openPopup} from "./commonFunctions.js";

class Card {
  constructor(cardText, imageLink, template){
    this._text = cardText;
    this._imageLink = imageLink;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  // Event Handlers
  //----------------------------------------
    _handleCardDelete(evt){
      evt.target.parentElement.parentElement.remove();
      evt.stopPropagation();
    }

    _handleImagePopupOpen(){
      const imagePopup = document.querySelector(".image-popup");
      const imageCaption = document.querySelector(".image-caption");
      const popupImages = document.querySelector(".popup_image");


      openPopup(popupImages);
      imagePopup.setAttribute("src", this._imageLink);
      imagePopup.alt = this._text;
      imageCaption.textContent = this._text;
    }

    _handleCardLike(evt){
      evt.target.classList.toggle("elements__heart_active");
    }
  //----------------------------------------

  _setEventListeners() {
    this._placeCard.querySelector(".elements__image").addEventListener("click", () =>
    {
      this._handleImagePopupOpen();
    })

    this._placeCard.querySelector(".elements__heart").addEventListener("click", (evt) =>
    {
      this._handleCardLike(evt);
    })
    this._placeCard.querySelector(".elements__delete").addEventListener("click", (evt) =>
    {
      this._handleCardDelete(evt);
    })
  }

  makeCard() {
    this._placeCard = this._getTemplate();
    this._placeCard.querySelector(".elements__title").textContent = this._text;
    this._placeCard.querySelector(".elements__image").style.backgroundImage = `url(${this._imageLink})`;

    this._setEventListeners();

    return this._placeCard;
  }
}


export {Card};

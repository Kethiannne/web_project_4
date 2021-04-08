
class Card {
  constructor(cardText, imageLink, template, handleCardClick){
    this._text = cardText;
    this._imageLink = imageLink;
    this._template = template;
    this._handleCardClick = handleCardClick;
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

    _handleCardLike(evt){
      evt.target.classList.toggle("elements__heart_active");
    }
  //----------------------------------------

  _setEventListeners() {
    this._placeCard.querySelector(".elements__image").addEventListener("click", () =>
    {
      this._handleCardClick(this._text, this._imageLink);
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

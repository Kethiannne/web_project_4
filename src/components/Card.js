class Card {
  constructor(data, template, handleCardClick, handleDeleteClick){
    this._text = data.name;
    this._imageLink = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._id = data._id;
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
    _handleCardLike(evt){
      evt.target.classList.toggle("elements__heart_active");
    }
  //----------------------------------------

  _setEventListeners() {
    this._placeCard.querySelector(".elements__image").addEventListener("click", (evt) =>
    {if (evt.target === evt.currentTarget){
      this._handleCardClick(this._text, this._imageLink);}
    })

    this._placeCard.querySelector(".elements__heart").addEventListener("click", (evt) =>
    {
      this._handleCardLike(evt);
    })
    this._placeCard.querySelector(".elements__delete").addEventListener("click", (evt) =>
    {
      this._handleDeleteClick(this._id, this._placeCard);
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

class Card {
  constructor(data, template, handleCardClick, handleDeleteClick, handleLikeClick){
    this._text = data.name;
    this._imageLink = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._id = data._id;
    this._likes = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  //this is apparently not how its meant to be?
  _handleCardLike(evt){
    this._isLiked = !this._isLiked;
    this._handleLikeClick(this._id, this._isLiked, evt);
  }

  _setEventListeners() {
    this._placeCard.querySelector(".elements__image").addEventListener("click", (evt) =>
    {if (evt.target === evt.currentTarget){
      this._handleCardClick(this._text, this._imageLink);}
    })

    this._placeCard.querySelector(".elements__heart").addEventListener("click", (evt) =>
    {
      this._handleCardLike(evt);
    })

    this._placeCard.querySelector(".elements__delete").addEventListener("click", () =>
    {
      this._handleDeleteClick(this._id, this._placeCard);
    })
  }

  makeCard() {
    this._placeCard = this._getTemplate();
    this._likesCount = this._placeCard.querySelector(".elements__like-count");
    this._placeCard.querySelector(".elements__title").textContent = this._text;
    this._placeCard.querySelector(".elements__image").style.backgroundImage = `url(${this._imageLink})`;
    this._likesCount.textContent = this._likes.length
    this._setEventListeners();

    return this._placeCard;
  }
}


export {Card};

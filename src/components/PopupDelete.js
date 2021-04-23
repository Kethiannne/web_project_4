import Popup from "./Popup.js"


export default class PopupDelete extends Popup{
  constructor(popupSelector, popupSubmit){
    super(popupSelector)
    this._form = this._popup.querySelector(`.form`);
    this._submit = popupSubmit;
    // prevents handle escape from reaching global scope and breaking
    this._closeEnter = this._closeEnter.bind(this);
  }

  openPopup(id, card){
    super.openPopup();
    this._id = id;
    this._card = card;
    document.addEventListener(`keydown`, this._closeEnter)
  }

  closePopup(){
    document.removeEventListener(`keydown`, this._closeEnter)
    super.closePopup();
  }

  _handleSubmit(evt){
    evt.preventDefault();
    this._submit(this._id, this._card);
    document.removeEventListener(`keydown`, this._closeEnter)
  }

  _closeEnter(evt){
    if (evt.key === "Enter") {
      this._handleSubmit(evt);
    }
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener(`submit`, (evt) => {
      this._handleSubmit(evt);
    });
  }
}

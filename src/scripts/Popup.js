export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    // prevents handle escape from reaching global scope and breaking
    this._closeEscape = this._closeEscape.bind(this);
  }




  openPopup(popup){
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeEscape(evt));
  }

  _closeEscape(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  closePopup(){
    this._popup.classList.remove(`popup_opened`);
    document.removeEventListener("keydown", closeEscape);
  }

  setEventListeners(){
    const closeButton = this._popup.querySelector(".popup__close-button")

    closeButton.addEventListener(`click`, () => {
      this.closePopup();
    })
  }
}

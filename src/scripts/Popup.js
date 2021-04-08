export default class Popup {

  constructor(popupSelector) {
    this._popup = popupSelector;

    // prevents handle escape from reaching global scope and breaking
    this._closeEscape = this._closeEscape.bind(this);
  }

  openPopup(){
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeEscape);
  }

  closePopup(){
    this._popup.classList.remove(`popup_opened`);
    document.removeEventListener("keydown", this._closeEscape);
  }

  _closeEscape(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners(){
    this._closeButton = this._popup.querySelector(".popup__close-button");

    this._closeButton.addEventListener(`click`, () => {
      this.closePopup();
    });

    this._popup.addEventListener("click", (evt) =>{
      if (evt.target === evt.currentTarget){
        this.closePopup();
      }
    });
  }
}






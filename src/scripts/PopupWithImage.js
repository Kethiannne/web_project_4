
import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(`.image-popup`);
    this._popupCaption = this._popup.querySelector(`.image-caption`);
  }

  openPopup(text, link){
    this._popupImage.src = link;
    this._popupImage.alt = text;
    this._popupCaption.textContent = text;
    super.openPopup();
  }
}
    // const imagePopup = document.querySelector(".image-popup");
    // const imageCaption = document.querySelector(".image-caption");
    // const popupImages = document.querySelector(".popup_image");


    // openPopup(popupImages);
    // imagePopup.setAttribute("src", this._imageLink);
    // imagePopup.alt = this._text;
    // imageCaption.textContent = this._text;

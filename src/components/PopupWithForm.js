
import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor (popupSelector, formSubmit, formOpen) {
    super(popupSelector);
    this._form = this._popup.querySelector(`.form`);
    this._formSubmit = formSubmit;
    this._formOpen = formOpen;
  }

  renderLoading(isLoading){
    this._saveButton = this._form.querySelector(".form__save-button")
    const ogText = this._saveButton.textContent;
    if(isLoading){
      this._saveButton.textContent = this._saveButton.textContent.slice(0, -1)+"ing...";
    }else{
      this._saveButton.textContent = this._saveButton.textContent.slice(0, -6)+"e";
    }
  }
  _getInputValues(){
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll(`.form__field`));

    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners(){
    super.setEventListeners();

    this._form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  closePopup(){
    super.closePopup();
    this._form.reset();
  }

  openPopup(){
    super.openPopup();
    this._formOpen();
  }
}


import Popup from `./Popup.js`

export default class PopupWithForm extends Popup {
  constructor (popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(`.form`);
    this._formSubmit = formSubmit;
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
      evt.preventdefault();
      this._formSubmit();
    });
  }

  closePopup(){
    super.closePopup();
    this._form.reset();
  }
}

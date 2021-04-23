class FormValidator {
  constructor(config, form){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = form;
    this._saveButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  //-- Showing/Hiding Error Messages
    _showInputError (inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };

    _hideInputError (inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };
  //--

  //-- Form Validity Checks
    _checkInputValidity (inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

    _hasInvalidInput (inputList) {
      return inputList.some((inputElement) =>
      {
        return !inputElement.validity.valid;
      })
    };
  //--

  //-- En/Dis-abling Submit Buttons Based on Validity of Their Corresponding Forms
    _toggleButtonState (inputList) {
      if (this._hasInvalidInput(inputList)) {
        this.disableButton();
      } else {
        this.enableButton();
      }
    };

    disableButton(){
      this._saveButton.setAttribute("disabled", true);
      this._saveButton.classList.add(this._inactiveButtonClass);
    }

    enableButton(){
      this._saveButton.removeAttribute("disabled", true);
      this._saveButton.classList.remove(this._inactiveButtonClass);
    }
  //--

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));


    this._toggleButtonState(inputList);

    inputList.forEach((inputElement) =>
    {
      inputElement.addEventListener("input",  () =>
      {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList)
      });
    });


    this._formElement.addEventListener("submit", (evt) =>
    {
      evt.preventDefault();
    });
  };

   enableValidation () {
      this._setEventListeners(this._formElement);
  };
}
export {FormValidator};

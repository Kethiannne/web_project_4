// A Section for Form Validation
//---------------------------------------------

//-- Showing/Hiding Error Messages
  const showInputError = function(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  const hideInputError = function(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  };
//--

//-- Form Validity Checks
  const checkInputValidity = function(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };

  const hasInvalidInput = function(inputList) {
    return inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    })
  };
//--

//-- En/Dis-abling Submit Buttons Based on Validity of Their Corresponding Forms
  const toggleButtonState = function(inputList, saveButton, config) {
    if (hasInvalidInput(inputList)) {
      saveButton.setAttribute("disabled", true);
      saveButton.classList.add(config.inactiveButtonClass);
    } else {
      saveButton.removeAttribute("disabled", true);
      saveButton.classList.remove(config.inactiveButtonClass);
    }
  }
//--

//-- Putting it into Action
  const setEventListeners = function(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const saveButton = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, saveButton, config);

    inputList.forEach(function (inputElement) {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);

        toggleButtonState(inputList, saveButton, config)
      });
    });

  };

  function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach(function (formElement){

      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
        formElement.reset();
      });

      setEventListeners(formElement, config);

    });
  }

  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__field",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__field_error",
    errorClass: "form__field-error_active"
  });
//--
//---------------------------------------------

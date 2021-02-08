let page = document.querySelector(".page");
let profile = page.querySelector(".profile");
let popup = page.querySelector(".popup");
let edit = profile.querySelector(".profile__edit-button");
let editForm = popup.querySelector(".edit-form");
let closeEdit = popup.querySelector(".popup__close-button");

let nameForm = editForm.querySelector(".edit-form__field_input_name");
let occupationForm = editForm.querySelector(".edit-form__field_input_occupation");
let myName = profile.querySelector(".profile__name");
let myOccupation = profile.querySelector(".profile__occupation");

// A section For Opening and Closing the Popup
//---------------------------------------------
function openPopup(){
  popup.classList.add("popup_opened");
  nameForm.value = myName.textContent;
  occupationForm.value = myOccupation.textContent;
}
function closePopup(){
  popup.classList.remove("popup_opened");
}
edit.addEventListener("click", openPopup);
closeEdit.addEventListener("click", closePopup);
//----------------------------------------------


// A section For the Edit Form Text
//---------------------------------------------


function saveProfileEdits(){
  myName.textContent = nameForm.value;
  myOccupation.textContent = occupationForm.value;
  closePopup();
  event.preventDefault()
}

editForm.addEventListener("submit", saveProfileEdits);
//---------------------------------------------

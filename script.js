let page = document.querySelector(".page");

let profile = page.querySelector(".profile");

let popup = page.querySelector(".popup");

let edit = profile.querySelector(".profile__edit-button");

let editForm = popup.querySelector(".edit-form");

let closeEdit = editForm.querySelector(".edit-form__close-button");







// A section For Opening and Closing the Popup
//---------------------------------------------
function openPopup(){
  popup.classList.add("popup_opened");
}

function closePopup(){
  popup.classList.remove("popup_opened");
}

edit.addEventListener("click", openPopup);

closeEdit.addEventListener("click", closePopup);
//----------------------------------------------


// A section For the Like Buttons
//---------------------------------------------
let likeButton = page.querySelector(".elements__heart");

function like(){
likeButton.classList.toggle("elements__heart_active");
}
likeButton.addEventListener("click", like);

//---------------------------------------------


// A section For the Edit Form Text
//---------------------------------------------
let nameForm = editForm.querySelector("#name-form");

let occupationForm = editForm.querySelector("#occupation-form");

let myName = profile.querySelector(".profile__name");

let myOccupation = profile.querySelector(".profile__occupation");

let saveButton = editForm.querySelector(".edit-form__save-button");
//profile texts
console.log(myOccupation);

console.log(myName);

console.log(myOccupation.textContent);

console.log(myName.textContent);
//edit-form fields
console.log(nameForm);

console.log(occupationForm);

console.log(nameForm.textContent);

console.log(occupationForm.textContent);
//

function saveProfileEdits(){
  myName.textContent = nameForm.value;
  myOccupation.textContent = occupationForm.value;
}

saveButton.addEventListener("click", saveProfileEdits);

//---------------------------------------------

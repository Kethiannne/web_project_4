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
let likeButton1 = page.querySelector("#HB1");
let likeButton2 = page.querySelector("#HB2");
let likeButton3 = page.querySelector("#HB3");
let likeButton4 = page.querySelector("#HB4");
let likeButton5 = page.querySelector("#HB5");
let likeButton6 = page.querySelector("#HB6");

function like1(){
  likeButton1.classList.toggle("elements__heart_active");
}

function like2(){
  likeButton2.classList.toggle("elements__heart_active");
}

function like3(){
  likeButton3.classList.toggle("elements__heart_active");
}

function like4(){
  likeButton4.classList.toggle("elements__heart_active");
}

function like5(){
  likeButton5.classList.toggle("elements__heart_active");
}

function like6(){
  likeButton6.classList.toggle("elements__heart_active");
}

likeButton1.addEventListener("click", like1);
likeButton2.addEventListener("click", like2);
likeButton3.addEventListener("click", like3);
likeButton4.addEventListener("click", like4);
likeButton5.addEventListener("click", like5);
likeButton6.addEventListener("click", like6);

//---------------------------------------------


// A section For the Edit Form Text
//---------------------------------------------
let nameForm = editForm.querySelector("#name-form");

let occupationForm = editForm.querySelector("#occupation-form");

let myName = profile.querySelector(".profile__name");

let myOccupation = profile.querySelector(".profile__occupation");

let saveButton = editForm.querySelector(".edit-form__save-button");

function saveProfileEdits(){
  myName.textContent = nameForm.value;
  myOccupation.textContent = occupationForm.value;
}

saveButton.addEventListener("click", saveProfileEdits);

//---------------------------------------------

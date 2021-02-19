// General Page Vars
  const page = document.querySelector(".page");
  const profile = page.querySelector(".profile");
  const popup = page.querySelector(".popup");
  const closeButton = popup.querySelector(".popup__close-button");
// Edit form Vars
  const edit = profile.querySelector(".profile__edit-button");
  const editForm = popup.querySelector(".edit-form");
  const myName = profile.querySelector(".profile__name");
  const myOccupation = profile.querySelector(".profile__occupation");
  const nameForm = editForm.querySelector(".edit-form__field_input_name");
  const occupationForm = editForm.querySelector(".edit-form__field_input_occupation");
// Place Card Vars
  const add = profile.querySelector(".profile__add-button");
  const addForm = popup.querySelector(".add-form");
  const titleForm = addForm.querySelector(".add-form__field_input_title");
  const imageForm = addForm.querySelector(".add-form__field_input_image_link");
// Element Card Template Vars
  const cardContainer = document.querySelector(".card-container");
  const imagePopup = document.querySelector(".image-popup");



// A section for the Popup Overlay
//---------------------------------------------
  function openPopup(){
    popup.classList.add("popup_opened");
  }
  function closePopup(){
    popup.classList.remove("popup_opened");
  }
  function closeForm(){
    editForm.classList.remove("popup_opened");
    addForm.classList.remove("popup_opened");
  }
  closeButton.addEventListener("click", function() {
    closePopup();
    closeForm();
    imagePopup.src = "";
    imagePopup.alt = "";
    imagePopup.classList.remove("popup_opened")

  });
//----------------------------------------------

// A Section for the Edit Form
//---------------------------------------------
  edit.addEventListener("click", function() {
    openPopup();
    editForm.classList.add("popup_opened");
    nameForm.value = myName.textContent;
    occupationForm.value = myOccupation.textContent;
  });

  function saveProfileEdits(){
    myName.textContent = nameForm.value;
    myOccupation.textContent = occupationForm.value;
    event.preventDefault();
  }

  editForm.addEventListener("submit", function() {
    closePopup();
    closeForm();
    saveProfileEdits();
  });
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------
add.addEventListener("click", function() {
  openPopup();
  addForm.classList.add("popup_opened");
});

function saveNewPlace(){
  makeCard(titleForm.value, imageForm.value);
  titleForm.value = "";
  imageForm.value = "";
  event.preventDefault();
}

addForm.addEventListener("submit", function() {
  closePopup();
  closeForm();
  saveNewPlace();
});
//---------------------------------------------

// A Section for Place Cards
//---------------------------------------------

  const initialCards = [
    {name: "Yosemite Valley", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"},
    {name: "Lake Louise", link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"},
    {name: "Bald Mountains", link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"},
    {name: "Latemar", link: "https://code.s3.yandex.net/web-code/latemar.jpg"},
    {name: "Vanoise National Park", link: "https://code.s3.yandex.net/web-code/vanoise.jpg"},
    {name: "Lago di Braies", link: "https://code.s3.yandex.net/web-code/lago.jpg"}
  ];

  window.onload = initialCards.forEach(function (item){
    makeCard(item.name, item.link);
  });

  function makeCard(title, imageLink) {
    const cardTemplate = document.querySelector(".card-template").content;
    const placeCard = cardTemplate.querySelector(".elements__element").cloneNode(true);

    placeCard.querySelector(".elements__title").textContent = title;
    placeCard.querySelector(".elements__image").alt = title;
    placeCard.querySelector(".elements__image").src = imageLink;

    placeCard.querySelector(".elements__heart").addEventListener(
      "click", function(evt) {
        evt.target.classList.toggle("elements__heart_active");
      }
    );

    placeCard.querySelector(".elements__image").addEventListener(
      "click", function(evt) {
        openPopup();

        imagePopup.src = evt.target.src;
        imagePopup.alt = evt.target.alt;
        imagePopup.classList.add("popup_opened")
      }
    );

    placeCard.querySelector(".elements__delete").addEventListener(
      "click", function(evt) {
        evt.target.parentElement.remove();
      }
    );

    cardContainer.prepend(placeCard);
  };
//---------------------------------------------



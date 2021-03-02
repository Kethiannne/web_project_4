// General Page Vars
  const page = document.querySelector(".page");
  const profile = page.querySelector(".profile");
  const popupEdit = page.querySelector(".popup_edit-form");
  const popupAdd = page.querySelector(".popup_add-form");
  const popupImages = page.querySelector(".popup_image");
  const closeButtons = document.querySelectorAll(".popup__close-button");
// Edit form Vars
  const edit = profile.querySelector(".profile__edit-button");
  const editForm = popupEdit.querySelector(".edit-form");
  const myName = profile.querySelector(".profile__name");
  const myOccupation = profile.querySelector(".profile__occupation");
  const nameForm = editForm.querySelector(".edit-form__name");
  const occupationForm = editForm.querySelector(".edit-form__occupation");
// Place Card Vars
  const add = profile.querySelector(".profile__add-button");
  const addForm = popupAdd.querySelector(".add-form");
  const titleForm = addForm.querySelector(".add-form__title");
  const imageForm = addForm.querySelector(".add-form__image");
// Element Card Template Vars
  const cardContainer = document.querySelector(".card-container");
  const imagePopup = document.querySelector(".image-popup");
  const imageCaption = document.querySelector(".image-caption");

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

  function makeCard(title, imageLink) {
    const cardTemplate = document.querySelector(".card-template").content;
    const placeCard = cardTemplate.querySelector(".elements__element").cloneNode(true);

    placeCard.querySelector(".elements__title").textContent = title;
    placeCard.querySelector(".elements__image").style.backgroundImage = `url(${imageLink})`;

    return placeCard;
  };

  cardContainer.addEventListener("click", function (evt) {

    if (evt.target.classList.contains("")) {};

    if (evt.target.classList.contains("elements__heart")) {
      evt.target.classList.toggle("elements__heart_active");
    };

    if (evt.target.classList.contains("elements__image")) {
      openPopup(popupImages);

      //variables which isolate the location of the relevant image and text
      const title = evt.target.nextElementSibling.firstElementChild.textContent;
      const imageUrl = evt.target.style.backgroundImage.slice(5, (evt.target.style.backgroundImage.length - 2));
                                                        //slice removes the "url()" part which src doesn't like
      //

      imagePopup.setAttribute("src", imageUrl);
      imagePopup.alt = title;
      imageCaption.textContent = title;
    };

    if (evt.target.classList.contains("elements__delete")) {
      evt.target.parentElement.parentElement.remove();
      evt.stopPropagation();
    };
  })



  window.onload = initialCards.forEach(function (item){
    cardContainer.append(makeCard(item.name, item.link));
  });

//---------------------------------------------
  function openPopup(popup){
    popup.classList.add("popup_opened");
  }

  function closePopup(evt){
    evt.target.closest(".popup").classList.remove("popup_opened");
  }

  Array.from(closeButtons).forEach(function(close) {
    close.addEventListener("click", function(evt) {
      closePopup(evt);
    })});
//----------------------------------------------

// A Section for the Edit Form
//---------------------------------------------
  edit.addEventListener("click", function(evt) {
    openPopup(popupEdit);
    nameForm.value = myName.textContent;
    occupationForm.value = myOccupation.textContent;
  });

  function saveProfileEdits(){
    myName.textContent = nameForm.value;
    myOccupation.textContent = occupationForm.value;
  }

  editForm.addEventListener("submit", function(evt) {
    closePopup(evt);
    saveProfileEdits();
    event.preventDefault();
  });
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------
add.addEventListener("click", function(evt) {
  openPopup(popupAdd);
});

function saveNewPlace(){
  cardContainer.prepend(makeCard(titleForm.value, imageForm.value));
  titleForm.value = "";
  imageForm.value = "";
}

addForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  closePopup(evt);
  saveNewPlace();
});
//---------------------------------------------





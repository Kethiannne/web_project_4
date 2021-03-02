// General Page Vars
  const page = document.querySelector(".page");
  const profile = page.querySelector(".profile");
  const popupEdit = page.querySelector(".popup_edit-form");
  const popupAdd = page.querySelector(".popup_add-form");
  const popupImages = page.querySelector(".popup_image");

  const closeButton = document.querySelectorAll(".popup__close-button");
// Edit form Vars
  const edit = profile.querySelector(".profile__edit-button");
  const editForm = popupEdit.querySelector(".edit-form");
  const myName = profile.querySelector(".profile__name");
  const myOccupation = profile.querySelector(".profile__occupation");
  const nameForm = editForm.querySelector(".edit-form__field_input_name");
  const occupationForm = editForm.querySelector(".edit-form__field_input_occupation");
// Place Card Vars
  const add = profile.querySelector(".profile__add-button");
  const addForm = popupAdd.querySelector(".add-form");
  const titleForm = addForm.querySelector(".add-form__field_input_title");
  const imageForm = addForm.querySelector(".add-form__field_input_image_link");
// Element Card Template Vars
  const cardContainer = document.querySelector(".card-container");
  const imagePopup = document.querySelector(".image-popup");
  const imageCaption = document.querySelector(".image-caption");


<<<<<<< Updated upstream
=======
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

      imagePopup.src = evt.target.style.backgroundImage;
      imagePopup.alt = evt.target.closest(".elements__title").textContent;
      imageCaption.textContent = evt.target.closest(".elements__title").textContent;
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
>>>>>>> Stashed changes

// A section for the Popup Overlay
//---------------------------------------------
  function openPopup(popup){
    popup.classList.add("popup_opened");
  }

  function closePopup(evt){
    evt.target.closest(".popup").classList.remove("popup_opened");
  }

  Array.from(closeButton).forEach(function(close) {
    close.addEventListener("click", function(evt) {
      closePopup(evt);
    })});
//----------------------------------------------

// A Section for the Edit Form
//---------------------------------------------
  edit.addEventListener("click", function(evt) {
    openPopup(popupEdit);
    editForm.classList.add("form_opened");
    nameForm.value = myName.textContent;
    occupationForm.value = myOccupation.textContent;
  });

  function saveProfileEdits(){
    myName.textContent = nameForm.value;
    myOccupation.textContent = occupationForm.value;
    event.preventDefault();
  }

  editForm.addEventListener("submit", function(evt) {
    closePopup(evt);
    saveProfileEdits();
  });
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------
add.addEventListener("click", function(evt) {
  openPopup(popupAdd);
  addForm.classList.add("form_opened");
});

function saveNewPlace(){
  makeCard(titleForm.value, imageForm.value);
  titleForm.value = "";
  imageForm.value = "";
  event.preventDefault();
}

addForm.addEventListener("submit", function(evt) {
  event.preventDefault();
  closePopup(evt);
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
    placeCard.querySelector(".elements__image").style.backgroundImage = `url(${imageLink})`;

    placeCard.querySelector(".elements__heart").addEventListener(
      "click", function(evt) {
        evt.target.classList.toggle("elements__heart_active");
      }
    );

    placeCard.querySelector(".elements__image").addEventListener(
      "click", function(evt) {
        openPopup(popupImages);

        imagePopup.src = imageLink;
        imagePopup.alt = title;
        imagePopup.classList.add("form_opened")
        imageCaption.textContent = title;
      }
    );

    placeCard.querySelector(".elements__delete").addEventListener(
      "click", function(evt) {
        evt.target.parentElement.parentElement.remove();
        evt.stopPropagation();
      }
    );

    cardContainer.prepend(placeCard);
  };
//---------------------------------------------



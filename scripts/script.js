// General Page Vars
  const page = document.querySelector(".page");
  const profile = page.querySelector(".profile");
  const popupEdit = page.querySelector(".popup_edit-form");
  const popupAdd = page.querySelector(".popup_add-form");
  const popupImages = page.querySelector(".popup_image");
  const popupAll = page.querySelectorAll(".popup");
  const closeButtons = document.querySelectorAll(".popup__close-button");
// Edit form Vars
  const edit = profile.querySelector(".profile__edit-button");
  const myName = profile.querySelector(".profile__name");
  const myOccupation = profile.querySelector(".profile__occupation");
  const editForm = document.forms.edit;
  const nameForm = editForm.elements.Name;
  const occupationForm = editForm.elements.Occupation;
// Place Card and Add Form Vars
  const add = profile.querySelector(".profile__add-button");
  const create = popupAdd.querySelector(".form__save-button");
  const addForm = document.forms.add;
  const titleForm = addForm.elements.Title;
  const imageForm = addForm.elements.ImageLink;
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

    if (evt.target.classList.contains("elements__heart")) {
      evt.target.classList.toggle("elements__heart_active");
    };

    if (evt.target.classList.contains("elements__image")) {
      openPopup(popupImages);

      //variables which isolate the location of the relevant image and text
      const title = evt.target.nextElementSibling.firstElementChild.textContent;
      const imageUrl = evt.target.style.backgroundImage.slice(5, (evt.target.style.backgroundImage.length - 2));
                                                      //slice removes the "url()" part which src doesnt like
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

// A section for Opening and for Closing
//---------------------------------------------
  function openPopup(popup){
    popup.classList.add("popup_opened");
  }

  function closePopup(){
    popupEdit.classList.remove("popup_opened");
    popupImages.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    addForm.reset();
  }

  Array.from(closeButtons).forEach(function(close) {
    close.addEventListener("click", function() {
      closePopup();
    })});

  document.addEventListener("keydown", function(evt) {
    if (evt.key === "Escape") {
      closePopup();
    }
  });

  Array.from(popupAll).forEach(function(popup){
    popup.addEventListener("click", function(evt){
      if (evt.target === evt.currentTarget){
        closePopup();
      }
    });
  })

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
    saveProfileEdits();
    closePopup(evt);
  });
//---------------------------------------------

// A section for the Add Card Form
//---------------------------------------------
  add.addEventListener("click", function(evt) {
    openPopup(popupAdd);
  });

  function saveNewPlace(){
    cardContainer.prepend(makeCard(titleForm.value, imageForm.value));
  }


  addForm.addEventListener("submit", function(evt) {
    saveNewPlace();
    closePopup(evt);
  });
//---------------------------------------------




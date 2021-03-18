export function openPopup(popup){
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscape);
}

export function closeEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

export function closePopup(){
  const popupOpen = document.querySelector(`.popup_opened`);
  popupOpen.classList.remove(`popup_opened`);
  document.removeEventListener("keydown", closeEscape);
}

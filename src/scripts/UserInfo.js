// Creating the UserInfo Class
// The UserInfo class is responsible for rendering information about the user on the page.
// This class should:
// Take an object with the selectors of two elements into the constructor: one containing the user's name,
// and another containing the user's job.
// Store a public method named getUserInfo(), which returns an object with information about the user.
// This method will be handy for cases when it's necessary to display the user data in the open form.
// Store a public method named setUserInfo(), which takes new user data and adds it on the page.


import {myName, myOccupation}from "./constants.js"

export default class UserInfo {
  constructor(info) {
    this._name = info.myName.textContent;
    this._occupation = info.myOccupation.textContent;
  }

  getUserInfo() {
    const userName = this._name;
    const occupation = this._occupation;
    //this is supposed to take the data already on the page and put it into the form inputs as the initial text when its opened
    return {name: userName, job: occupation}
  }

  setUserInfo(name, job) {
    myName.textContent = name;
    myOccupation.textContent = job;

    //this is supposed to save new text to the page in the user info sections
  }
}

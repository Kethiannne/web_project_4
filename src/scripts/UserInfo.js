
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

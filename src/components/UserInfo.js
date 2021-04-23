export default class UserInfo {
  constructor(myName, myOccupation, profileImage) {
    this._profileImage = profileImage;
    this._myName = myName;
    this._myOccupation = myOccupation;
  }

  getUserInfo() {
    const userName = this._myName.textContent;
    const occupation = this._myOccupation.textContent;
    return {name: userName, about: occupation}
  }

  setUserInfo(data) {
    this._myName.textContent = data.name;
    this._myOccupation.textContent = data.about;
    this._id = data._id;
    this.setAvatar(data)
  }


  setAvatar(data){
    this._profileImage.setAttribute("src", data.avatar)
  }

  getID(){
    return this._id;
  }
}

export default class UserInfo {
  constructor(info, myName, myOccupation, profileImage) {
    this._name = info.name;
    this._occupation = info.about;
    this._id = info._id;
    this._avatar = info.avatar;
    this._profileImage = profileImage;
    this._myName = myName;
    this._myOccupation = myOccupation;
    console.log(this._avatar);
  }

  getUserInfo() {
    const userName = this._name;
    const occupation = this._occupation;
    return {name: userName, about: occupation}
  }

  setUserInfo(data) {
    this._myName.textContent = data.name;
    this._myOccupation.textContent = data.about;
    this.setAvatar(data)
  }


  setAvatar(data){
    this._profileImage.setAttribute("src", data.avatar)
  }

  getID(){
    return this._id;
  }
}

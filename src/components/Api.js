export default class Api {
  constructor({baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _successfulReturn(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(this._baseURL + `/cards`, {
      headers: this._headers
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  addCard({link, name}){
    return fetch(this._baseURL + `/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({link, name})
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  deleteCard(id){
    return fetch(this._baseURL + `/cards/` + id, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  updateLikeTrue(cardID){
    return fetch(this._baseURL + `/cards/likes/` + cardID, {
      headers: this._headers,
      method: "PUT",
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  updateLikeFalse(cardID){
    return fetch(this._baseURL + `/cards/likes/` + cardID, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  getUserInfo(){
    return fetch(this._baseURL + `/users/me`, {
      headers: this._headers
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  updateUserInfo(values){
    return fetch(this._baseURL + `/users/me`,
    {
      headers: this._headers,
      method:"PATCH",
      body: JSON.stringify(values)
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }

  updateAvatar(link){
    return fetch(this._baseURL + `/users/me/avatar`,
    {
    headers: this._headers,
    method:"PATCH",
    body: JSON.stringify(link)
    })
      .then(res => {
        return this._successfulReturn(res);
      })
  }
}

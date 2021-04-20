export default class Api {
  constructor({baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    // get method https://around.nomoreparties.co/v1/group-7/cards
    return fetch(this._baseURL + `/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }

  // getAppInfo(){
  //   //makes the page wait to render the user info and the cards until they are loaded
  // }

  addCard({link, name}){
    //post method https://around.nomoreparties.co/v1/groupId/cards
    return fetch(this._baseURL + `/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({link, name})
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }

  deleteCard(id){
    //delete method https://around.nomoreparties.co/v1/groupId/cards/cardID
    return fetch(this._baseURL + `/cards/` + id, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }


  //this shit is still broken!!!
  updateLike(cardID, like){
    // put https://around.nomoreparties.co/v1/groupId/users/me/avatar
    // delete https://around.nomoreparties.co/v1/groupId/users/me/avatar
    const liked = "DELETE"
    if(like === true ){liked = "PUT"}


    return fetch(this._baseURL + `/cards/likes` + cardID, {
      headers: this._headers,
      method: liked,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }

  getUserInfo(){
    return fetch(this._baseURL + `/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }

  updateUserInfo(values){
    return fetch(this._baseURL + `/users/me`,
    {
      headers: this._headers,
      method:"PATCH",
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }

  updateAvatar(link){
    return fetch(this._baseURL + `/users/me/avatar`,
    {
    headers: this._headers,
    method:"PATCH",
    body: JSON.stringify(link)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch(err => {
        console.log((`Houston, we have a problem... this one in fact: ${err}`));
      }
      )
  }
}

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  }

  getProfile () {
    return  fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
        .then(res => this._getResponseData(res))
  }

  getInitialCards() {
    return  fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
        .then(res => this._getResponseData(res))
  }
  editProfile({name, about}) {
    return  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
        .then(res => this._getResponseData(res))
  }
  addCard({name, link}) {
    return  fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
        .then(res => this._getResponseData(res))
  }
  deleteCard(id) {
    return  fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
        .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, like) {
    return  fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: like ?  'PUT' : 'DELETE',
      headers: this._headers,

    })
        .then(res => this._getResponseData(res))
  }

  editAvatar(avatar) {
    return  fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
        .then(res => this._getResponseData(res))
  }
}

export const api = new Api({
  baseUrl: 'api.axlstar.mesto.nomoreparties.sbs',
});


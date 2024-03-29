export const BASE_URL = 'https://api.axlstar.mesto.nomoreparties.sbs';

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`)
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};



 export const authorize = (password, email) => {
     return fetch(`${BASE_URL}/signin`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ password, email })
     })
         .then(checkResponse)
 };

 export const getContent = (token) => {
     return fetch(`${BASE_URL}/users/me`, {
         method: 'GET',
         headers: {
             "Content-Type": "application/json",
             authorization : `Bearer ${token}`
         }
     })
         .then(checkResponse)
 }
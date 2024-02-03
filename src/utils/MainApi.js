class MainApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _validateResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.resolve(res.json()).then((data) => Promise.reject(data));
  }

  saveFilm(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        movieId: data.id,
        image: data.src,
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
      }),
    }).then(this._validateResponse.bind(this));
  }

  getSavedFilms() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._validateResponse.bind(this));
  }

  deleteFilm(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  register(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._validateResponse.bind(this));
  }

  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._validateResponse.bind(this));
  }

  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._validateResponse.bind(this));
  }

  updateProfile(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._validateResponse.bind(this));
  }
}

const myapi = new MainApi({
  // baseUrl: 'http://127.0.0.1:3000',
  baseUrl: 'https://api.myfilms.nomoredomainsmonster.ru',
});

export default myapi;

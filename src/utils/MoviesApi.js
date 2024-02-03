class MoviesApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _validateResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  search() {
    return fetch(`${this.baseUrl}`, {
      headers: {},
    }).then(this._validateResponse.bind(this));
  }
}

const api = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default api;

import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';

const mapCards = (cards) => {
  return cards.map((item) => ({
    id: item._id,
    src: item.image,
    alt: item.nameRU,
    nameRU: item.nameRU,
    duration: item.duration,
    saved: true,
    nameEN: item.nameEN,
    country: item.country,
    director: item.director,
    year: item.year,
    description: item.description,
    trailerLink: item.trailerLink,
    thumbnail: item.thumbnail,
  }));
};

const SavedMovies = ({
  isLoggedIn,
  savedPreviouslyFilms,
  handleDeleteFilm,
}) => {
  const [isShortMoviesSelected, setIsShortMoviesSelected] = useState(false);
  const [savedFilms, setSavedFilms] = useState([]);

  const [searchedFilm, setSearchedFilm] = useState('');

  useEffect(() => {
    const newCards = mapCards(savedPreviouslyFilms);
    setSavedFilms(newCards);
  }, [savedPreviouslyFilms]);

  function onTumblerClicked() {
    setIsShortMoviesSelected((prevValue) => !prevValue);
  }

  const onDeleteMovie = (id) => {
    mainApi
      .deleteFilm(id)
      .then(() => {
        handleDeleteFilm(id);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };
  const onSearchSubmit = (searchedFilm) => {
    setSearchedFilm(searchedFilm);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          isShortMoviesSelected={isShortMoviesSelected}
          onTumblerClicked={onTumblerClicked}
          onSearchSubmit={onSearchSubmit}
          searchedInStorage={''}
        />
        <MoviesCardList
          moviesData={
            isShortMoviesSelected
              ? savedFilms
                  .filter((item) => item.duration <= 40)
                  .filter(
                    (item) =>
                      item.nameRU.includes(searchedFilm) ||
                      item.nameEN.includes(searchedFilm),
                  )
              : savedFilms.filter(
                  (item) =>
                    item.nameRU.includes(searchedFilm) ||
                    item.nameEN.includes(searchedFilm),
                )
          }
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

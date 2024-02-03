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
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const newCards = mapCards(savedPreviouslyFilms);
    setSavedFilms(newCards);
    //для высвечивания надписи о том что ничего не найдено
    if (savedPreviouslyFilms.length === 0 && isSearchDone) {
      setSearchError('Ничего не найдено');
    }
  }, [savedPreviouslyFilms, isSearchDone]);

  useEffect(() => {
    if (isShortMoviesSelected) {
      if (
        savedFilms
          .filter((item) => item.duration <= 40)
          .filter(
            (item) =>
              item.nameRU.toLowerCase().includes(searchedFilm.toLowerCase()) ||
              item.nameEN.toLowerCase().includes(searchedFilm.toLowerCase()),
          ).length === 0
      ) {
        setSearchError('Ничего не найдено');
      } else {
        setSearchError('');
      }
    } else {
      if (
        savedFilms.filter(
          (item) =>
            item.nameRU.toLowerCase().includes(searchedFilm.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(searchedFilm.toLowerCase()),
        ).length === 0
      ) {
        setSearchError('Ничего не найдено');
      } else {
        setSearchError('');
      }
    }
  }, [isShortMoviesSelected, savedFilms, searchedFilm]);

  function onTumblerClicked() {
    setIsShortMoviesSelected((prevValue) => !prevValue);
    setIsSearchDone(true);
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
    setIsSearchDone(true);
    if (isShortMoviesSelected) {
      if (
        savedFilms
          .filter((item) => item.duration <= 40)
          .filter(
            (item) =>
              item.nameRU.toLowerCase().includes(searchedFilm.toLowerCase()) ||
              item.nameEN.toLowerCase().includes(searchedFilm.toLowerCase()),
          ).length === 0
      ) {
        setSearchError('Ничего не найдено');
      } else {
        setSearchError('');
      }
    } else {
      if (
        savedFilms.filter(
          (item) =>
            item.nameRU.toLowerCase().includes(searchedFilm.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(searchedFilm.toLowerCase()),
        ).length === 0
      ) {
        setSearchError('Ничего не найдено');
      } else {
        setSearchError('');
      }
    }
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
                      item.nameRU
                        .toLowerCase()
                        .includes(searchedFilm.toLowerCase()) ||
                      item.nameEN
                        .toLowerCase()
                        .includes(searchedFilm.toLowerCase()),
                  )
              : savedFilms.filter(
                  (item) =>
                    item.nameRU
                      .toLowerCase()
                      .includes(searchedFilm.toLowerCase()) ||
                    item.nameEN
                      .toLowerCase()
                      .includes(searchedFilm.toLowerCase()),
                )
          }
          isSearchDone={isSearchDone}
          searchError={searchError}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

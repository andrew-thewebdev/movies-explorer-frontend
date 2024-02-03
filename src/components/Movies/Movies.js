import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { useLocalStorage } from '../../utils/hooks';

const mapCards = (cards, savedFilms) => {
  return cards.map((item) => ({
    id: item.id,
    src: `https://api.nomoreparties.co${item.image.url}`,
    alt: item.nameRU,
    nameRU: item.nameRU,
    duration: item.duration,
    saved: savedFilms.filter((film) => film.movieId === item.id).length > 0,
    nameEN: item.nameEN,
    country: item.country,
    director: item.director,
    year: item.year,
    description: item.description,
    trailerLink: item.trailerLink,
    thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
  }));
};

const Movies = ({
  isLoggedIn,
  savedPreviouslyFilms,
  handleSaveFilm,
  handleDeleteFilm,
}) => {
  const [isShortMoviesSelected, setIsShortMoviesSelected] = useLocalStorage(
    'shortMoviesSelected',
    false,
  );

  const [cardsInStorage, setCardsInStorage] = useLocalStorage(
    'initiallyFoundCards',
    [],
  );
  const [searchedInStorage, setSearchedInStorage] = useLocalStorage(
    'searched',
    '',
  );

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);
  // const [searchError, setSearchError] = useState('Ничего не найдено...');
  const [searchError, setSearchError] = useState('');

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [savedFilms, setSavedFilms] = useState(savedPreviouslyFilms);

  function onTumblerClicked() {
    setIsShortMoviesSelected((prevValue) => !prevValue);
    setIsSearchDone(true);
  }

  const detectSize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    const storedSearch = localStorage.getItem('searched');
    if (storedSearch !== '""') {
      // console.log('уже был поиск', storedSearch);
      setIsSearchDone(true);
      if (cards.length === 0) {
        setSearchError('Ничего не найдено');
      }
    } else {
      // console.log('не было поисков еще');
      setIsSearchDone(false);
      setSearchError('');
    }
  }, [cards]);

  useEffect(() => {
    setSavedFilms(savedPreviouslyFilms);
  }, [savedPreviouslyFilms]);

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [screenWidth]);

  useEffect(() => {
    const storedSearch = localStorage.getItem('searched');
    setSearchedInStorage(JSON.parse(storedSearch));
  }, [setSearchedInStorage]);

  useEffect(() => {
    if (isShortMoviesSelected) {
      const storedCards = localStorage.getItem('initiallyFoundCards');
      const newCards = mapCards(JSON.parse(storedCards), savedFilms);
      setCards(newCards.filter((item) => item.duration <= 40));
    }
    if (!isShortMoviesSelected) {
      const storedCards = localStorage.getItem('initiallyFoundCards');
      const newCards = mapCards(JSON.parse(storedCards), savedFilms);
      setCards(newCards);
    }
  }, [isShortMoviesSelected, savedFilms]);

  const onSearchSubmit = (searchedData) => {
    setIsLoading(true);

    setSearchedInStorage(searchedData);

    moviesApi
      .search(searchedData)
      .then((data) => {
        let foundData = data.filter(
          (item) =>
            // item.nameRU.includes(searchedData) ||
            // item.nameEN.includes(searchedData),
            item.nameRU.toLowerCase().includes(searchedData.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(searchedData.toLowerCase()),
        );
        if (foundData.length === 0) {
          setSearchError('Ничего не найдено');
        }
        setCardsInStorage(foundData);
        if (isShortMoviesSelected) {
          foundData = foundData.filter((item) => item.duration <= 40);
          if (foundData.length === 0) {
            setSearchError('Ничего не найдено');
          }
        }
        const newCards = mapCards(foundData, savedFilms);
        setCards(newCards);
      })
      .catch(() => {
        setCards([]);
        setIsLoading(false);
        setIsSearchDone(true);
        setSearchError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        );
      })
      .finally(() => {
        setIsLoading(false);
        setIsSearchDone(true);
      });
  };

  const onSaveMovie = (data) => {
    return mainApi
      .saveFilm(data)
      .then((newFilm) => {
        handleSaveFilm(newFilm);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  const onDeleteMovie = (id) => {
    const filmtodelete = savedFilms.filter((film) => film.movieId === id);
    console.log('film from db to delete:', filmtodelete);

    const idtodelete = savedFilms.filter((film) => film.movieId === id)[0]._id;
    console.log('_id from db to delete:', idtodelete);

    mainApi
      .deleteFilm(idtodelete)
      .then(() => {
        handleDeleteFilm(idtodelete);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          isShortMoviesSelected={isShortMoviesSelected}
          onTumblerClicked={onTumblerClicked}
          onSearchSubmit={onSearchSubmit}
          searchedInStorage={searchedInStorage}
        />
        <MoviesCardList
          moviesData={cards}
          isLoading={isLoading}
          isSearchDone={isSearchDone}
          searchError={searchError}
          screenWidth={screenWidth}
          isShortMoviesSelected={isShortMoviesSelected}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>

      <Footer />
    </>
  );
};

export default Movies;

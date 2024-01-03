import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesData from '../App/movies-data';

const SavedMovies = ({ loggedIn }) => {
  const [isShortMoviesSelected, setIsShortMoviesSelected] = useState(false);

  function onTumblerClicked() {
    setIsShortMoviesSelected((prevValue) => !prevValue);
  }
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        isShortMoviesSelected={isShortMoviesSelected}
        onTumblerClicked={onTumblerClicked}
      />
      {/* <Preloader /> */}
      <MoviesCardList
        moviesData={moviesData.filter(function (movie) {
          return movie.saved === true;
        })}
      />

      <Footer />
    </>
  );
};

export default SavedMovies;

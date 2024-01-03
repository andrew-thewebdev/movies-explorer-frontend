import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import moviesData from '../App/movies-data';

const Movies = ({ loggedIn }) => {
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
      <MoviesCardList moviesData={moviesData} />

      <Footer />
    </>
  );
};

export default Movies;

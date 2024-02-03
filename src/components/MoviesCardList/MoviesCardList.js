import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({
  moviesData,
  isLoading,
  isSearchDone,
  searchError,
  screenWidth,
  isShortMoviesSelected,
  onSaveMovie,
  onDeleteMovie,
}) => {
  const location = useLocation();

  const [numOfCardsOnScreen, setNumOfCardsOnScreen] = useState(12);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setNumOfCardsOnScreen(101);
    } else {
      if (screenWidth > 1134) {
        setNumOfCardsOnScreen(12);
      }
      if (screenWidth > 644 && screenWidth < 1134) {
        setNumOfCardsOnScreen(8);
      }
      if (screenWidth < 644) {
        setNumOfCardsOnScreen(5);
      }
    }
  }, [screenWidth, isShortMoviesSelected, location.pathname]);

  const handleShowMore = () => {
    if (screenWidth > 1134) {
      setNumOfCardsOnScreen((prevValue) => prevValue + 3);
    }
    if (screenWidth > 644 && screenWidth < 1134) {
      setNumOfCardsOnScreen((prevValue) => prevValue + 2);
    }
    if (screenWidth < 644) {
      setNumOfCardsOnScreen((prevValue) => prevValue + 2);
    }
  };

  if (isLoading) {
    return (
      <section className='movies-list'>
        <div className='movies-list__cards'>
          <Preloader />
        </div>
      </section>
    );
  } else {
    return (
      <section className='movies-list'>
        <div className='movies-list__cards'>
          {moviesData.length > 0
            ? moviesData
                .slice(0, numOfCardsOnScreen)
                .map((propsData) => (
                  <MoviesCard
                    key={propsData.id}
                    {...propsData}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                  />
                ))
            : isSearchDone && (
                <span className='movies-list__error-msg'>{searchError}</span>
              )}
        </div>
        {moviesData.length > numOfCardsOnScreen && (
          <button
            onClick={handleShowMore}
            className={`movies-list__more-btn ${
              location.pathname === '/saved-movies'
                ? 'movies-list__more-btn_invisible'
                : ''
            }`}
          >
            Ещё
          </button>
        )}
      </section>
    );
  }
};

export default MoviesCardList;

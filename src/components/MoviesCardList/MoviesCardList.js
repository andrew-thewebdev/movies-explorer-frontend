import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ moviesData }) => {
  const location = useLocation();
  let numOfCardsOnScreen = 12;
  const screenWidth = window.innerWidth;
  // console.log('screenWidth', screenWidth);
  if (screenWidth === 768) {
    numOfCardsOnScreen = 8;
  }
  if (screenWidth === 320) {
    numOfCardsOnScreen = 5;
  }
  return (
    <div className='movies-list'>
      <div className='movies-list__cards'>
        {moviesData.slice(0, numOfCardsOnScreen).map((propsData) => (
          <MoviesCard key={propsData._id} {...propsData} />
        ))}
      </div>
      <button
        className={`movies-list__more-btn ${
          location.pathname === '/saved-movies'
            ? 'movies-list__more-btn_invisible'
            : ''
        }`}
      >
        Ещё
      </button>
    </div>
  );
};

export default MoviesCardList;

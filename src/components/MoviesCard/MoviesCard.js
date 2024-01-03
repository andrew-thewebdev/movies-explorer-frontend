import React, { useState } from 'react';
import './MoviesCard.css';
import savedBtn from '../../images/save6d.png';
import saveBtn from '../../images/save6.png';
import deleteBtn from '../../images/d6.png';
import { useLocation } from 'react-router-dom';
const MoviesCard = ({ src, alt, nameRU, duration, saved }) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(saved);

  function onSaveClicked() {
    setIsSaved(true);
  }
  function onDeleteClicked() {
    setIsSaved(false);
  }

  if (location.pathname === '/saved-movies') {
    return (
      <div className='movies-card'>
        <div className='movies-card__description'>
          <p className='movies-card__name'>{nameRU}</p>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        <img src={src} alt={alt} className='movies-card__img' />
        <img
          onClick={onDeleteClicked}
          src={deleteBtn}
          alt={alt}
          className='movies-card__save-btn'
        />
      </div>
    );
  }
  return (
    <div className='movies-card'>
      <div className='movies-card__description'>
        <p className='movies-card__name'>{nameRU}</p>
        <p className='movies-card__duration'>{duration}</p>
      </div>
      <img src={src} alt={alt} className='movies-card__img' />
      <img
        onClick={onSaveClicked}
        src={isSaved ? savedBtn : saveBtn}
        alt={alt}
        className='movies-card__save-btn'
      />
    </div>
  );
};

export default MoviesCard;

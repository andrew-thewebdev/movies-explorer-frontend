import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import savedBtn from '../../images/save6d.png';
import saveBtn from '../../images/save6.png';
import deleteBtn from '../../images/d6.png';
import { useLocation } from 'react-router-dom';
const MoviesCard = ({
  id,
  src,
  alt,
  nameRU,
  duration,
  saved,
  nameEN,
  country,
  director,
  year,
  description,
  trailerLink,
  thumbnail,
  onSaveMovie,
  onDeleteMovie,
}) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(saved);
  useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  function handleDeleteSavedMovie() {
    onDeleteMovie(id);
  }

  function handleDeleteMovie(id) {
    setIsSaved(false);
    onDeleteMovie(id);
  }

  function handleSaveOrDeleteMovie() {
    if (isSaved) {
      setIsSaved(false);
      handleDeleteMovie(id);
      return;
    }
    setIsSaved(true);
    onSaveMovie({
      id,
      src,
      alt,
      nameRU,
      duration,
      saved,
      nameEN,
      country,
      director,
      year,
      description,
      trailerLink,
      thumbnail,
    });
  }

  // function handleImageClick() {
  //   console.log('img clicked');
  // }

  if (location.pathname === '/saved-movies') {
    return (
      <div className='movies-card'>
        <div className='movies-card__description'>
          <p className='movies-card__name'>{nameRU}</p>
          <p className='movies-card__duration'>{`${Math.floor(
            duration / 60,
          )}ч ${duration % 60}м`}</p>
        </div>
        <a
          href={trailerLink}
          target='_blank'
          rel='noreferrer'
          className='movies-card__img-wrapper-link'
        >
          <img
            src={src}
            alt={alt}
            // onClick={handleImageClick}
            className='movies-card__img'
          />
        </a>
        <img
          onClick={handleDeleteSavedMovie}
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
        <p className='movies-card__duration'>{`${Math.floor(duration / 60)}ч ${
          duration % 60
        }м`}</p>
      </div>
      <a
        href={trailerLink}
        target='_blank'
        rel='noreferrer'
        className='movies-card__img-wrapper-link'
      >
        <img
          src={src}
          alt={alt}
          // onClick={handleImageClick}
          border='0'
          className='movies-card__img'
        />
      </a>
      <img
        onClick={handleSaveOrDeleteMovie}
        src={isSaved ? savedBtn : saveBtn}
        alt={alt}
        className='movies-card__save-btn'
      />
    </div>
  );
};

export default MoviesCard;

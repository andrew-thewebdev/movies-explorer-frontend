import React from 'react';
import tumbleron from '../../images/smalltumb.png';
import tumbleroff from '../../images/smalltumboff2.png';
import './FilterCheckbox.css';

const FilterCheckbox = ({ isShortMoviesSelected, onTumblerClicked }) => {
  return (
    <div className='filter'>
      <img
        onClick={onTumblerClicked}
        src={isShortMoviesSelected ? tumbleron : tumbleroff}
        alt='Фильтр короткометражных фильмов'
        className='filter__tumbler'
      />
      <p className='filter__title'>Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;

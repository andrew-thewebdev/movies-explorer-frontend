import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ isShortMoviesSelected, onTumblerClicked }) => {
  return (
    <form className='search-form'>
      <div className='search-form-container'>
        <input type='text' placeholder='Фильм' className='search-form__input' />
        <button type='submit' className='search-form__submit-btn'>
          Поиск
        </button>
      </div>
      <FilterCheckbox
        isShortMoviesSelected={isShortMoviesSelected}
        onTumblerClicked={onTumblerClicked}
      />
    </form>
  );
};

export default SearchForm;

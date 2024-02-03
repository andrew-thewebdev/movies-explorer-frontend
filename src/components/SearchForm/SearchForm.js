import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({
  isShortMoviesSelected,
  onTumblerClicked,
  onSearchSubmit,
  searchedInStorage,
}) => {
  const [searchedFilm, setSearchedFilm] = useState(searchedInStorage);
  const [searchPlaceHolder, setSearchPlaceHolder] = useState('Фильм');

  const [isEmptySearch, setIsEmptySearch] = useState(false);

  const handleOnChange = (e) => {
    setSearchedFilm(e.target.value);
    setIsEmptySearch(false);
    setSearchPlaceHolder('Фильм');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchedFilm === '' || searchedFilm === undefined) {
      setSearchPlaceHolder('Нужно ввести ключевое слово');
      setIsEmptySearch(true);
    } else {
      onSearchSubmit(searchedFilm);
    }
  };

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-form-container'>
        <input
          type='text'
          placeholder={searchPlaceHolder}
          value={searchedFilm}
          onChange={handleOnChange}
          className={`search-form__input ${
            isEmptySearch ? 'search-form__input_red' : ''
          }`}
        />
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

import React, { useRef, useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';

const Profile = ({ loggedIn, onSignOut }) => {
  let currentUser = {
    name: 'Виталий',
    email: 'pochta@yandex.ru',
  };

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaveble, setIsSaveble] = useState(false);
  const [isErrVisible, setIsErrVisible] = useState(false);

  const inputRef = useRef(null);
  console.log('isEditable', isEditable);
  console.log('isSaveble', isSaveble);

  function handleChangeName(e) {
    if (e.target.value !== currentUser.name) {
      setIsSaveble(true);
    } else {
      setIsSaveble(false);
    }
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    if (e.target.value !== currentUser.email) {
      setIsSaveble(true);
    } else {
      setIsSaveble(false);
    }
    setEmail(e.target.value);
  }

  function handleEditButtonClick() {
    setIsEditable(true);
    inputRef.current.focus();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsErrVisible(true); //для демонстрации верстки
    setIsSaveble(false); //для демонстрации верстки
  };

  return (
    <div className='profile'>
      <Header loggedIn={loggedIn} />
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form onSubmit={handleSubmit} className='profile__edit-form'>
        <div className='profile__input-wrapper'>
          <label className='profile__input-label'>Имя</label>
          <input
            id='name'
            ref={inputRef}
            name='name'
            className='profile__input-name'
            type='text'
            required
            minLength={2}
            maxLength={40}
            value={name}
            onChange={handleChangeName}
            readOnly={!isEditable}
          />
        </div>
        <div className='profile__input-wrapper'>
          <label className='profile__input-label'>E-mail</label>
          <input
            id='email'
            name='email'
            className='profile__input-email'
            type='email'
            required
            value={email}
            onChange={handleChangeEmail}
            readOnly={!isEditable}
          />
        </div>
        <span
          className={`profile__error-msg ${
            isErrVisible ? 'profile__error-msg_visible' : ''
          }`}
        >
          При обновлении профиля произошла ошибка.
        </span>
        <button
          type='button'
          onClick={handleEditButtonClick}
          className={`profile__edit-button ${
            isEditable ? 'profile__edit-button_invisible' : ''
          } `}
        >
          Редактировать
        </button>
        <button
          type='button'
          onClick={onSignOut}
          className={`profile__exit-button ${
            isEditable ? 'profile__exit-button_invisible' : ''
          }`}
        >
          Выйти из аккаунта
        </button>
        <button
          type='submit'
          className={`profile__save-button  ${
            !isEditable ? 'profile__save-button_invisible' : ''
          }`}
          disabled={isSaveble ? false : true}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Profile;

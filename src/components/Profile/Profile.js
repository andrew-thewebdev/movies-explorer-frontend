import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import './Profile.css';
import { useFormWithValidation } from '../../utils/hooks';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({
  isLoggedIn,
  onSignOut,
  updateProfileErrMsg,
  onProfileUpdate,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [isEditable, setIsEditable] = useState(false);
  const [isSaveble, setIsSaveble] = useState(false);
  const [updateProfileErrorMessage, setUpdateProfileErrorMessage] =
    useState(updateProfileErrMsg);

  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email });
  }, []);

  useEffect(() => {
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      setIsSaveble(true);
    } else {
      setIsSaveble(false);
    }
  }, [values, currentUser]);

  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email });
  }, [currentUser, setValues]);

  useEffect(() => {
    setUpdateProfileErrorMessage(updateProfileErrMsg);
    setTimeout(() => {
      setUpdateProfileErrorMessage('');
    }, 2000);
  }, [updateProfileErrMsg]);

  const inputRef = useRef(null);

  function handleEditButtonClick() {
    setIsEditable(true);
    inputRef.current.focus();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onProfileUpdate({
      name: values.name,
      email: values.email,
    }).then(() => {
      setUpdateProfileErrorMessage(updateProfileErrMsg);
      setTimeout(() => {
        setUpdateProfileErrorMessage('');
      }, 2000);
    });
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form onSubmit={handleSubmit} className='profile__edit-form'>
          <div className='profile__input-wrapper'>
            <label className='profile__input-label'>Имя</label>
            <input
              id='name'
              ref={inputRef}
              name='name'
              className='profile__input-name'
              type='text'
              placeholder='Имя'
              required
              minLength={2}
              maxLength={40}
              defaultValue={values.name}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            <p className='profile__validation-err-msg'>{errors.name}</p>
          </div>
          <div className='profile__input-wrapper'>
            <label className='profile__input-label'>E-mail</label>
            <input
              id='email'
              name='email'
              className='profile__input-email'
              type='email'
              placeholder='E-mail'
              required
              defaultValue={values.email}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            <p className='profile__validation-err-msg'>{errors.email}</p>
          </div>
          <span className='profile__error-msg profile__error-msg_visible'>
            {updateProfileErrorMessage}
          </span>
          <div className='profile__buttons-wrapper'>
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
          </div>
        </form>
      </main>
    </>
  );
};

export default Profile;

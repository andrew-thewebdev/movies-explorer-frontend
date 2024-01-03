import React from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='register'>
      <div className='register__header'>
        <Link to='/' className='register__logo-wrapper'>
          <img src={logo} alt='Логотип' className='register__logo' />
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
      </div>
      <form onSubmit={handleSubmit} className='register__form'>
        <label className='register__input-label'>Имя</label>
        <input
          id='name'
          name='name'
          // placeholder='Имя'
          className='register__input-name'
          type='text'
          required
          minLength={2}
          maxLength={40}
          // value={name}
          // onChange={handleChangeName}
        />
        <label className='register__input-label'>E-mail</label>
        <input
          id='email'
          name='email'
          type='email'
          // placeholder='E-mail'
          className='register__input-email'
          required
          // value={email}
          // onChange={handleChangeEmail}
        />
        <label className='register__input-label'>Пароль</label>
        <input
          id='password'
          name='password'
          type='password'
          // value={password}
          // onChange={({ target }) => setPassword(target.value)}
          // placeholder='Password'
          className='register__input-password'
        />
        <p className='register__error-msg register__error-msg_visible'>
          Что-то пошло не так...
        </p>
        <button type='submit' className='register__submit-button'>
          Зарегистрироваться
        </button>
      </form>
      <div className='register__footer'>
        <p className='register__already-question'>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__footer-link'>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;

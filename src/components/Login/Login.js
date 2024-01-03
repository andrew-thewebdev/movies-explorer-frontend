import React from 'react';
import logo from '../../images/logo.png';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className='login'>
      <div className='login__header'>
        <Link to='/' className='login__logo-wrapper'>
          <img src={logo} alt='Логотип' className='login__logo' />
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
      </div>
      <form onSubmit={handleSubmit} className='login__form'>
        <label className='login__input-label'>E-mail</label>
        <input
          id='email'
          name='email'
          type='email'
          // placeholder='E-mail'
          className='login__input-email'
          required
          // value={email}
          // onChange={handleChangeEmail}
        />
        <label className='login__input-label'>Пароль</label>
        <input
          id='password'
          name='password'
          type='password'
          // value={password}
          // onChange={({ target }) => setPassword(target.value)}
          // placeholder='Password'
          className='login__input-password'
        />
        <p className='login__error-msg'>Что-то пошло не так...</p>
        <button type='submit' className='login__submit-button'>
          Войти
        </button>
      </form>
      <div className='login__footer'>
        <p className='login__already-question'>Ещё не зарегистрированы?</p>
        <Link to='/signup' className='login__footer-link'>
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;

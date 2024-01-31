import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import './Login.css';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/hooks';

const Login = ({ onLogin, loginErrMsg }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const [loginErrorMessage, setLoginErrorMessage] = useState(loginErrMsg);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    if (errors.email !== '' || errors.password !== '' || isValid === false) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [values, errors, isValid]);

  useEffect(() => {
    setLoginErrorMessage(loginErrMsg);
    setTimeout(() => {
      setLoginErrorMessage('');
    }, 2000);
  }, [loginErrMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    }).then(() => {
      setLoginErrorMessage(loginErrMsg);
      setTimeout(() => {
        setLoginErrorMessage('');
      }, 2000);
    });
  };

  return (
    <main className='login'>
      <div className='login__container'>
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
            placeholder='E-mail'
            className='login__input-email'
            required
            value={values.email}
            onChange={handleChange}
          />
          <p className='login__error-msg login__error-msg_visible'>
            {errors.email}
          </p>
          <label className='login__input-label'>Пароль</label>
          <input
            id='password'
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange}
            placeholder='Password'
            className='login__input-password'
            required
          />
          <p className='login__error-msg login__error-msg_visible'>
            {errors.password}
          </p>
          <p className='login__submit-error-msg login__submit-error-msg_visible'>
            {loginErrorMessage}
          </p>
          <button
            type='submit'
            disabled={isSubmitDisabled}
            className='login__submit-button'
          >
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
    </main>
  );
};

export default Login;

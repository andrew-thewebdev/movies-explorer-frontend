import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './Register.css';
import { useFormWithValidation } from '../../utils/hooks';

const Register = ({ onRegister, registerErrMsg }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [registerErrorMessage, setRegisterErrorMessage] =
    useState(registerErrMsg);

  useEffect(() => {
    if (
      errors.name !== '' ||
      errors.email !== '' ||
      errors.password !== '' ||
      isValid === false
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [values, errors, isValid]);

  useEffect(() => {
    setRegisterErrorMessage(registerErrMsg);
    setTimeout(() => {
      setRegisterErrorMessage('');
    }, 2000);
  }, [registerErrMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    }).then(() => {
      setRegisterErrorMessage(registerErrMsg);
      setTimeout(() => {
        setRegisterErrorMessage('');
      }, 2000);
    });
  };

  const handleFocus = (e) => {
    console.log('focus event');
  };

  return (
    <main className='register'>
      <div className='register__container'>
        <div className='register__header'>
          <Link to='/' className='register__logo-wrapper'>
            <img src={logo} alt='Логотип' className='register__logo' />
          </Link>
          <h2 className='register__title'>Добро пожаловать!</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate className='register__form'>
          <label className='register__input-label'>Имя</label>
          <input
            id='name'
            name='name'
            placeholder='Имя'
            className='register__input-name'
            type='text'
            required
            minLength={2}
            maxLength={30}
            value={values.name}
            onChange={handleChange}
            autoComplete='disabled'
            onFocus={handleFocus}
          />
          {errors.name === '' ? (
            <p className='register__error-msg'>пустое значение но невидимое</p>
          ) : (
            <p className='register__error-msg register__error-msg_visible'>
              {errors.name}
            </p>
          )}
          <label className='register__input-label'>E-mail</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='E-mail'
            className='register__input-email'
            required
            value={values.email}
            onChange={handleChange}
            autoComplete='disabled'
          />
          <p className='register__error-msg register__error-msg_visible'>
            {errors.email}
          </p>
          <label className='register__input-label'>Пароль</label>
          <input
            id='password'
            name='password'
            type='password'
            required
            placeholder='Пароль'
            value={values.password}
            onChange={handleChange}
            className='register__input-password'
          />
          <p className='register__error-msg register__error-msg_visible'>
            {errors.password}
          </p>
          <p className='register__submit-error-msg register__submit-error-msg_visible'>
            {registerErrorMessage}
          </p>
          <button
            type='submit'
            disabled={isSubmitDisabled}
            className='register__submit-button'
          >
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
    </main>
  );
};

export default Register;

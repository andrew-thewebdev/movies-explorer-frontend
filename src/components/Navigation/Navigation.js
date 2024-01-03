import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import mobmenu from '../../images/icon__COLOR_humburger.png';
import closeButton from '../../images/close.png';

const Navigation = ({ loggedIn }) => {
  const location = useLocation();

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  function openMobileMenu() {
    console.log('clicked');
    setIsMobileMenuOpened(true);
  }
  function closeMobileMenu() {
    setIsMobileMenuOpened(false);
  }

  let onMainPage = false;
  if (location.pathname === '/') {
    onMainPage = true;
  }

  if (!loggedIn) {
    return (
      <nav className='navigation'>
        <Link to='/signup' className='navigation__signup-link'>
          Регистрация
        </Link>
        <div className='navigation__signin-link-wrapper'>
          <Link to='/signin' className='navigation__signin-link'>
            Войти
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className='navigation'>
      <div className={`${isMobileMenuOpened && 'navigation__cover'}`}></div>
      <div
        className={`navigation__menu-wrapper ${
          isMobileMenuOpened && 'navigation__menu-wrapper_opened'
        }`}
      >
        <NavLink
          to='/'
          className={({ isActive }) =>
            `navigation__main-page-link ${
              isActive ? 'navigation__current' : ''
            }`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to='/movies'
          className={({ isActive }) =>
            `navigation__movies-link ${isActive ? 'navigation__current' : ''}`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to='/saved-movies'
          className={({ isActive }) =>
            `navigation__saved-movies-link ${
              isActive ? 'navigation__current' : ''
            }`
          }
        >
          Сохраненные фильмы
        </NavLink>
        <div className='navigation__profile-wrapper'>
          <Link to='/profile' className='navigation__profile-link'>
            Аккаунт
          </Link>
          <div
            className={`navigation__profile-icon-wrapper ${
              onMainPage ? 'navigation__profile-icon-wrapper_type_main' : ''
            }`}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.43053 7.96749C8.79195 7.40521 9.75 6.06449 9.75 4.5C9.75 2.42893 8.07107 0.75 6 0.75C3.92893 0.75 2.25 2.42893 2.25 4.5C2.25 6.06451 3.20808 7.40525 4.56953 7.96751C3.17523 8.19979 1.89263 8.76573 0.808594 9.58019L2.19015 11.419C3.25143 10.6217 4.56898 10.1496 6.0001 10.1496C7.43122 10.1496 8.74877 10.6217 9.81006 11.419L11.1916 9.58019C10.1075 8.7657 8.82488 8.19975 7.43053 7.96749Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
        <img
          src={closeButton}
          alt='кнопка закрытия мобильного меню'
          onClick={closeMobileMenu}
          className='navigation__close-btn'
        />
      </div>
      <img
        src={mobmenu}
        alt='гамбургер-кнопка'
        onClick={openMobileMenu}
        className='navigation__burger'
      />
    </nav>
  );
};

export default Navigation;

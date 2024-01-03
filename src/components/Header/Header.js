import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import logo from '../../images/logo.png';

import { Link, useLocation } from 'react-router-dom';

const Header = ({ loggedIn }) => {
  const location = useLocation();
  let onMainPage = false;

  if (location.pathname === '/') {
    onMainPage = true;
  }

  return (
    <header className={`header ${onMainPage ? 'header_type_main' : ''}`}>
      <Link to='/' className='header__logo-wrapper'>
        <img src={logo} className='header__logo' alt='логотип' />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

export default Header;

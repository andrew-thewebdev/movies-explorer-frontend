import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <h2 className='footer__description'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__wrapper'>
        <div className='footer__copyright'>© 2020</div>
        <div className='footer__links'>
          <a
            href='https://practicum.yandex.ru/'
            target='_blank'
            className='footer__link'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            href='https://github.com/'
            target='_blank'
            className='footer__link'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

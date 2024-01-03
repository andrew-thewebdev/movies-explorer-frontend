import React from 'react';
import portfolioLink from '../../images/arrow.png';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__header'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__links-item'>
          <a
            href='https://andrew-thewebdev.github.io/russian-travel/'
            target='_blank'
            className='portfolio__link'
            rel='noreferrer'
          >
            Статичный сайт
          </a>
          <img
            src={portfolioLink}
            alt='Ссылка на статичный сайт'
            className='portfolio__img'
          />
        </li>
        <li className='portfolio__links-item'>
          <a
            href='https://andrew-thewebdev.github.io/russian-travel/'
            target='_blank'
            className='portfolio__link'
            rel='noreferrer'
          >
            Адаптивный сайт
          </a>
          <img
            src={portfolioLink}
            alt='Ссылка на адаптивный сайт'
            className='portfolio__img'
          />
        </li>
        <li className='portfolio__links-item'>
          <a
            href='https://andrew-thewebdev.github.io/russian-travel/'
            target='_blank'
            className='portfolio__link'
            rel='noreferrer'
          >
            Одностраничное приложение
          </a>
          <img
            src={portfolioLink}
            alt='Ссылка на одностраничное приложение'
            className='portfolio__img'
          />
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;

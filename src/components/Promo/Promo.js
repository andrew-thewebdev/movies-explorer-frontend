import React from 'react';
import globus from '../../images/text__COLOR_landing-logo.png';
import './Promo.css';

const Promo = () => {
  return (
    <div className='promo'>
      <img
        src={globus}
        alt='изображение глобуса'
        className='promo__globus-img'
      />
      <h2 className='promo__title'>
        Учебный проект студента факультета Веб&#8209;разработки.
      </h2>
      <p className='promo__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>

      <a href='#aboutprj' className='promo__more-btn'>
        Узнать больше
      </a>
      {/* <button href='#aboutprj' className='promo__more-btn'>
        Узнать больше
      </button> */}
    </div>
  );
};

export default Promo;

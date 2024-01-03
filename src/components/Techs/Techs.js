import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <div className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__description'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className='techs__cards'>
        <div className='techs__cards-item'>HTML</div>
        <div className='techs__cards-item'>CSS</div>
        <div className='techs__cards-item'>JS</div>
        <div className='techs__cards-item'>React</div>
        <div className='techs__cards-item'>Git</div>
        <div className='techs__cards-item'>Express.js</div>
        <div className='techs__cards-item'>mongoDB</div>
      </div>
    </div>
  );
};

export default Techs;

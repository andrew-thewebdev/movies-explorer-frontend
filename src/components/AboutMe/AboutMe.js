import React from 'react';
import './AboutMe.css';
import myphoto from '../../images/pic__COLOR_pic.jpg';

const AboutMe = () => {
  return (
    <div className='aboutme'>
      <h2 className='aboutme__header'>Студент</h2>
      <div className='aboutme__container'>
        <div className='aboutme__descr-wrapper'>
          <h3 className='aboutme__title'>Виталий</h3>
          <p className='aboutme__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutme__biography'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href='https://github.com/andrew-thewebdev'
            target='_blank'
            className='aboutme__gh-link'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img src={myphoto} alt='Фото автора' className='aboutme__photo' />
      </div>
    </div>
  );
};

export default AboutMe;

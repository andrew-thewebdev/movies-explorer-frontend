import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <div id='aboutprj' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__descr-wrapper'>
        <div className='about-project__descr-item'>
          <h3 className='about-project__descr-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__descr-subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__descr-item'>
          <h3 className='about-project__descr-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__descr-subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about-project__diagram'>
        <div className='about-project__diagram-item'>1 неделя</div>
        <div className='about-project__diagram-item'>4 недели</div>
        <p className='about-project__diagram-descr'>Back-end</p>
        <p className='about-project__diagram-descr'>Front-end</p>
      </div>
    </div>
  );
};

export default AboutProject;

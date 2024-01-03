import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button onClick={() => navigate(-1)} className='not-found__link'>
        Назад
      </button>
    </div>
  );
};

export default PageNotFound;

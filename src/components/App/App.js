import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); //Менять для эмуляции успешной/не успешной аутентификации
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/');
  };

  function handleSignOut() {
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <Routes>
      <Route path='/' element={<Main loggedIn={loggedIn} />} />
      <Route path='/movies' element={<Movies loggedIn={loggedIn} />} />
      <Route
        path='/saved-movies'
        element={<SavedMovies loggedIn={loggedIn} />}
      />
      <Route
        path='/profile'
        element={<Profile loggedIn={loggedIn} onSignOut={handleSignOut} />}
      />
      <Route path='/signin' element={<Login onLogin={handleLogin} />} />
      <Route path='/signup' element={<Register />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [savedFilms, setSavedFilms] = useState([]);
  const [registerErrMsg, setRegisterErrMsg] = useState('');
  const [loginErrMsg, setLoginErrMsg] = useState('');
  const [updateProfileErrMsg, setUpdateProfileErrMsg] = useState('');
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mainApi.getUserInfo(jwt).then((userData) => {
        if (userData) {
          setisLoggedIn(true);
          setCurrentUser(userData);
        }
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedFilms()
        .then((savedFlms) => {
          setSavedFilms(savedFlms);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [isLoggedIn]);

  const handleSaveFilm = (newFilm) => {
    setSavedFilms([newFilm, ...savedFilms]);
  };
  const handleDeleteFilm = (id) => {
    setSavedFilms((state) => state.filter((c) => c._id !== id));
  };

  const handleRegister = ({ name, email, password }) => {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400 || res.error)
          throw new Error('Что-то пошло не так');
        setRegisterErrMsg('');
        return res;
      })
      .then((res) => {
        handleLogin({ password, email });
        return res;
      })
      .catch((err) => {
        setRegisterErrMsg(err.message);
        setisLoggedIn(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    return mainApi
      .authorize(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400 || res.message)
          throw new Error('Неправильное имя пользователя или логин');
        setLoginErrMsg('');
        setisLoggedIn(true);
        localStorage.setItem('jwt', res.token);

        mainApi.getUserInfo(res.token).then((userData) => {
          if (userData) {
            setCurrentUser(userData);
          }
        });

        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setLoginErrMsg(err.message);
        setisLoggedIn(false);
      });
  };

  const handleProfileUpdate = ({ name, email }) => {
    return mainApi
      .updateProfile({ name: name, email: email })
      .then(({ name, email }) => {
        setIsProfileUpdated(true);
        setUpdateProfileErrMsg('Обновление профиля прошло успешно');
        setTimeout(() => {
          setUpdateProfileErrMsg('');
        }, 2000);
        setCurrentUser({ name, email });
      })
      .catch((err) => {
        setUpdateProfileErrMsg(err.message);
        setTimeout(() => {
          setUpdateProfileErrMsg('');
        }, 2000);
        setIsProfileUpdated(false);
      });
  };

  function handleSignOut() {
    setisLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('shortMoviesSelected');
    localStorage.removeItem('searched');
    localStorage.removeItem('initiallyFoundCards');
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
        <Route
          path='/movies'
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              savedPreviouslyFilms={savedFilms}
              handleSaveFilm={handleSaveFilm}
              handleDeleteFilm={handleDeleteFilm}
              component={Movies}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              savedPreviouslyFilms={savedFilms}
              handleDeleteFilm={handleDeleteFilm}
              component={SavedMovies}
            />
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
              onProfileUpdate={handleProfileUpdate}
              updateProfileErrMsg={updateProfileErrMsg}
              isProfileUpdated={isProfileUpdated}
              component={Profile}
            />
          }
        />
        <Route
          path='/signin'
          element={<Login onLogin={handleLogin} loginErrMsg={loginErrMsg} />}
        />
        <Route
          path='/signup'
          element={
            <Register
              onRegister={handleRegister}
              registerErrMsg={registerErrMsg}
            />
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;

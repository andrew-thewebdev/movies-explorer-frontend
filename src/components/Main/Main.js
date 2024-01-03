import React from 'react';
import Header from '../Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';

const Main = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
};

export default Main;

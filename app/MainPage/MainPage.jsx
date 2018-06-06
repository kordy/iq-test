import React from 'react';
import CountrySelectContainer from '../CountrySelect/CountrySelectContainer.jsx';
import './MainPage.styl';
import logo from '../assets/iqlogo.png'

const MainPage = () => (
  <div className="MainPage">
    <div className="MainPage__part">
      <div className="MainPage__logo">
        <img src={logo} />
        <h1 className="h1">Тестовое задание</h1>
      </div>
      <h2 className="h2">Дропдаун с местом для выпадения вниз</h2>
      <CountrySelectContainer />
    </div>
    <div className="MainPage__part">
      <h2 className="h2">Дропдаун без места для выпадения вниз</h2>
      <CountrySelectContainer />
    </div>
  </div>
);

export default MainPage;
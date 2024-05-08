import React, { useState } from 'react';
import HomeInfo from './HomeInfo';
import HomeWeather from './HomeWeather';
import './Home.css';

function Home() {
  const [selectedTab, setSelectedTab] = useState('homeinfo');

  return (
    <div>
      <div className="home-container">
        <div className="tabs">
          <button
            className={selectedTab === 'homeinfo' ? 'tab active info-title' : 'tab info-title'}
            onClick={() => setSelectedTab('homeinfo')}
          >
            Info.
            {selectedTab === 'homeinfo' && <div className="underline-bar"></div>}
          </button>
          <button
            className={selectedTab === 'homeweather' ? 'tab active weather-title' : 'tab weather-title'}
            onClick={() => setSelectedTab('homeweather')}
          >
            Weather
            {selectedTab === 'homeweather' && <div className="underline-bar"></div>}
          </button>

        </div>

        {selectedTab === 'homeinfo' && <HomeInfo />}
        {selectedTab === 'homeweather' && <HomeWeather />}
      </div>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import './HomeWeather.css'; 
import WeatherIcon from './weather_ex.svg';

function HomeWeather() {
  const [weatherData, setWeatherData] = useState({
    location: '00구 00동',
    caution: '',
    date: '04/18 금요일',
    temperature: '12.6',
    precipitation: '00',
    airQuality: {
      pm10: 119,
      pm25: 25,
      pm10Status: '나쁨',
      pm25Status: '보통'
    },
    updateTime: 'OO시 OO분 기준'
  });

  const [coords, setCoords] = useState({ latitude: '', longitude: '' }); // 임시로 상태 추가

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const url = `BACKEND_URL/api/weather?lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        const data = await response.json();
        const cautionMessage = getCautionMessage(data.precipitation);
        setWeatherData({ ...data, caution: cautionMessage });
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Geolocation failed:', error);
        alert('위치 정보를 가져오는 데 실패했습니다.');
      },
      { enableHighAccuracy: true }
    );
  }, []); 

  const getCautionMessage = (precipitation) => {
    const precipitationValue = parseFloat(precipitation.replace('mm', ''));
    if (precipitationValue > 0) {
      return '비가 와서 미끄러우니 조심하세요.';
    } else {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour <= 18) {
        return '따릉이를 타기 좋은 날씨군요!';
      } else {
        return '어두우니 조심해서 타세요!';
      }
    }
  };

  return (
    <div className="homeWeather">      
      <div className="location">{weatherData.location}</div>
      <div className="caution">{weatherData.caution}</div>
      <div className="weatherIconContainer">
        <img src={WeatherIcon} alt="Weather Icon" />
      </div>
      <div className="dateTemperature">
        <span>{weatherData.date}<br/></span>
        <span>{weatherData.temperature} | </span>
        <span>{weatherData.precipitation}mm</span>
      </div>
      <div className="pollutionLevels">
        <span className="pollutionIndex">{weatherData.airQuality.pm10}</span>
        <span className="pollutionIndex">{weatherData.airQuality.pm25}</span>
        <span className="pollutionLabel">미세</span>
        <span className="pollutionLabel">초미세</span>
        <span className={`pollutionStatus ${weatherData.airQuality.pm10Status === '나쁨' ? 'pollutionStatusBad' : 'pollutionStatusNormal'}`}>{weatherData.airQuality.pm10Status}</span>
        <span className={`pollutionStatus ${weatherData.airQuality.pm25Status === '보통' ? 'pollutionStatusNormal' : 'pollutionStatusBad'}`}>{weatherData.airQuality.pm25Status}</span>
      </div>
      <div className="dataDisclaimer">
        <span>{weatherData.updateTime}</span>
      </div>
      <div className="coordinates">
        <p>위도: {coords.latitude}</p>
        <p>경도: {coords.longitude}</p>
      </div>
    </div>
  );
}

export default HomeWeather;

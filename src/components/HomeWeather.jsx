import React, { useState, useEffect } from 'react';
import './HomeWeather.css'; 
import weatherRain from './weather_rain.svg';
import weatherDay from './weather_day.svg';
import weatherNight from './weather_night.svg';

function HomeWeather() {
  const [weatherData, setWeatherData] = useState({
    location: '',
    caution: '',
    date: '',
    temperature: '',
    precipitation: '',
    airQuality: {
      pm10: '',
      pm25: '',
      pm10Status: '',
      pm25Status: ''
    },
    updateTime: ''
  });

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        console.log('test1');
        const url = `https://ddareunging.sepnon3.shop/api/home/weather?lat=${latitude}&lng=${longitude}`;
        console.log('test2');
        const response = await fetch(url);
        console.log('test3');
        const data = await response.json();
        if (data.message === 'OK') {
          const newWeatherData = {
            location: `${data.address[0]} ${data.address[1]}`,
            temperature: data.weather.temp,
            precipitation: data.weather.rainAmount,
            airQuality: {
              pm10: data.dust.pm10Value,
              pm25: data.dust.pm25Value,
              pm10Status: getStatus(data.dust.pm10Grade),
              pm25Status: getStatus(data.dust.pm25Grade)
            },
            updateTime: data.weather.lastUpdateTime
          };
          const cautionMessage = getCautionMessage(newWeatherData.precipitation);
          setWeatherData({ ...newWeatherData, caution: cautionMessage });
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('날씨 데이터를 불러오는 데 실패했습니다.');
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {

        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Geolocation failed:', error);
        alert('위치 정보를 가져오는 데 실패했습니다.');
      },
      { enableHighAccuracy: true }
    );
  }, []); 

  const getStatus = (grade) => {
    switch (grade) {
      case 1: return '좋음';
      case 2: return '보통';
      case 3: return '나쁨';
      case 4: return '매우 나쁨';
      default: return '알 수 없음';
    }
  };

  const getWeatherIcon = (precipitation) => {
    const currentHour = new Date().getHours();
    if (precipitation > 0) {
      return weatherRain;
    } else if (currentHour >= 5 && currentHour <= 18) {
      return weatherDay;
    } else {
      return weatherNight;
    }
  };


  const getCautionMessage = (precipitation) => {
    if (precipitation > 0) {
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
      <div className="weatherContainer">
        <div className="weatherIconContainer">
          <img src={getWeatherIcon(weatherData.precipitation)} alt="Weather Icon" />
        </div>
        <div className="dateTemperature">
          <span>{weatherData.updateTime}<br/></span>
          <span>{weatherData.temperature}°C | </span>
          <span>{weatherData.precipitation}mm</span>
        </div>
        <div className="pollutionLevels">
          <span className="pollutionIndex">{weatherData.airQuality.pm10}</span>
          <span className="pollutionIndex">{weatherData.airQuality.pm25}</span>
          <span className="pollutionLabel">미세</span>
          <span className="pollutionLabel">초미세</span>
          <span className={`pollutionStatus ${weatherData.airQuality.pm10Status}`}>{weatherData.airQuality.pm10Status}</span>
          <span className={`pollutionStatus ${weatherData.airQuality.pm25Status}`}>{weatherData.airQuality.pm25Status}</span>
        </div>
      </div>
      <div className="dataDisclaimer">
        <span>{weatherData.updateTime}</span>
      </div>
    </div>
  );
}

export default HomeWeather;
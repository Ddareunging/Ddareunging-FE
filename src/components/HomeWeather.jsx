import React, { useState, useEffect } from 'react';
import './HomeWeather.css'; 
import weatherRain from './weather_rain.svg';
import weatherDay from './weather_day.svg';
import weatherNight from './weather_night.svg';
import weatherFineGood from './weather_fine_good.svg';
import weatherFineFair from './weather_fine_fair.svg';
import weatherFineBad from './weather_fine_bad.svg';
import weatherFineVeryBad from './weather_fine_verybad.svg';
import weatherUltraGood from './weather_ultra_good.svg';
import weatherUltraFair from './weather_ultra_fair.svg';
import weatherUltraBad from './weather_ultra_bad.svg';                
import weatherUltraVeryBad from './weather_ultra_verybad.svg';

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
  
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const url = `https://ddareunging.sepnon3.shop/home/weather?lat=${latitude}&lng=${longitude}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Response Data:", data);
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

    useEffect(() => {
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

  const getFineDustIcon = (status) => {
    switch (status) {
      case '좋음':
        return weatherFineGood;
      case '보통':
        return weatherFineFair;
      case '나쁨':
        return weatherFineBad;
      case '매우 나쁨':
        return weatherFineVeryBad;
      default:
        return ''; 
    }
  };

  const getUltraFineDustIcon = (status) => {
    switch (status) {
      case '좋음':
        return weatherUltraGood;
      case '보통':
        return weatherUltraFair;
      case '나쁨':
        return weatherUltraBad;
      case '매우 나쁨':
        return weatherUltraVeryBad;
      default:
        return ''; 
    }
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case '좋음': return '#0038FF'; 
      case '보통': return '#00CF2B'; 
      case '나쁨': return '#FFA300';
      case '매우 나쁨': return '#FF6E00'; 
      default: return '#767676'; // grey for unknown status
    }
  };


  const getCautionMessage = (precipitation) => {
    if (precipitation> 0) {
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
      <div className="leftSide"> 
        <div className="weatherIconContainer">
          <img src={getWeatherIcon(weatherData.precipitation)} alt="Weather Icon" />
        </div>
        <div className="weatherDetails">
          <div className="dateTemperature">
            <span className="date">{weatherData.updateTime}</span>
            <span className="temperature">{weatherData.temperature}°C</span>
            <span className="precipitation">{weatherData.precipitation}mm</span>
          </div>
        </div>
      </div>
      <div className="rightSide"> 
        <div className="pollutionDetails">
          <div className="pollutionDetail">
            <img src={getFineDustIcon(weatherData.airQuality.pm10Status)} alt="Fine Dust Status" />
            <span style={{ color: getColorForStatus(weatherData.airQuality.pm10Status), fontSize: '24px', fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word' }}>{weatherData.airQuality.pm10}</span>
            <span style={{ color: '#37593E', fontSize: '13px', fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word' }}>미세c처닞</span>
          </div>
          <div className="pollutionDetail">
            <img src={getUltraFineDustIcon(weatherData.airQuality.pm25Status)} alt="Ultra Fine Dust Status" />
            <span style={{ color: getColorForStatus(weatherData.airQuality.pm25Status), fontSize: '24px', fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word' }}>{weatherData.airQuality.pm25}</span>
            <span style={{ color: '#37593E', fontSize: '13px', fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word' }}>초미세</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeWeather;
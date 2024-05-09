import React, { useEffect, useRef, useCallback } from 'react';
import './Map.css';
import pinIcon from './course_pin_icon.svg';
import locIcon from './map_loc_icon.svg';

function Map() {
  const mapInstance = useRef(null);
  const pinInstance = useRef(null);
  const currentLocation = useRef({ latitude: null, longitude: null });

  // 지도 초기화
  const initTmap = useCallback(() => {
    const setCurrentLocation = (position) => {
      const { latitude, longitude } = position.coords;
      currentLocation.current = { latitude, longitude }; 
      mapInstance.current.setCenter(new window.Tmapv2.LatLng(latitude, longitude));

      if (!pinInstance.current) {
        pinInstance.current = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(latitude, longitude),
          map: mapInstance.current,
          icon: pinIcon
        });
      } else {
        pinInstance.current.setPosition(new window.Tmapv2.LatLng(latitude, longitude));
        pinInstance.current.setIcon(pinIcon); 
      }
    };

    if (!mapInstance.current && window.Tmapv2 && window.Tmapv2.Map) {
      mapInstance.current = new window.Tmapv2.Map("map_div", {
        center: new window.Tmapv2.LatLng(37.570028, 126.986072),
        width: '100%',
        height: '100vh'
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setCurrentLocation(position);
          fetchStations();
        }, console.error);
      }
      
      mapInstance.current.addListener('bounds_changed', () => {
        fetchStations(); 
      });
      
    }
  }, []); 

  // 정류장 데이터 가져옴
  const fetchStations = async () => {
    const bounds = mapInstance.current.getBounds(); // 지도의 현재 경계
    const nw = bounds.getNorthWest(); // 북서쪽 경계
    const se = bounds.getSouthEast(); // 남동쪽 경계
    
  
    try {
      const response = await fetch(`/map?startLat=${nw.lat()}&endLat=${se.lat()}&startLng=${nw.lng()}&endLng=${se.lng()}`);
      console.log(`test  /map?startLat=${se.lat()}&endLat=${nw.lat()}&startLng=${nw.lng()}&endLng=${se.lng()}`);
      const data = await response.json();
      console.log(data);
      if (data.stations) {
        addStationMarkers(data.respostations);
      } else {
        console.error('대여소없음');
      }
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }

  };
  
  const addStationMarkers = (stations) => {
    // 이전 마커들을 지도에서 제거
    if (pinInstance.current) {
      pinInstance.current.forEach(pin => pin.setMap(null));
      pinInstance.current = [];
    }
  
    // 새로운 마커들 추가
    stations.forEach(station => {
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(station.myLat, station.myLng),
        map: mapInstance.current,
        icon: pinIcon
      });
      pinInstance.current.push(marker); // 마커를 배열에 저장하여 관리
    });
  };
  
  

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="tmap/js"]');
    if (existingScript) {
      initTmap();
      return;
    }

    const script = document.createElement('script');
    const apiKey = process.env.REACT_APP_TMAP_API_KEY;
    script.src = `https://apis.openapi.sk.com/tmap/js?version=1&format=javascript&appKey=${apiKey}`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => initTmap();

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      mapInstance.current = null;
      pinInstance.current = null;
    };
  }, [initTmap]);

  const handleRecenter = () => {
    if (currentLocation.current.latitude && currentLocation.current.longitude) {
      mapInstance.current.setCenter(new window.Tmapv2.LatLng(currentLocation.current.latitude, currentLocation.current.longitude));
    }
  };

  return (
    <>
      <div id="map_div" style={{ width: '390px', height: '844px' }}></div>
      <button onClick={handleRecenter} style={{
        position: 'absolute',
        bottom: '60px',
        left: '16px',
        background: `url(${locIcon}) no-repeat center center`,
        border: 'none',
        width: '50px',
        height: '50px',
        cursor: 'pointer'
      }} />
    </>
  );
}

export default Map;

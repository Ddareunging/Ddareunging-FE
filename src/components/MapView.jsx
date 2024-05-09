import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Tmap from 'tmap-js';

const MapView = () => {
  const location = useLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    // 지도 초기화
    const initMap = () => {
      const map = new Tmap.Map({
        div: 'map_div',
        width: "100%",
        height: "400px"
      });
      mapRef.current = map;
      drawPath();
    };

    // 경로 그리기
    const drawPath = () => {
      const { course } = location.state;
      if (!mapRef.current || !course) return;

      const points = [
        new Tmap.LatLng(course.start.lat, course.start.lng),
        ...course.waypoint.map(wp => new Tmap.LatLng(wp.lat, wp.lng)),
        new Tmap.LatLng(course.destination.lat, course.destination.lng)
      ];

      const polyline = new Tmap.Polyline({
        path: points,
        strokeColor: "#DD0000",
        strokeWeight: 6,
        map: mapRef.current
      });
    };

    initMap();
  }, [location]);

  return <div id="map_div" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapView;

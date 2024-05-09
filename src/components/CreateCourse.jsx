import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CreateCourse.css';
import bikeIcon from './course_bike_icon.svg';
import pinIcon from './course_pin_icon.svg';
// import deleteIcon from './course_delete_icon.svg'; 
import addIcon from './course_add_icon.svg'; 
import arrowIcon from './course_arrow_icon.svg'; 
import startBikeIcon from './course_arrbike_icon.svg';
import destBikeIcon from './course_destbike_icon.svg';


const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};


function CreateCourse() {
  const mapInstance = useRef(null);
  const pins = useRef({ start: null, waypoint: [], destination: null });
  const [searchTerms, setSearchTerms] = useState({ start: '', waypoint: [''], destination: '' });
  const [places, setPlaces] = useState([]);
  const [activeSearch, setActiveSearch] = useState('start');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState({ start: null, waypoint: [], destination: null });
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState('/basic_img.png');

    const initTmap = useCallback(() => {
      const setCurrentLocation = (position) => {
        const { latitude, longitude } = position.coords;
        mapInstance.current.setCenter(new window.Tmapv2.LatLng(latitude, longitude));
    
        if (!pins.current.start) {
          pins.current.start = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(latitude, longitude),
            map: mapInstance.current,
            icon: pinIcon
          });
        } else {
          pins.current.start.setPosition(new window.Tmapv2.LatLng(latitude, longitude));
          pins.current.start.setIcon(pinIcon);
        }
      };
    
      if (!mapInstance.current && window.Tmapv2 && window.Tmapv2.Map) {
        mapInstance.current = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(37.570028, 126.986072),
          width: '100%',
          height: '100vh'
        });
    
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(setCurrentLocation, console.error);
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }
    }, []);

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
    
      const currentPins = {...pins.current};
    
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        mapInstance.current = null;
        Object.keys(currentPins).forEach(key => {
          if (currentPins[key]) {
            currentPins[key].setMap(null);
            currentPins[key] = null;
          }
        });
      };
    }, [initTmap]); 

    const handleSearch = async (type, index = 0) => {
      setActiveSearch(type); 
      const searchTerm = type === 'waypoint' ? searchTerms[type][index] : searchTerms[type];
      if (!searchTerm) return;
      const url = `https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result&appKey=${process.env.REACT_APP_TMAP_API_KEY}&searchKeyword=${encodeURIComponent(searchTerm)}`;
      try {
          const response = await fetch(url);
          const data = await response.json();
          setPlaces(data.searchPoiInfo.pois.poi);
      } catch (error) {
          console.error("Failed to fetch places", error);
          alert('장소를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
      }
      setIsModalOpen(true);
    };

    const handlePlaceClick = (place) => {
      const lat = place.frontLat || place.noorLat;
      const lon = place.frontLon || place.noorLon;
      const placeInfo = { name: place.name, lat, lon };
    
      if (!lat || !lon) {
        console.error("Invalid location data", place);
        return;
      }
      const latLng = new window.Tmapv2.LatLng(lat, lon);
      mapInstance.current.setCenter(latLng);
    
      const index = activeSearch.startsWith('waypoint') 
          ? parseInt(activeSearch.replace('waypoint', '')) - 1 
          : activeSearch;
    
      updatePin(index, latLng, placeInfo, activeSearch.startsWith('waypoint'));
    
      setIsModalOpen(false);
    };
    
    function updatePin(index, latLng, placeInfo, isWaypoint = true) {
      let pinKey = isWaypoint ? 'waypoint' : index;
      if (!isWaypoint) {
        if (pins.current[pinKey]) {
          pins.current[pinKey].setPosition(latLng);
        } else {
          pins.current[pinKey] = new window.Tmapv2.Marker({
            position: latLng,
            map: mapInstance.current,
            icon: pinIcon
          });
        }
        setSelectedPlaces(prev => {
          return { ...prev, [pinKey]: placeInfo };
        });
      } else {
        if (pins.current[pinKey][index]) {
          pins.current[pinKey][index].setPosition(latLng);
        } else {
          pins.current[pinKey][index] = new window.Tmapv2.Marker({
            position: latLng,
            map: mapInstance.current,
            icon: pinIcon
          });
        }
        setSelectedPlaces(prev => {
          const updatedPlaces = [...prev.waypoint];
          updatedPlaces[index] = placeInfo;
          return { ...prev, waypoint: updatedPlaces };
        });
      }
    }    
    
    const addWaypoint = () => {
      const newWaypoints = [...searchTerms.waypoint, ''];
      setSearchTerms({ ...searchTerms, waypoint: newWaypoints });
      pins.current.waypoint.push(null);  // 경유지 핀 배열에 null 추가
    };
    

    const handleWaypointChange = (index, value) => {
      const newWaypoints = [...searchTerms.waypoint];
      newWaypoints[index] = value;
      setSearchTerms({ ...searchTerms, waypoint: newWaypoints });
    };

    const handleOpenCourseModal = () => {
        setCourseModalOpen(true);
    };

    const handleCloseCourseModal = () => {
        setCourseModalOpen(false);
    };

    const handleImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setCourseImage(event.target.files[0]);
      }else {
        setCourseImage('/basic_img.png'); // Reset to default if no file is selected
      }
    };

    const handleSubmitCourse = () => {
      const reader = new FileReader();
      
      reader.onload = function () {
        const base64Image = reader.result || courseImage;
    
        console.log("Course Title:", courseTitle);
        console.log("Course Description:", courseDescription);
        console.log("Places:", selectedPlaces);
        console.log("Image:", base64Image); // Now logging the base64 image string
        setCourseModalOpen(false);
    
        const existingCourses = JSON.parse(localStorage.getItem('courses')) || [];
        const newCourse = {
          id: Date.now().toString(),
          title: courseTitle,
          description: courseDescription,
          places: selectedPlaces,
          image: base64Image  // Saving the image in local storage
        };
        existingCourses.push(newCourse);
        localStorage.setItem('courses', JSON.stringify(existingCourses));
    
        setCourseTitle('');
        setCourseDescription('');
        setSelectedPlaces({ start: null, waypoint: [], destination: null });
        setSearchTerms({ start: '', waypoint: [''], destination: '' }); // Resetting search terms
    
        alert('코스가 저장되었습니다!');
        setCourseModalOpen(false);
      };
    
      if (courseImage && courseImage !== '/basic_img.png') {
        reader.readAsDataURL(courseImage); // Only read if a new image was uploaded
      } else {
        reader.onload(); // Trigger onload manually with the default image
      }
    };
    
    

    return (
      <div>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            value={searchTerms.start}
            onChange={(e) => setSearchTerms({ ...searchTerms, start: e.target.value })}
          />
          <button className="button-search" onClick={() => handleSearch('start')}>출발지</button>
        </div>
        {searchTerms.waypoint.map((waypoint, index) => (
          <div className="input-container" key={index}>
            <input
              type="text"
              className="input-field"
              value={waypoint}
              onChange={(e) => handleWaypointChange(index, e.target.value)}
            />
            <button className="button-search" onClick={() => handleSearch('waypoint', index)}>경유지{index + 1}</button>
            {/* {index === searchTerms.waypoint.length - 1 && <button className="button-add" onClick={addWaypoint}></button>} */}
          </div>
        ))}
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            value={searchTerms.destination}
            onChange={(e) => setSearchTerms({ ...searchTerms, destination: e.target.value })}
          />
          <button className="button-search" onClick={() => handleSearch('destination')}>도착지</button>
        </div>
        {searchTerms.waypoint.length < 5 && ( // Assuming a max of 5 waypoints for example
          <div className="input-container">
            <button className="button-add" onClick={addWaypoint}></button>
          </div>
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="search-results-container">
            {places.map((place, index) => (
              <div key={index} className="search-result-item" onClick={() => handlePlaceClick(place)}>
                <img src={place.thumbnail} alt="Place" className="place-thumbnail" />
                <div className="place-info">
                  <div className="place-name">{place.name}</div>
                  <div className="place-details">
                    <span className="place-rating">{place.rating}</span>
                    <span className="place-distance">{place.distance}km</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
        <div id="map_div" style={{ width: '100%', height: '100%' }}></div>
        <div className="button-container">
          <div style={{
              width: '60%',
              background: 'white',
              borderRadius: '15px',
              padding: '10px 0',
              textAlign: 'center',
              color: '#37593E',
              fontSize: '12px',
              fontFamily: 'Pretendard',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginTop: '20px',
              display: 'flex', // Flexbox를 사용하여 텍스트와 아이콘 정렬
              justifyContent: 'center', // 센터 정렬
              alignItems: 'center' // 세로 센터 정렬
          }} onClick={handleOpenCourseModal} className="fixed-button">
              코스 상세 정보 입력하러 가기
              <img src={arrowIcon} alt="Go" style={{ marginLeft: '10px' }} /> 
          </div>
        </div>
        <Modal isOpen={courseModalOpen} onClose={handleCloseCourseModal}>
          <div style={{ padding: '20px', background: '#FFFDF6'}}>
          <div style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc'}}>
            {selectedPlaces.start && (
              <div className="location-item">
                <img src={startBikeIcon} alt="Start" style={{ marginRight: '10px', width: '24px', height: '24px'}} />
                {selectedPlaces.start.name} (출발지)
              </div>
            )}
            {selectedPlaces.waypoint.map((waypoint, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 0'}}>
                {waypoint.name} (경유지{index + 1})
              </div>
            ))}
            {selectedPlaces.destination && (
              <div className="location-item">
                <img src={destBikeIcon} alt="Destination" style={{ marginRight: '10px', width: '24px', height: '24px'}} />
                {selectedPlaces.destination.name} (도착지)
              </div>
            )}
          </div>
            <div className="text-area-field">
              <label htmlFor="courseTitle" style={{ color: '#37593E', fontSize: '12px', fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>
                <img src={bikeIcon} alt="Bike" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                코스 대제목
                <input
                  type="text"
                  id="courseTitle"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="input-style"
                />
              </label>
            </div>
            <div className="text-area-field">
              <label htmlFor="courseDescription" style={{ color: '#37593E', fontSize: '12px', fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>
                <img src={bikeIcon} alt="Bike" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                코스 설명
                <textarea
                  id="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="text-area-style"
                />
              </label>
            </div>

            <div className="input-container">
              {/* <input
                type="text"
                className="input-field"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Enter course description"
              /> */}
              <label htmlFor="imageUpload" className="image-upload-label">
                <img src={addIcon} alt="Add" style={{ width: '24px', height: '24px' }} />
              </label>
              <input
                id="imageUpload"
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="action-buttons">
              <button onClick={handleCloseCourseModal} className="modify-course-button">코스 수정하기</button>
              <button onClick={handleSubmitCourse} className="complete-course-button">제작 완료하기</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

export default CreateCourse;

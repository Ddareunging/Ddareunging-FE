import React, { useState } from 'react';
import CourseTour from './CourseTour';
import CourseSeason from './CourseSeason';
import CourseMy from './CourseMy';
import CourseFav from './CourseFav';
import Slider from 'react-slick';
import './CourseCommunity.css';
import sortIcon from './course_downarrow_icon.svg';
import { useLocation } from 'react-router-dom';

const CourseCommunity = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialTab = query.get('tab') || 'courseTour';
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);

  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="course-community-container">
      <div className="course-banner">
        <Slider {...settings}>
          <div><img src="/course_banner_1.png" alt="Course Banner 1" style={{ width: '100%', height: 'auto' }} /></div>
          <div><img src="/course_banner_2.png" alt="Course Banner 2" style={{ width: '100%', height: 'auto' }} /></div>
          <div><img src="/course_banner_3.png" alt="Course Banner 3" style={{ width: '100%', height: 'auto' }} /></div>
        </Slider>
      </div>

      <div className="course-categories">
        {['courseTour', 'courseSeason', 'courseMy'].map(tab => (
          <button onClick={() => handleTabChange(tab)} className={selectedTab === tab ? 'active' : ''}>
            {tab === 'courseTour' ? '관광 코스' : tab === 'courseSeason' ? '계절 코스' : '나만의 코스'}
            <div className={selectedTab === tab ? 'tab-indicator' : ''}></div>
          </button>
        ))}
      </div>

      {selectedTab === 'courseTour' && <CourseTour />}
      {selectedTab === 'courseSeason' && <CourseSeason />}

      {(selectedTab === 'courseMy' || selectedTab === 'courseFav') && (
        <div className="course-controls">
          <div className="controls-right">
            <button onClick={() => handleTabChange('courseMy')} className={`tab-button ${selectedTab === 'courseMy' ? 'active' : ''}`}>나만의 코스</button>
            <button onClick={() => handleTabChange('courseFav')} className={`tab-button ${selectedTab === 'courseFav' ? 'active' : ''}`}>찜한 코스</button>
            <div className="sorting">
              정렬
              <img src={sortIcon} alt="Down Arrow" className="sorting-arrow" />
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'courseMy' && <CourseMy />}
      {selectedTab === 'courseFav' && <CourseFav />}
    </div>
  );
};

export default CourseCommunity;


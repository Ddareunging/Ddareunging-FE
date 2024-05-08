import React, { useState } from 'react';
import CourseMy from './CourseMy';
import CourseFav from './CourseFav';
import Slider from 'react-slick';
import './CourseCommunity.css';
import sortIcon from './course_downarrow_icon.svg';

const CourseCommunity = () => {
  const [selectedTab, setSelectedTab] = useState('courseMy');

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
    // cssEase: "linear"
  };

  return (
    <div className="container">
      <div className="course-banner">
        <Slider {...settings}>
          <div>
            <img src="/course_banner_1.png" alt="Course Banner 1" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="/course_banner_2.png" alt="Course Banner 2" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src="/course_banner_3.png" alt="Course Banner 3" style={{ width: '100%', height: 'auto' }} />
          </div>
        </Slider>
      </div>

      <div className="course-categories">
        <div className="course-label">관광 코스</div>
        <div className="course-label">계절 코스</div>
        <div className="course-label">나만의 코스</div>
      </div>

      <div className="course-controls">
        <button className={`tab-button ${selectedTab === 'courseMy' ? 'active' : ''}`} onClick={() => handleTabChange('courseMy')}>
          나만의 코스
        </button>
        <button className={`tab-button ${selectedTab === 'courseFav' ? 'active' : ''}`} onClick={() => handleTabChange('courseFav')}>
          찜한 코스
        </button>
        <div className="sorting">
          정렬
          <img src={sortIcon} alt="Down Arrow" className="sorting-arrow" />
        </div>
      </div>
  
      {selectedTab === 'courseMy' && <CourseMy />}
      {selectedTab === 'courseFav' && <CourseFav />}

      
    </div>
  );
};

export default CourseCommunity;


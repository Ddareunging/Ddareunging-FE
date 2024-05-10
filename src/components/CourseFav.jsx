import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSeason.css'; // 같은 스타일을 사용합니다.
import { ReactComponent as ProfileIcon } from './profile_icon.svg';

const CourseFav = () => {
  const defaultProfile = '따릉잉_official';  // 기본 프로필 설정
  // 관광 코스 데이터
  const favCourses = [
    { id: '1', title: '바쁜 도심 속, 청계천을 달려볼까?', profile: defaultProfile, image: '/public/ch.jpg' },
  ];

  return (
    <div className="course-season-container">
      <div className="courses-grid">
        {favCourses.map((course) => (
          <div key={course.id} className="course-card">
            <Link to={`/fav-course-detail/${course.id}`} className="course-link">
              <div className="course-info">
                <img src={course.image} alt="Fav Icon" className="course-icon" />
                <div className="course-title">{course.title}</div>
                <div className="profile-section">
                <ProfileIcon className="profile-icon"/>
                <span className="nickname">{course.profile}</span>
              </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CourseFav;

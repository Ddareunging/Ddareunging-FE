import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSeason.css'; // 같은 스타일을 사용합니다.
import { ReactComponent as ProfileIcon } from './profile_icon.svg';

const TourCourse = () => {
  const defaultProfile = '따릉잉_official';  // 기본 프로필 설정
  // 관광 코스 데이터
  const tourCourses = [
    { id: '1', title: '바쁜 도심 속, 청계천을 달려볼까?', profile: defaultProfile, image: '/public/ch.jpg' },
    { id: '2', title: '한강 남북통일', profile: defaultProfile, image: '/public/mang.jpg' },
    { id: '3', title: '남한강 풀코스', profile: defaultProfile, image: '/public/south_han2.jpg' },
    { id: '4', title: '서울 4대궁을 한번에!', profile: defaultProfile, image: '/public/gung.jpg' },
    { id: '5', title: '송파? 나만 따라와.', profile: defaultProfile, image: '/public/song.jpg' }
  ];

  return (
    <div className="course-season-container">
      <div className="courses-grid">
        {tourCourses.map((course) => (
          <div key={course.id} className="course-card">
            <Link to={`/tour-course-detail/${course.id}`} className="course-link">
              <div className="course-info">
                <img src={`/path/to/icons/${course.id}.svg`} alt="Tour Icon" className="course-icon" />
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

export default TourCourse;


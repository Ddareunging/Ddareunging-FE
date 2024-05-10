import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSeason.css';
import { ReactComponent as ProfileIcon } from './profile_icon.svg';

const CourseSeason = () => {
  const defaultProfile = '따릉잉_official';  // 기본 프로필 설정

  const seasonCourses = [
    { id: '1', title: '서울의 도심을 흐르는 한강', profile: defaultProfile, image: '/public/si.jpg' },
    { id: '2', title: '벚꽃 명소 양재천, 따릉이와 함께!', profile: defaultProfile, image: '/public/yang.jpg' },
    ];

  return (
    <div className="course-season-container">
      {/* <h2>계절 코스</h2> */}
      <div className="courses-grid">  {/* 클래스 이름 수정 */}
        {seasonCourses.map((course) => (
          <div key={course.id} className="course-card">
            <Link to={`/season-course-detail/${course.id}`} className="course-link">
              <div className="course-info">
                <img src={`/path/to/icons/${course.id}.svg`} alt="Course Icon" className="course-icon" />
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


export default CourseSeason;

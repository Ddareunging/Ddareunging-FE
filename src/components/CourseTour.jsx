import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSeason.css'; // 같은 스타일을 사용합니다.

const TourCourse = () => {
  // 관광 코스 데이터
  const tourCourses = [
    { id: '5', title: '역사적인 명소 탐방' },
    { id: '6', title: '도심 속 숨은 자연' },
    { id: '7', title: '밤의 도시 라이트 업' },
    { id: '8', title: '문화 예술의 거리' }
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCourse;


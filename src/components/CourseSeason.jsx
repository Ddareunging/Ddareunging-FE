import React from 'react';
import { Link } from 'react-router-dom';
import './CourseSeason.css';

const CourseSeason = () => {
  const seasonCourses = [
    { id: '1', title: '봄에 걷기 좋은 코스' },
    { id: '2', title: '여름 에너지 충전 코스' },
    { id: '3', title: '가을 정취를 느낄 수 있는 코스' },
    { id: '4', title: '겨울에 따뜻한 코스' }
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CourseSeason;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CourseMy.css'; 
import { ReactComponent as ProfileIcon } from './profile_icon.svg';


const CourseMy = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses([{ id: 'create_new', title: '나만의 코스 만들기' }, ...loadedCourses]);
  }, []);

  const hasCourses = courses.length > 1;

  return (
    <div className={hasCourses ? "courses-grid" : "create-course-center"}>
      {/* <button onClick={() => localStorage.removeItem('courses')}>코스 데이터 삭제</button> */}
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <Link to={course.id === 'create_new' ? "/create-course" : `/course-detail/${course.id}`} className="course-link">
            {course.image && <img src={course.image} alt="Course Thumbnail" className="course-thumbnail"/>}
            <div className="course-info">
              <h2 className="course-title">{course.title}</h2>
              <div className="profile-section">
                <ProfileIcon className="profile-icon"/>
                <span className="nickname">따릉이_official</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {/* <button onClick={() => localStorage.removeItem('courses')}>코스 데이터 삭제</button> */}

    </div>
  );
};

export default CourseMy;

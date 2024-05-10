
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CourseMy.css'; 
import { ReactComponent as ProfileIcon } from './profile_icon.svg';

const CourseMy = () => {
  const defaultProfile = '따릉잉_official';  // 기본 프로필 설정

  // 더미 데이터 추가
  const initialCourses = [
    { id: '1', title: '바쁜 도심 속, 청계천을 달려볼까?', profile: defaultProfile, image: '/public/ch.jpg' },
    { id: '2', title: '한강 남북통일', profile: defaultProfile, image: '/public/mang.jpg' },
    { id: '3', title: '벚꽃 명소 양재천, 따릉이와 함께!', profile: defaultProfile, image: '/public/yang.jpg' },
    { id: '4', title: '서울 4대궁을 한번에!', profile: defaultProfile, image: '/public/gung.jpg' },
  ];

  const [courses, setCourses] = useState([{ id: 'create_new', title: '나만의 코스 만들기' }, ...initialCourses]);

  useEffect(() => {
    const loadedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    // 로컬 스토리지 데이터에 프로필 정보를 추가
    const enrichedCourses = loadedCourses.map(course => ({
      ...course,
      profile: course.profile || defaultProfile  // 프로필 정보가 없다면 기본값 사용
    }));
    setCourses([{ id: 'create_new', title: '나만의 코스 만들기' }, ...initialCourses, ...enrichedCourses]);
  }, []);

  const hasCourses = courses.length > 1;

  return (
    <div className={hasCourses ? "courses-grid" : "create-course-center"}>
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <Link to={course.id === 'create_new' ? "/create-course" : `/course-detail/${course.id}`} className="course-link">
            {course.image && <img src={course.image} alt="Course Thumbnail" className="course-thumbnail" />}
            <div className="course-info">
              <h2 className="course-title">{course.title}</h2>
              <div className="profile-section">
                <ProfileIcon className="profile-icon"/>
                <span className="nickname">{course.profile}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseMy;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetail.css';
import startBikeIcon from './course_arrbike_icon.svg';
import destBikeIcon from './course_destbike_icon.svg';
import likeIcon from './my_like_icon.svg';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isFavored, setIsFavored] = useState(false);

  useEffect(() => {
    const loadedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const foundCourse = loadedCourses.find(c => c.id === courseId);
    const favoredCourses = JSON.parse(localStorage.getItem('favoredCourses')) || [];
    setIsFavored(favoredCourses.includes(courseId));

    if (foundCourse) {
      setCourse(foundCourse);
      setComments(foundCourse.comments || []);
    } else {
      console.error('Course not found');
    }
  }, [courseId]);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) {
      alert('댓글을 입력하세요');
      return;
    }
    const newComments = [...comments, commentInput.trim()];
    setComments(newComments);
    setCommentInput('');
    const loadedCourses = JSON.parse(localStorage.getItem('courses'));
    const updatedCourses = loadedCourses.map(c => c.id === courseId ? { ...c, comments: newComments } : c);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  
      handleCommentSubmit();
    }
  };

  const toggleFavorite = () => {
    const favoredCourses = JSON.parse(localStorage.getItem('favoredCourses')) || [];
    if (favoredCourses.includes(courseId)) {
      const newFavoredCourses = favoredCourses.filter(id => id !== courseId);
      localStorage.setItem('favoredCourses', JSON.stringify(newFavoredCourses));
      setIsFavored(false);
    } else {
      favoredCourses.push(courseId);
      localStorage.setItem('favoredCourses', JSON.stringify(favoredCourses));
      setIsFavored(true);
    }
  };

  const viewCourseMap = () => {
    navigate('/map', { state: { course: course.places } });
  };

  if (!course) {
    return <div>코스를 불러오는 중...</div>;
  }

  return (
    <div className="course-detail-container">
      {course.image && <img src={course.image} alt="Course" style={{ width: '100%', height: 'auto' }} />}
      <div className="course-title-container">
        <h1 className="course-title">{course.title}</h1>
        <img 
            src={likeIcon} 
            alt="Like" 
            onClick={toggleFavorite} 
            className={`like-icon ${isFavored ? 'favored' : ''}`}
        />
      </div>
      
      <div style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc'}}>
        {course.places.start && (
          <div className="location-item">
            <img src={startBikeIcon} alt="Start" style={{ marginRight: '10px', width: '24px', height: '24px'}} />
            {course.places.start.name} (출발지)
          </div>
        )}
        {course.places.waypoint.map((waypoint, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 0'}}>
            {/* <img src={waypointIcon} alt="Waypoint" style={{ marginRight: '10px', width: '24px', height: '24px'}} /> */}
            {waypoint.name} (경유지{index + 1})
          </div>
        ))}
        {course.places.destination && (
          <div className="location-item">
            <img src={destBikeIcon} alt="Destination" style={{ marginRight: '10px', width: '24px', height: '24px'}} />
            {course.places.destination.name} (도착지)
          </div>
        )}
      </div>
      <button
        className="view-course-button"
        onClick={viewCourseMap}
      >
        코스보러가기
      </button>
      <p>{course.description}</p>
      <div className="comments-section">
        <h3>댓글</h3>
        {comments.map((comment, index) => <p key={index}>{comment}</p>)}
        <input
          type="text"
          className="comment-input"
          value={commentInput}
          onChange={e => setCommentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력하세요"
        />
        <button className="comment-submit-button" onClick={handleCommentSubmit}>댓글 추가</button>
      </div>
    </div>
  );
};

export default CourseDetail;

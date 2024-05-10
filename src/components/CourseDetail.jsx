// 상세 코스 더미 데이터 여러개
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetail.css';
import startBikeIcon from './course_arrbike_icon.svg';
import destBikeIcon from './course_destbike_icon.svg';
import likeIcon from './my_like_icon.svg';

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [commentInput, setCommentInput] = useState('');
//   const [isFavored, setIsFavored] = useState(false);
  //const [loadedCourses, setLoadedCourses] = useState([]);  // 상태로 로드된 코스들을 관리
  const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [isFavored, setIsFavored] = useState(false);

  const dummyCourses = 
    [
    {id: '1', title: '바쁜 도심 속, 청계천을 달려볼까?', image: '/public/ch.jpg',
    places: {start: { name: '청계광장' }, waypoint: [{ name: '을지로 3가역' }, { name: '동대문역(DDP 부근)' }], destination: { name: '버들습지' }},
    description: '도심 속의 여유, 청계천', comments: ['정말 시원한 코스네요!', '다음에 또 가고 싶어요.']},
    {id: '2', title: '한강 남북통일', image: '/public/mang.jpg',
    places: {start: { name: '망원 한강공원' }, waypoint: [{ name: '마포대교' }], destination: { name: '여의나루역' }},
    description: '노을 맛집 망원 한강공원!', comments: ['정말 시원한 코스네요!', '다음에 또 가고 싶어요.']},
    {id: '3', title: '벚꽃 명소 양재천, 따릉이와 함께!', image: '/public/yang.jpg',
    places: {start: { name: '양재시민의숲역' }, waypoint: [{ name: '양재천' }], destination: { name: '학여울역' }},
    description: '벚꽃 맛집 양재천', comments: ['정말 시원한 코스네요!', '다음에 또 가고 싶어요.']},
    {id: '4', title: '서울 4대궁을 한번에!', image: '/public/gung.jpg',
    places: {start: { name: '청계광장' }, waypoint: [{ name: '을지로 3가역' }, { name: '동대문역(DDP 부근)' }], destination: { name: '버들습지' }},
    description: '서울 4대궁 투어', comments: ['정말 시원한 코스네요!', '다음에 또 가고 싶어요.']},
    ];

  useEffect(() => {
    const id = parseInt(courseId, 10); // courseId를 정수로 변환
    if (!id) {
      console.error("Invalid course ID");
      return;
    }
  
    const foundCourse = dummyCourses.find(course => course.id.toString() === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      setComments(foundCourse.comments || []);
    } else {
      console.error('Course not found');  
    }
  }, [courseId]); // courseId가 변경될 때마다 이 효과를 다시 실행

  

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) {
      alert('댓글을 입력하세요');
      return;
    }
    const newComments = [...comments, commentInput.trim()];
    setComments(newComments);
    setCommentInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  
      handleCommentSubmit();
    }
  };

  if (!course) {
    return <div>코스를 불러오는 중...</div>;
  }

  return (
    <div className="course-detail-container">
      {course.image && <img src={course.image} alt="Course" style={{ width: '100%', height: 'auto' }} />}
      <div className="course-title-container">
        <h1 className="course-title">{course.title}</h1>
        <img src={likeIcon} alt="Like" onClick={() => setIsFavored(!isFavored)} className={`like-icon ${isFavored ? 'favored' : ''}`} />
      </div>
      <div style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
        {course.places.start && <div className="location-item"><img src={startBikeIcon} alt="Start" style={{ marginRight: '10px', width: '24px', height: '24px' }} />{course.places.start.name} (출발지)</div>}
        {course.places.waypoint.map((waypoint, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 0' }}>
            {waypoint.name} (경유지{index + 1})
          </div>
        ))}
        {course.places.destination && <div className="location-item"><img src={destBikeIcon} alt="Destination" style={{ marginRight: '10px', width: '24px', height: '24px' }} />{course.places.destination.name} (도착지)</div>}
      </div>
      <button className="view-course-button" onClick={() => navigate('/map', { state: { course: course.places } })}>코스보러가기</button>
      <p>{course.description}</p>
      <div className="comments-section">
        <h3>댓글</h3>
        {comments.map((comment, index) => <p key={index}>{comment}</p>)}
        <input type="text" className="comment-input" value={commentInput} onChange={e => setCommentInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="댓글을 입력하세요" />
        <button className="comment-submit-button" onClick={handleCommentSubmit}>댓글 추가</button>
      </div>
    </div>
  );
};

export default CourseDetail;
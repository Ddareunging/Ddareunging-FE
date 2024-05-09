import React, { useEffect, useState } from 'react';
import { ReactComponent as LikeIcon } from './my_like_icon.svg';
import { ReactComponent as CommentIcon } from './my_comment_icon.svg';
import { ReactComponent as ArrowIcon } from './my_arrow_icon.svg';
import './MyPage.css';

function MyPage() {
  const [userData, setUserData] = useState({
    nickname: 'Loading...',
    realName: '',
    email: 'Loading...',
    profileImage: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile'); // 백엔드에서 엔드포인트 받기
        const data = await response.json();
        setUserData({
          nickname: data.nickname,
          realName: data.realName,
          email: data.email,
          profileImage: data.profileImage
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="mypage-container">
      <div className="header-section">
        <h1 className="header-title">MY</h1>
      </div>
      <div className="profile-section">
        {userData.profileImage && (
          <img src={userData.profileImage} alt="Profile" className="profile-image" />
        )}
        <div className="profile-info">
          <h1>{userData.nickname} ({userData.realName})</h1>
          <p>{userData.email}</p>
        </div>
      </div>
      <div className="actions-section">
        <button className="action-button">
          <LikeIcon className="action-icon" />
          <div className="action-text">찜한 코스 / 나만의 코스</div>
        </button>
        <button className="action-button">
          <CommentIcon className="action-icon" />
          <div className="action-text">내가 작성한 댓글</div>
        </button>
      </div>
      <div className="links-section">
        <div className="link-item">
          <span className="link-item-text">내 정보 관리</span>
          <ArrowIcon />
        </div>
        <div className="link-item">
          <span className="link-item-text">공지사항</span>
          <ArrowIcon />
        </div>
        <div className="link-item">
        <span className="link-item-text">고객센터</span>
          <ArrowIcon />
        </div>
        <div className="link-item">
          <span className="link-item-text">로그아웃</span>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
}

export default MyPage;

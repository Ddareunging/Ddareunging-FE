import React from 'react';
import { ReactComponent as LikeIcon } from './my_like_icon.svg';
import { ReactComponent as CommentIcon } from './my_comment_icon.svg';
import { ReactComponent as ArrowIcon } from './my_arrow_icon.svg';
import './MyPage.css';

function MyPage() {
  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div className="profile-image"></div>
        <div className="profile-info">
          <h1>닉네임(본명)</h1>
          <p>ooooooo@naver.com</p>
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
          <span>내 정보 관리</span>
          <ArrowIcon />
        </div>
        <div className="link-item">
          <span>공지사항</span>
          <ArrowIcon />
        </div>
        <div className="link-item">
          <span>고객센터</span>
          <ArrowIcon />
        </div>
        <div className="link-item">
          <span>로그아웃</span>
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
}

export default MyPage;

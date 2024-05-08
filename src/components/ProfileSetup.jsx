import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetup.css';

function ProfileSetup() {
    const [nickname, setNickname] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [showCongratsScreen, setShowCongratsScreen] = useState(false);
    const navigate = useNavigate();

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log('Profile Updated:', nickname, profileImage);
        setShowCongratsScreen(true)
        // 백엔드 연동 예정
    };

    const handleCongratsScreenClick = () => {
        navigate('/'); 
    };

    return (
        <div className="profile-setup">
            {showCongratsScreen ? (
                <div className="congrats-screen" onClick={handleCongratsScreenClick}>
                    <p className="congrats-message">회원 가입을 축하합니다!</p>
                </div>
            ) : (
                <>
                    <h1 className="title">프로필 설정</h1>
                    <div className="profile-photo" onClick={() => document.getElementById('profile-image-upload').click()}>
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="profile-image" />
                        ) : (
                            <div className="profile-image-placeholder">+</div>
                        )}
                        <input
                            type="file"
                            id="profile-image-upload"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <div className="nickname-input">
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={handleNicknameChange}
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>
                    <button className='setup-button' onClick={handleSubmit}>가입 완료 하기</button>
                </>
            )}
        </div>
    );
}

export default ProfileSetup;

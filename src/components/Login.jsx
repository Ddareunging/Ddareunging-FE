import React, { useEffect } from 'react';
import './Login.css';

function Login({ setIsLoggedIn }) {
  // 카카오 SDK 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//developers.kakao.com/sdk/js/kakao.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);
      if (window.Kakao.isInitialized()) {
        console.log("Kakao SDK initialized");
      }
    };

    return () => document.head.removeChild(script);
  }, []);

  const handleLogin = async () => {
    try {
      window.Kakao.Auth.login({
        success: function(authObj) {
          console.log(authObj);
          setIsLoggedIn(true);
          window.location.href = '/profile-setup';
          // 토큰을 사용하여 추가적인 사용자 정보 요청 등의 로직을 여기에 추가할 수 있습니다.
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <img className="img" src="/logo.png" alt="logo" />
      <button className="button" onClick={handleLogin}>Login with Kakao</button>
    </div>
  );  
}

export default Login;
